using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

public class WarehouseService : IWarehouseService
{
    private readonly PalletTimelineDbContext _db;

    public WarehouseService(PalletTimelineDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<WarehouseItemDto>> GetAllAsync(CancellationToken ct = default)
    {
        return await _db.WarehouseItems.AsNoTracking()
            .Select(i => new WarehouseItemDto(i.Id, i.Name, i.Qty, i.Unit, i.Location, i.Category, i.Note))
            .ToListAsync(ct);
    }
}
