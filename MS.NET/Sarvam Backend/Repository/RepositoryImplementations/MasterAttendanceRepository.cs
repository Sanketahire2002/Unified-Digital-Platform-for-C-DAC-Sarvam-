using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Repository.RepositoryImplementations
{
    public class MasterAttendanceRepository : IMasterAttendanceRepository
    {
        private readonly SarvamContext _context;

        public MasterAttendanceRepository(SarvamContext context)
        {
            _context = context;
        }

        public async Task AddAttendanceAsync(List<MasterAttendance> attendanceList)
        {
            await _context.MasterAttendances.AddRangeAsync(attendanceList);
            await _context.SaveChangesAsync();
        }

        // Implement the GetAllAttendanceAsync method
        public async Task<List<MasterAttendance>> GetAllAttendanceAsync()
        {
            return await _context.MasterAttendances.ToListAsync();  // Fetch all attendance records
        }

        // Implement the GetAttendanceByPRNAsync method
        public async Task<List<MasterAttendance>> GetAttendanceByPRNAsync(long prn)
        {
            return await _context.MasterAttendances
                                 .Where(a => a.PRN == prn)
                                 .ToListAsync();  // Fetch attendance records by PRN
        }
    }
}
