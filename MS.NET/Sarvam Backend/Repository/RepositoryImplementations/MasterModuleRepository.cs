using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;

namespace Sarvam.Repository.RepositoryImplementations
{
    public class MasterModuleRepository : IMasterModuleRepository
    {
        private readonly SyllabusDbContext _context;

        public MasterModuleRepository(SyllabusDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MasterModule>> GetAllAsync()
        {
            return await _context.MasterModules
                .Include(mm => mm.Instructor)
                .Include(mm => mm.MoCo)
                .Include(mm => mm.MasterModuleSubpoints)
                .ToListAsync();
        }

        public async Task<MasterModule> GetByIdAsync(int id)
        {
            return await _context.MasterModules
                .Include(mm => mm.Instructor)
                .Include(mm => mm.MoCo)
                .Include(mm => mm.MasterModuleSubpoints)
                .FirstOrDefaultAsync(mm => mm.ModuleId == id);
        }

        public async Task<MasterModule> GetByNameAsync(string moduleName)
        {
            return await _context.MasterModules
                .Where(m => m.ModuleName.ToLower() == moduleName.ToLower())
                .FirstOrDefaultAsync();
        }


        public async Task AddAsync(MasterModule module)
        {
            await _context.MasterModules.AddAsync(module);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(MasterModule module)
        {
            _context.MasterModules.Update(module);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(MasterModule module)
        {
            _context.MasterModules.Remove(module);
            await _context.SaveChangesAsync();
        }

        public async Task<MasterProfile> GetProfileByIdAsync(long profileId)
        {
            //Console.WriteLine(profileId);
            return await _context.MasterProfiles.FindAsync(profileId);
        }
    }
}
