namespace PalletTimeLine.Api.Application.DTOs;

public record WarehouseItemDto(
    Guid Id,
    string Name,
    decimal Qty,
    string Unit,
    string Location,
    string Category,
    string? Note);
