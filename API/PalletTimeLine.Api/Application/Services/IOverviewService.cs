using PalletTimeLine.Api.Application.DTOs;

namespace PalletTimeLine.Api.Application.Services;

public interface IOverviewService
{
    Task<OverviewDto> GetOverviewAsync(CancellationToken ct = default);
}
