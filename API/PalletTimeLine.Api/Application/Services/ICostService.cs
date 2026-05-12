using PalletTimeLine.Api.Application.DTOs;

namespace PalletTimeLine.Api.Application.Services;

public interface ICostService
{
    Task<IReadOnlyList<CostDto>> GetAllAsync(CancellationToken ct = default);
}
