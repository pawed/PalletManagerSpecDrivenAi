using PalletTimeLine.Api.Application.DTOs;

namespace PalletTimeLine.Api.Application.Services;

public interface ITaskCommentService
{
    Task<bool> TaskExistsAsync(Guid taskId, CancellationToken ct = default);
    Task<IReadOnlyList<TaskCommentDto>> GetByTaskAsync(Guid taskId, CancellationToken ct = default);
    Task<TaskCommentDto?> GetByIdAsync(Guid taskId, Guid id, CancellationToken ct = default);
    Task<TaskCommentDto?> CreateAsync(Guid taskId, TaskCommentCreateDto dto, CancellationToken ct = default);
    Task<bool> UpdateAsync(Guid taskId, Guid id, TaskCommentUpdateDto dto, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid taskId, Guid id, CancellationToken ct = default);
}
