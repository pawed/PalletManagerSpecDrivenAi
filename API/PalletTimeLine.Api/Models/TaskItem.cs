namespace PalletTimeLine.Api.Models;

public class TaskItem
{
    public Guid Id { get; set; }
    public string Task { get; set; } = string.Empty;
    public string TaskEn { get; set; } = string.Empty;
    public ICollection<User> Who { get; set; } = new List<User>();
    public string? Date { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? Note { get; set; }

    public Guid EditionId { get; set; }
    public EditionItem Edition { get; set; }
}

public enum TaskItemStatus
{
    NotStarted = 0,
    InProgress = 1,
    Completed = 2,
    Blocked = 3
}
