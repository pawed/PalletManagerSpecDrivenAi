namespace PalletTimeLine.Api.Models;

public class RevenueItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid EditionId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Category { get; set; } = string.Empty;

    public Editions? Edition { get; set; }
}
