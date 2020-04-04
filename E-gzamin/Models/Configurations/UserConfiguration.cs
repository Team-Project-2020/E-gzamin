using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class UserConfiguration : BaseEntityConfiguration<User> {
        public override void Configure(EntityTypeBuilder<User> builder) {
            base.Configure(builder);
        }
    }
}
