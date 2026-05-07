namespace PalletTimeLine.Api.Models;

public class WarehouseItem
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Qty { get; set; }
    public string Unit { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? Note { get; set; }
}

public enum WarehouseCategory
{
    Equipment = 0,
    Material = 1,
    Other = 2
}
