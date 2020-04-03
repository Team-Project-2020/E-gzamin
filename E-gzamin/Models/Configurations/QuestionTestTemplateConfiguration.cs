using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class QuestionTestTemplateConfiguration : IEntityTypeConfiguration<QuestionTestTemplate> {
        public virtual void Configure(EntityTypeBuilder<QuestionTestTemplate> builder) {
            builder.HasKey(sc => new { sc.QuestionId, sc.TestTemplateId });
        }
    }
}
