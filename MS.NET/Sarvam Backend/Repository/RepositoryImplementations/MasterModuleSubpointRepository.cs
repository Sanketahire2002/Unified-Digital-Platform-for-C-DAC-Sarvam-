using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;

namespace Sarvam.Repository.RepositoryImplementations
{
    public class MasterModuleSubpointRepository : IMasterModuleSubpointRepository
    {
        private readonly SyllabusDbContext _context;

        public MasterModuleSubpointRepository(SyllabusDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MasterModuleSubpoint>> GetAllAsync()
        {
            return await _context.MasterModuleSubpoints
                .Include(s => s.MasterModule)
                .ToListAsync();
        }

        public async Task<MasterModuleSubpoint> GetByIdAsync(int id)
        {
            return await _context.MasterModuleSubpoints
                .Include(s => s.MasterModule)
                .FirstOrDefaultAsync(s => s.SubId == id);
        }

        public async Task AddAsync(MasterModuleSubpoint subpoint)
        {
            _context.MasterModuleSubpoints.Add(subpoint);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(MasterModuleSubpoint subpoint)
        {
            _context.Entry(subpoint).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(MasterModuleSubpoint subpoint)
        {
            _context.MasterModuleSubpoints.Remove(subpoint);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ModuleExistsAsync(int moduleId)
        {
            return await _context.MasterModules.AnyAsync(m => m.ModuleId == moduleId);
        }
    }
}
