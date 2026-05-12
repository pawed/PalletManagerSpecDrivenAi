using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

public class OverviewService : IOverviewService
{
    private readonly PalletTimelineDbContext _db;

    public OverviewService(PalletTimelineDbContext db)
    {
        _db = db;
    }

    public async Task<OverviewDto> GetOverviewAsync(CancellationToken ct = default)
    {
        var statusCounts = await _db.Tasks
            .GroupBy(t => t.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync(ct);

        var breakdown = new StatusBreakdownDto(
            NotStarted: statusCounts.FirstOrDefault(x => x.Status == TaskItemStatus.NotStarted)?.Count ?? 0,
            InProgress: statusCounts.FirstOrDefault(x => x.Status == TaskItemStatus.InProgress)?.Count ?? 0,
            Done:       statusCounts.FirstOrDefault(x => x.Status == TaskItemStatus.Done)?.Count ?? 0,
            Blocked:    statusCounts.FirstOrDefault(x => x.Status == TaskItemStatus.Blocked)?.Count ?? 0,
            Deleted:    statusCounts.FirstOrDefault(x => x.Status == TaskItemStatus.Deleted)?.Count ?? 0);

        var today = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);
        var upcomingTasks = await _db.Tasks
            .Include(t => t.Responsible)
            .Where(t => t.Status != TaskItemStatus.Done
                     && t.Status != TaskItemStatus.Deleted
                     && t.CompleteDate.HasValue
                     && t.CompleteDate.Value >= today)
            .OrderBy(t => t.CompleteDate)
            .Take(6)
            .Select(t => new UpcomingTaskDto(
                t.Id,
                t.Title,
                t.Responsible.Select(u => u.DisplayName).ToArray(),
                t.CompleteDate!.Value.ToString("yyyy-MM-dd")))
            .ToListAsync(ct);

        var warehouseByLocation = await _db.WarehouseItems
            .Where(w => w.Location != null && w.Location != "")
            .GroupBy(w => w.Location)
            .OrderByDescending(g => g.Count())
            .Select(g => new WarehouseLocationDto(g.Key, g.Count()))            
            .ToListAsync(ct);

        var totalCosts     = await _db.Costs.SumAsync(c => c.Amount, ct);
        var totalRevenue   = await _db.Revenues.SumAsync(r => r.Amount, ct);
        var revenueEntries = await _db.Revenues.CountAsync(ct);
        var costEntries    = await _db.Costs.CountAsync(ct);
        var warehouseItems = await _db.WarehouseItems.CountAsync(ct);

        return new OverviewDto(
            TasksDone:           breakdown.Done,
            TasksTotal:          breakdown.Done + breakdown.InProgress + breakdown.NotStarted + breakdown.Blocked,
            InProgress:          breakdown.InProgress,
            TotalCosts:          totalCosts,
            TotalRevenue:        totalRevenue,
            Balance:             totalRevenue - totalCosts,
            RevenueEntries:      revenueEntries,
            CostEntries:         costEntries,
            WarehouseItems:      warehouseItems,
            StatusBreakdown:     breakdown,
            UpcomingTasks:       upcomingTasks,
            WarehouseByLocation: warehouseByLocation);
    }
}
