using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Data;
using PalletTimeLine.Api.DTOs;
using PalletTimeLine.Api.Models;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly PalletTimelineDbContext _db;

    public UsersController(PalletTimelineDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _db.Users.AsNoTracking()
            .Select(u => new UserDto(u.Id, u.FirstName, u.LastName, u.UserName, u.DisplayName, u.IsActive))
            .ToListAsync();

        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(Guid id)
    {
        var user = await _db.Users.AsNoTracking()
            .Where(u => u.Id == id)
            .Select(u => new UserDto(u.Id, u.FirstName, u.LastName, u.UserName, u.DisplayName, u.IsActive))
            .FirstOrDefaultAsync();

        return user is not null ? Ok(user) : NotFound();
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser(UserCreateDto request)
    {
        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            UserName = request.UserName,
            DisplayName = request.DisplayName,
            IsActive = request.IsActive,
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new UserDto(user.Id, user.FirstName, user.LastName, user.UserName, user.DisplayName, user.IsActive));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, UserUpdateDto request)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null)
        {
            return NotFound();
        }

        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.UserName = request.UserName;
        user.DisplayName = request.DisplayName;
        user.IsActive = request.IsActive;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null)
        {
            return NotFound();
        }

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
