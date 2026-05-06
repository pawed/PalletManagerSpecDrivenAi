namespace PalletTimeLine.Api.Models;

public class CostItem
{
    public Guid Id { get; set; }
    public Guid EditionId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Category { get; set; } = string.Empty;

    public EditionItem Edition { get; set; }
}

public enum CostCategory
{
    Venue = 0,
    Equipment = 1,
    Personnel = 2,
    Marketing = 3,
    Other = 4
}   