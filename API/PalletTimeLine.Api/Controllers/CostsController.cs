using Microsoft.AspNetCore.Mvc;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Application.Services;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CostsController : ControllerBase
{
    private readonly ICostService _costService;

    public CostsController(ICostService costService)
    {
        _costService = costService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<CostDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCosts(CancellationToken cancellationToken)
        => Ok(await _costService.GetAllAsync(cancellationToken));
}
