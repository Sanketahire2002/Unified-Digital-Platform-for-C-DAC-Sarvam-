// MasterModuleController.cs
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
    public class MasterModuleController : ControllerBase
    {
        private readonly IMasterModuleService _service;

        public MasterModuleController(IMasterModuleService service)
        {
            _service = service;
        }

        //[Authorize]
        [HttpGet]
        public async Task<IActionResult> GetMasterModules()
        {
            var modules = await _service.GetAllAsync();
            return Ok(modules);
        }

        // New API to get module ID using module name
        [HttpGet("byName/{moduleName}")]
        public async Task<IActionResult> GetModuleByName(string moduleName)
        {
            var module = await _service.GetByNameAsync(moduleName);
            if (module == null) return NotFound(new { Error = "Module not found." });
            return Ok(module);
        }

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMasterModule(int id)
        {
            var module = await _service.GetByIdAsync(id);
            if (module == null) return NotFound();
            return Ok(module);
        }

        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> PostMasterModule([FromBody] MasterModuleDTO masterModuleDTO)
        {
            try
            {
                var createdModule = await _service.AddAsync(masterModuleDTO);
                return CreatedAtAction(nameof(GetMasterModule), new { id = createdModule.ModuleId }, createdModule);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        //[Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMasterModule(int id, [FromBody] MasterModuleDTO moduleDTO)
        {
            if (id != moduleDTO.ModuleId)
                return BadRequest(new { Error = "ID in the URL does not match the ID in the body." });

            try
            {
                await _service.UpdateAsync(id, moduleDTO);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Error = ex.Message });
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMasterModule(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Error = ex.Message });
            }
        }
    }
}
