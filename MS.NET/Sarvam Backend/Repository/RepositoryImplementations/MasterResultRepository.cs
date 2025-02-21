using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Repositories
{
    public class MasterResultRepository : IMasterResultRepository
    {
        private readonly SyllabusDbContext _context;

        public MasterResultRepository(SyllabusDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MasterResult>> GetAllAsync()
        {
            return await _context.MasterResults.Include(mr => mr.MasterModule)
                                               .Include(mr => mr.MasterProfile)
                                               .ToListAsync();
        }

        public async Task<MasterModule> GetByNameAsync(string moduleName)
        {
            return await _context.MasterModules
                .Where(m => m.ModuleName.Equals(moduleName, StringComparison.OrdinalIgnoreCase))
                .FirstOrDefaultAsync();
        }

        public async Task<MasterResult> GetByIdAsync(int id)
        {
            return await _context.MasterResults.FindAsync(id);
        }

        public async Task AddAsync(MasterResult result)
        {
            await _context.MasterResults.AddAsync(result);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(MasterResult result)
        {
            _context.MasterResults.Update(result);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var result = await _context.MasterResults.FindAsync(id);
            if (result != null)
            {
                _context.MasterResults.Remove(result);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<MasterResult>> GetResultsByModuleIdAsync(int moduleId)
        {
            return await _context.MasterResults
                .Where(r => r.ModuleId == moduleId)
                .ToListAsync();
        }

        public async Task<IEnumerable<MasterResult>> GetResultsByPRNAsync(long prn)
        {
            return await _context.MasterResults
                .Where(r => r.PRN == prn)
                .ToListAsync();
        }
    }
}
