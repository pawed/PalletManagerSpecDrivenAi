namespace PalletTimeLine.Api.Application.DTOs;

public record TaskCommentDto(
    Guid Id,
    string Content,
    Guid AuthorId,
    string AuthorName,
    DateTime CreatedAt,
    DateTime? UpdatedAt);

public record TaskCommentCreateDto(
    string Content,
    Guid AuthorId);

public record TaskCommentUpdateDto(
    string Content);
