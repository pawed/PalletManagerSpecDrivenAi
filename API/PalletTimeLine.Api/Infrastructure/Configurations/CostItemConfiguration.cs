using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Infrastructure.Configurations;

public class CostItemConfiguration : IEntityTypeConfiguration<CostItem>
{
    public void Configure(EntityTypeBuilder<CostItem> builder)
    {
        builder.ToTable("Costs");
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Name).IsRequired().HasMaxLength(500);
        builder.Property(c => c.Category).IsRequired().HasMaxLength(100);

        builder.HasOne(c => c.Edition)
            .WithMany(e => e.Outcomes)
            .HasForeignKey(c => c.EditionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasData(SeedData.Costs);
    }
}
