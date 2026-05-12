---
name: Project Architecture — Clean Architecture Layout
description: Single-project Clean Architecture folder layout for PalletTimeLine.Api, namespace conventions, and EF migration shim pattern
type: project
---

## Layer Layout (single .csproj, logical separation by folder)

```
Domain/Entities/           — PalletTimeLine.Api.Domain.Entities (entities + enums)
Application/DTOs/          — PalletTimeLine.Api.Application.DTOs (per-domain files)
Application/Services/      — PalletTimeLine.Api.Application.Services (interfaces + impls)
Application/Validators/    — PalletTimeLine.Api.Application.Validators (FluentValidation)
Infrastructure/Data/       — PalletTimeLine.Api.Infrastructure.Data (DbContext + SeedData)
Infrastructure/Configurations/ — PalletTimeLine.Api.Infrastructure.Configurations (IEntityTypeConfiguration<T>)
Controllers/               — PalletTimeLine.Api.Controllers (thin, delegate to services)
Presentation/Middleware/   — PalletTimeLine.Api.Presentation.Middleware (GlobalExceptionMiddleware)
Extensions/                — PalletTimeLine.Api.Extensions (AddApplicationServices, AddInfrastructure, AddObservability)
Data/                      — NamespaceCompat.cs shim only (see below)
```

## Migration Namespace Shim

EF Core migration Designer files use `using PalletTimeLine.Api.Data;` (old namespace). Since migrations MUST NOT be modified, a shim lives at `Data/NamespaceCompat.cs`:
- Uses `global using PalletTimelineDbContext = PalletTimeLine.Api.Infrastructure.Data.PalletTimelineDbContext;`
- Defines empty `PalletTimeLine.Api.Data` namespace so the `using` resolves

**Why:** Migrations are auto-generated and immutable. This pattern avoids touching them while moving DbContext to new namespace.
**How to apply:** Any future namespace reorganisation of DbContext must update this shim.

## Key Patterns

- `AuditService.LogAsync()` does NOT call `SaveChangesAsync()` — caller is responsible for the commit (single transaction per operation).
- `OverviewService` uses DB-level COUNT/SUM queries, not in-memory collection loading.
- `SeedData` is `internal static` in `Infrastructure/Data/SeedData.cs`.
- `ObservabilityExtensions.AddSerilogLogging()` does NOT use `Enrich.WithMachineName()` — the `Serilog.Enrichers.Environment` package is not installed.
- `AddRuntimeInstrumentation()` is NOT used — `OpenTelemetry.Instrumentation.Runtime` package not installed.
- `UseSnakeCaseNamingConvention()` is applied only for relational (PostgreSQL) provider, skipped for InMemory.

## Packages (as of v0.2)

- Net9.0 (TargetFramework)
- EFCore.NamingConventions, FluentValidation.AspNetCore, Scalar.AspNetCore
- Serilog.AspNetCore, Serilog.Enrichers.Span (NOT Serilog.Enrichers.Environment)
- OpenTelemetry.Extensions.Hosting, .Instrumentation.AspNetCore, .Instrumentation.EntityFrameworkCore, .Instrumentation.Http, .Exporter.OpenTelemetryProtocol
- OpenApi generated to `../../UI/api-spec/` via `<OpenApiGenerateDocumentsOnBuild>` and `<OpenApiDocumentsDirectory>` in .csproj — critical for frontend integration pipeline.
