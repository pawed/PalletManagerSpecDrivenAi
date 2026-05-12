namespace PalletTimeLine.Api.Application.DTOs;

public record CostDto(
    Guid Id,
    string Name,
    decimal Amount,
    string Category);
