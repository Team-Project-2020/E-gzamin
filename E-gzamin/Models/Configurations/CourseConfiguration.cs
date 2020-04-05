using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace E_gzamin.Models.Configurations {
    public class CourseConfiguration : BaseEntityConfiguration<Course> {
        public override void Configure(EntityTypeBuilder<Course> builder) {
            base.Configure(builder);

        }
    }
}
