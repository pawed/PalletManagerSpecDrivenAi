namespace PalletTimeLine.Api.Application.DTOs;

public record OverviewDto(
    int TasksDone,
    int TasksTotal,
    int InProgress,
    decimal TotalCosts,
    decimal TotalRevenue,
    decimal Balance,
    int RevenueEntries,
    int CostEntries,
    int WarehouseItems,
    StatusBreakdownDto StatusBreakdown,
    IReadOnlyList<UpcomingTaskDto> UpcomingTasks,
    IReadOnlyList<WarehouseLocationDto> WarehouseByLocation);

public record StatusBreakdownDto(
    int NotStarted,
    int InProgress,
    int Done,
    int Blocked,
    int Deleted);

public record UpcomingTaskDto(
    Guid Id,
    string Title,
    string[] Who,
    string CompleteDate);

public record WarehouseLocationDto(string Location, int Count);
