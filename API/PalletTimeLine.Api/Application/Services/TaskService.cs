using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

public class TaskService : ITaskService
{
    private readonly PalletTimelineDbContext _db;

    public TaskService(PalletTimelineDbContext db)
    {
        _db = db;
    }

    private static DateTime? ParseDateUtc(string? s) =>
        DateTime.TryParse(s, out var d)
            ? DateTime.SpecifyKind(d.Date, DateTimeKind.Utc)
            : null;

    private static TaskDto MapToDto(TaskItem t) => new(
        t.Id,
        t.Title,
        t.Responsible.Select(u => u.DisplayName).ToArray(),
        t.CompleteDate.HasValue ? t.CompleteDate.Value.ToString("yyyy-MM-dd") : null,
        t.Status.ToString(),
        t.Priority.ToString(),
        t.Category,
        t.Description);

    public async Task<IReadOnlyList<TaskDto>> GetAllAsync(CancellationToken ct = default)
    {
        return await _db.Tasks.AsNoTracking()
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
            .ToListAsync(ct);
    }

    public async Task<TaskDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        return await _db.Tasks.AsNoTracking()
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
            .FirstOrDefaultAsync(ct);
    }

    public async Task<TaskDto> CreateAsync(TaskCreateDto dto, CancellationToken ct = default)
    {
        var status   = Enum.Parse<TaskItemStatus>(dto.Status, ignoreCase: true);
        var priority = Enum.Parse<TaskItemPriority>(dto.Priority, ignoreCase: true);

        var edition = await _db.Editions.FirstOrDefaultAsync(ct)
            ?? throw new InvalidOperationException("No edition found.");

        var responsible = dto.Who.Length > 0
            ? await _db.Users.Where(u => dto.Who.Contains(u.DisplayName)).ToListAsync(ct)
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
        await _db.SaveChangesAsync(ct);

        return MapToDto(task);
    }

    public async Task<TaskDto?> UpdateAsync(Guid id, TaskUpdateDto dto, CancellationToken ct = default)
    {
        var status   = Enum.Parse<TaskItemStatus>(dto.Status, ignoreCase: true);
        var priority = Enum.Parse<TaskItemPriority>(dto.Priority, ignoreCase: true);

        var task = await _db.Tasks
            .Include(t => t.Responsible)
            .FirstOrDefaultAsync(t => t.Id == id, ct);

        if (task is null) return null;

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.CompleteDate = ParseDateUtc(dto.CompleteDate);
        task.Status = status;
        task.Priority = priority;
        task.Category = dto.Category;

        var newResponsible = dto.Who.Length > 0
            ? await _db.Users.Where(u => dto.Who.Contains(u.DisplayName)).ToListAsync(ct)
            : [];

        task.Responsible.Clear();
        foreach (var user in newResponsible)
            task.Responsible.Add(user);

        await _db.SaveChangesAsync(ct);

        return MapToDto(task);
    }

    public async Task<bool> UpdateStatusAsync(Guid id, TaskStatusUpdateDto dto, CancellationToken ct = default)
    {
        var task = await _db.Tasks.FindAsync([id], ct);
        if (task is null) return false;

        task.Status = Enum.Parse<TaskItemStatus>(dto.Status, ignoreCase: true);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
