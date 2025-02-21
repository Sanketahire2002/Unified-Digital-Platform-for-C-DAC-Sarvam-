using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Models;

namespace Sarvam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ContextSarvam _context;

        public AuthController(ContextSarvam context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestRegister request)
        {
            // Check if FormNumber exists
            var ccat = await _context.CCATs.FirstOrDefaultAsync(x => x.FormNumber == request.FormNumber);

            if (ccat == null)
            {
                return NotFound("User Not Found");
            }

            // Check if password matches
            if (ccat.Password != request.Password)
            {
                return Unauthorized("Invalid Login");
            }

            // Check if Status is Active
            if (ccat.Status.Equals("Active", StringComparison.OrdinalIgnoreCase))
            {
                return Ok("Already Active");
            }

            // Return all data for matching FormNumber and Password
            return Ok(new
            {
                FormNumber = ccat.FormNumber,
                Name = ccat.Name,
                DOB = ccat.DOB,
                Gender = ccat.Gender,
                Nationality = ccat.Nationality,
                AadharCard = ccat.AadharCard,
                CCATRank = ccat.CCATRank,
                MobileNumber = ccat.MobileNumber,
                Email = ccat.Email,
                Status = ccat.Status
            });
        }

        // Method to update the status of the CCAT record by FormNumber
        public async Task<IActionResult> UpdateStatusToActive(string formNumber)
        {
            var ccat = await _context.CCATs.FirstOrDefaultAsync(x => x.FormNumber == formNumber);

            if (ccat == null)
            {
                return new NotFoundObjectResult("CCAT User Not Found");
            }

            // If already Active, return a message
            if (ccat.Status.Equals("Active", StringComparison.OrdinalIgnoreCase))
            {
                return new OkObjectResult("Status is already Active");
            }

            // Update status to Active and set the updated timestamp
            ccat.Status = "Active";

            // Save changes
            await _context.SaveChangesAsync();

            return new OkObjectResult($"Status for FormNumber {formNumber} updated to Active");
        }
    }

    // Model for the login request
    public class LoginRequestRegister
    {
        public string FormNumber { get; set; }
        public string Password { get; set; }
    }
}
