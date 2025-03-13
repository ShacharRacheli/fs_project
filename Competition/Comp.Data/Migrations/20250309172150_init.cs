using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Comp.Data.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChallengeList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChallengeList", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsersList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    JoiningDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersList", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImagesList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ChallengeId = table.Column<int>(type: "int", nullable: false),
                    CountVotes = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UploadedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImagesList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImagesList_ChallengeList_ChallengeId",
                        column: x => x.ChallengeId,
                        principalTable: "ChallengeList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImagesList_UsersList_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "VoteList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ImageId = table.Column<int>(type: "int", nullable: false),
                    VoteDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VoteList_ImagesList_ImageId",
                        column: x => x.ImageId,
                        principalTable: "ImagesList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_VoteList_UsersList_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "WinnersList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ImageId = table.Column<int>(type: "int", nullable: false),
                    ChallengeID = table.Column<int>(type: "int", nullable: false),
                    WinDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WinnersList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WinnersList_ChallengeList_ChallengeID",
                        column: x => x.ChallengeID,
                        principalTable: "ChallengeList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_WinnersList_ImagesList_ImageId",
                        column: x => x.ImageId,
                        principalTable: "ImagesList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_WinnersList_UsersList_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImagesList_ChallengeId",
                table: "ImagesList",
                column: "ChallengeId");

            migrationBuilder.CreateIndex(
                name: "IX_ImagesList_UserId",
                table: "ImagesList",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_VoteList_ImageId",
                table: "VoteList",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_VoteList_UserId",
                table: "VoteList",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WinnersList_ChallengeID",
                table: "WinnersList",
                column: "ChallengeID");

            migrationBuilder.CreateIndex(
                name: "IX_WinnersList_ImageId",
                table: "WinnersList",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_WinnersList_UserId",
                table: "WinnersList",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VoteList");

            migrationBuilder.DropTable(
                name: "WinnersList");

            migrationBuilder.DropTable(
                name: "ImagesList");

            migrationBuilder.DropTable(
                name: "ChallengeList");

            migrationBuilder.DropTable(
                name: "UsersList");
        }
    }
}
