using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Data;
using PalletTimeLine.Api.DTOs;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RevenueController : ControllerBase
{
    private readonly PalletTimelineDbContext _db;

    public RevenueController(PalletTimelineDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RevenueDto>>> GetRevenue()
    {
        var revenue = await _db.Revenues.AsNoTracking()
            .Select(r => new RevenueDto(r.Id, r.Name, r.NameEn, r.Amount, r.Category))
            .ToListAsync();

        return Ok(revenue);
    }
}
