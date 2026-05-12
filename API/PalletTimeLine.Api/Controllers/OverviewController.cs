using Microsoft.AspNetCore.Mvc;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Application.Services;

namespace PalletTimeLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OverviewController : ControllerBase
{
    private readonly IOverviewService _overviewService;

    public OverviewController(IOverviewService overviewService)
    {
        _overviewService = overviewService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(OverviewDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetOverview(CancellationToken cancellationToken)
        => Ok(await _overviewService.GetOverviewAsync(cancellationToken));
}
