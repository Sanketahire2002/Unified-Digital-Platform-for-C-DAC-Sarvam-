using Sarvam.DTO;
using Sarvam.Models;

namespace Sarvam.Service
{
    public interface IMasterModuleService
    {
        Task<IEnumerable<MasterModuleDTO>> GetAllAsync();
        Task<MasterModule> GetByNameAsync(string moduleName);
        Task<MasterModuleDTO> GetByIdAsync(int id);
        Task<MasterModuleDTO> AddAsync(MasterModuleDTO masterModuleDTO);
        Task UpdateAsync(int id, MasterModuleDTO masterModuleDTO);
        Task DeleteAsync(int id);
    }
}
