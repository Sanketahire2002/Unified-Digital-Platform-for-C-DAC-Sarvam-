using Sarvam.Data;
using Sarvam.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Sarvam.Services.ServicesImplementations
{
    public class CCATService
    {
        private readonly ContextSarvam _context;

        public CCATService(ContextSarvam context)
        {
            _context = context;
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
}
