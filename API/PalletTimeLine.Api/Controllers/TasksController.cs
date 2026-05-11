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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
    {
        var tasks = await _db.Tasks.AsNoTracking()
            .Include(t => t.Responsible)
            .Select(t => new TaskDto(
                t.Id,
                t.Title,
                t.Responsible.Select(u => u.DisplayName).ToArray(),
                t.Date,
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
                t.Date,
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
}
