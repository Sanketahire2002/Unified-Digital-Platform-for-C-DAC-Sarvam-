// MasterModuleSubpointController.cs
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.DTO;
using Sarvam.Models;
using Sarvam.Service;

namespace Sarvam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterModuleSubpointController : ControllerBase
    {
        private readonly IMasterModuleSubpointService _service;

        public MasterModuleSubpointController(IMasterModuleSubpointService service)
        {
            _service = service;
        }

        //[Authorize]
        [HttpGet]
        public async Task<IActionResult> GetMasterModuleSubpoints()
        {
            var subpoints = await _service.GetAllAsync();
            return Ok(subpoints);
        }

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMasterModuleSubpoint(int id)
        {
            var subpoint = await _service.GetByIdAsync(id);
            if (subpoint == null)
                return NotFound();

            return Ok(subpoint);
        }

        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateMasterModuleSubpoint([FromBody] MasterModuleSubpointDTO subpointDTO)
        {
            try
            {
                await _service.CreateAsync(subpointDTO);
                return CreatedAtAction(nameof(GetMasterModuleSubpoint), new { id = subpointDTO.SubId }, subpointDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        //[Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMasterModuleSubpoint(int id, [FromBody] MasterModuleSubpointDTO subpointDTO)
        {
            try
            {
                await _service.UpdateAsync(id, subpointDTO);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        //[Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMasterModuleSubpoint(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new { Error = ex.Message });
            }
        }
    }
}
