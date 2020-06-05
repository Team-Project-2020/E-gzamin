using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace E_gzamin.Models {
    public class EgzaminContext : DbContext {
        public EgzaminContext(DbContextOptions<EgzaminContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly(), (t => t.Name != "BaseEntityConfiguration"));
        }
        public DbSet<User> User { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<GroupUser> GroupUser { get; set; }
        public DbSet<Designate> Designate { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<QuestionTemplate> QuestionTemplate { get; set; }
        public DbSet<QuestionTemplateQuestion> QuestionTemplateQuestion { get; set; }
        public DbSet<QuestionTestResult> QuestionTestResult { get; set; }
        public DbSet<QuestionTestTemplate> QuestionTestTemplate { get; set; }
        public DbSet<TestResult> TestResult { get; set; }
        public DbSet<TestTemplate> TestTemplate { get; set; }
        public DbSet<Answer> Answer { get; set; }
        public DbSet<AnswerTestResult> AnswerTestResult { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<QuestionSubject> QuestionSubject { get; set; }
        public DbSet<QuestionCourse> QuestionCourse { get; set; }


    }
}
