using System.Text.Json;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Application.Services;

/// <summary>
/// Implementacja serwisu audytu.
/// KLUCZOWE: żadna metoda NIE wywołuje SaveChangesAsync — odpowiada za to caller.
/// Dzięki temu audit log i operacja biznesowa są w jednej transakcji.
/// </summary>
public class AuditService : IAuditService
{
    private readonly PalletTimelineDbContext _dbContext;
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = false };

    public AuditService(PalletTimelineDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task LogCreateAsync(string entityType, Guid entityId, object entity, Guid changedBy, CancellationToken cancellationToken = default)
    {
        var auditLog = new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityType = entityType,
            EntityId = entityId,
            Action = AuditAction.Created,
            ChangedBy = changedBy,
            Timestamp = DateTime.UtcNow,
            OldValues = string.Empty
        };

        return LogAsync(auditLog, cancellationToken);
    }

    public Task LogUpdateAsync(string entityType, Guid entityId, object oldValues, object newValues, Guid changedBy, CancellationToken cancellationToken = default)
    {
        var auditLog = new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityType = entityType,
            EntityId = entityId,
            Action = AuditAction.Updated,
            ChangedBy = changedBy,
            Timestamp = DateTime.UtcNow,
            OldValues = SerializeObject(oldValues) ?? string.Empty
        };

        return LogAsync(auditLog, cancellationToken);
    }

    public Task LogDeleteAsync(string entityType, Guid entityId, object entity, Guid changedBy, CancellationToken cancellationToken = default)
    {
        var auditLog = new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityType = entityType,
            EntityId = entityId,
            Action = AuditAction.Deleted,
            ChangedBy = changedBy,
            Timestamp = DateTime.UtcNow,
            OldValues = SerializeObject(entity) ?? string.Empty
        };

        return LogAsync(auditLog, cancellationToken);
    }

    public Task LogAsync(AuditLog auditLog, CancellationToken cancellationToken = default)
    {
        _dbContext.AuditLogs.Add(auditLog);
        return Task.CompletedTask;
    }

    private static string? SerializeObject(object? obj)
    {
        if (obj is null) return null;
        try { return JsonSerializer.Serialize(obj, JsonOptions); }
        catch { return null; }
    }
}
