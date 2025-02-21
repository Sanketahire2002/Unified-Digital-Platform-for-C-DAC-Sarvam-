using Sarvam.Data;
using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;
using System.Threading.Tasks;

namespace Sarvam.Repository.RepositoryImplementations
{
    public class UserCredentialsRepository : IUserCredentialsRepository
    {
        private readonly ApplicationDbContext _context;

        public UserCredentialsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddUserAsync(UserCredentials user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
