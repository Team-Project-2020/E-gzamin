using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace E_gzamin.Models {
    public class EgzaminContext : DbContext {
        public EgzaminContext(DbContextOptions<EgzaminContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly(), (t => t.Name != "BaseEntityConfiguration"));
        }
    }
}
