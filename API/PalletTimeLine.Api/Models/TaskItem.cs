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

    public Editions? Edition { get; set; }
}
