using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class GroupUserConfiguration : IEntityTypeConfiguration<GroupUser> {
        public virtual void Configure(EntityTypeBuilder<GroupUser> builder) {
            builder.HasKey(sc => new { sc.UserId, sc.GroupId });
        }
    }
}
