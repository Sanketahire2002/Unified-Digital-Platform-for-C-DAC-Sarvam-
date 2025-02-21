using Sarvam.Models;

namespace Sarvam.Repository.RepositoryInterfaces
{
    public interface IMasterModuleSubpointRepository
    {
        Task<IEnumerable<MasterModuleSubpoint>> GetAllAsync();
        Task<MasterModuleSubpoint> GetByIdAsync(int id);
        Task AddAsync(MasterModuleSubpoint subpoint);
        Task UpdateAsync(MasterModuleSubpoint subpoint);
        Task DeleteAsync(MasterModuleSubpoint subpoint);
        Task<bool> ModuleExistsAsync(int moduleId);
    }
}
