using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PalletTimeLine.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Editions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Editions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: false),
                    DisplayName = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WarehouseItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Name = table.Column<string>(type: "text", nullable: false),
                    NameEn = table.Column<string>(type: "text", nullable: false),
                    Qty = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Unit = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarehouseItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Costs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    EditionId = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    NameEn = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Costs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Costs_Editions_EditionId",
                        column: x => x.EditionId,
                        principalTable: "Editions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Revenues",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Name = table.Column<string>(type: "text", nullable: false),
                    NameEn = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    EditionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Revenues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Revenues_Editions_EditionId",
                        column: x => x.EditionId,
                        principalTable: "Editions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    Task = table.Column<string>(type: "text", nullable: false),
                    TaskEn = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: true),
                    EditionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Editions_EditionId",
                        column: x => x.EditionId,
                        principalTable: "Editions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    EntityType = table.Column<string>(type: "text", nullable: false),
                    EntityId = table.Column<Guid>(type: "uuid", nullable: false),
                    Action = table.Column<string>(type: "text", nullable: false),
                    ChangedBy = table.Column<Guid>(type: "uuid", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OldValues = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditLogs_Users_ChangedBy",
                        column: x => x.ChangedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TaskItemUser",
                columns: table => new
                {
                    TaskItemId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskItemUser", x => new { x.TaskItemId, x.UserId });
                    table.ForeignKey(
                        name: "FK_TaskItemUser_Tasks_TaskItemId",
                        column: x => x.TaskItemId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskItemUser_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Editions",
                columns: new[] { "Id", "CreatedAt", "Description", "EndDate", "Name", "StartDate", "Status", "UpdatedAt", "Year" },
                values: new object[] { new Guid("99999999-8888-7777-6666-555555555555"), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Edycja 2025", new DateOnly(2025, 8, 10), "PaletStock 2025", new DateOnly(2025, 8, 7), "Active", null, 2025 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DisplayName", "FirstName", "IsActive", "LastName", "UserName" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "Konrad", "Konrad", true, "Kowalski", "konrad" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "Stalowy", "Stalowy", true, "Bizon", "stalowy" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "Kinia", "Kinia", true, "Nowak", "kinia" },
                    { new Guid("44444444-4444-4444-4444-444444444444"), "Asia", "Asia", true, "Nowak", "asia" },
                    { new Guid("55555555-5555-5555-5555-555555555555"), "Radosław", "Radosław", true, "Nowak", "radoslaw" }
                });

            migrationBuilder.InsertData(
                table: "WarehouseItems",
                columns: new[] { "Id", "Category", "Location", "Name", "NameEn", "Note", "Qty", "Unit" },
                values: new object[,]
                {
                    { new Guid("55555555-bbbb-bbbb-bbbb-555555555555"), "lighting", "Misio", "Halogen LED z czujnikiem ruchu", "LED floodlight w/ motion sensor", "2 nowe", 6m, "szt" },
                    { new Guid("66666666-cccc-cccc-cccc-666666666666"), "signs", "Misio", "Znak 'Teren prywatny' laminowany", "'Private property' laminated sign", "", 1m, "szt" },
                    { new Guid("77777777-dddd-dddd-dddd-777777777777"), "other", "Misio", "Megafon Rebel", "Megaphone Rebel", "Naprawiony", 1m, "szt" },
                    { new Guid("88888888-eeee-eeee-eeee-888888888888"), "lighting", "Misio", "Lampki najazdowe solarne", "Solar driveway lights", "Pod parking", 12m, "szt" },
                    { new Guid("99999999-ffff-ffff-ffff-999999999999"), "supplies", "Stalowy", "Taśma biało-czerwona", "Red-white tape", "Trzeba jeszcze ~750 m", 500m, "m" }
                });

            migrationBuilder.InsertData(
                table: "Costs",
                columns: new[] { "Id", "Amount", "Category", "EditionId", "Name", "NameEn" },
                values: new object[,]
                {
                    { new Guid("aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa"), 670m, "supplies", new Guid("99999999-8888-7777-6666-555555555555"), "Zakupy spożywcze i przemysłowe cz.1", "Food & supplies pt.1" },
                    { new Guid("bbbbbbbb-2222-2222-2222-bbbbbbbbbbbb"), 600m, "merch", new Guid("99999999-8888-7777-6666-555555555555"), "Torby", "Bags" },
                    { new Guid("cccccccc-3333-3333-3333-cccccccccccc"), 160m, "merch", new Guid("99999999-8888-7777-6666-555555555555"), "Wlepki", "Stickers" },
                    { new Guid("dddddddd-4444-4444-4444-dddddddddddd"), 3300m, "merch", new Guid("99999999-8888-7777-6666-555555555555"), "Koszulki", "T-shirts" },
                    { new Guid("eeeeeeee-5555-5555-5555-eeeeeeeeeeee"), 177m, "supplies", new Guid("99999999-8888-7777-6666-555555555555"), "Zakupy spożywcze cz.2", "Food & supplies pt.2" },
                    { new Guid("ffffffff-6666-6666-6666-ffffffffffff"), 425m, "build", new Guid("99999999-8888-7777-6666-555555555555"), "Plandeka", "Tarp" }
                });

            migrationBuilder.InsertData(
                table: "Revenues",
                columns: new[] { "Id", "Amount", "Category", "EditionId", "Name", "NameEn" },
                values: new object[,]
                {
                    { new Guid("11111111-7777-7777-7777-111111111111"), 540m, "donations", new Guid("99999999-8888-7777-6666-555555555555"), "Świnka skarbonka", "Piggy bank" },
                    { new Guid("22222222-8888-8888-8888-222222222222"), 3300m, "sponsors", new Guid("99999999-8888-7777-6666-555555555555"), "Sponsorzy — Radek", "Sponsors — Radek" },
                    { new Guid("33333333-9999-9999-9999-333333333333"), 1200m, "sponsors", new Guid("99999999-8888-7777-6666-555555555555"), "Sponsorzy — Konrad", "Sponsors — Konrad" },
                    { new Guid("44444444-aaaa-aaaa-aaaa-444444444444"), 2660m, "donations", new Guid("99999999-8888-7777-6666-555555555555"), "Zrzutka", "Crowdfunding" }
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Category", "Date", "EditionId", "Note", "Status", "Task", "TaskEn" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111112"), "supplies", null, new Guid("99999999-8888-7777-6666-555555555555"), null, "done", "Paliwo z Admarem", "Fuel with Admar" },
                    { new Guid("22222222-2222-2222-2222-222222222223"), "build", null, new Guid("99999999-8888-7777-6666-555555555555"), null, "done", "Słupki od Gonza", "Posts from Gonzo" },
                    { new Guid("33333333-3333-3333-3333-333333333334"), "build", null, new Guid("99999999-8888-7777-6666-555555555555"), null, "done", "Ogrodzenie metalowe do backstage", "Metal fence for backstage" },
                    { new Guid("44444444-4444-4444-4444-444444444445"), "build", "2025-08-01", new Guid("99999999-8888-7777-6666-555555555555"), "ustawianie 3 sierpnia", "done", "Słupki oświetleniowe", "Lighting posts" },
                    { new Guid("55555555-5555-5555-5555-555555555556"), "finance", null, new Guid("99999999-8888-7777-6666-555555555555"), "ok. 700 zł", "done", "Sprawdzić kasę z poprzedniej edycji", "Check leftover cash from last edition" },
                    { new Guid("66666666-6666-6666-6666-666666666667"), "promo", "2025-07-14", new Guid("99999999-8888-7777-6666-555555555555"), null, "done", "Promocja zbiórki", "Promote fundraiser" },
                    { new Guid("77777777-7777-7777-7777-777777777778"), "promo", "2025-07-12", new Guid("99999999-8888-7777-6666-555555555555"), null, "in-progress", "Posty na stronie", "Website posts" },
                    { new Guid("88888888-8888-8888-8888-888888888889"), "merch", null, new Guid("99999999-8888-7777-6666-555555555555"), null, "done", "Wycena koszulek", "T-shirt quotes" },
                    { new Guid("99999999-9999-9999-9999-999999999990"), "merch", null, new Guid("99999999-8888-7777-6666-555555555555"), null, "done", "Wlepki", "Stickers" },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"), "build", "2025-06-30", new Guid("99999999-8888-7777-6666-555555555555"), null, "done", "Naprawa namiotu", "Tent repair" },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), "site", "2025-06-15", new Guid("99999999-8888-7777-6666-555555555555"), null, "done", "Do połowy czerwca ogarnięcie gruzu", "Clear rubble by mid-June" },
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), "build", "2025-07-26", new Guid("99999999-8888-7777-6666-555555555555"), "do 2 sierpnia", "todo", "Zwożenie palet", "Bring pallets to site" },
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), "site", "2025-07-25", new Guid("99999999-8888-7777-6666-555555555555"), null, "in-progress", "Ogrodzenie i znaki zakazu wokół gruzu", "Fence + warning signs around rubble" },
                    { new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"), "build", "2025-08-04", new Guid("99999999-8888-7777-6666-555555555555"), null, "todo", "Początek budowy", "Build start" },
                    { new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), "admin", null, new Guid("99999999-8888-7777-6666-555555555555"), "podpytać czy to jest legalne", "in-progress", "Loteria fantowa — sprawdzić legalność", "Raffle — check legality" },
                    { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"), "build", "2025-08-07", new Guid("99999999-8888-7777-6666-555555555555"), null, "todo", "Scena ma stać", "Stage standing" },
                    { new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), "supplies", null, new Guid("99999999-8888-7777-6666-555555555555"), null, "todo", "Zapytać Matczyn o wynajem nalewaka", "Ask Matczyn about tap rental" },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"), "build", "2025-08-05", new Guid("99999999-8888-7777-6666-555555555555"), null, "todo", "Prysznic, woda", "Shower, water" },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), "build", "2025-08-01", new Guid("99999999-8888-7777-6666-555555555555"), "odbiór 01.08, oddajemy 11–13.08", "done", "Dogadać 300 europalet", "Arrange 300 europallets" },
                    { new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"), "site", null, new Guid("99999999-8888-7777-6666-555555555555"), "Mateusz Prakowski wyrówna teren", "done", "Wyrównanie terenu — Anasiewicz", "Ground leveling — Anasiewicz" }
                });

            migrationBuilder.InsertData(
                table: "TaskItemUser",
                columns: new[] { "TaskItemId", "UserId" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111112"), new Guid("11111111-1111-1111-1111-111111111111") },
                    { new Guid("22222222-2222-2222-2222-222222222223"), new Guid("22222222-2222-2222-2222-222222222222") },
                    { new Guid("33333333-3333-3333-3333-333333333334"), new Guid("11111111-1111-1111-1111-111111111111") },
                    { new Guid("44444444-4444-4444-4444-444444444445"), new Guid("22222222-2222-2222-2222-222222222222") },
                    { new Guid("55555555-5555-5555-5555-555555555556"), new Guid("33333333-3333-3333-3333-333333333333") },
                    { new Guid("55555555-5555-5555-5555-555555555556"), new Guid("44444444-4444-4444-4444-444444444444") },
                    { new Guid("66666666-6666-6666-6666-666666666667"), new Guid("33333333-3333-3333-3333-333333333333") },
                    { new Guid("66666666-6666-6666-6666-666666666667"), new Guid("44444444-4444-4444-4444-444444444444") },
                    { new Guid("77777777-7777-7777-7777-777777777778"), new Guid("33333333-3333-3333-3333-333333333333") },
                    { new Guid("77777777-7777-7777-7777-777777777778"), new Guid("44444444-4444-4444-4444-444444444444") },
                    { new Guid("88888888-8888-8888-8888-888888888889"), new Guid("55555555-5555-5555-5555-555555555555") },
                    { new Guid("99999999-9999-9999-9999-999999999990"), new Guid("55555555-5555-5555-5555-555555555555") },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"), new Guid("22222222-2222-2222-2222-222222222222") },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), new Guid("11111111-1111-1111-1111-111111111111") },
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"), new Guid("22222222-2222-2222-2222-222222222222") },
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), new Guid("11111111-1111-1111-1111-111111111111") },
                    { new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"), new Guid("22222222-2222-2222-2222-222222222222") },
                    { new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), new Guid("11111111-1111-1111-1111-111111111111") },
                    { new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"), new Guid("22222222-2222-2222-2222-222222222222") },
                    { new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"), new Guid("11111111-1111-1111-1111-111111111111") },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"), new Guid("11111111-1111-1111-1111-111111111111") },
                    { new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), new Guid("11111111-1111-1111-1111-111111111111") },
                    { new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"), new Guid("11111111-1111-1111-1111-111111111111") }
                });

            migrationBuilder.CreateIndex(
                name: "idx_auditlog_changedby",
                table: "AuditLogs",
                column: "ChangedBy");

            migrationBuilder.CreateIndex(
                name: "idx_auditlog_entitytype_entityid",
                table: "AuditLogs",
                columns: new[] { "EntityType", "EntityId" });

            migrationBuilder.CreateIndex(
                name: "idx_auditlog_timestamp",
                table: "AuditLogs",
                column: "Timestamp",
                descending: new bool[0]);

            migrationBuilder.CreateIndex(
                name: "IX_Costs_EditionId",
                table: "Costs",
                column: "EditionId");

            migrationBuilder.CreateIndex(
                name: "IX_Revenues_EditionId",
                table: "Revenues",
                column: "EditionId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItemUser_UserId",
                table: "TaskItemUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_EditionId",
                table: "Tasks",
                column: "EditionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "Costs");

            migrationBuilder.DropTable(
                name: "Revenues");

            migrationBuilder.DropTable(
                name: "TaskItemUser");

            migrationBuilder.DropTable(
                name: "WarehouseItems");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Editions");
        }
    }
}
