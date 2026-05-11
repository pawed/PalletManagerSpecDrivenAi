namespace PalletTimeLine.Api.Models;

public class TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ICollection<User> Responsible { get; set; } = new List<User>();
    public string? Date { get; set; }
    public TaskItemStatus Status { get; set; } = TaskItemStatus.NotStarted;
    public TaskItemPriority Priority { get; set; } = TaskItemPriority.Ordinary;
    public string Category { get; set; } = string.Empty; 
    public Guid EditionId { get; set; }
    public EditionItem Edition { get; set; } = null!;

    public ICollection<TaskComment> Comments { get; set; } = new List<TaskComment>();
}

public enum TaskItemStatus
{
    NotStarted = 0,
    InProgress = 1,
    Done = 2,
    Blocked = 3,
    Deleted = 4
}

public enum TaskItemPriority
{
    Critical = 0,
    High = 1,
    Ordinary = 2,
    Low = 3,
    NiceToHave = 4
}

