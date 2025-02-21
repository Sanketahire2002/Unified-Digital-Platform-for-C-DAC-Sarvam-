using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sarvam.Repository.RepositoryImplementations
{
    public class MasterProfileRepository : IMasterProfileRepository
    {
        private readonly SarvamContext _context;

        public MasterProfileRepository(SarvamContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MasterProfile>> GetStudentsAsync()
        {
            return await _context.MasterProfiles
                .Where(mp => mp.Role == "Student")
                .ToListAsync();
        }
        public async Task<MasterProfile> GetStudentByPRNAsync(long prn)
        {
            return await _context.MasterProfiles
                .FirstOrDefaultAsync(p => p.PRN == prn && p.Role == "Student");
        }

        public async Task<IEnumerable<MasterProfile>> GetAllProfilesAsync()
        {
            return await _context.MasterProfiles.ToListAsync();
        }

        public async Task<MasterProfile> GetProfileByIdAsync(long id)
        {
            return await _context.MasterProfiles.FindAsync(id);
        }

        public async Task<IEnumerable<MasterProfile>> GetProfilesByRoleAsync(string role)
        {
            return await _context.MasterProfiles.Where(p => p.Role == role).ToListAsync();
        }

        public async Task CreateProfileAsync(MasterProfile profile)
        {
            _context.MasterProfiles.Add(profile);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProfileAsync(MasterProfile profile)
        {
            _context.Entry(profile).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProfileAsync(MasterProfile profile)
        {
            _context.MasterProfiles.Remove(profile);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ProfileExistsAsync(long id)
        {
            return await _context.MasterProfiles.AnyAsync(p => p.PRN == id);
        }
    }
}
