using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Models;

namespace PalletTimeLine.Api.Data;

public class PalletTimelineDbContext : DbContext
{
    public PalletTimelineDbContext(DbContextOptions<PalletTimelineDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<User> Users => Set<User>();
    public DbSet<CostItem> Costs => Set<CostItem>();
    public DbSet<RevenueItem> Revenues => Set<RevenueItem>();
    public DbSet<WarehouseItem> WarehouseItems => Set<WarehouseItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure UUID generation for all entities
        modelBuilder.Entity<TaskItem>()
            .Property(t => t.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        modelBuilder.Entity<User>()
            .Property(u => u.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        modelBuilder.Entity<CostItem>()
            .Property(c => c.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        modelBuilder.Entity<RevenueItem>()
            .Property(r => r.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        modelBuilder.Entity<WarehouseItem>()
            .Property(w => w.Id)
            .HasDefaultValueSql("gen_random_uuid()");

        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.HasMany(t => t.Who)
                .WithMany(u => u.Tasks)
                .UsingEntity<Dictionary<string, object>>(
                    "TaskItemUser",
                    join => join.HasOne<User>().WithMany().HasForeignKey("UserId"),
                    join => join.HasOne<TaskItem>().WithMany().HasForeignKey("TaskItemId"),
                    join =>
                    {
                        join.HasKey("TaskItemId", "UserId");
                        join.HasData(SeedData.TaskUserAssignments.Select(a => new { a.TaskItemId, a.UserId }).ToArray());
                    });

            entity.HasData(SeedData.Tasks);
        });

        modelBuilder.Entity<User>().HasData(SeedData.Users);
        modelBuilder.Entity<CostItem>().HasData(SeedData.Costs);
        modelBuilder.Entity<RevenueItem>().HasData(SeedData.Revenues);
        modelBuilder.Entity<WarehouseItem>().HasData(SeedData.WarehouseItems);
    }
}

internal static class SeedData
{
    internal static readonly User[] Users =
    {
        new User { Id = new Guid("11111111-1111-1111-1111-111111111111"), FirstName = "Konrad", LastName = "Kowalski", UserName = "konrad", DisplayName = "Konrad", IsActive = true },
        new User { Id = new Guid("22222222-2222-2222-2222-222222222222"), FirstName = "Stalowy", LastName = "Bizon", UserName = "stalowy", DisplayName = "Stalowy", IsActive = true },
        new User { Id = new Guid("33333333-3333-3333-3333-333333333333"), FirstName = "Kinia", LastName = "Nowak", UserName = "kinia", DisplayName = "Kinia", IsActive = true },
        new User { Id = new Guid("44444444-4444-4444-4444-444444444444"), FirstName = "Asia", LastName = "Nowak", UserName = "asia", DisplayName = "Asia", IsActive = true },
        new User { Id = new Guid("55555555-5555-5555-5555-555555555555"), FirstName = "Radosław", LastName = "Nowak", UserName = "radoslaw", DisplayName = "Radosław", IsActive = true },
    };

    internal static readonly TaskItem[] Tasks =
    {
        new TaskItem { Id = new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), Task = "Do połowy czerwca ogarnięcie gruzu", TaskEn = "Clear rubble by mid-June", Date = "2025-06-15", Status = "done", Category = "site" },
        new TaskItem { Id = new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), Task = "Ogrodzenie i znaki zakazu wokół gruzu", TaskEn = "Fence + warning signs around rubble", Date = "2025-07-25", Status = "in-progress", Category = "site" },
        new TaskItem { Id = new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), Task = "Loteria fantowa — sprawdzić legalność", TaskEn = "Raffle — check legality", Date = null, Status = "in-progress", Note = "podpytać czy to jest legalne", Category = "admin" },
        new TaskItem { Id = new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), Task = "Zapytać Matczyn o wynajem nalewaka", TaskEn = "Ask Matczyn about tap rental", Date = null, Status = "todo", Category = "supplies" },
        new TaskItem { Id = new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), Task = "Dogadać 300 europalet", TaskEn = "Arrange 300 europallets", Date = "2025-08-01", Status = "done", Note = "odbiór 01.08, oddajemy 11–13.08", Category = "build" },
        new TaskItem { Id = new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"), Task = "Wyrównanie terenu — Anasiewicz", TaskEn = "Ground leveling — Anasiewicz", Date = null, Status = "done", Note = "Mateusz Prakowski wyrówna teren", Category = "site" },
        new TaskItem { Id = new Guid("11111111-1111-1111-1111-111111111112"), Task = "Paliwo z Admarem", TaskEn = "Fuel with Admar", Date = null, Status = "done", Category = "supplies" },
        new TaskItem { Id = new Guid("22222222-2222-2222-2222-222222222223"), Task = "Słupki od Gonza", TaskEn = "Posts from Gonzo", Date = null, Status = "done", Category = "build" },
        new TaskItem { Id = new Guid("33333333-3333-3333-3333-333333333334"), Task = "Ogrodzenie metalowe do backstage", TaskEn = "Metal fence for backstage", Date = null, Status = "done", Category = "build" },
        new TaskItem { Id = new Guid("44444444-4444-4444-4444-444444444445"), Task = "Słupki oświetleniowe", TaskEn = "Lighting posts", Date = "2025-08-01", Status = "done", Note = "ustawianie 3 sierpnia", Category = "build" },
        new TaskItem { Id = new Guid("55555555-5555-5555-5555-555555555556"), Task = "Sprawdzić kasę z poprzedniej edycji", TaskEn = "Check leftover cash from last edition", Date = null, Status = "done", Note = "ok. 700 zł", Category = "finance" },
        new TaskItem { Id = new Guid("66666666-6666-6666-6666-666666666667"), Task = "Promocja zbiórki", TaskEn = "Promote fundraiser", Date = "2025-07-14", Status = "done", Category = "promo" },
        new TaskItem { Id = new Guid("77777777-7777-7777-7777-777777777778"), Task = "Posty na stronie", TaskEn = "Website posts", Date = "2025-07-12", Status = "in-progress", Category = "promo" },
        new TaskItem { Id = new Guid("88888888-8888-8888-8888-888888888889"), Task = "Wycena koszulek", TaskEn = "T-shirt quotes", Date = null, Status = "done", Category = "merch" },
        new TaskItem { Id = new Guid("99999999-9999-9999-9999-999999999990"), Task = "Wlepki", TaskEn = "Stickers", Date = null, Status = "done", Category = "merch" },
        new TaskItem { Id = new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"), Task = "Naprawa namiotu", TaskEn = "Tent repair", Date = "2025-06-30", Status = "done", Category = "build" },
        new TaskItem { Id = new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), Task = "Zwożenie palet", TaskEn = "Bring pallets to site", Date = "2025-07-26", Status = "todo", Note = "do 2 sierpnia", Category = "build" },
        new TaskItem { Id = new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"), Task = "Początek budowy", TaskEn = "Build start", Date = "2025-08-04", Status = "todo", Category = "build" },
        new TaskItem { Id = new Guid("dddddddd-dddd-dddd-dddd-dddddddddd4"), Task = "Scena ma stać", TaskEn = "Stage standing", Date = "2025-08-07", Status = "todo", Category = "build" },
        new TaskItem { Id = new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"), Task = "Prysznic, woda", TaskEn = "Shower, water", Date = "2025-08-05", Status = "todo", Category = "build" },
    };

    internal record TaskUserAssignment(Guid TaskItemId, Guid UserId);

    internal static readonly TaskUserAssignment[] TaskUserAssignments =
    {
        new(Tasks[0].Id, Users[0].Id),
        new(Tasks[1].Id, Users[0].Id),
        new(Tasks[2].Id, Users[0].Id),
        new(Tasks[3].Id, Users[0].Id),
        new(Tasks[4].Id, Users[0].Id),
        new(Tasks[5].Id, Users[0].Id),
        new(Tasks[6].Id, Users[0].Id),
        new(Tasks[7].Id, Users[1].Id),
        new(Tasks[8].Id, Users[0].Id),
        new(Tasks[9].Id, Users[1].Id),
        new(Tasks[10].Id, Users[2].Id),
        new(Tasks[10].Id, Users[3].Id),
        new(Tasks[11].Id, Users[2].Id),
        new(Tasks[11].Id, Users[3].Id),
        new(Tasks[12].Id, Users[2].Id),
        new(Tasks[12].Id, Users[3].Id),
        new(Tasks[13].Id, Users[4].Id),
        new(Tasks[14].Id, Users[4].Id),
        new(Tasks[15].Id, Users[1].Id),
        new(Tasks[16].Id, Users[1].Id),
        new(Tasks[17].Id, Users[1].Id),
        new(Tasks[18].Id, Users[1].Id),
        new(Tasks[19].Id, Users[0].Id),
    };

    internal static readonly CostItem[] Costs =
    {
        new CostItem { Id = new Guid("aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa"), Name = "Zakupy spożywcze i przemysłowe cz.1", NameEn = "Food & supplies pt.1", Amount = 670, Category = "supplies" },
        new CostItem { Id = new Guid("bbbbbbbb-2222-2222-2222-bbbbbbbbbbbb"), Name = "Torby", NameEn = "Bags", Amount = 600, Category = "merch" },
        new CostItem { Id = new Guid("cccccccc-3333-3333-3333-cccccccccccc"), Name = "Wlepki", NameEn = "Stickers", Amount = 160, Category = "merch" },
        new CostItem { Id = new Guid("dddddddd-4444-4444-4444-dddddddddddd"), Name = "Koszulki", NameEn = "T-shirts", Amount = 3300, Category = "merch" },
        new CostItem { Id = new Guid("eeeeeeee-5555-5555-5555-eeeeeeeeeeee"), Name = "Zakupy spożywcze cz.2", NameEn = "Food & supplies pt.2", Amount = 177, Category = "supplies" },
        new CostItem { Id = new Guid("ffffffff-6666-6666-6666-ffffffffffff"), Name = "Plandeka", NameEn = "Tarp", Amount = 425, Category = "build" },
    };

    internal static readonly RevenueItem[] Revenues =
    {
        new RevenueItem { Id = new Guid("11111111-7777-7777-7777-111111111111"), Name = "Świnka skarbonka", NameEn = "Piggy bank", Amount = 540, Category = "donations" },
        new RevenueItem { Id = new Guid("22222222-8888-8888-8888-222222222222"), Name = "Sponsorzy — Radek", NameEn = "Sponsors — Radek", Amount = 3300, Category = "sponsors" },
        new RevenueItem { Id = new Guid("33333333-9999-9999-9999-333333333333"), Name = "Sponsorzy — Konrad", NameEn = "Sponsors — Konrad", Amount = 1200, Category = "sponsors" },
        new RevenueItem { Id = new Guid("44444444-aaaa-aaaa-aaaa-444444444444"), Name = "Zrzutka", NameEn = "Crowdfunding", Amount = 2660, Category = "donations" },
    };

    internal static readonly WarehouseItem[] WarehouseItems =
    {
        new WarehouseItem { Id = new Guid("55555555-bbbb-bbbb-bbbb-555555555555"), Name = "Halogen LED z czujnikiem ruchu", NameEn = "LED floodlight w/ motion sensor", Qty = 6, Unit = "szt", Location = "Misio", Category = "lighting", Note = "2 nowe" },
        new WarehouseItem { Id = new Guid("66666666-cccc-cccc-cccc-666666666666"), Name = "Znak 'Teren prywatny' laminowany", NameEn = "'Private property' laminated sign", Qty = 1, Unit = "szt", Location = "Misio", Category = "signs", Note = string.Empty },
        new WarehouseItem { Id = new Guid("77777777-dddd-dddd-dddd-777777777777"), Name = "Megafon Rebel", NameEn = "Megaphone Rebel", Qty = 1, Unit = "szt", Location = "Misio", Category = "other", Note = "Naprawiony" },
        new WarehouseItem { Id = new Guid("88888888-eeee-eeee-eeee-888888888888"), Name = "Lampki najazdowe solarne", NameEn = "Solar driveway lights", Qty = 12, Unit = "szt", Location = "Misio", Category = "lighting", Note = "Pod parking" },
        new WarehouseItem { Id = new Guid("99999999-ffff-ffff-ffff-999999999999"), Name = "Taśma biało-czerwona", NameEn = "Red-white tape", Qty = 500, Unit = "m", Location = "Stalowy", Category = "supplies", Note = "Trzeba jeszcze ~750 m" },
    };
}
