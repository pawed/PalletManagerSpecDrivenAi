namespace PalletTimeLine.Api.Application.DTOs;

public record TaskDto(
    Guid Id,
    string Title,
    string[] Who,
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
    string[] Who);

public record TaskUpdateDto(
    string Title,
    string? Description,
    string? CompleteDate,
    string Status,
    string Priority,
    string Category,
    string[] Who);

public record TaskStatusUpdateDto(string Status);
