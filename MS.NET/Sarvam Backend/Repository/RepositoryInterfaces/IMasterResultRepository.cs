using System.Collections.Generic;
using System.Threading.Tasks;
using Sarvam.Models;

namespace Sarvam.Repositories
{
    public interface IMasterResultRepository
    {
        Task<IEnumerable<MasterResult>> GetAllAsync();
        Task<MasterResult> GetByIdAsync(int id);
        Task AddAsync(MasterResult result);
        Task UpdateAsync(MasterResult result);
        Task DeleteAsync(int id);

        // New methods for filtering by ModuleId and PRN
        Task<IEnumerable<MasterResult>> GetResultsByModuleIdAsync(int moduleId);
        Task<IEnumerable<MasterResult>> GetResultsByPRNAsync(long prn);
    }
}
