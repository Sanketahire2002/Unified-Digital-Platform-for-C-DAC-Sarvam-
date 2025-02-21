using Sarvam.Models;

namespace Sarvam.Repository.RepositoryInterfaces
{
    public interface IMasterModuleRepository
    {
        Task<IEnumerable<MasterModule>> GetAllAsync();

        Task<MasterModule> GetByNameAsync(string moduleName);
        Task<MasterModule> GetByIdAsync(int id);
        Task AddAsync(MasterModule module);
        Task UpdateAsync(MasterModule module);
        Task DeleteAsync(MasterModule module);
        Task<MasterProfile> GetProfileByIdAsync(long profileId); // For Instructor and MoCo validation
    }
}
