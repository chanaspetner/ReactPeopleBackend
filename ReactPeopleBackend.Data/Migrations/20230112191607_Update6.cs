using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactPeopleBackend.Data.Migrations
{
    public partial class Update6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsChecked",
                table: "People");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsChecked",
                table: "People",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
