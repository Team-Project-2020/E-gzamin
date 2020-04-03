using E_gzamin.Models.Configurations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Reflection;

namespace E_gzamin.Models {
    public class EgzaminContext : DbContext {
        public EgzaminContext(DbContextOptions<EgzaminContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly(), (t => t.Name != "BaseEntityConfiguration"));
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupUser> GroupUsers { get; set; }
        public DbSet<Designate> Designates { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<QuestionTemplate> QuestionTemplates { get; set; }
        public DbSet<QuestionTemplateQuestion> QuestionTemplateQuestions { get; set; }
        public DbSet<QuestionTestResult> QuestionTestResults { get; set; }
        public DbSet<QuestionTestTemplate> QuestionTestTemplates { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<TestTemplate> TestTemplates { get; set; }

    }
}
