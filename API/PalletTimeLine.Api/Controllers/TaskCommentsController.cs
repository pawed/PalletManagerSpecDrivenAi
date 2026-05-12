using Microsoft.AspNetCore.Mvc;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Application.Services;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/tasks/{taskId:guid}/comments")]
public class TaskCommentsController : ControllerBase
{
    private readonly ITaskCommentService _commentService;

    public TaskCommentsController(ITaskCommentService commentService)
    {
        _commentService = commentService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<TaskCommentDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetComments(Guid taskId, CancellationToken cancellationToken)
    {
        if (!await _commentService.TaskExistsAsync(taskId, cancellationToken))
            return NotFound();

        return Ok(await _commentService.GetByTaskAsync(taskId, cancellationToken));
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(TaskCommentDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetComment(Guid taskId, Guid id, CancellationToken cancellationToken)
    {
        var comment = await _commentService.GetByIdAsync(taskId, id, cancellationToken);
        return comment is null ? NotFound() : Ok(comment);
    }

    [HttpPost]
    [ProducesResponseType(typeof(TaskCommentDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateComment(Guid taskId, TaskCommentCreateDto request, CancellationToken cancellationToken)
    {
        if (!await _commentService.TaskExistsAsync(taskId, cancellationToken))
            return NotFound();

        var dto = await _commentService.CreateAsync(taskId, request, cancellationToken);
        if (dto is null)
            return BadRequest("Author not found.");

        return CreatedAtAction(nameof(GetComment), new { taskId, id = dto.Id }, dto);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateComment(Guid taskId, Guid id, TaskCommentUpdateDto request, CancellationToken cancellationToken)
    {
        var found = await _commentService.UpdateAsync(taskId, id, request, cancellationToken);
        return found ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteComment(Guid taskId, Guid id, CancellationToken cancellationToken)
    {
        var found = await _commentService.DeleteAsync(taskId, id, cancellationToken);
        return found ? NoContent() : NotFound();
    }
}
