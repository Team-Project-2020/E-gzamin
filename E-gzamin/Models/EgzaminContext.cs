using E_gzamin.Models.Configurations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Reflection;

namespace E_gzamin.Models {
    public class EgzaminContext : DbContext {
        public EgzaminContext(DbContextOptions<EgzaminContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly(), (t => t.Name != "BaseEntityConfiguration"));
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupUser> GroupUsers { get; set; }
    }
}
