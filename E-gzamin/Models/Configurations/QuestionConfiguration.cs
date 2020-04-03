using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class QuestionConfiguration : BaseEntityConfiguration<Question> {
        public override void Configure(EntityTypeBuilder<Question> builder) {
            base.Configure(builder);
        }
    }
}
