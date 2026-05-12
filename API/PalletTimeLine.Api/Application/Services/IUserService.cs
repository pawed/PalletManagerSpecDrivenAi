using PalletTimeLine.Api.Application.DTOs;

namespace PalletTimeLine.Api.Application.Services;

public interface IUserService
{
    Task<IReadOnlyList<UserDto>> GetAllAsync(CancellationToken ct = default);
    Task<UserDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<UserDto> CreateAsync(UserCreateDto dto, CancellationToken ct = default);
    Task<bool> UpdateAsync(Guid id, UserUpdateDto dto, CancellationToken ct = default);
    Task<bool> DeleteAsync(Guid id, CancellationToken ct = default);
}
