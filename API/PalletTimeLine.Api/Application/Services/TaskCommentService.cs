using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

public class TaskCommentService : ITaskCommentService
{
    private readonly PalletTimelineDbContext _db;
    private readonly IAuditService _audit;

    public TaskCommentService(PalletTimelineDbContext db, IAuditService audit)
    {
        _db = db;
        _audit = audit;
    }

    public Task<bool> TaskExistsAsync(Guid taskId, CancellationToken ct = default)
        => _db.Tasks.AnyAsync(t => t.Id == taskId, ct);

    public async Task<IReadOnlyList<TaskCommentDto>> GetByTaskAsync(Guid taskId, CancellationToken ct = default)
    {
        return await _db.TaskComments.AsNoTracking()
            .Where(c => c.TaskItemId == taskId)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new TaskCommentDto(
                c.Id,
                c.Content,
                c.AuthorId,
                c.Author.DisplayName,
                c.CreatedAt,
                c.UpdatedAt))
            .ToListAsync(ct);
    }

    public async Task<TaskCommentDto?> GetByIdAsync(Guid taskId, Guid id, CancellationToken ct = default)
    {
        return await _db.TaskComments.AsNoTracking()
            .Where(c => c.Id == id && c.TaskItemId == taskId)
            .Select(c => new TaskCommentDto(
                c.Id,
                c.Content,
                c.AuthorId,
                c.Author.DisplayName,
                c.CreatedAt,
                c.UpdatedAt))
            .FirstOrDefaultAsync(ct);
    }

    public async Task<TaskCommentDto?> CreateAsync(Guid taskId, TaskCommentCreateDto dto, CancellationToken ct = default)
    {
        var author = await _db.Users.FindAsync([dto.AuthorId], ct);
        if (author is null) return null;

        var comment = new TaskComment
        {
            Id = Guid.NewGuid(),
            TaskItemId = taskId,
            Content = dto.Content,
            AuthorId = dto.AuthorId,
            CreatedAt = DateTime.UtcNow
        };

        _db.TaskComments.Add(comment);
        await _audit.LogCreateAsync("TaskComment", comment.Id, comment, dto.AuthorId, ct);
        await _db.SaveChangesAsync(ct);

        return new TaskCommentDto(
            comment.Id,
            comment.Content,
            comment.AuthorId,
            author.DisplayName,
            comment.CreatedAt,
            comment.UpdatedAt);
    }

    public async Task<bool> UpdateAsync(Guid taskId, Guid id, TaskCommentUpdateDto dto, CancellationToken ct = default)
    {
        var comment = await _db.TaskComments
            .Where(c => c.Id == id && c.TaskItemId == taskId)
            .FirstOrDefaultAsync(ct);

        if (comment is null) return false;

        var oldContent = comment.Content;
        comment.Content = dto.Content;
        comment.UpdatedAt = DateTime.UtcNow;

        await _audit.LogUpdateAsync("TaskComment", comment.Id,
            new { Content = oldContent },
            new { dto.Content },
            comment.AuthorId,
            ct);

        await _db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid taskId, Guid id, CancellationToken ct = default)
    {
        var comment = await _db.TaskComments
            .Where(c => c.Id == id && c.TaskItemId == taskId)
            .FirstOrDefaultAsync(ct);

        if (comment is null) return false;

        _db.TaskComments.Remove(comment);
        await _audit.LogDeleteAsync("TaskComment", comment.Id, comment, comment.AuthorId, ct);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
