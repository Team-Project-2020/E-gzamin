using E_gzamin.Models.Configurations;
using Microsoft.EntityFrameworkCore;

namespace E_gzamin.Models {
    public class EgzaminContext : DbContext {
        public EgzaminContext(DbContextOptions<EgzaminContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
        public DbSet<User> Users { get; set; }
    }
}
