// Namespace compatibility shim — allows EF Core migration Designer files (auto-generated, immutable)
// to continue referencing PalletTimeLine.Api.Data.PalletTimelineDbContext
// while the actual implementation lives in PalletTimeLine.Api.Infrastructure.Data.

global using PalletTimelineDbContext = PalletTimeLine.Api.Infrastructure.Data.PalletTimelineDbContext;

namespace PalletTimeLine.Api.Data
{
    // ReSharper disable once UnusedType.Global
    // This file exists solely to satisfy the 'using PalletTimeLine.Api.Data;' statement
    // in Migrations/*.Designer.cs files. Do not remove.
    internal static class MigrationNamespaceMarker { }
}
