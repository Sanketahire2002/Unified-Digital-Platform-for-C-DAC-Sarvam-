using Sarvam.Controllers;

using static Sarvam.Services.AuthService;

namespace Sarvam.Services
{
    public interface IAuthService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);
    }
}
