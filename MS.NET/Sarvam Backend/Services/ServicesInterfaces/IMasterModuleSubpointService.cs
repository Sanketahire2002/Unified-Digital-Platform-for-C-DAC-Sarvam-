using Sarvam.DTO;
using Sarvam.Models;

namespace Sarvam.Service
{
    public interface IMasterModuleSubpointService
    {
        Task<IEnumerable<MasterModuleSubpointDTO>> GetAllAsync();
        Task<MasterModuleSubpointDTO> GetByIdAsync(int id);
        Task CreateAsync(MasterModuleSubpointDTO subpointDTO);
        Task UpdateAsync(int id, MasterModuleSubpointDTO subpointDTO);
        Task DeleteAsync(int id);
    }
}
