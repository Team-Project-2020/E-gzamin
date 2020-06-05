using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class QuestionCourseConfiguration : IEntityTypeConfiguration<QuestionCourse> {
        public virtual void Configure(EntityTypeBuilder<QuestionCourse> builder) {
            builder.HasKey(sc => new { sc.QuestionId, sc.CourseId });
        }
    }
}
