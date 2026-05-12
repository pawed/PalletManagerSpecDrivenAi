namespace PalletTimeLine.Api.Application.DTOs;

public record AuditLogDto(
    Guid Id,
    string EntityType,
    Guid EntityId,
    string Action,
    Guid ChangedBy,
    string ChangedByName,
    DateTime Timestamp,
    string? OldValues);

public record AuditLogCreateDto(
    string EntityType,
    Guid EntityId,
    string Action,
    Guid ChangedBy,
    string? OldValues);

public record AuditLogQueryDto(
    string? EntityType = null,
    Guid? EntityId = null,
    int PageSize = 50,
    int Page = 1);
