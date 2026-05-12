using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Infrastructure.Data;

internal static class SeedData
{
    private static readonly Guid Ed2025Id = new Guid("99999999-8888-7777-6666-555555555555");

    internal static readonly EditionItem[] Editions =
    {
        new EditionItem
        {
            Id = Ed2025Id,
            Year = 2025,
            Name = "PaletStock 2025",
            Description = "Edycja 2025",
            StartDate = new DateOnly(2025, 8, 7),
            EndDate = new DateOnly(2025, 8, 10),
            Status = EditionStatus.Active
        },
    };

    internal static readonly User[] Users =
    {
        new User { Id = new Guid("11111111-1111-1111-1111-111111111111"), FirstName = "Konrad",   LastName = "Kowalski", UserName = "konrad",   DisplayName = "Konrad",   IsActive = true },
        new User { Id = new Guid("22222222-2222-2222-2222-222222222222"), FirstName = "Stalowy",  LastName = "Bizon",    UserName = "stalowy",  DisplayName = "Stalowy",  IsActive = true },
        new User { Id = new Guid("33333333-3333-3333-3333-333333333333"), FirstName = "Kinia",    LastName = "Nowak",    UserName = "kinia",    DisplayName = "Kinia",    IsActive = true },
        new User { Id = new Guid("44444444-4444-4444-4444-444444444444"), FirstName = "Asia",     LastName = "Nowak",    UserName = "asia",     DisplayName = "Asia",     IsActive = true },
        new User { Id = new Guid("55555555-5555-5555-5555-555555555555"), FirstName = "Radosław", LastName = "Nowak",    UserName = "radoslaw", DisplayName = "Radosław", IsActive = true },
    };

