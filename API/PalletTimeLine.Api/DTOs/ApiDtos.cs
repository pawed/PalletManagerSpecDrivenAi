namespace PalletTimeLine.Api.DTOs;

public record TaskDto(
    int Id,
    string Task,
    string TaskEn,
    string[] Who,
    string? Date,
    string Status,
    string Category,
    string? Note);

public record CostDto(
    string Id,
    string Name,
    string NameEn,
    decimal Amount,
    string Category);

public record RevenueDto(
    string Id,
    string Name,
    string NameEn,
    decimal Amount,
    string Category);

public record WarehouseItemDto(
    string Id,
    string Name,
    string NameEn,
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

public record LookupDto(string Id, string Label);
