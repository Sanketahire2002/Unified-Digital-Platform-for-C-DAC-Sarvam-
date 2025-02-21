using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sarvam.Models;
using Sarvam.Services.ServicesInterfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MasterAttendanceController : ControllerBase
    {
        private readonly IMasterAttendanceService _attendanceService;

        public MasterAttendanceController(IMasterAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostAttendance([FromBody] List<MasterAttendance> attendanceList)
        {
            if (attendanceList == null || attendanceList.Count == 0)
            {
                return BadRequest("Attendance list is empty.");
            }

            await _attendanceService.AddAttendanceAsync(attendanceList);
            return Ok("Attendance records added successfully.");
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAttendance()
        {
            Console.WriteLine("Session UserToken: " + HttpContext.Session.GetString("Validate-UserToken"));
            var userPRN = SessionHelper.GetSession("UserPRN");
            var userRole = SessionHelper.GetSession("UserRole");
            var userToken = SessionHelper.GetSession("UserToken");
            Console.WriteLine($"PRN: {userPRN}, Role: {userRole}, Token: {userToken}");

            var attendanceList = await _attendanceService.GetAllAttendanceAsync();

            if (attendanceList == null || attendanceList.Count == 0)
            {
                return NotFound("No attendance records found.");
            }

            return Ok(attendanceList);
        }

        [Authorize]
        [HttpPost("get-by-prn")]
        public async Task<IActionResult> GetAttendanceByPRN([FromBody] PrnRequest prnRequest)
        {
            if (prnRequest.PRN <= 0)
            {
                return BadRequest("Invalid PRN number.");
            }

            var attendanceList = await _attendanceService.GetAttendanceByPRNAsync(prnRequest.PRN);

            if (attendanceList == null || attendanceList.Count == 0)
            {
                return NotFound($"No attendance records found for PRN {prnRequest.PRN}.");
            }

            return Ok(attendanceList);
        }
    }

    public class PrnRequest
    {
        public long PRN { get; set; }
    }

}
