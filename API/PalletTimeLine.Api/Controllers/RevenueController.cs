using Microsoft.AspNetCore.Mvc;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Application.Services;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RevenueController : ControllerBase
{
    private readonly IRevenueService _revenueService;

    public RevenueController(IRevenueService revenueService)
    {
        _revenueService = revenueService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<RevenueDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetRevenue(CancellationToken cancellationToken)
        => Ok(await _revenueService.GetAllAsync(cancellationToken));
}
