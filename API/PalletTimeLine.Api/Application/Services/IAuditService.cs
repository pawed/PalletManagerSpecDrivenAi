using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Application.Services;

/// <summary>
/// Serwis audytowania zmian na encjach.
/// Loguje Create, Update, Delete akcje do tabeli AuditLog.
/// UWAGA: metody tylko dodają rekord do DbContext. SaveChangesAsync wywołuje caller.
/// </summary>
public interface IAuditService
{
    /// <summary>Loguje nowo stworzoną encję</summary>
    Task LogCreateAsync(string entityType, Guid entityId, object entity, Guid changedBy, CancellationToken cancellationToken = default);

    /// <summary>Loguje aktualizację encji (zapisuje stare wartości)</summary>
    Task LogUpdateAsync(string entityType, Guid entityId, object oldValues, object newValues, Guid changedBy, CancellationToken cancellationToken = default);

    /// <summary>Loguje usunięcie encji (zapisuje jej ostatnie wartości)</summary>
    Task LogDeleteAsync(string entityType, Guid entityId, object entity, Guid changedBy, CancellationToken cancellationToken = default);

    /// <summary>Loguje dowolną akcję audytu</summary>
    Task LogAsync(AuditLog auditLog, CancellationToken cancellationToken = default);
}
