using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class AnswerConfiguration : BaseEntityConfiguration<Answer> {
        public override void Configure(EntityTypeBuilder<Answer> builder) {
            base.Configure(builder);

        }
    }
}
