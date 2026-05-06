namespace PalletTimeLine.Api.DTOs;

public record TaskDto(
    Guid Id,
    string Task,  
    string[] Who,
    string? Date,
    string Status,
    string Category,
    string? Note);

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

public record CostDto(
    Guid Id,
    string Name,
    decimal Amount,
    string Category);

public record RevenueDto(
    Guid Id,
    string Name,
    decimal Amount,
    string Category);

public record WarehouseItemDto(
    Guid Id,
    string Name,
    decimal Qty,
    string Unit,
    string Location,
    string Category,
    string? Note);

public record OverviewDto(
    int TasksDone,
    int TasksTotal,
    int InProgress,
    decimal TotalCosts,
    decimal TotalRevenue,
    decimal Balance,
    int RevenueEntries,
    int CostEntries,
    int WarehouseItems);

public record TaskStatusUpdateDto(string Status);

public record LookupDto(Guid Id, string Label);

// AuditLog DTOs
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
