namespace PalletTimeLine.Api.Domain.Entities;

public class EditionItem
{
    public Guid Id { get; set; }
    public int Year { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public EditionStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public ICollection<TaskItem> Tasks { get; set; } = [];
    public ICollection<RevenueItem> Incomes { get; set; } = [];
    public ICollection<CostItem> Outcomes { get; set; } = [];
}

public enum EditionStatus
{
    Draft = 0,
    Active = 1,
    Archived = 2
}
