using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PalletTimeLine.Api.Migrations
{
    /// <inheritdoc />
    public partial class AssignMissingTaskDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111112"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222223"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 7, 20, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 7, 20, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333334"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 7, 22, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 7, 22, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555556"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 6, 5, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 6, 5, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666667"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 6, 15, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 6, 15, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888889"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 6, 25, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 6, 25, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999990"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 7, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 7, 1, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 6, 10, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 6, 10, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 6, 20, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 6, 20, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { new DateTime(2025, 7, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 7, 18, 0, 0, 0, 0, DateTimeKind.Utc) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: new Guid("ffffffff-ffff-ffff-ffff-ffffffffffff"),
                columns: new[] { "EndDate", "StartDate" },
                values: new object[] { null, null });
        }
    }
}
