using Microsoft.EntityFrameworkCore;
using Sarvam.Models;

namespace Sarvam.Data
{
    public class SarvamDbLoginContext : DbContext
    {
        public SarvamDbLoginContext(DbContextOptions<SarvamDbLoginContext> options) : base(options)
        {
        }

        public DbSet<UserCredential> UserCredentials { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the UserCredential table
            modelBuilder.Entity<UserCredential>(entity =>
            {
                entity.HasKey(e => e.Prn);

                entity.Property(e => e.Prn)
                    .HasColumnName("prn")
                    .IsRequired();

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Role)
                    .HasColumnName("role")
                    .IsRequired();

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .IsRequired();

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime(6)");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnName("updated_at")
                    .HasColumnType("datetime(6)");
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
