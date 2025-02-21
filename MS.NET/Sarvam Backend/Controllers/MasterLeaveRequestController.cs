using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sarvam.Data;
using Sarvam.Services.ServicesInterfaces;
using System.Threading.Tasks;

namespace Sarvam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterLeaveRequestController : ControllerBase
    {
        private readonly IMasterLeaveRequestService _leaveRequestService;

        public MasterLeaveRequestController(IMasterLeaveRequestService leaveRequestService)
        {
            _leaveRequestService = leaveRequestService;
        }

        // POST: api/MasterLeaveRequest
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateLeaveRequest([FromBody] MasterLeaveRequest leaveRequest)
        {
            if (leaveRequest == null)
            {
                return BadRequest("Invalid data.");
            }

            var result = await _leaveRequestService.CreateLeaveRequestAsync(leaveRequest);
            if (result)
            {
                return CreatedAtAction(nameof(CreateLeaveRequest), new { id = leaveRequest.RequestId }, leaveRequest);
            }
            else
            {
                return StatusCode(500, "Internal server error while creating the leave request.");
            }
        }

        // POST: api/MasterLeaveRequest/GetByPrn
        [Authorize]
        [HttpPost("GetByPrn")]
        public async Task<IActionResult> GetLeaveRequestsByPrn([FromBody] LeavePrnRequest leavePrnRequest)
        {
            if (leavePrnRequest.PRN <= 0)
            {
                return BadRequest("Invalid PRN number.");
            }

            // Get all leave requests for the given prn
            var leaveRequests = await _leaveRequestService.GetLeaveRequestsByPrnAsync(leavePrnRequest.PRN);

            if (leaveRequests == null || leaveRequests.Count == 0)
            {
                return NotFound($"No leave requests found for PRN: {leavePrnRequest.PRN}");
            }

            return Ok(leaveRequests);
        }

        // DELETE: api/MasterLeaveRequest/Delete
        [Authorize]
        [HttpPost("Delete")]
        public async Task<IActionResult> DeleteLeaveRequest([FromBody] LeavePrnRequest leavePrnRequest)
        {
            // Delete the leave request for the given request_id
            var result = await _leaveRequestService.DeleteLeaveRequestAsync(leavePrnRequest.RequestId);

            if (result)
            {
                return Ok($"Leave request with ID {leavePrnRequest.RequestId} deleted successfully.");
            }

            return BadRequest("An error occurred while deleting the leave request.");
        }

        // GET: api/MasterLeaveRequest
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllLeaveRequests()
        {
            // Get all leave requests from the database
            var leaveRequests = await _leaveRequestService.GetAllLeaveRequestsAsync();

            if (leaveRequests == null || leaveRequests.Count == 0)
            {
                return NotFound("No leave requests found.");
            }

            return Ok(leaveRequests);
        }

        // POST: api/MasterLeaveRequest/Accept
        [Authorize]
        [HttpPost("Accept")]
        public async Task<IActionResult> AcceptLeaveRequest([FromBody] LeavePrnRequest leavePrnRequest)
        {
            var result = await _leaveRequestService.AcceptLeaveRequestAsync(leavePrnRequest.RequestId);

            if (result)
            {
                return Ok($"Leave request with ID {leavePrnRequest.RequestId} has been accepted.");
            }

            return BadRequest("An error occurred while updating the leave request status.");
        }


        // POST: api/MasterLeaveRequest/Accept
        [Authorize]
        [HttpPost("Declined")]
        public async Task<IActionResult> DeclinedLeaveRequestAsync([FromBody] LeavePrnRequest leavePrnRequest)
        {
            var result = await _leaveRequestService.DeclinedLeaveRequestAsync(leavePrnRequest.RequestId);

            if (result)
            {
                return Ok($"Leave request with ID {leavePrnRequest.RequestId} has been declined.");
            }

            return BadRequest("An error occurred while updating the leave request status.");
        }

        public class LeavePrnRequest
        {
            public long PRN { get; set; }
            public int RequestId { get; set; }
        }
    }
}
