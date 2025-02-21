using Sarvam.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Services.ServicesInterfaces
{
    public interface IMasterAttendanceService
    {
        Task AddAttendanceAsync(List<MasterAttendance> attendanceList);
        Task<List<MasterAttendance>> GetAllAttendanceAsync();  // Add this method
        Task<List<MasterAttendance>> GetAttendanceByPRNAsync(long prn);  // New method for fetching attendance by PRN
    }
}
