namespace PalletTimeLine.Api.Domain.Entities;

public class RevenueItem
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Category { get; set; } = string.Empty;

    public Guid EditionId { get; set; }
    public EditionItem Edition { get; set; } = null!;
}

public enum RevenueCategory
{
    Sponsorship = 0,
    TicketSales = 1,
    Merchandise = 2,
    Other = 3
}
