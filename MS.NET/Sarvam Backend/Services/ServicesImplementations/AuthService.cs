
using System.IdentityModel.Tokens.Jwt;
using System.Security.AccessControl;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Sarvam.Controllers;
using Sarvam.Repositories;

namespace Sarvam.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.PRN) || string.IsNullOrEmpty(request.Password))
                return await Task.FromResult(new LoginResponse { IsSuccess = false, Message = "PRN and password are required." });

            if (request.PRN.Length != 12 || !long.TryParse(request.PRN, out _))
                return await Task.FromResult(new LoginResponse { IsSuccess = false, Message = "PRN must be exactly 12 digits." });

            // Validate password - at least 8 characters, with at least one uppercase and one lowercase letter
            var passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z]).{8,}$");
            if (!passwordRegex.IsMatch(request.Password))
                return await Task.FromResult(new LoginResponse { IsSuccess = false, Message = "Password must be at least 8 characters, with at least one uppercase letter and one lowercase letter." });

            var user = await _userRepository.GetUserByPrnAsync(request.PRN);

            if (user == null)
            {
                return await Task.FromResult(new LoginResponse { IsSuccess = false, Message = "User not Found." });
            }
            if (request.PRN != user.Prn.ToString())  // Assuming user.Prn is a long and needs to be compared as a string
            {
                return await Task.FromResult(new LoginResponse { IsSuccess = false, Message = "Invalid PRN." });
            }

            // Direct password comparison without hashing
            if (request.Password != user.Password)
            {
                return await Task.FromResult(new LoginResponse { IsSuccess = false, Message = "Invalid  password." });
            }

            if (user.Status != "Active")
            {
                return await Task.FromResult(new LoginResponse { IsSuccess = false, Message = "Account is inactive. Please contact support." });
            }

            

            var claims = new[]
            {
                //new Claim(ClaimTypes.NameIdentifier, user.Prn.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Prn.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.Role),

                new Claim(ClaimTypes.Role, user.Role) // Assuming 'Role' is a property in your user model
            };

            // Generate JWT token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("a-very-long-and-secure-key-that-is-at-least-32-characters-long"));
            // Use a secure key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "your-issuer",
                audience: "your-audience",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new LoginResponse
            {
                Prn = user.Prn,
                Role = user.Role,
                IsSuccess = true,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Message = "Login successful (Calling from Backend)"
            };

        }

        public class LoginResponse
        {
            public long Prn { get; set; }

            public string? Role { get; set; }

            public bool IsSuccess { get; set; }
            public string? Token { get; set; }
            public string? Message { get; set; }
        }
    }
}
