using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_gzamin.Models.Configurations {
    public class GroupConfiguration : BaseEntityConfiguration<Group> {
        public override void Configure(EntityTypeBuilder<Group> builder) {
            base.Configure(builder);
            
        }
    }
}
