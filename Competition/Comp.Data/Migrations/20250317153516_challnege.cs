using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Comp.Data.Migrations
{
    /// <inheritdoc />
    public partial class challnege : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsWinnerEmailSent",
                table: "ChallengeList",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsWinnerEmailSent",
                table: "ChallengeList");
        }
    }
}
