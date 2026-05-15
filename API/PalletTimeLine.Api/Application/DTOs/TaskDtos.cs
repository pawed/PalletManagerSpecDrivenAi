namespace PalletTimeLine.Api.Application.DTOs;

public record WhoDto(Guid Id, string DisplayName);

public record TaskDto(
    Guid Id,
    string Title,
    WhoDto[] Who,
    string? CompleteDate,
    string Status,
    string Priority,
    string Category,
    string? Description);

public record TaskCreateDto(
    string Title,
    string? Description,
    string? CompleteDate,
    string Status,
    string Priority,
    string Category,
    Guid[] Who);

public record TaskUpdateDto(
    string Title,
    string? Description,
    string? CompleteDate,
    string Status,
    string Priority,
    string Category,
    Guid[] Who);

public record TaskStatusUpdateDto(string Status);
