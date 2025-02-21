using Microsoft.EntityFrameworkCore;

namespace Sarvam.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Sarvam.Models.UserCredentials> Users { get; set; }

    }
}
