using Sarvam.Data;
using System.Threading.Tasks;

namespace Sarvam.Services.ServicesInterfaces
{
    public interface IMasterLeaveRequestService
    {
        Task<bool> CreateLeaveRequestAsync(MasterLeaveRequest leaveRequest);
        Task<List<MasterLeaveRequest>> GetLeaveRequestsByPrnAsync(long prn);
        Task<bool> DeleteLeaveRequestAsync(int requestId);
        Task<List<MasterLeaveRequest>> GetAllLeaveRequestsAsync();  // Add this line
        Task<bool> AcceptLeaveRequestAsync(int requestId);  // Add this line
        Task<bool> DeclinedLeaveRequestAsync(int requestId);


    }
}
