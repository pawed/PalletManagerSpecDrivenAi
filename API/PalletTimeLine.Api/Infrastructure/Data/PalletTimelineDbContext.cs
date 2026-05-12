using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Infrastructure.Data;

public class PalletTimelineDbContext : DbContext
{
    public PalletTimelineDbContext(DbContextOptions<PalletTimelineDbContext> options)
        : base(options)
    {
    }

    public DbSet<EditionItem> Editions => Set<EditionItem>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<User> Users => Set<User>();
    public DbSet<CostItem> Costs => Set<CostItem>();
    public DbSet<RevenueItem> Revenues => Set<RevenueItem>();
    public DbSet<WarehouseItem> WarehouseItems => Set<WarehouseItem>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<TaskComment> TaskComments => Set<TaskComment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        => modelBuilder.ApplyConfigurationsFromAssembly(typeof(PalletTimelineDbContext).Assembly);

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<EditionStatus>().HaveConversion<string>();
        configurationBuilder.Properties<TaskItemStatus>().HaveConversion<string>();
        configurationBuilder.Properties<TaskItemPriority>().HaveConversion<string>();
        configurationBuilder.Properties<WarehouseCategory>().HaveConversion<string>();
        configurationBuilder.Properties<CostCategory>().HaveConversion<string>();
        configurationBuilder.Properties<RevenueCategory>().HaveConversion<string>();
        configurationBuilder.Properties<AuditAction>().HaveConversion<string>();
        configurationBuilder.Properties<decimal>().HavePrecision(18, 2);
    }
}
