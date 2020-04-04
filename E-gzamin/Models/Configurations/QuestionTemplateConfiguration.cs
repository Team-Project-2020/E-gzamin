using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class QuestionTemplateConfiguration : BaseEntityConfiguration<QuestionTemplate> {
        public override void Configure(EntityTypeBuilder<QuestionTemplate> builder) {
            base.Configure(builder);
        }
    }
}
