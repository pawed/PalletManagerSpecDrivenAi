using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

public class UserService : IUserService
{
    private readonly PalletTimelineDbContext _db;
    private readonly IAuditService _audit;

    public UserService(PalletTimelineDbContext db, IAuditService audit)
    {
        _db = db;
        _audit = audit;
    }

    private static UserDto MapToDto(User u) =>
        new(u.Id, u.FirstName, u.LastName, u.UserName, u.DisplayName, u.IsActive);

    public async Task<IReadOnlyList<UserDto>> GetAllAsync(CancellationToken ct = default)
    {
        return await _db.Users.AsNoTracking()
            .Where(u => !u.IsSystemOnly && u.IsActive)
            .Select(u => new UserDto(u.Id, u.FirstName, u.LastName, u.UserName, u.DisplayName, u.IsActive))
            .ToListAsync(ct);
    }

    public async Task<UserDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        return await _db.Users.AsNoTracking()
            .Where(u => u.Id == id && !u.IsSystemOnly && u.IsActive)
            .Select(u => new UserDto(u.Id, u.FirstName, u.LastName, u.UserName, u.DisplayName, u.IsActive))
            .FirstOrDefaultAsync(ct);
    }

    public async Task<UserDto> CreateAsync(UserCreateDto dto, CancellationToken ct = default)
    {
        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            UserName = dto.UserName,
            DisplayName = dto.DisplayName,
            IsActive = dto.IsActive
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync(ct);
        await _audit.LogCreateAsync("User", user.Id, new { user.UserName, user.DisplayName }, SeedData.SystemUserId, ct);

        return MapToDto(user);
    }

    public async Task<bool> UpdateAsync(Guid id, UserUpdateDto dto, CancellationToken ct = default)
    {
        var user = await _db.Users.FindAsync([id], ct);
        if (user is null) return false;

        var oldName = user.DisplayName;

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.UserName = dto.UserName;
        user.DisplayName = dto.DisplayName;
        user.IsActive = dto.IsActive;

        await _db.SaveChangesAsync(ct);
        await _audit.LogUpdateAsync("User", id, new { OldDisplayName = oldName }, new { dto.DisplayName }, SeedData.SystemUserId, ct);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var user = await _db.Users.FindAsync([id], ct);
        if (user is null) return false;

        _db.Users.Remove(user);
        await _db.SaveChangesAsync(ct);
        await _audit.LogDeleteAsync("User", id, new { user.UserName }, SeedData.SystemUserId, ct);
        return true;
    }
}
