using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PalletTimeLine.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixSeedEndDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444445"),
                column: "EndDate",
                value: new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777778"),
                column: "EndDate",
                value: new DateTime(2025, 7, 12, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"),
                column: "EndDate",
                value: new DateTime(2025, 6, 30, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "EndDate",
                value: new DateTime(2025, 6, 15, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"),
                column: "EndDate",
                value: new DateTime(2025, 7, 26, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "EndDate",
                value: new DateTime(2025, 7, 25, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"),
                column: "EndDate",
                value: new DateTime(2025, 8, 4, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"),
                column: "EndDate",
                value: new DateTime(2025, 8, 7, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"),
                column: "EndDate",
                value: new DateTime(2025, 8, 5, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                column: "EndDate",
                value: new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444445"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777778"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"),
                column: "EndDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                column: "EndDate",
                value: null);
        }
    }
}
