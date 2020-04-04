using Microsoft.EntityFrameworkCore.Migrations;

namespace E_gzamin.Migrations
{
    public partial class user_refactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Designates_Groups_GroupId",
                table: "Designates");

            migrationBuilder.DropForeignKey(
                name: "FK_Designates_TestTemplates_TestTemplateId",
                table: "Designates");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Users_OwnerId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupUsers_Groups_GroupId",
                table: "GroupUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupUsers_Users_UserId",
                table: "GroupUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTemplateQuestions_Questions_QuestionId",
                table: "QuestionTemplateQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTemplateQuestions_QuestionTemplates_QuestionTemplat~",
                table: "QuestionTemplateQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTemplates_TestTemplates_TestTemplateId",
                table: "QuestionTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestResults_Questions_QuestionId",
                table: "QuestionTestResults");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestResults_TestResults_TestResultId",
                table: "QuestionTestResults");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestTemplates_Questions_QuestionId",
                table: "QuestionTestTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestTemplates_TestTemplates_TestTemplateId",
                table: "QuestionTestTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_TestResults_TestTemplates_TestTemplateId",
                table: "TestResults");

            migrationBuilder.DropForeignKey(
                name: "FK_TestResults_Users_UserId",
                table: "TestResults");

            migrationBuilder.DropForeignKey(
                name: "FK_TestTemplates_Users_OwnerId",
                table: "TestTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestTemplates",
                table: "TestTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestResults",
                table: "TestResults");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTestTemplates",
                table: "QuestionTestTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTestResults",
                table: "QuestionTestResults");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTemplates",
                table: "QuestionTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTemplateQuestions",
                table: "QuestionTemplateQuestions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Questions",
                table: "Questions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupUsers",
                table: "GroupUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Groups",
                table: "Groups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Designates",
                table: "Designates");

            migrationBuilder.DropColumn(
                name: "HashedPassword",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "TestTemplates",
                newName: "TestTemplate");

            migrationBuilder.RenameTable(
                name: "TestResults",
                newName: "TestResult");

            migrationBuilder.RenameTable(
                name: "QuestionTestTemplates",
                newName: "QuestionTestTemplate");

            migrationBuilder.RenameTable(
                name: "QuestionTestResults",
                newName: "QuestionTestResult");

            migrationBuilder.RenameTable(
                name: "QuestionTemplates",
                newName: "QuestionTemplate");

            migrationBuilder.RenameTable(
                name: "QuestionTemplateQuestions",
                newName: "QuestionTemplateQuestion");

            migrationBuilder.RenameTable(
                name: "Questions",
                newName: "Question");

            migrationBuilder.RenameTable(
                name: "GroupUsers",
                newName: "GroupUser");

            migrationBuilder.RenameTable(
                name: "Groups",
                newName: "Group");

            migrationBuilder.RenameTable(
                name: "Designates",
                newName: "Designate");

            migrationBuilder.RenameIndex(
                name: "IX_TestTemplates_OwnerId",
                table: "TestTemplate",
                newName: "IX_TestTemplate_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_TestResults_UserId",
                table: "TestResult",
                newName: "IX_TestResult_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TestResults_TestTemplateId",
                table: "TestResult",
                newName: "IX_TestResult_TestTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionTestTemplates_TestTemplateId",
                table: "QuestionTestTemplate",
                newName: "IX_QuestionTestTemplate_TestTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionTestResults_TestResultId",
                table: "QuestionTestResult",
                newName: "IX_QuestionTestResult_TestResultId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionTemplates_TestTemplateId",
                table: "QuestionTemplate",
                newName: "IX_QuestionTemplate_TestTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionTemplateQuestions_QuestionTemplateId",
                table: "QuestionTemplateQuestion",
                newName: "IX_QuestionTemplateQuestion_QuestionTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupUsers_GroupId",
                table: "GroupUser",
                newName: "IX_GroupUser_GroupId");

            migrationBuilder.RenameIndex(
                name: "IX_Groups_OwnerId",
                table: "Group",
                newName: "IX_Group_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Designates_GroupId",
                table: "Designate",
                newName: "IX_Designate_GroupId");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "User",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestTemplate",
                table: "TestTemplate",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestResult",
                table: "TestResult",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTestTemplate",
                table: "QuestionTestTemplate",
                columns: new[] { "QuestionId", "TestTemplateId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTestResult",
                table: "QuestionTestResult",
                columns: new[] { "QuestionId", "TestResultId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTemplate",
                table: "QuestionTemplate",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTemplateQuestion",
                table: "QuestionTemplateQuestion",
                columns: new[] { "QuestionId", "QuestionTemplateId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Question",
                table: "Question",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupUser",
                table: "GroupUser",
                columns: new[] { "UserId", "GroupId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Group",
                table: "Group",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Designate",
                table: "Designate",
                columns: new[] { "TestTemplateId", "GroupId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Designate_Group_GroupId",
                table: "Designate",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Designate_TestTemplate_TestTemplateId",
                table: "Designate",
                column: "TestTemplateId",
                principalTable: "TestTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Group_User_OwnerId",
                table: "Group",
                column: "OwnerId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupUser_Group_GroupId",
                table: "GroupUser",
                column: "GroupId",
                principalTable: "Group",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupUser_User_UserId",
                table: "GroupUser",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTemplate_TestTemplate_TestTemplateId",
                table: "QuestionTemplate",
                column: "TestTemplateId",
                principalTable: "TestTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTemplateQuestion_Question_QuestionId",
                table: "QuestionTemplateQuestion",
                column: "QuestionId",
                principalTable: "Question",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTemplateQuestion_QuestionTemplate_QuestionTemplateId",
                table: "QuestionTemplateQuestion",
                column: "QuestionTemplateId",
                principalTable: "QuestionTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestResult_Question_QuestionId",
                table: "QuestionTestResult",
                column: "QuestionId",
                principalTable: "Question",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestResult_TestResult_TestResultId",
                table: "QuestionTestResult",
                column: "TestResultId",
                principalTable: "TestResult",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestTemplate_Question_QuestionId",
                table: "QuestionTestTemplate",
                column: "QuestionId",
                principalTable: "Question",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestTemplate_TestTemplate_TestTemplateId",
                table: "QuestionTestTemplate",
                column: "TestTemplateId",
                principalTable: "TestTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestResult_TestTemplate_TestTemplateId",
                table: "TestResult",
                column: "TestTemplateId",
                principalTable: "TestTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestResult_User_UserId",
                table: "TestResult",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestTemplate_User_OwnerId",
                table: "TestTemplate",
                column: "OwnerId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Designate_Group_GroupId",
                table: "Designate");

            migrationBuilder.DropForeignKey(
                name: "FK_Designate_TestTemplate_TestTemplateId",
                table: "Designate");

            migrationBuilder.DropForeignKey(
                name: "FK_Group_User_OwnerId",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupUser_Group_GroupId",
                table: "GroupUser");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupUser_User_UserId",
                table: "GroupUser");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTemplate_TestTemplate_TestTemplateId",
                table: "QuestionTemplate");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTemplateQuestion_Question_QuestionId",
                table: "QuestionTemplateQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTemplateQuestion_QuestionTemplate_QuestionTemplateId",
                table: "QuestionTemplateQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestResult_Question_QuestionId",
                table: "QuestionTestResult");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestResult_TestResult_TestResultId",
                table: "QuestionTestResult");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestTemplate_Question_QuestionId",
                table: "QuestionTestTemplate");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionTestTemplate_TestTemplate_TestTemplateId",
                table: "QuestionTestTemplate");

            migrationBuilder.DropForeignKey(
                name: "FK_TestResult_TestTemplate_TestTemplateId",
                table: "TestResult");

            migrationBuilder.DropForeignKey(
                name: "FK_TestResult_User_UserId",
                table: "TestResult");

            migrationBuilder.DropForeignKey(
                name: "FK_TestTemplate_User_OwnerId",
                table: "TestTemplate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestTemplate",
                table: "TestTemplate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestResult",
                table: "TestResult");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTestTemplate",
                table: "QuestionTestTemplate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTestResult",
                table: "QuestionTestResult");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTemplateQuestion",
                table: "QuestionTemplateQuestion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTemplate",
                table: "QuestionTemplate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Question",
                table: "Question");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupUser",
                table: "GroupUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Group",
                table: "Group");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Designate",
                table: "Designate");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "TestTemplate",
                newName: "TestTemplates");

            migrationBuilder.RenameTable(
                name: "TestResult",
                newName: "TestResults");

            migrationBuilder.RenameTable(
                name: "QuestionTestTemplate",
                newName: "QuestionTestTemplates");

            migrationBuilder.RenameTable(
                name: "QuestionTestResult",
                newName: "QuestionTestResults");

            migrationBuilder.RenameTable(
                name: "QuestionTemplateQuestion",
                newName: "QuestionTemplateQuestions");

            migrationBuilder.RenameTable(
                name: "QuestionTemplate",
                newName: "QuestionTemplates");

            migrationBuilder.RenameTable(
                name: "Question",
                newName: "Questions");

            migrationBuilder.RenameTable(
                name: "GroupUser",
                newName: "GroupUsers");

            migrationBuilder.RenameTable(
                name: "Group",
                newName: "Groups");

            migrationBuilder.RenameTable(
                name: "Designate",
                newName: "Designates");

            migrationBuilder.RenameIndex(
                name: "IX_TestTemplate_OwnerId",
                table: "TestTemplates",
                newName: "IX_TestTemplates_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_TestResult_UserId",
                table: "TestResults",
                newName: "IX_TestResults_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TestResult_TestTemplateId",
                table: "TestResults",
                newName: "IX_TestResults_TestTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionTestTemplate_TestTemplateId",
                table: "QuestionTestTemplates",
                newName: "IX_QuestionTestTemplates_TestTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionTestResult_TestResultId",
                table: "QuestionTestResults",
                newName: "IX_QuestionTestResults_TestResultId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionTemplateQuestion_QuestionTemplateId",
                table: "QuestionTemplateQuestions",
                newName: "IX_QuestionTemplateQuestions_QuestionTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_QuestionTemplate_TestTemplateId",
                table: "QuestionTemplates",
                newName: "IX_QuestionTemplates_TestTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupUser_GroupId",
                table: "GroupUsers",
                newName: "IX_GroupUsers_GroupId");

            migrationBuilder.RenameIndex(
                name: "IX_Group_OwnerId",
                table: "Groups",
                newName: "IX_Groups_OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Designate_GroupId",
                table: "Designates",
                newName: "IX_Designates_GroupId");

            migrationBuilder.AddColumn<string>(
                name: "HashedPassword",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestTemplates",
                table: "TestTemplates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestResults",
                table: "TestResults",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTestTemplates",
                table: "QuestionTestTemplates",
                columns: new[] { "QuestionId", "TestTemplateId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTestResults",
                table: "QuestionTestResults",
                columns: new[] { "QuestionId", "TestResultId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTemplateQuestions",
                table: "QuestionTemplateQuestions",
                columns: new[] { "QuestionId", "QuestionTemplateId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTemplates",
                table: "QuestionTemplates",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Questions",
                table: "Questions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupUsers",
                table: "GroupUsers",
                columns: new[] { "UserId", "GroupId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Groups",
                table: "Groups",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Designates",
                table: "Designates",
                columns: new[] { "TestTemplateId", "GroupId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Designates_Groups_GroupId",
                table: "Designates",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Designates_TestTemplates_TestTemplateId",
                table: "Designates",
                column: "TestTemplateId",
                principalTable: "TestTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Users_OwnerId",
                table: "Groups",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupUsers_Groups_GroupId",
                table: "GroupUsers",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupUsers_Users_UserId",
                table: "GroupUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTemplateQuestions_Questions_QuestionId",
                table: "QuestionTemplateQuestions",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTemplateQuestions_QuestionTemplates_QuestionTemplat~",
                table: "QuestionTemplateQuestions",
                column: "QuestionTemplateId",
                principalTable: "QuestionTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTemplates_TestTemplates_TestTemplateId",
                table: "QuestionTemplates",
                column: "TestTemplateId",
                principalTable: "TestTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestResults_Questions_QuestionId",
                table: "QuestionTestResults",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestResults_TestResults_TestResultId",
                table: "QuestionTestResults",
                column: "TestResultId",
                principalTable: "TestResults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestTemplates_Questions_QuestionId",
                table: "QuestionTestTemplates",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionTestTemplates_TestTemplates_TestTemplateId",
                table: "QuestionTestTemplates",
                column: "TestTemplateId",
                principalTable: "TestTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestResults_TestTemplates_TestTemplateId",
                table: "TestResults",
                column: "TestTemplateId",
                principalTable: "TestTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestResults_Users_UserId",
                table: "TestResults",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestTemplates_Users_OwnerId",
                table: "TestTemplates",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
