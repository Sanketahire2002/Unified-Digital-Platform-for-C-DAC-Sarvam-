using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Services;
using System;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Sarvam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginAuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public LoginAuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.LoginAsync(request);
            if (response.IsSuccess)
            {
                HttpContext.Session.SetString("UserPRN", request.PRN);
                HttpContext.Session.SetString("UserRole", response.Role);
                HttpContext.Session.SetString("UserToken", response.Token);
                // Assuming Role is part of the response
                Console.WriteLine("Session UserPRN: " + HttpContext.Session.GetString("UserPRN"));
                Console.WriteLine("Session UserRole: " + HttpContext.Session.GetString("UserRole"));
                Console.WriteLine("Session UserToken: " + HttpContext.Session.GetString("UserToken"));
                SessionHelper.SetSession("UserPRN", request.PRN);
                SessionHelper.SetSession("UserRole", response.Role);
                SessionHelper.SetSession("UserToken", response.Token);


                return Ok(response);
            }

            return Unauthorized(response.Message);
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult ProtectedEndpoint()
        {
            // Check if session exists
            //var userPRN = HttpContext.Session.GetString("UserPRN");
            var userPRN = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userPRN))
            {
                return Unauthorized("You are not logged in.");
            }

            return Ok($"Hello, user with PRN: {userPRN}. This is a protected endpoint.");
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear(); // Clear all session data
            return Ok("Logged out successfully.");
        }

        [HttpGet("profile")]
        public IActionResult UserProfile()
        {
            var userPRN = HttpContext.Session.GetString("UserPRN");
            if (string.IsNullOrEmpty(userPRN))
            {
                return Unauthorized("Session expired or not logged in.");
            }

            return Ok($"User profile for PRN: {userPRN}");
        }

    }

    // Model for login request
    public class LoginRequest
    {
        public string? PRN { get; set; }
        public string? Password { get; set; }
    }


}
