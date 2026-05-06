using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PalletTimeLine.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveEngColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "WarehouseItems");

            migrationBuilder.DropColumn(
                name: "TaskEn",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "Revenues");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "Costs");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666667"),
                column: "Date",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "WarehouseItems",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TaskEn",
                table: "Tasks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "Revenues",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "Costs",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Costs",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa"),
                column: "NameEn",
                value: "Food & supplies pt.1");

            migrationBuilder.UpdateData(
                table: "Costs",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-2222-2222-2222-bbbbbbbbbbbb"),
                column: "NameEn",
                value: "Bags");

            migrationBuilder.UpdateData(
                table: "Costs",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-3333-3333-3333-cccccccccccc"),
                column: "NameEn",
                value: "Stickers");

            migrationBuilder.UpdateData(
                table: "Costs",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-4444-4444-4444-dddddddddddd"),
                column: "NameEn",
                value: "T-shirts");

            migrationBuilder.UpdateData(
                table: "Costs",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-5555-5555-5555-eeeeeeeeeeee"),
                column: "NameEn",
                value: "Food & supplies pt.2");

            migrationBuilder.UpdateData(
                table: "Costs",
                keyColumn: "Id",
                keyValue: new Guid("ffffffff-6666-6666-6666-ffffffffffff"),
                column: "NameEn",
                value: "Tarp");

            migrationBuilder.UpdateData(
                table: "Revenues",
                keyColumn: "Id",
                keyValue: new Guid("11111111-7777-7777-7777-111111111111"),
                column: "NameEn",
                value: "Piggy bank");

            migrationBuilder.UpdateData(
                table: "Revenues",
                keyColumn: "Id",
                keyValue: new Guid("22222222-8888-8888-8888-222222222222"),
                column: "NameEn",
                value: "Sponsors — Radek");

            migrationBuilder.UpdateData(
                table: "Revenues",
                keyColumn: "Id",
                keyValue: new Guid("33333333-9999-9999-9999-333333333333"),
                column: "NameEn",
                value: "Sponsors — Konrad");

            migrationBuilder.UpdateData(
                table: "Revenues",
                keyColumn: "Id",
                keyValue: new Guid("44444444-aaaa-aaaa-aaaa-444444444444"),
                column: "NameEn",
                value: "Crowdfunding");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111112"),
                column: "TaskEn",
                value: "Fuel with Admar");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222223"),
                column: "TaskEn",
                value: "Posts from Gonzo");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333334"),
                column: "TaskEn",
                value: "Metal fence for backstage");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444445"),
                column: "TaskEn",
                value: "Lighting posts");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555556"),
                column: "TaskEn",
                value: "Check leftover cash from last edition");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666667"),
                columns: new[] { "Date", "TaskEn" },
                values: new object[] { "2025-07-14", "Promote fundraiser" });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777778"),
                column: "TaskEn",
                value: "Website posts");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888889"),
                column: "TaskEn",
                value: "T-shirt quotes");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999990"),
                column: "TaskEn",
                value: "Stickers");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"),
                column: "TaskEn",
                value: "Tent repair");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "TaskEn",
                value: "Clear rubble by mid-June");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"),
                column: "TaskEn",
                value: "Bring pallets to site");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "TaskEn",
                value: "Fence + warning signs around rubble");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"),
                column: "TaskEn",
                value: "Build start");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                column: "TaskEn",
                value: "Raffle — check legality");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"),
                column: "TaskEn",
                value: "Stage standing");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                column: "TaskEn",
                value: "Ask Matczyn about tap rental");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"),
                column: "TaskEn",
                value: "Shower, water");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                column: "TaskEn",
                value: "Arrange 300 europallets");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                column: "TaskEn",
                value: "Ground leveling — Anasiewicz");

            migrationBuilder.UpdateData(
                table: "WarehouseItems",
                keyColumn: "Id",
                keyValue: new Guid("55555555-bbbb-bbbb-bbbb-555555555555"),
                column: "NameEn",
                value: "LED floodlight w/ motion sensor");

            migrationBuilder.UpdateData(
                table: "WarehouseItems",
                keyColumn: "Id",
                keyValue: new Guid("66666666-cccc-cccc-cccc-666666666666"),
                column: "NameEn",
                value: "'Private property' laminated sign");

            migrationBuilder.UpdateData(
                table: "WarehouseItems",
                keyColumn: "Id",
                keyValue: new Guid("77777777-dddd-dddd-dddd-777777777777"),
                column: "NameEn",
                value: "Megaphone Rebel");

            migrationBuilder.UpdateData(
                table: "WarehouseItems",
                keyColumn: "Id",
                keyValue: new Guid("88888888-eeee-eeee-eeee-888888888888"),
                column: "NameEn",
                value: "Solar driveway lights");

            migrationBuilder.UpdateData(
                table: "WarehouseItems",
                keyColumn: "Id",
                keyValue: new Guid("99999999-ffff-ffff-ffff-999999999999"),
                column: "NameEn",
                value: "Red-white tape");
        }
    }
}
