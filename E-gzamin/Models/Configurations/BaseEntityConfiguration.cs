using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class BaseEntityConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : BaseEntity {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder) {
            builder.Property(x => x.CreatedAt)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .ValueGeneratedOnAdd();
        }
    }
}
