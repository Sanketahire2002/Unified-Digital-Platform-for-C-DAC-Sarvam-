using Microsoft.EntityFrameworkCore;
using Sarvam.Models;
using Sarvam.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Services
{
    public class MasterResultService : IMasterResultService
    {
        private readonly IMasterResultRepository _repository;

        public MasterResultService(IMasterResultRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MasterResult>> GetAllResultsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<MasterResult> GetResultByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddResultAsync(MasterResult result)
        {
            await _repository.AddAsync(result);
        }

        public async Task UpdateResultAsync(MasterResult result)
        {
            await _repository.UpdateAsync(result);
        }

        public async Task DeleteResultAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        // Get results by ModuleId
        public async Task<IEnumerable<MasterResult>> GetResultsByModuleIdAsync(int moduleId)
        {
            return await _repository.GetResultsByModuleIdAsync(moduleId);
        }

        // Get results by PRN
        public async Task<IEnumerable<MasterResult>> GetResultsByPRNAsync(long prn)
        {
            return await _repository.GetResultsByPRNAsync(prn);
        }
    }
}
