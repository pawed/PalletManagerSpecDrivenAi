using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PalletTimeLine.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReplaceDateWithStartEndDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Tasks");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Tasks",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Tasks",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111112"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222223"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333334"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444445"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555556"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666667"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777778"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 7, 12, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888889"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999990"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 6, 30, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 6, 15, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 7, 26, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 7, 25, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 8, 4, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 8, 7, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 8, 5, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Tasks");

            migrationBuilder.AddColumn<string>(
                name: "Date",
                table: "Tasks",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111112"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222223"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333334"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444445"),
                column: "Date",
                value: "2025-08-01");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555556"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666667"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777778"),
                column: "Date",
                value: "2025-07-12");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888889"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999990"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"),
                column: "Date",
                value: "2025-06-30");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                column: "Date",
                value: "2025-06-15");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2"),
                column: "Date",
                value: "2025-07-26");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                column: "Date",
                value: "2025-07-25");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-ccccccccccc3"),
                column: "Date",
                value: "2025-08-04");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-ddddddddddd4"),
                column: "Date",
                value: "2025-08-07");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                column: "Date",
                value: null);

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5"),
                column: "Date",
                value: "2025-08-05");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                column: "Date",
                value: "2025-08-01");

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                column: "Date",
                value: null);
        }
    }
}
