using Microsoft.EntityFrameworkCore;
using Sarvam.Models;

namespace Sarvam.Data
{
    public class ContextSarvam : DbContext
    {
        public ContextSarvam(DbContextOptions<ContextSarvam> options) : base(options) { }

        public DbSet<CCAT> CCATs { get; set; }  // Represents the ccat table
    }
}
