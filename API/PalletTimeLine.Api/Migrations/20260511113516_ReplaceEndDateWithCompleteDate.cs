using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PalletTimeLine.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReplaceEndDateWithCompleteDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Tasks",
                newName: "CompleteDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CompleteDate",
                table: "Tasks",
                newName: "StartDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Tasks",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111112"),
                column: "EndDate",
                value: new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222223"),
                column: "EndDate",
                value: new DateTime(2025, 7, 20, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333334"),
                column: "EndDate",
                value: new DateTime(2025, 7, 22, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444445"),
                column: "EndDate",
                value: new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555556"),
                column: "EndDate",
                value: new DateTime(2025, 6, 5, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666667"),
                column: "EndDate",
                value: new DateTime(2025, 6, 15, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777778"),
                column: "EndDate",
                value: new DateTime(2025, 7, 12, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888889"),
                column: "EndDate",
                value: new DateTime(2025, 6, 25, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999990"),
                column: "EndDate",
                value: new DateTime(2025, 7, 1, 0, 0, 0, 0, DateTimeKind.Utc));

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
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                column: "EndDate",
                value: new DateTime(2025, 6, 10, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"),
                column: "EndDate",
                value: new DateTime(2025, 8, 7, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                column: "EndDate",
                value: new DateTime(2025, 6, 20, 0, 0, 0, 0, DateTimeKind.Utc));

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

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                column: "EndDate",
                value: new DateTime(2025, 7, 18, 0, 0, 0, 0, DateTimeKind.Utc));
        }
    }
}
