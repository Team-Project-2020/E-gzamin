using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class TestResultConfiguration : BaseEntityConfiguration<TestResult> {
        public override void Configure(EntityTypeBuilder<TestResult> builder) {
            base.Configure(builder);
        }
    }
}
