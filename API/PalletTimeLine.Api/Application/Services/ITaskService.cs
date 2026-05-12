using PalletTimeLine.Api.Application.DTOs;

namespace PalletTimeLine.Api.Application.Services;

public interface ITaskService
{
    Task<IReadOnlyList<TaskDto>> GetAllAsync(CancellationToken ct = default);
    Task<TaskDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<TaskDto> CreateAsync(TaskCreateDto dto, CancellationToken ct = default);
    Task<TaskDto?> UpdateAsync(Guid id, TaskUpdateDto dto, CancellationToken ct = default);
    Task<bool> UpdateStatusAsync(Guid id, TaskStatusUpdateDto dto, CancellationToken ct = default);
}
