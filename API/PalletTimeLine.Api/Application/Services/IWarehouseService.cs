using PalletTimeLine.Api.Application.DTOs;

namespace PalletTimeLine.Api.Application.Services;

public interface IWarehouseService
{
    Task<IReadOnlyList<WarehouseItemDto>> GetAllAsync(CancellationToken ct = default);
}
