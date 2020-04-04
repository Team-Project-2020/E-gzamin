using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using System;

namespace E_gzamin.Migrations {
    public partial class TestStructure_QuestionStructure : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    RemovedAt = table.Column<DateTime>(nullable: true),
                    Content = table.Column<string>(nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestTemplates",
                columns: table => new {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    RemovedAt = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    OwnerId = table.Column<int>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_TestTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestTemplates_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Designates",
                columns: table => new {
                    GroupId = table.Column<int>(nullable: false),
                    TestTemplateId = table.Column<int>(nullable: false),
                    Time = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    PassReq = table.Column<decimal>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Designates", x => new { x.TestTemplateId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_Designates_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Designates_TestTemplates_TestTemplateId",
                        column: x => x.TestTemplateId,
                        principalTable: "TestTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTemplates",
                columns: table => new {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    RemovedAt = table.Column<DateTime>(nullable: true),
                    QuestionsCount = table.Column<int>(nullable: false),
                    TestTemplateId = table.Column<int>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_QuestionTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionTemplates_TestTemplates_TestTemplateId",
                        column: x => x.TestTemplateId,
                        principalTable: "TestTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTestTemplates",
                columns: table => new {
                    QuestionId = table.Column<int>(nullable: false),
                    TestTemplateId = table.Column<int>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_QuestionTestTemplates", x => new { x.QuestionId, x.TestTemplateId });
                    table.ForeignKey(
                        name: "FK_QuestionTestTemplates_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionTestTemplates_TestTemplates_TestTemplateId",
                        column: x => x.TestTemplateId,
                        principalTable: "TestTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestResults",
                columns: table => new {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    RemovedAt = table.Column<DateTime>(nullable: true),
                    Result = table.Column<int>(nullable: false),
                    MaxPoints = table.Column<int>(nullable: false),
                    isPassed = table.Column<bool>(nullable: false),
                    CompletedAt = table.Column<DateTime>(nullable: false),
                    StartedAt = table.Column<DateTime>(nullable: false),
                    FinishedAt = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    TestTemplateId = table.Column<int>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_TestResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestResults_TestTemplates_TestTemplateId",
                        column: x => x.TestTemplateId,
                        principalTable: "TestTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestResults_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTemplateQuestions",
                columns: table => new {
                    QuestionId = table.Column<int>(nullable: false),
                    QuestionTemplateId = table.Column<int>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_QuestionTemplateQuestions", x => new { x.QuestionId, x.QuestionTemplateId });
                    table.ForeignKey(
                        name: "FK_QuestionTemplateQuestions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionTemplateQuestions_QuestionTemplates_QuestionTemplat~",
                        column: x => x.QuestionTemplateId,
                        principalTable: "QuestionTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTestResults",
                columns: table => new {
                    QuestionId = table.Column<int>(nullable: false),
                    TestResultId = table.Column<int>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_QuestionTestResults", x => new { x.QuestionId, x.TestResultId });
                    table.ForeignKey(
                        name: "FK_QuestionTestResults_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionTestResults_TestResults_TestResultId",
                        column: x => x.TestResultId,
                        principalTable: "TestResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Designates_GroupId",
                table: "Designates",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTemplateQuestions_QuestionTemplateId",
                table: "QuestionTemplateQuestions",
                column: "QuestionTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTemplates_TestTemplateId",
                table: "QuestionTemplates",
                column: "TestTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTestResults_TestResultId",
                table: "QuestionTestResults",
                column: "TestResultId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTestTemplates_TestTemplateId",
                table: "QuestionTestTemplates",
                column: "TestTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_TestResults_TestTemplateId",
                table: "TestResults",
                column: "TestTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_TestResults_UserId",
                table: "TestResults",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TestTemplates_OwnerId",
                table: "TestTemplates",
                column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "Designates");

            migrationBuilder.DropTable(
                name: "QuestionTemplateQuestions");

            migrationBuilder.DropTable(
                name: "QuestionTestResults");

            migrationBuilder.DropTable(
                name: "QuestionTestTemplates");

            migrationBuilder.DropTable(
                name: "QuestionTemplates");

            migrationBuilder.DropTable(
                name: "TestResults");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "TestTemplates");
        }
    }
}
