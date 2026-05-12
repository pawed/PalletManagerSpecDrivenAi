using PalletTimeLine.Api.Application.DTOs;

namespace PalletTimeLine.Api.Application.Services;

public interface IRevenueService
{
    Task<IReadOnlyList<RevenueDto>> GetAllAsync(CancellationToken ct = default);
}
