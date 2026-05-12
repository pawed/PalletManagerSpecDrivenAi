---
name: EF Core table names must match existing migrations
description: When creating IEntityTypeConfiguration<T> for entities that already have migrations, always use the original migration table name, not the EF default pluralization of the class name.
type: feedback
---

When writing `IEntityTypeConfiguration<T>` for entities that already have migrations applied to a live database, **always look up the actual table name in the migration files** — do NOT use EF Core's default pluralization of the entity class name.

**Why:** EF Core's default naming pluralizes the entity class name (`TaskItem` → `TaskItems`, `CostItem` → `CostItems`). But if the DbContext previously had a `DbSet<TaskItem> Tasks` property, the original migration created the table as `"Tasks"` — not `"TaskItems"`. Using the wrong name causes `42P01: relation "TaskItems" does not exist` at runtime.

**How to apply:** Before writing `builder.ToTable(...)`, grep the `Migrations/` folder for `CreateTable` and confirm the exact name. Then set it explicitly:

```csharp
// CORRECT — matches migration
builder.ToTable("Tasks");   // NOT "TaskItems"
builder.ToTable("Costs");   // NOT "CostItems"
builder.ToTable("Revenues"); // NOT "RevenueItems"
builder.ToTable("Editions"); // NOT "EditionItems"
```

**This project's table-to-entity mapping (from migrations):**

| Entity class | `ToTable()` value | Why it differs |
|---|---|---|
| `TaskItem` | `"Tasks"` | DbSet was named `Tasks` |
| `CostItem` | `"Costs"` | DbSet was named `Costs` |
| `RevenueItem` | `"Revenues"` | DbSet was named `Revenues` |
| `EditionItem` | `"Editions"` | DbSet was named `Editions` |
| `User` | `"Users"` | matches default |
| `WarehouseItem` | `"WarehouseItems"` | matches default |
| `AuditLog` | `"AuditLogs"` | matches default |
| `TaskComment` | `"TaskComments"` | matches default |

**Also — `UseSnakeCaseNamingConvention()` is BANNED in this project:**
The convention affects both table names AND column names. Since all migrations were created without it, every column is PascalCase (`Id`, `Name`, `Qty`). Enabling the convention renames columns to snake_case (`id`, `name`, `qty`) causing `42703: column does not exist` on every query. Do NOT add `UseSnakeCaseNamingConvention()` to `InfrastructureExtensions.cs` — it has been removed and must stay removed.
