using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

public class RevenueService : IRevenueService
{
    private readonly PalletTimelineDbContext _db;

    public RevenueService(PalletTimelineDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<RevenueDto>> GetAllAsync(CancellationToken ct = default)
    {
        return await _db.Revenues.AsNoTracking()
            .Select(r => new RevenueDto(r.Id, r.Name, r.Amount, r.Category))
            .ToListAsync(ct);
    }
}
