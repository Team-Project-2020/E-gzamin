using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class QuestionTestResultConfiguration : IEntityTypeConfiguration<QuestionTestResult> {
        public virtual void Configure(EntityTypeBuilder<QuestionTestResult> builder) {
            builder.HasKey(sc => new { sc.QuestionId, sc.TestResultId });
        }
    }
}
