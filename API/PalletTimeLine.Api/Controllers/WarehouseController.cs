using Microsoft.AspNetCore.Mvc;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Application.Services;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WarehouseController : ControllerBase
{
    private readonly IWarehouseService _warehouseService;

    public WarehouseController(IWarehouseService warehouseService)
    {
        _warehouseService = warehouseService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<WarehouseItemDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetWarehouseItems(CancellationToken cancellationToken)
        => Ok(await _warehouseService.GetAllAsync(cancellationToken));
}
