using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Infrastructure.Configurations;

public class TaskCommentConfiguration : IEntityTypeConfiguration<TaskComment>
{
    public void Configure(EntityTypeBuilder<TaskComment> builder)
    {
        builder.ToTable("TaskComments");
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Content).IsRequired().HasMaxLength(2000);

        builder.HasOne(c => c.TaskItem)
            .WithMany(t => t.Comments)
            .HasForeignKey(c => c.TaskItemId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(c => c.Author)
            .WithMany()
            .HasForeignKey(c => c.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(c => c.TaskItemId)
            .HasDatabaseName("idx_taskcomment_taskitemid");

        builder.HasIndex(c => c.AuthorId)
            .HasDatabaseName("idx_taskcomment_authorid");

        builder.HasIndex(c => c.CreatedAt)
            .IsDescending()
            .HasDatabaseName("idx_taskcomment_createdat");
    }
}
