using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Infrastructure.Configurations;

public class WarehouseItemConfiguration : IEntityTypeConfiguration<WarehouseItem>
{
    public void Configure(EntityTypeBuilder<WarehouseItem> builder)
    {
        builder.ToTable("WarehouseItems");
        builder.HasKey(w => w.Id);
        builder.Property(w => w.Name).IsRequired().HasMaxLength(500);
        builder.Property(w => w.Unit).IsRequired().HasMaxLength(50);
        builder.Property(w => w.Location).IsRequired().HasMaxLength(200);
        builder.Property(w => w.Category).IsRequired().HasMaxLength(100);
        builder.Property(w => w.Note).HasMaxLength(1000);

        builder.HasData(SeedData.WarehouseItems);
    }
}
