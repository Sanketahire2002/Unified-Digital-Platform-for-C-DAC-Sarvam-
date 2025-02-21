using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Models;

namespace Sarvam.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SarvamDbLoginContext _context;

        public UserRepository(SarvamDbLoginContext context)
        {
            _context = context;
        }

        public async Task<UserCredential> GetUserByPrnAsync(string prn)
        {
            return await _context.UserCredentials
                .FirstOrDefaultAsync(u => u.Prn == long.Parse(prn));
        }

    }
}
