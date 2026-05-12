using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

public class UserService : IUserService
{
    private readonly PalletTimelineDbContext _db;

    public UserService(PalletTimelineDbContext db)
    {
        _db = db;
    }

    private static UserDto MapToDto(User u) =>
        new(u.Id, u.FirstName, u.LastName, u.UserName, u.DisplayName, u.IsActive);

    public async Task<IReadOnlyList<UserDto>> GetAllAsync(CancellationToken ct = default)
    {
        return await _db.Users.AsNoTracking()
            .Select(u => new UserDto(u.Id, u.FirstName, u.LastName, u.UserName, u.DisplayName, u.IsActive))
            .ToListAsync(ct);
    }

    public async Task<UserDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        return await _db.Users.AsNoTracking()
            .Where(u => u.Id == id)
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

        return MapToDto(user);
    }

    public async Task<bool> UpdateAsync(Guid id, UserUpdateDto dto, CancellationToken ct = default)
    {
        var user = await _db.Users.FindAsync([id], ct);
        if (user is null) return false;

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.UserName = dto.UserName;
        user.DisplayName = dto.DisplayName;
        user.IsActive = dto.IsActive;

        await _db.SaveChangesAsync(ct);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken ct = default)
    {
        var user = await _db.Users.FindAsync([id], ct);
        if (user is null) return false;

        _db.Users.Remove(user);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
