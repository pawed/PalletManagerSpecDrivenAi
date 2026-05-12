namespace PalletTimeLine.Api.Domain.Entities;

/// <summary>
/// Generyczna tabela audytu do śledzenia zmian na dowolnych encjach.
/// </summary>
public class AuditLog
{
    public Guid Id { get; set; }

    /// <summary>Nazwa encji (np. "TaskItem", "CostItem", "RevenueItem")</summary>
    public string EntityType { get; set; } = string.Empty;

    /// <summary>ID zmienianej encji</summary>
    public Guid EntityId { get; set; }

    /// <summary>Akcja: Created, Updated, Deleted</summary>
    public AuditAction Action { get; set; }

    /// <summary>Kto wykonał akcję</summary>
    public Guid ChangedBy { get; set; }
    public User User { get; set; } = null!;

    /// <summary>Kiedy akcja miała miejsce (UTC)</summary>
    public DateTime Timestamp { get; set; }

    /// <summary>JSON zawierający poprzednie wartości wszystkich pól.</summary>
    public string OldValues { get; set; } = string.Empty;
}

public enum AuditAction
{
    Created = 0,
    Updated = 1,
    Deleted = 2
}
