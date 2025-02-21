using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sarvam.DTO;
using Sarvam.Models;
using Sarvam.Services.ServicesInterfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MasterProfilesController : ControllerBase
    {
        private readonly IMasterProfileService _service;

        public MasterProfilesController(IMasterProfileService service)
        {
            _service = service;
        }

        //[Authorize]
        [HttpGet("students")]
        public async Task<ActionResult<IEnumerable<MasterProfile>>> GetStudents()
        {
            try
            {
                var students = await _service.GetStudentsAsync();
                if (students == null || !students.Any())
                {
                    return NotFound("No students found.");
                }
                return Ok(students);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("student/{prn}")]
        public async Task<IActionResult> GetStudentByPRN(long prn)
        {
            var student = await _service.GetStudentByPRNAsync(prn);
            if (student == null)
                return NotFound($"No student found with PRN {prn}.");

            return Ok(student);
        }


        [HttpGet]
        public async Task<IActionResult> GetMasterProfiles()
        {
            var profiles = await _service.GetAllProfilesAsync();
            return Ok(profiles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMasterProfile(long id)
        {
            var profile = await _service.GetProfileByIdAsync(id);
            if (profile == null)
                return NotFound();
            return Ok(profile);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMasterProfile([FromBody] MasterProfileDTO profileDTO)
        {
            if (profileDTO == null)
                return BadRequest();

            await _service.CreateProfileAsync(profileDTO);
            return CreatedAtAction(nameof(GetMasterProfile), new { id = profileDTO.PRN }, profileDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMasterProfile(long id, [FromBody] MasterProfileDTO profileDTO)
        {
            var success = await _service.UpdateProfileAsync(id, profileDTO);
            if (!success)
                return BadRequest();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMasterProfile(long id)
        {
            var success = await _service.DeleteProfileAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        //[Authorize]
        [HttpGet("Instructor")]
        public async Task<IActionResult> GetInstructors()
        {
            var instructors = await _service.GetProfilesByRoleAsync("Instructor");
            return Ok(instructors);
        }

        //[Authorize]
        [HttpGet("MoCo")]
        public async Task<IActionResult> GetMoCos()
        {
            var mocos = await _service.GetProfilesByRoleAsync("MoCo");
            return Ok(mocos);
        }
    }
}
