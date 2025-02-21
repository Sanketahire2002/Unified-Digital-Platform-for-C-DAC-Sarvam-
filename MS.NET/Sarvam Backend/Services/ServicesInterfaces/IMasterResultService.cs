using Sarvam.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Services
{
    public interface IMasterResultService
    {
        Task<IEnumerable<MasterResult>> GetAllResultsAsync();
        Task<MasterResult> GetResultByIdAsync(int id);
        Task<IEnumerable<MasterResult>> GetResultsByModuleIdAsync(int moduleId);
        Task<IEnumerable<MasterResult>> GetResultsByPRNAsync(long prn);
        Task AddResultAsync(MasterResult result);
        Task UpdateResultAsync(MasterResult result);
        Task DeleteResultAsync(int id);
    }
}