    internal static readonly TaskItem[] Tasks =
    {
        new TaskItem { Id = new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), EditionId = Ed2025Id, Title = "Do połowy czerwca ogarnięcie gruzu",                CompleteDate = new DateTime(2025, 6, 15, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Category = "site" },
        new TaskItem { Id = new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), EditionId = Ed2025Id, Title = "Ogrodzenie i znaki zakazu wokół gruzu",              CompleteDate = new DateTime(2025, 7, 25, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.InProgress, Priority = TaskItemPriority.Ordinary, Category = "site" },
        new TaskItem { Id = new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), EditionId = Ed2025Id, Title = "Loteria fantowa — sprawdzić legalność",              CompleteDate = new DateTime(2025, 6, 10, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.InProgress, Priority = TaskItemPriority.Ordinary, Description = "podpytać czy to jest legalne", Category = "admin" },
        new TaskItem { Id = new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), EditionId = Ed2025Id, Title = "Zapytać Matczyn o wynajem nalewaka",                 CompleteDate = new DateTime(2025, 6, 20, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.NotStarted, Priority = TaskItemPriority.Ordinary, Category = "supplies" },
        new TaskItem { Id = new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), EditionId = Ed2025Id, Title = "Dogadać 300 europalet",                              CompleteDate = new DateTime(2025, 8,  1, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Description = "odbiór 01.08, oddajemy 11–13.08", Category = "build" },
        new TaskItem { Id = new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"), EditionId = Ed2025Id, Title = "Wyrównanie terenu — Anasiewicz",                    CompleteDate = new DateTime(2025, 7, 18, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Description = "Mateusz Prakowski wyrówna teren", Category = "site" },
        new TaskItem { Id = new Guid("11111111-1111-1111-1111-111111111112"), EditionId = Ed2025Id, Title = "Paliwo z Admarem",                                   CompleteDate = new DateTime(2025, 8,  1, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Category = "supplies" },
        new TaskItem { Id = new Guid("22222222-2222-2222-2222-222222222223"), EditionId = Ed2025Id, Title = "Słupki od Gonza",                                    CompleteDate = new DateTime(2025, 7, 20, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Category = "build" },
        new TaskItem { Id = new Guid("33333333-3333-3333-3333-333333333334"), EditionId = Ed2025Id, Title = "Ogrodzenie metalowe do backstage",                   CompleteDate = new DateTime(2025, 7, 22, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Category = "build" },
        new TaskItem { Id = new Guid("44444444-4444-4444-4444-444444444445"), EditionId = Ed2025Id, Title = "Słupki oświetleniowe",                               CompleteDate = new DateTime(2025, 8,  1, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Description = "ustawianie 3 sierpnia", Category = "build" },
        new TaskItem { Id = new Guid("55555555-5555-5555-5555-555555555556"), EditionId = Ed2025Id, Title = "Sprawdzić kasę z poprzedniej edycji",                CompleteDate = new DateTime(2025, 6,  5, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Description = "ok. 700 zł", Category = "finance" },
        new TaskItem { Id = new Guid("66666666-6666-6666-6666-666666666667"), EditionId = Ed2025Id, Title = "Promocja zbiórki",                                   CompleteDate = new DateTime(2025, 6, 15, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Category = "promo" },
        new TaskItem { Id = new Guid("77777777-7777-7777-7777-777777777778"), EditionId = Ed2025Id, Title = "Posty na stronie",                                   CompleteDate = new DateTime(2025, 7, 12, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.InProgress, Priority = TaskItemPriority.Ordinary, Category = "promo" },
        new TaskItem { Id = new Guid("88888888-8888-8888-8888-888888888889"), EditionId = Ed2025Id, Title = "Wycena koszulek",                                   CompleteDate = new DateTime(2025, 6, 25, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Category = "merch" },
        new TaskItem { Id = new Guid("99999999-9999-9999-9999-999999999990"), EditionId = Ed2025Id, Title = "Wlepki",                                             CompleteDate = new DateTime(2025, 7,  1, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Category = "merch" },
        new TaskItem { Id = new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"), EditionId = Ed2025Id, Title = "Naprawa namiotu",                                   CompleteDate = new DateTime(2025, 6, 30, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.Done,       Priority = TaskItemPriority.Ordinary, Category = "build" },
        new TaskItem { Id = new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), EditionId = Ed2025Id, Title = "Zwożenie palet",                                    CompleteDate = new DateTime(2025, 7, 26, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.NotStarted, Priority = TaskItemPriority.Ordinary, Description = "do 2 sierpnia", Category = "build" },
        new TaskItem { Id = new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"), EditionId = Ed2025Id, Title = "Początek budowy",                                   CompleteDate = new DateTime(2025, 8,  4, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.NotStarted, Priority = TaskItemPriority.Ordinary, Category = "build" },
        new TaskItem { Id = new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"), EditionId = Ed2025Id, Title = "Scena ma stać",                                     CompleteDate = new DateTime(2025, 8,  7, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.NotStarted, Priority = TaskItemPriority.Ordinary, Category = "build" },
        new TaskItem { Id = new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"), EditionId = Ed2025Id, Title = "Prysznic, woda",                                    CompleteDate = new DateTime(2025, 8,  5, 0, 0, 0, DateTimeKind.Utc), Status = TaskItemStatus.NotStarted, Priority = TaskItemPriority.Ordinary, Category = "build" },
    };

    internal record TaskUserAssignment(Guid TaskItemId, Guid UserId);

    internal static readonly TaskUserAssignment[] TaskUserAssignments =
    {
        new(Tasks[0].Id,  Users[0].Id),
        new(Tasks[1].Id,  Users[0].Id),
        new(Tasks[2].Id,  Users[0].Id),
        new(Tasks[3].Id,  Users[0].Id),
        new(Tasks[4].Id,  Users[0].Id),
        new(Tasks[5].Id,  Users[0].Id),
        new(Tasks[6].Id,  Users[0].Id),
        new(Tasks[7].Id,  Users[1].Id),
        new(Tasks[8].Id,  Users[0].Id),
        new(Tasks[9].Id,  Users[1].Id),
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
        new CostItem { Id = new Guid("aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa"), EditionId = Ed2025Id, Name = "Zakupy spożywcze i przemysłowe cz.1", Amount = 670,  Category = "supplies" },
        new CostItem { Id = new Guid("bbbbbbbb-2222-2222-2222-bbbbbbbbbbbb"), EditionId = Ed2025Id, Name = "Torby",                               Amount = 600,  Category = "merch" },
        new CostItem { Id = new Guid("cccccccc-3333-3333-3333-cccccccccccc"), EditionId = Ed2025Id, Name = "Wlepki",                              Amount = 160,  Category = "merch" },
        new CostItem { Id = new Guid("dddddddd-4444-4444-4444-dddddddddddd"), EditionId = Ed2025Id, Name = "Koszulki",                            Amount = 3300, Category = "merch" },
        new CostItem { Id = new Guid("eeeeeeee-5555-5555-5555-eeeeeeeeeeee"), EditionId = Ed2025Id, Name = "Zakupy spożywcze cz.2",               Amount = 177,  Category = "supplies" },
        new CostItem { Id = new Guid("ffffffff-6666-6666-6666-ffffffffffff"), EditionId = Ed2025Id, Name = "Plandeka",                            Amount = 425,  Category = "build" },
    };

    internal static readonly RevenueItem[] Revenues =
    {
        new RevenueItem { Id = new Guid("11111111-7777-7777-7777-111111111111"), EditionId = Ed2025Id, Name = "Świnka skarbonka",    Amount = 540,  Category = "donations" },
        new RevenueItem { Id = new Guid("22222222-8888-8888-8888-222222222222"), EditionId = Ed2025Id, Name = "Sponsorzy — Radek",  Amount = 3300, Category = "sponsors" },
        new RevenueItem { Id = new Guid("33333333-9999-9999-9999-333333333333"), EditionId = Ed2025Id, Name = "Sponsorzy — Konrad", Amount = 1200, Category = "sponsors" },
        new RevenueItem { Id = new Guid("44444444-aaaa-aaaa-aaaa-444444444444"), EditionId = Ed2025Id, Name = "Zrzutka",            Amount = 2660, Category = "donations" },
    };

    internal static readonly WarehouseItem[] WarehouseItems =
    {
        new WarehouseItem { Id = new Guid("55555555-bbbb-bbbb-bbbb-555555555555"), Name = "Halogen LED z czujnikiem ruchu",    Qty = 6,   Unit = "szt", Location = "Misio",   Category = "lighting", Note = "2 nowe" },
        new WarehouseItem { Id = new Guid("66666666-cccc-cccc-cccc-666666666666"), Name = "Znak 'Teren prywatny' laminowany", Qty = 1,   Unit = "szt", Location = "Misio",   Category = "signs",    Note = string.Empty },
        new WarehouseItem { Id = new Guid("77777777-dddd-dddd-dddd-777777777777"), Name = "Megafon Rebel",                    Qty = 1,   Unit = "szt", Location = "Misio",   Category = "other",    Note = "Naprawiony" },
        new WarehouseItem { Id = new Guid("88888888-eeee-eeee-eeee-888888888888"), Name = "Lampki najazdowe solarne",         Qty = 12,  Unit = "szt", Location = "Misio",   Category = "lighting", Note = "Pod parking" },
        new WarehouseItem { Id = new Guid("99999999-ffff-ffff-ffff-999999999999"), Name = "Taśma biało-czerwona",            Qty = 500, Unit = "m",   Location = "Stalowy", Category = "supplies", Note = "Trzeba jeszcze ~750 m" },
    };
}
