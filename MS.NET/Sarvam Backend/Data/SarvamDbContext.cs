using Microsoft.EntityFrameworkCore;

public class SarvamDbContext : DbContext
{
    public DbSet<MasterLeaveRequest> MasterLeaveRequests { get; set; }

    public SarvamDbContext(DbContextOptions<SarvamDbContext> options) : base(options)
    { }
}
