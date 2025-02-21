using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Repository.RepositoryInterfaces;
using System.Threading.Tasks;

namespace Sarvam.Repository.RepositoryImplementations
{
    public class MasterLeaveRequestRepository : IMasterLeaveRequestRepository
    {
        private readonly SarvamDbContext _dbContext;

        public MasterLeaveRequestRepository(SarvamDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddLeaveRequestAsync(MasterLeaveRequest leaveRequest)
        {
            try
            {
                await _dbContext.MasterLeaveRequests.AddAsync(leaveRequest);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the error or return it for debugging
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }
        public async Task<List<MasterLeaveRequest>> GetLeaveRequestsByPrnAsync(long prn)
        {
            // Query to get all leave requests for a given prn
            return await _dbContext.MasterLeaveRequests
                                    .Where(r => r.Prn == prn)
                                    .ToListAsync();
        }

        public async Task<bool> DeleteLeaveRequestAsync(int requestId)
        {
            var leaveRequest = await _dbContext.MasterLeaveRequests
                                                 .FirstOrDefaultAsync(r => r.RequestId == requestId);
            if (leaveRequest != null)
            {
                _dbContext.MasterLeaveRequests.Remove(leaveRequest);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<List<MasterLeaveRequest>> GetAllLeaveRequestsAsync()
        {
            return await _dbContext.MasterLeaveRequests.ToListAsync();  // Fetch all leave requests
        }

        public async Task<bool> AcceptLeaveRequestAsync(int requestId)
        {
            var leaveRequest = await _dbContext.MasterLeaveRequests
                                                 .FirstOrDefaultAsync(r => r.RequestId == requestId);
            if (leaveRequest != null)
            {
                leaveRequest.Status = "Accepted";  // Update status to 'Accepted'
                _dbContext.MasterLeaveRequests.Update(leaveRequest);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> DeclinedLeaveRequestAsync(int requestId)
        {
            var leaveRequest = await _dbContext.MasterLeaveRequests
                                                 .FirstOrDefaultAsync(r => r.RequestId == requestId);
            if (leaveRequest != null)
            {
                leaveRequest.Status = "Declined";  // Update status to 'Accepted'
                _dbContext.MasterLeaveRequests.Update(leaveRequest);
                await _dbContext.SaveChangesAsync();
                return true;
            }

            return false;
        }

    }
}
