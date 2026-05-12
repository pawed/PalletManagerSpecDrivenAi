namespace PalletTimeLine.Api.Application.DTOs;

public record RevenueDto(
    Guid Id,
    string Name,
    decimal Amount,
    string Category);
