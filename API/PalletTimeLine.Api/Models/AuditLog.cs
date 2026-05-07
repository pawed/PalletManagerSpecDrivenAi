namespace PalletTimeLine.Api.Models;

/// <summary>
/// Generyczna tabela audytu do śledzenia zmian na dowolnych encjach.
/// 
/// PARTYCJONOWANIE (PostgreSQL — do wykonania w przyszłości gdy tabela rozrośnie się):
/// 
/// -- 1. Zmienić tabelę na partycjonowaną po Timestamp (monthly):
/// CREATE TABLE AuditLog_new (
///     Id uuid PRIMARY KEY,
///     EntityType varchar(255) NOT NULL,
///     EntityId uuid NOT NULL,
///     Action varchar(50) NOT NULL,
///     ChangedBy uuid NOT NULL,
///     Timestamp timestamp NOT NULL,
///     OldValues jsonb,
///     FOREIGN KEY (ChangedBy) REFERENCES "User"(Id)
/// ) PARTITION BY RANGE (Timestamp);
/// 
/// -- 2. Stworzyć partycje per miesiąc:
/// CREATE TABLE AuditLog_202501 PARTITION OF AuditLog_new
///     FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
/// CREATE TABLE AuditLog_202502 PARTITION OF AuditLog_new
///     FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
/// -- ... itp dla każdego miesiąca
/// 
/// -- 3. Migrować dane:
/// INSERT INTO AuditLog_new SELECT * FROM AuditLog;
/// 
/// -- 4. Zmienić FK, indeksy, constraints
/// -- 5. Renamed tabelę: ALTER TABLE AuditLog RENAME TO AuditLog_old;
/// --                     ALTER TABLE AuditLog_new RENAME TO AuditLog;
/// 
/// -- 6. Archiwizacja starszych niż rok:
/// -- SELECT * INTO audit_archive_2024 FROM AuditLog WHERE EXTRACT(YEAR FROM Timestamp) = 2024;
/// -- DELETE FROM AuditLog WHERE EXTRACT(YEAR FROM Timestamp) = 2024;
/// 
/// INDEKSOWANIE:
/// CREATE INDEX idx_auditlog_entitytype_entityid ON "AuditLog"(EntityType, EntityId);
/// CREATE INDEX idx_auditlog_timestamp ON "AuditLog"(Timestamp DESC);
/// CREATE INDEX idx_auditlog_changedby ON "AuditLog"(ChangedBy);
/// </summary>
public class AuditLog
{
    public Guid Id { get; set; }

    /// <summary>Nazwa encji (np. "TaskItem", "CostItem", "RevenueItem")</summary>
    public string EntityType { get; set; } = string.Empty;

    /// <summary>ID zmienianej encji (np. TaskItem.Id)</summary>
    public Guid EntityId { get; set; }

    /// <summary>Akcja: Created, Updated, Deleted</summary>
    public AuditAction Action { get; set; }

    /// <summary>Kto wykonał akcję</summary>
    public Guid ChangedBy { get; set; }
    public User User { get; set; }

    /// <summary>Kiedy akcja miała miejsce (UTC)</summary>
    public DateTime Timestamp { get; set; }

    /// <summary>
    /// JSON zawierający poprzednie wartości wszystkich pól.
    /// - Create: null (nie było poprzednich wartości)
    /// - Update: poprzednie wartości wszystkich pól
    /// - Delete: pełna zawartość usuniętego rekordu
    /// 
    /// Format: { "FieldName": value, "FieldName2": value }
    /// </summary>
    public string OldValues { get; set; } = string.Empty;
}

public enum AuditAction
{
    Created = 0,
    Updated = 1,
    Deleted = 2
}
