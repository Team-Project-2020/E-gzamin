using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class QuestionSubjectConfiguration : IEntityTypeConfiguration<QuestionSubject> {
        public virtual void Configure(EntityTypeBuilder<QuestionSubject> builder) {
            builder.HasKey(sc => new { sc.QuestionId, sc.SubjectId });
        }
    }
}
