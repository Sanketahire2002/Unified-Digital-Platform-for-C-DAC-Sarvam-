using Sarvam.Data;
using Sarvam.Repository.RepositoryInterfaces;
using Sarvam.Services.ServicesInterfaces;
using System.Threading.Tasks;

namespace Sarvam.Services.ServicesImplementations
{
    public class MasterLeaveRequestService : IMasterLeaveRequestService
    {
        private readonly IMasterLeaveRequestRepository _leaveRequestRepository;

        public MasterLeaveRequestService(IMasterLeaveRequestRepository leaveRequestRepository)
        {
            _leaveRequestRepository = leaveRequestRepository;
        }

        public async Task<bool> CreateLeaveRequestAsync(MasterLeaveRequest leaveRequest)
        {
            // Calling the repository to add the leave request to the database
            return await _leaveRequestRepository.AddLeaveRequestAsync(leaveRequest);
        }
        public async Task<List<MasterLeaveRequest>> GetLeaveRequestsByPrnAsync(long prn)
        {
            return await _leaveRequestRepository.GetLeaveRequestsByPrnAsync(prn);
        }
        public async Task<bool> DeleteLeaveRequestAsync(int requestId)
        {
            return await _leaveRequestRepository.DeleteLeaveRequestAsync(requestId);
        }
        public async Task<List<MasterLeaveRequest>> GetAllLeaveRequestsAsync()
        {
            return await _leaveRequestRepository.GetAllLeaveRequestsAsync();  // Call the repository method
        }
        public async Task<bool> AcceptLeaveRequestAsync(int requestId)
        {
            return await _leaveRequestRepository.AcceptLeaveRequestAsync(requestId);  // Call the repository method to accept
        }

        public async Task<bool> DeclinedLeaveRequestAsync(int requestId)
        {
            return await _leaveRequestRepository.DeclinedLeaveRequestAsync(requestId);  // Call the repository method to accept
        }


    }
}
