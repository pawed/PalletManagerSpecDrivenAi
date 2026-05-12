using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

public class CostService : ICostService
{
    private readonly PalletTimelineDbContext _db;

    public CostService(PalletTimelineDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<CostDto>> GetAllAsync(CancellationToken ct = default)
    {
        return await _db.Costs.AsNoTracking()
            .Select(c => new CostDto(c.Id, c.Name, c.Amount, c.Category))
            .ToListAsync(ct);
    }
}
