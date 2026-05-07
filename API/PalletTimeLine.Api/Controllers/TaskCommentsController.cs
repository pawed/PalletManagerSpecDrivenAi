using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Data;
using PalletTimeLine.Api.DTOs;
using PalletTimeLine.Api.Models;
using PalletTimeLine.Api.Services;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/tasks/{taskId}/comments")]
public class TaskCommentsController : ControllerBase
{
    private readonly PalletTimelineDbContext _db;
    private readonly IAuditService _audit;

    public TaskCommentsController(PalletTimelineDbContext db, IAuditService audit)
    {
        _db = db;
        _audit = audit;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskCommentDto>>> GetComments(Guid taskId)
    {
        var taskExists = await _db.Tasks.AnyAsync(t => t.Id == taskId);
        if (!taskExists)
            return NotFound();

        var comments = await _db.TaskComments.AsNoTracking()
            .Where(c => c.TaskItemId == taskId)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new TaskCommentDto(
                c.Id,
                c.Content,
                c.AuthorId,
                c.Author.DisplayName,
                c.CreatedAt,
                c.UpdatedAt))
            .ToListAsync();

        return Ok(comments);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskCommentDto>> GetComment(Guid taskId, Guid id)
    {
        var comment = await _db.TaskComments.AsNoTracking()
            .Where(c => c.Id == id && c.TaskItemId == taskId)
            .Select(c => new TaskCommentDto(
                c.Id,
                c.Content,
                c.AuthorId,
                c.Author.DisplayName,
                c.CreatedAt,
                c.UpdatedAt))
            .FirstOrDefaultAsync();

        return comment is not null ? Ok(comment) : NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<TaskCommentDto>> CreateComment(Guid taskId, TaskCommentCreateDto request)
    {
        var taskExists = await _db.Tasks.AnyAsync(t => t.Id == taskId);
        if (!taskExists)
            return NotFound();

        var author = await _db.Users.FindAsync(request.AuthorId);
        if (author is null)
            return BadRequest("Author not found.");

        var comment = new TaskComment
        {
            TaskItemId = taskId,
            Content = request.Content,
            AuthorId = request.AuthorId,
            CreatedAt = DateTime.UtcNow
        };

        _db.TaskComments.Add(comment);
        await _db.SaveChangesAsync();

        await _audit.LogCreateAsync("TaskComment", comment.Id, comment, request.AuthorId);

        var dto = new TaskCommentDto(
            comment.Id,
            comment.Content,
            comment.AuthorId,
            author.DisplayName,
            comment.CreatedAt,
            comment.UpdatedAt);

        return CreatedAtAction(nameof(GetComment), new { taskId, id = comment.Id }, dto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateComment(Guid taskId, Guid id, TaskCommentUpdateDto request)
    {
        var comment = await _db.TaskComments
            .Where(c => c.Id == id && c.TaskItemId == taskId)
            .FirstOrDefaultAsync();

        if (comment is null)
            return NotFound();

        var oldContent = comment.Content;

        comment.Content = request.Content;
        comment.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        await _audit.LogUpdateAsync("TaskComment", comment.Id,
            new { Content = oldContent },
            new { request.Content },
            comment.AuthorId);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment(Guid taskId, Guid id)
    {
        var comment = await _db.TaskComments
            .Where(c => c.Id == id && c.TaskItemId == taskId)
            .FirstOrDefaultAsync();

        if (comment is null)
            return NotFound();

        _db.TaskComments.Remove(comment);
        await _db.SaveChangesAsync();

        await _audit.LogDeleteAsync("TaskComment", comment.Id, comment, comment.AuthorId);

        return NoContent();
    }
}
