using System.Text.Json;
using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Application.Services;

/// <summary>
/// Implementacja serwisu audytu.
/// Wpisy trafiają do IAuditQueue i są zapisywane asynchronicznie przez AuditBackgroundService.
/// Nie blokuje odpowiedzi HTTP — żadna metoda nie wywołuje SaveChangesAsync.
/// </summary>
public class AuditService : IAuditService
{
    private readonly IAuditQueue _queue;
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = false };

    public AuditService(IAuditQueue queue)
    {
        _queue = queue;
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
        _queue.Enqueue(auditLog);
        return Task.CompletedTask;
    }

    private static string? SerializeObject(object? obj)
    {
        if (obj is null) return null;
        try { return JsonSerializer.Serialize(obj, JsonOptions); }
        catch { return null; }
    }
}
