using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class QuestionTemplateQuestionConfiguration : IEntityTypeConfiguration<Models.QuestionTemplateQuestion> {
        public virtual void Configure(EntityTypeBuilder<Models.QuestionTemplateQuestion> builder) {
            builder.HasKey(sc => new { sc.QuestionId, sc.QuestionTemplateId });
        }
    }
}
