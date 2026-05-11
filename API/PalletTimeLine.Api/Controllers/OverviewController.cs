using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Data;
using PalletTimeLine.Api.DTOs;
using PalletTimeLine.Api.Models;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OverviewController : ControllerBase
{
    private readonly PalletTimelineDbContext _db;

    public OverviewController(PalletTimelineDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<OverviewDto>> GetOverview()
    {
        var tasks = await _db.Tasks.AsNoTracking().ToListAsync();
        var costs = await _db.Costs.AsNoTracking().ToListAsync();
        var revenue = await _db.Revenues.AsNoTracking().ToListAsync();
        var warehouse = await _db.WarehouseItems.AsNoTracking().CountAsync();

        var tasksDone = tasks.Count(t => t.Status == TaskItemStatus.Done);
        var tasksTotal = tasks.Count(t => t.Status != TaskItemStatus.Deleted);
        var inProgress = tasks.Count(t => t.Status == TaskItemStatus.InProgress);
        var totalCosts = costs.Sum(c => c.Amount);
        var totalRevenue = revenue.Sum(r => r.Amount);
        var balance = totalRevenue - totalCosts;

        var overview = new OverviewDto(
            TasksDone: tasksDone,
            TasksTotal: tasksTotal,
            InProgress: inProgress,
            TotalCosts: totalCosts,
            TotalRevenue: totalRevenue,
            Balance: balance,
            RevenueEntries: revenue.Count,
            CostEntries: costs.Count,
            WarehouseItems: warehouse);

        return Ok(overview);
    }
}
