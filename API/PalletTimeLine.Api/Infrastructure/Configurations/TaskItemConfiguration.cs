using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PalletTimeLine.Api.Domain.Entities;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Infrastructure.Configurations;

public class TaskItemConfiguration : IEntityTypeConfiguration<TaskItem>
{
    public void Configure(EntityTypeBuilder<TaskItem> builder)
    {
        builder.ToTable("Tasks");
        builder.HasKey(t => t.Id);
        builder.Property(t => t.Title).IsRequired().HasMaxLength(500);
        builder.Property(t => t.Description).HasMaxLength(4000);
        builder.Property(t => t.Category).IsRequired().HasMaxLength(100);

        builder.HasOne(t => t.Edition)
            .WithMany(e => e.Tasks)
            .HasForeignKey(t => t.EditionId)
            .OnDelete(DeleteBehavior.Cascade);

        // Many-to-many with User
        builder.HasMany(t => t.Responsible)
            .WithMany(u => u.Tasks)
            .UsingEntity<Dictionary<string, object>>(
                "TaskItemUser",
                j => j.HasOne<User>().WithMany().HasForeignKey("UserId"),
                j => j.HasOne<TaskItem>().WithMany().HasForeignKey("TaskItemId"),
                j =>
                {
                    j.HasKey("TaskItemId", "UserId");
                    j.HasData(SeedData.TaskUserAssignments.Select(a => new { a.TaskItemId, a.UserId }));
                });

        builder.HasData(SeedData.Tasks);
    }
}
