using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class AnswerTestResultConfiguration : IEntityTypeConfiguration<AnswerTestResult> {
        public virtual void Configure(EntityTypeBuilder<AnswerTestResult> builder) {
            builder.HasKey(sc => new { sc.AnswerId, sc.TestResultId });
        }
    }
}
