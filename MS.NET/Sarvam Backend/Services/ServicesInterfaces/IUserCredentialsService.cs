using System.Threading.Tasks;

namespace Sarvam.Services.ServicesInterfaces
{
    public interface IUserCredentialsService
    {
        Task<string> CreateUserAsync(string email, string formNumber);
    }
}
