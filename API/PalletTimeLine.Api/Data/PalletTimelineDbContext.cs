using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PalletTimeLine.Api.Models;

namespace PalletTimeLine.Api.Data;

public class PalletTimelineDbContext : DbContext
{
    public PalletTimelineDbContext(DbContextOptions<PalletTimelineDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<CostItem> Costs => Set<CostItem>();
    public DbSet<RevenueItem> Revenues => Set<RevenueItem>();
    public DbSet<WarehouseItem> WarehouseItems => Set<WarehouseItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var stringArrayConverter = new ValueConverter<string[], string>(
            v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
            v => string.IsNullOrWhiteSpace(v)
                ? Array.Empty<string>()
                : JsonSerializer.Deserialize<string[]>(v, (JsonSerializerOptions?)null) ?? Array.Empty<string>());

        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.Property(e => e.Who)
                .HasConversion(stringArrayConverter)
                .HasColumnType("jsonb");

            entity.HasData(SeedData.Tasks);
        });

        modelBuilder.Entity<CostItem>().HasData(SeedData.Costs);
        modelBuilder.Entity<RevenueItem>().HasData(SeedData.Revenues);
        modelBuilder.Entity<WarehouseItem>().HasData(SeedData.WarehouseItems);
    }
}

internal static class SeedData
{
    internal static readonly TaskItem[] Tasks =
    {
        new TaskItem { Id = new Guid(), Task = "Do połowy czerwca ogarnięcie gruzu", TaskEn = "Clear rubble by mid-June", Who = new[] { "Konrad" }, Date = "2025-06-15", Status = "done", Category = "site" },
        new TaskItem { Id = new Guid(), Task = "Ogrodzenie i znaki zakazu wokół gruzu", TaskEn = "Fence + warning signs around rubble", Who = new[] { "Konrad" }, Date = "2025-07-25", Status = "in-progress", Category = "site" },
        new TaskItem { Id = new Guid(), Task = "Loteria fantowa — sprawdzić legalność", TaskEn = "Raffle — check legality", Who = new[] { "Konrad" }, Date = null, Status = "in-progress", Note = "podpytać czy to jest legalne", Category = "admin" },
        new TaskItem { Id = new Guid(), Task = "Zapytać Matczyn o wynajem nalewaka", TaskEn = "Ask Matczyn about tap rental", Who = new[] { "Konrad" }, Date = null, Status = "todo", Category = "supplies" },
        new TaskItem { Id = new Guid(), Task = "Dogadać 300 europalet", TaskEn = "Arrange 300 europallets", Who = new[] { "Konrad" }, Date = "2025-08-01", Status = "done", Note = "odbiór 01.08, oddajemy 11–13.08", Category = "build" },
        new TaskItem { Id = new Guid(), Task = "Wyrównanie terenu — Anasiewicz", TaskEn = "Ground leveling — Anasiewicz", Who = new[] { "Konrad" }, Date = null, Status = "done", Note = "Mateusz Prakowski wyrówna teren", Category = "site" },
        new TaskItem { Id = new Guid(), Task = "Paliwo z Admarem", TaskEn = "Fuel with Admar", Who = new[] { "Konrad" }, Date = null, Status = "done", Category = "supplies" },
        new TaskItem { Id = new Guid(), Task = "Słupki od Gonza", TaskEn = "Posts from Gonzo", Who = new[] { "Stalowy" }, Date = null, Status = "done", Category = "build" },
        new TaskItem { Id = new Guid(), Task = "Ogrodzenie metalowe do backstage", TaskEn = "Metal fence for backstage", Who = new[] { "Konrad" }, Date = null, Status = "done", Category = "build" },
        new TaskItem { Id = new Guid(), Task = "Słupki oświetleniowe", TaskEn = "Lighting posts", Who = new[] { "Stalowy" }, Date = "2025-08-01", Status = "done", Note = "ustawianie 3 sierpnia", Category = "build" },
        new TaskItem { Id = new Guid(), Task = "Sprawdzić kasę z poprzedniej edycji", TaskEn = "Check leftover cash from last edition", Who = new[] { "Kinia", "Asia" }, Date = null, Status = "done", Note = "ok. 700 zł", Category = "finance" },
        new TaskItem { Id = new Guid(), Task = "Promocja zbiórki", TaskEn = "Promote fundraiser", Who = new[] { "Kinia", "Asia" }, Date = "2025-07-14", Status = "done", Category = "promo" },
        new TaskItem { Id = new Guid(), Task = "Posty na stronie", TaskEn = "Website posts", Who = new[] { "Kinia", "Asia" }, Date = "2025-07-12", Status = "in-progress", Category = "promo" },
        new TaskItem { Id = new Guid(), Task = "Wycena koszulek", TaskEn = "T-shirt quotes", Who = new[] { "Radosław" }, Date = null, Status = "done", Category = "merch" },
        new TaskItem { Id = new Guid(), Task = "Wlepki", TaskEn = "Stickers", Who = new[] { "Radosław" }, Date = null, Status = "done", Category = "merch" },
        new TaskItem { Id = new Guid(), Task = "Naprawa namiotu", TaskEn = "Tent repair", Who = new[] { "Stalowy" }, Date = "2025-06-30", Status = "done", Category = "build" },
        new TaskItem { Id = new Guid(), Task = "Zwożenie palet", TaskEn = "Bring pallets to site", Who = new[] { "Stalowy" }, Date = "2025-07-26", Status = "todo", Note = "do 2 sierpnia", Category = "build" },
        new TaskItem { Id = new Guid(), Task = "Początek budowy", TaskEn = "Build start", Who = new[] { "Stalowy" }, Date = "2025-08-04", Status = "todo", Category = "build" },
        new TaskItem { Id = new Guid(), Task = "Scena ma stać", TaskEn = "Stage standing", Who = new[] { "Stalowy" }, Date = "2025-08-07", Status = "todo", Category = "build" },
        new TaskItem { Id = new Guid(), Task = "Prysznic, woda", TaskEn = "Shower, water", Who = new[] { "Konrad" }, Date = "2025-08-05", Status = "todo", Category = "build" },
    };

