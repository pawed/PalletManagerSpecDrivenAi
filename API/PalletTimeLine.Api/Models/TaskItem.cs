namespace PalletTimeLine.Api.Models;

public class TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public ICollection<User> Responsible { get; set; } = new List<User>();
    public string? Date { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; 

    public Guid EditionId { get; set; }
    public EditionItem Edition { get; set; } = null!;

    public ICollection<TaskComment> Comments { get; set; } = new List<TaskComment>();
}

public enum TaskItemStatus
{
    NotStarted = 0,
    InProgress = 1,
    Completed = 2,
    Blocked = 3
}

