using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class GroupConfiguration : BaseEntityConfiguration<Group> {
        public override void Configure(EntityTypeBuilder<Group> builder) {
            base.Configure(builder);

        }
    }
}
