using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_gzamin.Models.Configurations {
    public class QuestionTemplateConfiguration : BaseEntityConfiguration<QuestionTemplate> {
        public override void Configure(EntityTypeBuilder<QuestionTemplate> builder) {
            base.Configure(builder);
        }
    }
}
