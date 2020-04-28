using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class SubjectConfiguration : BaseEntityConfiguration<Subject> {
        public override void Configure(EntityTypeBuilder<Subject> builder) {
            base.Configure(builder);

        }
    }
}
