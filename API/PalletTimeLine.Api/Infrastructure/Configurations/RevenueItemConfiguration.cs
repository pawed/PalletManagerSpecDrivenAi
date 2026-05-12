using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Infrastructure.Configurations;

public class RevenueItemConfiguration : IEntityTypeConfiguration<RevenueItem>
{
    public void Configure(EntityTypeBuilder<RevenueItem> builder)
    {
        builder.ToTable("Revenues");
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Name).IsRequired().HasMaxLength(500);
        builder.Property(r => r.Category).IsRequired().HasMaxLength(100);

        builder.HasOne(r => r.Edition)
            .WithMany(e => e.Incomes)
            .HasForeignKey(r => r.EditionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasData(SeedData.Revenues);
    }
}
