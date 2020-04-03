using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_gzamin.Models.Configurations {
    public class QuestionConfiguration : BaseEntityConfiguration<Question> {
        public override void Configure(EntityTypeBuilder<Question> builder) {
            base.Configure(builder);
        }
    }
}
