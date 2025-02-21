using Sarvam.Models;

namespace Sarvam.Repository.RepositoryInterfaces
{
    public interface IUserCredentialsRepository
    {
        Task AddUserAsync(UserCredentials user);
        Task SaveChangesAsync();
    }
}
