namespace PalletTimeLine.Api.Application.DTOs;

public record UserDto(
    Guid Id,
    string FirstName,
    string LastName,
    string UserName,
    string DisplayName,
    bool IsActive);

public record UserCreateDto(
    string FirstName,
    string LastName,
    string UserName,
    string DisplayName,
    bool IsActive);

public record UserUpdateDto(
    string FirstName,
    string LastName,
    string UserName,
    string DisplayName,
    bool IsActive);

