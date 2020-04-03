using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class DesignateConfiguration : IEntityTypeConfiguration<Designate> {
        public virtual void Configure(EntityTypeBuilder<Designate> builder) {
            builder.HasKey(sc => new { sc.TestTemplateId, sc.GroupId });
        }
    }
}
