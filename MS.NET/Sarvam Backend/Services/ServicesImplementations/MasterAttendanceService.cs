using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;
using Sarvam.Services.ServicesInterfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Services.ServicesImplementations
{
    public class MasterAttendanceService : IMasterAttendanceService
    {
        private readonly IMasterAttendanceRepository _attendanceRepository;

        public MasterAttendanceService(IMasterAttendanceRepository attendanceRepository)
        {
            _attendanceRepository = attendanceRepository;
        }

        public async Task AddAttendanceAsync(List<MasterAttendance> attendanceList)
        {
            await _attendanceRepository.AddAttendanceAsync(attendanceList);
        }

        // Implement the GetAllAttendanceAsync method
        public async Task<List<MasterAttendance>> GetAllAttendanceAsync()
        {
            return await _attendanceRepository.GetAllAttendanceAsync();  // Call to repository
        }

        // Implement the GetAttendanceByPRNAsync method
        public async Task<List<MasterAttendance>> GetAttendanceByPRNAsync(long prn)
        {
            return await _attendanceRepository.GetAttendanceByPRNAsync(prn);  // Call to repository
        }
    }
}
