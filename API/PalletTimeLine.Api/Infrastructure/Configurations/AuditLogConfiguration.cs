using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Infrastructure.Configurations;

public class AuditLogConfiguration : IEntityTypeConfiguration<AuditLog>
{
    public void Configure(EntityTypeBuilder<AuditLog> builder)
    {
        builder.ToTable("AuditLogs");
        builder.HasKey(a => a.Id);
        builder.Property(a => a.EntityType).IsRequired().HasMaxLength(255);
        builder.Property(a => a.OldValues).HasMaxLength(int.MaxValue);

        builder.HasOne(a => a.User)
            .WithMany()
            .HasForeignKey(a => a.ChangedBy)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(a => new { a.EntityType, a.EntityId })
            .HasDatabaseName("idx_auditlog_entitytype_entityid");

        builder.HasIndex(a => a.Timestamp)
            .IsDescending()
            .HasDatabaseName("idx_auditlog_timestamp");

        builder.HasIndex(a => a.ChangedBy)
            .HasDatabaseName("idx_auditlog_changedby");
    }
}
