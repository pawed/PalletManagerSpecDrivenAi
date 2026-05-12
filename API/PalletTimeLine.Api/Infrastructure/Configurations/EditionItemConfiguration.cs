using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Infrastructure.Configurations;

public class EditionItemConfiguration : IEntityTypeConfiguration<EditionItem>
{
    public void Configure(EntityTypeBuilder<EditionItem> builder)
    {
        builder.ToTable("Editions");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Description).HasMaxLength(1000);

        builder.HasData(SeedData.Editions);
    }
}
