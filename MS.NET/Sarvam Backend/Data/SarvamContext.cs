using Microsoft.EntityFrameworkCore;
using Sarvam.Models;

namespace Sarvam.Data
{
    public class SarvamContext : DbContext
    {
        public SarvamContext(DbContextOptions<SarvamContext> options) : base(options) { }

        public DbSet<MasterProfile> MasterProfiles { get; set; }
        public DbSet<MasterAttendance> MasterAttendances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MasterProfile>()
                .Property(m => m.Role)
                .HasConversion<string>(); // Ensure ENUM is handled as a string

            base.OnModelCreating(modelBuilder);
        }
    }
}
