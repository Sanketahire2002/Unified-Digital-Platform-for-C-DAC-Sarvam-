using Sarvam.Models;

namespace Sarvam.Repositories
{
    public interface IUserRepository
    {
        Task<UserCredential> GetUserByPrnAsync(string prn);
    }
}
