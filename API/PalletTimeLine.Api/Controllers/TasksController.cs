using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Data;
using PalletTimeLine.Api.DTOs;
using PalletTimeLine.Api.Models;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly PalletTimelineDbContext _db;

    public TasksController(PalletTimelineDbContext db)
    {
        _db = db;
    }

    private static DateTime? ParseDateUtc(string? s) =>
        DateTime.TryParse(s, out var d)
            ? DateTime.SpecifyKind(d.Date, DateTimeKind.Utc)
            : null;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
    {
        var tasks = await _db.Tasks.AsNoTracking()
            .Include(t => t.Responsible)
            .Select(t => new TaskDto(
                t.Id,
                t.Title,
                t.Responsible.Select(u => u.DisplayName).ToArray(),
                t.CompleteDate.HasValue ? t.CompleteDate.Value.ToString("yyyy-MM-dd") : null,
                t.Status.ToString(),
                t.Priority.ToString(),
                t.Category,
                t.Description))
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDto>> GetTask(Guid id)
    {
        var task = await _db.Tasks.AsNoTracking()
            .Include(t => t.Responsible)
            .Where(t => t.Id == id)
            .Select(t => new TaskDto(
                t.Id,
                t.Title,
                t.Responsible.Select(u => u.DisplayName).ToArray(),
                t.CompleteDate.HasValue ? t.CompleteDate.Value.ToString("yyyy-MM-dd") : null,
                t.Status.ToString(),
                t.Priority.ToString(),
                t.Category,
                t.Description))
            .FirstOrDefaultAsync();

        return task is not null ? Ok(task) : NotFound();
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, TaskStatusUpdateDto request)
    {
        var task = await _db.Tasks.FindAsync(id);
        if (task is null)
        {
            return NotFound();
        }

        if (!Enum.TryParse<TaskItemStatus>(request.Status, ignoreCase: true, out var newStatus))
            return BadRequest($"Invalid status value: {request.Status}");

        task.Status = newStatus;
        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(TaskCreateDto dto)
    {
        if (!Enum.TryParse<TaskItemStatus>(dto.Status, ignoreCase: true, out var status))
            return BadRequest($"Invalid status: {dto.Status}");
        if (!Enum.TryParse<TaskItemPriority>(dto.Priority, ignoreCase: true, out var priority))
            return BadRequest($"Invalid priority: {dto.Priority}");

        var edition = await _db.Editions.FirstOrDefaultAsync();
        if (edition is null) return BadRequest("No edition found.");

        var responsible = dto.Who.Length > 0
            ? await _db.Users.Where(u => dto.Who.Contains(u.DisplayName)).ToListAsync()
            : [];

        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Description = dto.Description,
            CompleteDate = ParseDateUtc(dto.CompleteDate),
            Status = status,
            Priority = priority,
            Category = dto.Category,
            EditionId = edition.Id,
            Responsible = responsible
        };

        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();

        var result = new TaskDto(
            task.Id,
            task.Title,
            task.Responsible.Select(u => u.DisplayName).ToArray(),
            task.CompleteDate.HasValue ? task.CompleteDate.Value.ToString("yyyy-MM-dd") : null,
            task.Status.ToString(),
            task.Priority.ToString(),
            task.Category,
            task.Description);

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskDto>> UpdateTask(Guid id, TaskUpdateDto dto)
    {
        if (!Enum.TryParse<TaskItemStatus>(dto.Status, ignoreCase: true, out var status))
            return BadRequest($"Invalid status: {dto.Status}");
        if (!Enum.TryParse<TaskItemPriority>(dto.Priority, ignoreCase: true, out var priority))
            return BadRequest($"Invalid priority: {dto.Priority}");

        var task = await _db.Tasks.Include(t => t.Responsible).FirstOrDefaultAsync(t => t.Id == id);
        if (task is null) return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.CompleteDate = ParseDateUtc(dto.CompleteDate);
        task.Status = status;
        task.Priority = priority;
        task.Category = dto.Category;

        var newResponsible = dto.Who.Length > 0
            ? await _db.Users.Where(u => dto.Who.Contains(u.DisplayName)).ToListAsync()
            : [];

        task.Responsible.Clear();
        foreach (var user in newResponsible)
            task.Responsible.Add(user);

        await _db.SaveChangesAsync();

        var result = new TaskDto(
            task.Id,
            task.Title,
            task.Responsible.Select(u => u.DisplayName).ToArray(),
            task.CompleteDate.HasValue ? task.CompleteDate.Value.ToString("yyyy-MM-dd") : null,
            task.Status.ToString(),
            task.Priority.ToString(),
            task.Category,
            task.Description);

        return Ok(result);
    }
}
