using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class TestTemplateConfiguration : BaseEntityConfiguration<TestTemplate> {
        public override void Configure(EntityTypeBuilder<TestTemplate> builder) {
            base.Configure(builder);
        }
    }
}
