using Microsoft.AspNetCore.Mvc;
using Sarvam.Models;
using Sarvam.Services.ServicesInterfaces;
using System;
using System.Threading.Tasks;

namespace Sarvam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCredentialsController : ControllerBase
    {
        private readonly IUserCredentialsService _userCredentialsService;

        public UserCredentialsController(IUserCredentialsService userCredentialsService)
        {
            _userCredentialsService = userCredentialsService;
        }

        public class EmailRequest
        {
            public string Email { get; set; }
            public string FormNumber { get; set; } // Adding formNumber in the request
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] EmailRequest request)
        {
            try
            {
                var result = await _userCredentialsService.CreateUserAsync(request.Email, request.FormNumber);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