    internal static readonly CostItem[] Costs =
    {
        new CostItem { Id = new Guid(), Name = "Zakupy spożywcze i przemysłowe cz.1", NameEn = "Food & supplies pt.1", Amount = 670, Category = "supplies" },
        new CostItem { Id = new Guid(), Name = "Torby", NameEn = "Bags", Amount = 600, Category = "merch" },
        new CostItem { Id = new Guid(), Name = "Wlepki", NameEn = "Stickers", Amount = 160, Category = "merch" },
        new CostItem { Id = new Guid(), Name = "Koszulki", NameEn = "T-shirts", Amount = 3300, Category = "merch" },
        new CostItem { Id = new Guid(), Name = "Zakupy spożywcze cz.2", NameEn = "Food & supplies pt.2", Amount = 177, Category = "supplies" },
        new CostItem { Id = new Guid(), Name = "Plandeka", NameEn = "Tarp", Amount = 425, Category = "build" },
    };

    internal static readonly RevenueItem[] Revenues =
    {
        new RevenueItem { Id = new Guid(), Name = "Świnka skarbonka", NameEn = "Piggy bank", Amount = 540, Category = "donations" },
        new RevenueItem { Id = new Guid(), Name = "Sponsorzy — Radek", NameEn = "Sponsors — Radek", Amount = 3300, Category = "sponsors" },
        new RevenueItem { Id = new Guid(), Name = "Sponsorzy — Konrad", NameEn = "Sponsors — Konrad", Amount = 1200, Category = "sponsors" },
        new RevenueItem { Id = new Guid(), Name = "Zrzutka", NameEn = "Crowdfunding", Amount = 2660, Category = "donations" },
    };

    internal static readonly WarehouseItem[] WarehouseItems =
    {
        new WarehouseItem { Id = new Guid(), Name = "Halogen LED z czujnikiem ruchu", NameEn = "LED floodlight w/ motion sensor", Qty = 6, Unit = "szt", Location = "Misio", Category = "lighting", Note = "2 nowe" },
        new WarehouseItem { Id = new Guid(), Name = "Znak 'Teren prywatny' laminowany", NameEn = "'Private property' laminated sign", Qty = 1, Unit = "szt", Location = "Misio", Category = "signs", Note = string.Empty },
        new WarehouseItem { Id = new Guid(), Name = "Megafon Rebel", NameEn = "Megaphone Rebel", Qty = 1, Unit = "szt", Location = "Misio", Category = "other", Note = "Naprawiony" },
        new WarehouseItem { Id = new Guid(), Name = "Lampki najazdowe solarne", NameEn = "Solar driveway lights", Qty = 12, Unit = "szt", Location = "Misio", Category = "lighting", Note = "Pod parking" },
        new WarehouseItem { Id = new Guid(), Name = "Taśma biało-czerwona", NameEn = "Red-white tape", Qty = 500, Unit = "m", Location = "Stalowy", Category = "supplies", Note = "Trzeba jeszcze ~750 m" },
    };
}
