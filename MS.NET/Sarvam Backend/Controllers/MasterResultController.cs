using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Models;
using Sarvam.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sarvam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterResultController : ControllerBase
    {
        private readonly IMasterResultService _service;
        private readonly SyllabusDbContext _context; // Ensure DbContext is injected

        public MasterResultController(IMasterResultService service, SyllabusDbContext context)
        {
            _service = service;
            _context = context;
        }

        // Get all results
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MasterResult>>> GetResults()
        {
            var results = await _service.GetAllResultsAsync();
            return Ok(results);
        }

        // Get result by id
        [HttpGet("{id}")]
        public async Task<ActionResult<MasterResult>> GetResult(int id)
        {
            var result = await _service.GetResultByIdAsync(id);
            if (result == null)
                return NotFound(new { error = "Result not found." });
            return Ok(result);
        }

        // Get results by ModuleId
        [HttpGet("module/{moduleId}")]
        public async Task<ActionResult<IEnumerable<MasterResult>>> GetResultsByModuleId(int moduleId)
        {
            var results = await _service.GetResultsByModuleIdAsync(moduleId);
            if (results == null || !results.Any())
                return NotFound(new { error = "No results found for the given ModuleId." });
            return Ok(results);
        }

        // Get results by PRN
        [HttpGet("prn/{prn}")]
        public async Task<ActionResult<IEnumerable<MasterResult>>> GetResultsByPRN(long prn)
        {
            var results = await _service.GetResultsByPRNAsync(prn);
            if (results == null || !results.Any())
                return NotFound(new { error = "No results found for the given PRN." });
            return Ok(results);
        }

        // Create a result
        [HttpPost]
        public async Task<IActionResult> CreateResult([FromBody] MasterResult result)
        {
            if (result == null)
                return BadRequest(new { error = "Invalid request body." });

            // Check if MasterModule and MasterProfile exist
            var moduleExists = await _context.MasterModules.AnyAsync(m => m.ModuleId == result.ModuleId);
            var profileExists = await _context.MasterProfiles.AnyAsync(p => p.PRN == result.PRN);

            if (!moduleExists)
            {
                return BadRequest(new { error = "MasterModule not found for the given ModuleId." });
            }

            if (!profileExists)
            {
                return BadRequest(new { error = "MasterProfile not found for the given PRN." });
            }

            try
            {
                await _service.AddResultAsync(result);
                return CreatedAtAction(nameof(GetResult), new { id = result.ResultId }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while creating the result.", details = ex.Message });
            }
        }

        // Update result
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResult(int id, [FromBody] MasterResult result)
        {
            if (id != result.ResultId)
                return BadRequest(new { error = "Result ID mismatch." });

            try
            {
                await _service.UpdateResultAsync(result);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while updating the result.", details = ex.Message });
            }
        }

        // Delete result
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(int id)
        {
            try
            {
                var result = await _service.GetResultByIdAsync(id);
                if (result == null)
                    return NotFound(new { error = "Result not found." });

                await _service.DeleteResultAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while deleting the result.", details = ex.Message });
            }
        }
    }
}
