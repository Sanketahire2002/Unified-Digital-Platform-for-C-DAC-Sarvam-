using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Sarvam.Migrations.SyllabusDb
{
    /// <inheritdoc />
    public partial class SyllabusDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "master_profiles",
                columns: table => new
                {
                    PRN = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    first_name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    last_name = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    role = table.Column<string>(type: "longtext", nullable: false, defaultValue: "Student")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_master_profiles", x => x.PRN);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "QuizDetails",
                columns: table => new
                {
                    QuizId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    QuizTitle = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartTime = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    Marks = table.Column<int>(type: "int", nullable: false),
                    Link = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizDetails", x => x.QuizId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MasterModules",
                columns: table => new
                {
                    ModuleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ModuleName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModuleStartDate = table.Column<DateTime>(type: "date", nullable: false),
                    ModuleEndDate = table.Column<DateTime>(type: "date", nullable: false),
                    InstructorId = table.Column<long>(type: "bigint", nullable: false),
                    MoCoId = table.Column<long>(type: "bigint", nullable: false),
                    NoOfDays = table.Column<byte>(type: "tinyint unsigned", nullable: false),
                    DurationHours = table.Column<byte>(type: "tinyint unsigned", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterModules", x => x.ModuleId);
                    table.ForeignKey(
                        name: "FK_MasterModules_master_profiles_InstructorId",
                        column: x => x.InstructorId,
                        principalTable: "master_profiles",
                        principalColumn: "PRN",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MasterModules_master_profiles_MoCoId",
                        column: x => x.MoCoId,
                        principalTable: "master_profiles",
                        principalColumn: "PRN",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "QuizResults",
                columns: table => new
                {
                    ResultId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PRN = table.Column<long>(type: "bigint", nullable: false),
                    Quiz_id = table.Column<int>(type: "int", nullable: false),
                    ObtainedMarks = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizResults", x => x.ResultId);
                    table.ForeignKey(
                        name: "FK_QuizResults_QuizDetails_Quiz_id",
                        column: x => x.Quiz_id,
                        principalTable: "QuizDetails",
                        principalColumn: "QuizId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizResults_master_profiles_PRN",
                        column: x => x.PRN,
                        principalTable: "master_profiles",
                        principalColumn: "PRN",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MasterModuleSubpoints",
                columns: table => new
                {
                    SubId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ModuleId = table.Column<int>(type: "int", nullable: false),
                    ModuleSubpointName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterModuleSubpoints", x => x.SubId);
                    table.ForeignKey(
                        name: "FK_MasterModuleSubpoints_MasterModules_ModuleId",
                        column: x => x.ModuleId,
                        principalTable: "MasterModules",
                        principalColumn: "ModuleId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MasterResults",
                columns: table => new
                {
                    result_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    module_id = table.Column<int>(type: "int", nullable: false),
                    PRN = table.Column<long>(type: "bigint", nullable: false),
                    internals_20 = table.Column<int>(type: "int", nullable: true),
                    lab_40 = table.Column<int>(type: "int", nullable: true),
                    ccee_60 = table.Column<int>(type: "int", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    MasterModuleModuleId = table.Column<int>(type: "int", nullable: true),
                    MasterProfilePRN = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterResults", x => x.result_id);
                    table.ForeignKey(
                        name: "FK_MasterResults_MasterModules_MasterModuleModuleId",
                        column: x => x.MasterModuleModuleId,
                        principalTable: "MasterModules",
                        principalColumn: "ModuleId");
                    table.ForeignKey(
                        name: "FK_MasterResults_MasterModules_module_id",
                        column: x => x.module_id,
                        principalTable: "MasterModules",
                        principalColumn: "ModuleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MasterResults_master_profiles_MasterProfilePRN",
                        column: x => x.MasterProfilePRN,
                        principalTable: "master_profiles",
                        principalColumn: "PRN");
                    table.ForeignKey(
                        name: "FK_MasterResults_master_profiles_PRN",
                        column: x => x.PRN,
                        principalTable: "master_profiles",
                        principalColumn: "PRN",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    QuestionText = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Option1 = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Option2 = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Option3 = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Option4 = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CorrectAnswer = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModuleId = table.Column<int>(type: "int", nullable: false),
                    MasterModuleModuleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_MasterModules_MasterModuleModuleId",
                        column: x => x.MasterModuleModuleId,
                        principalTable: "MasterModules",
                        principalColumn: "ModuleId");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_MasterModules_InstructorId",
                table: "MasterModules",
                column: "InstructorId");

            migrationBuilder.CreateIndex(
                name: "IX_MasterModules_MoCoId",
                table: "MasterModules",
                column: "MoCoId");

            migrationBuilder.CreateIndex(
                name: "IX_MasterModuleSubpoints_ModuleId",
                table: "MasterModuleSubpoints",
                column: "ModuleId");

            migrationBuilder.CreateIndex(
                name: "IX_MasterResults_MasterModuleModuleId",
                table: "MasterResults",
                column: "MasterModuleModuleId");

            migrationBuilder.CreateIndex(
                name: "IX_MasterResults_MasterProfilePRN",
                table: "MasterResults",
                column: "MasterProfilePRN");

            migrationBuilder.CreateIndex(
                name: "IX_MasterResults_module_id",
                table: "MasterResults",
                column: "module_id");

            migrationBuilder.CreateIndex(
                name: "IX_MasterResults_PRN",
                table: "MasterResults",
                column: "PRN");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_MasterModuleModuleId",
                table: "Questions",
                column: "MasterModuleModuleId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_PRN",
                table: "QuizResults",
                column: "PRN");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_Quiz_id",
                table: "QuizResults",
                column: "Quiz_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MasterModuleSubpoints");

            migrationBuilder.DropTable(
                name: "MasterResults");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "QuizResults");

            migrationBuilder.DropTable(
                name: "MasterModules");

            migrationBuilder.DropTable(
                name: "QuizDetails");

            migrationBuilder.DropTable(
                name: "master_profiles");
        }
    }
}
