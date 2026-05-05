using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Data;
using PalletTimeLine.Api.DTOs;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CostsController : ControllerBase
{
    private readonly PalletTimelineDbContext _db;

    public CostsController(PalletTimelineDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CostDto>>> GetCosts()
    {
        var costs = await _db.Costs.AsNoTracking()
            .Select(c => new CostDto(c.Id.ToString(), c.Name, c.NameEn, c.Amount, c.Category))
            .ToListAsync();

        return Ok(costs);
    }
}
