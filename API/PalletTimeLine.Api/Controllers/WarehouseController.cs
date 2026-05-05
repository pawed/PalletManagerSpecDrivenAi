using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Data;
using PalletTimeLine.Api.DTOs;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WarehouseController : ControllerBase
{
    private readonly PalletTimelineDbContext _db;

    public WarehouseController(PalletTimelineDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WarehouseItemDto>>> GetWarehouseItems()
    {
        var items = await _db.WarehouseItems.AsNoTracking()
            .Select(i => new WarehouseItemDto(i.Id, i.Name, i.NameEn, i.Qty, i.Unit, i.Location, i.Category, i.Note))
            .ToListAsync();

        return Ok(items);
    }
}
