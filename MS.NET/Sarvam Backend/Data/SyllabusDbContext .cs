// SyllabusDbContext.cs
using Microsoft.EntityFrameworkCore;
using Sarvam.Models;

namespace Sarvam.Data
{
    public class SyllabusDbContext : DbContext
    {
        public SyllabusDbContext(DbContextOptions<SyllabusDbContext> options) : base(options) { }

        public DbSet<MasterProfile> MasterProfiles { get; set; }
        public DbSet<MasterModule> MasterModules { get; set; }
        public DbSet<MasterModuleSubpoint> MasterModuleSubpoints { get; set; }

        public DbSet<MasterResult> MasterResults { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<QuizDetails> QuizDetails { get; set; }
        public DbSet<QuizResults> QuizResults { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuring MasterProfiles table
            modelBuilder.Entity<MasterProfile>()
                .HasKey(mp => mp.PRN);
            modelBuilder.Entity<MasterProfile>()
                .Property(mp => mp.FirstName)
                .IsRequired()
                .HasMaxLength(50);
            modelBuilder.Entity<MasterProfile>()
                .Property(mp => mp.LastName)
                .IsRequired()
                .HasMaxLength(50);
            modelBuilder.Entity<MasterProfile>()
                .Property(mp => mp.Role)
                .IsRequired()
                .HasDefaultValue("Student");

            modelBuilder.Entity<MasterModule>()
                .Property(m => m.ModuleStartDate)
                .HasColumnType("date");

            modelBuilder.Entity<MasterModule>()
                .Property(m => m.ModuleEndDate)
                .HasColumnType("date");

            // Configuring MasterModules table
            modelBuilder.Entity<MasterModule>()
                .HasKey(mm => mm.ModuleId);
            modelBuilder.Entity<MasterModule>()
                .Property(m => m.ModuleStartDate)
                .HasColumnType("date");
            modelBuilder.Entity<MasterModule>()
                .Property(m => m.ModuleEndDate)
                .HasColumnType("date");

            modelBuilder.Entity<MasterModule>()
                .HasOne(mm => mm.Instructor)
                .WithMany(mp => mp.MasterModules)
                .HasForeignKey(mm => mm.InstructorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MasterModule>()
                .HasOne(mm => mm.MoCo)
                .WithMany(mp => mp.MoCoModules)
                .HasForeignKey(mm => mm.MoCoId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configuring MasterModuleSubpoints table
            modelBuilder.Entity<MasterModuleSubpoint>()
                .HasKey(mms => mms.SubId);

            modelBuilder.Entity<MasterModuleSubpoint>()
                .HasOne(mms => mms.MasterModule)
                .WithMany(mm => mm.MasterModuleSubpoints)
                .HasForeignKey(mms => mms.ModuleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MasterResult>()
                .HasOne(m => m.MasterModule)
                .WithMany()
                .HasForeignKey(m => m.ModuleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade); //  When MasterModule is deleted, delete related MasterResults

            modelBuilder.Entity<MasterResult>()
                .HasOne(m => m.MasterProfile)
                .WithMany()
                .HasForeignKey(m => m.PRN)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade); //  When MasterProfile is deleted, delete related MasterResults

            // Configuring relationship between QuizResults and MasterProfile (PRN as FK)
            modelBuilder.Entity<QuizResults>()
                .HasOne(qr => qr.MasterProfile)
                .WithMany(mp => mp.QuizResults)
                .HasForeignKey(qr => qr.PRN)
                .OnDelete(DeleteBehavior.Cascade); // Ensures PRN cannot be deleted if associated with quiz results

            // Configuring relationship between QuizResults and QuizDetails (QuizId as FK)
            modelBuilder.Entity<QuizResults>()
                .HasOne(qr => qr.QuizDetails)
                .WithMany(qd => qd.QuizResults)
                .HasForeignKey(qr => qr.QuizId)
                .OnDelete(DeleteBehavior.Cascade); // Adjust delete behavior for QuizDetails if needed (default is Cascade)



        }
    }
}
