using System.Text.Json;
using PalletTimeLine.Api.Data;
using PalletTimeLine.Api.Models;

namespace PalletTimeLine.Api.Services;

/// <summary>
/// Serwis audytowania zmian na encjach.
/// Loguje Create, Update, Delete akcje do tabeli AuditLog.
/// </summary>
public interface IAuditService
{
    /// <summary>Loguje nowo stworzoną encję</summary>
    Task LogCreateAsync(string entityType, Guid entityId, object entity, Guid changedBy, CancellationToken cancellationToken = default);

    /// <summary>Loguje aktualizację encji (porównując stare wartości z nowymi)</summary>
    Task LogUpdateAsync(string entityType, Guid entityId, object oldValues, object newValues, Guid changedBy, CancellationToken cancellationToken = default);

    /// <summary>Loguje usunięcie encji (zapisuje jej ostatnie wartości)</summary>
    Task LogDeleteAsync(string entityType, Guid entityId, object entity, Guid changedBy, CancellationToken cancellationToken = default);

    /// <summary>Loguje dowolną akcję audytu</summary>
    Task LogAsync(AuditLog auditLog, CancellationToken cancellationToken = default);
}

public class AuditService : IAuditService
{
    private readonly PalletTimelineDbContext _dbContext;
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = false };

    public AuditService(PalletTimelineDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>Loguje nowo stworzoną encję</summary>
    public async Task LogCreateAsync(string entityType, Guid entityId, object entity, Guid changedBy, CancellationToken cancellationToken = default)
    {
        var auditLog = new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityType = entityType,
            EntityId = entityId,
            Action = AuditAction.Created,
            ChangedBy = changedBy,
            Timestamp = DateTime.UtcNow,
            OldValues = null // Create nie ma poprzednich wartości
        };

        await LogAsync(auditLog, cancellationToken);
    }

    /// <summary>Loguje aktualizację encji (tylko zmienione pola)</summary>
    public async Task LogUpdateAsync(string entityType, Guid entityId, object oldValues, object newValues, Guid changedBy, CancellationToken cancellationToken = default)
    {
        // Serializujemy tylko stare wartości (Option 3 - minimalistyczne)
        var oldValuesJson = SerializeObject(oldValues);

        var auditLog = new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityType = entityType,
            EntityId = entityId,
            Action = AuditAction.Updated,
            ChangedBy = changedBy,
            Timestamp = DateTime.UtcNow,
            OldValues = oldValuesJson
        };

        await LogAsync(auditLog, cancellationToken);
    }

    /// <summary>Loguje usunięcie encji</summary>
    public async Task LogDeleteAsync(string entityType, Guid entityId, object entity, Guid changedBy, CancellationToken cancellationToken = default)
    {
        var oldValuesJson = SerializeObject(entity);

        var auditLog = new AuditLog
        {
            Id = Guid.NewGuid(),
            EntityType = entityType,
            EntityId = entityId,
            Action = AuditAction.Deleted,
            ChangedBy = changedBy,
            Timestamp = DateTime.UtcNow,
            OldValues = oldValuesJson
        };

        await LogAsync(auditLog, cancellationToken);
    }

    /// <summary>Loguje dowolną akcję audytu</summary>
    public async Task LogAsync(AuditLog auditLog, CancellationToken cancellationToken = default)
    {
        _dbContext.AuditLogs.Add(auditLog);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    /// <summary>Serializuje obiekt do JSON stringa</summary>
    private static string? SerializeObject(object? obj)
    {
        if (obj == null)
            return null;

        try
        {
            return JsonSerializer.Serialize(obj, JsonOptions);
        }
        catch
        {
            return null; // Jeśli serializacja się nie powiedzie, zwracamy null
        }
    }
}
