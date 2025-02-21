using Sarvam.DTO;
using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;

namespace Sarvam.Service.ServicesImplementations
{
    public class MasterModuleSubpointService : IMasterModuleSubpointService
    {
        private readonly IMasterModuleSubpointRepository _repository;

        public MasterModuleSubpointService(IMasterModuleSubpointRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MasterModuleSubpointDTO>> GetAllAsync()
        {
            var subpoints = await _repository.GetAllAsync();
            return subpoints.Select(s => new MasterModuleSubpointDTO
            {
                SubId = s.SubId,
                ModuleId = s.ModuleId,
                ModuleSubpointName = s.ModuleSubpointName
            });
        }

        public async Task<MasterModuleSubpointDTO> GetByIdAsync(int id)
        {
            var subpoint = await _repository.GetByIdAsync(id);
            if (subpoint == null)
                return null;

            return new MasterModuleSubpointDTO
            {
                SubId = subpoint.SubId,
                ModuleId = subpoint.ModuleId,
                ModuleSubpointName = subpoint.ModuleSubpointName
            };
        }

        public async Task CreateAsync(MasterModuleSubpointDTO subpointDTO)
        {
            if (!await _repository.ModuleExistsAsync(subpointDTO.ModuleId))
            {
                throw new Exception("Module with the given ID does not exist.");
            }

            var subpoint = new MasterModuleSubpoint
            {
                ModuleId = subpointDTO.ModuleId,
                ModuleSubpointName = subpointDTO.ModuleSubpointName
            };

            await _repository.AddAsync(subpoint);
        }

        public async Task UpdateAsync(int id, MasterModuleSubpointDTO subpointDTO)
        {
            if (id != subpointDTO.SubId)
            {
                throw new Exception("ID mismatch.");
            }

            var subpoint = await _repository.GetByIdAsync(id);
            if (subpoint == null)
            {
                throw new Exception("Subpoint not found.");
            }

            if (!await _repository.ModuleExistsAsync(subpointDTO.ModuleId))
            {
                throw new Exception("Module with the given ID does not exist.");
            }

            subpoint.ModuleId = subpointDTO.ModuleId;
            subpoint.ModuleSubpointName = subpointDTO.ModuleSubpointName;

            await _repository.UpdateAsync(subpoint);
        }

        public async Task DeleteAsync(int id)
        {
            var subpoint = await _repository.GetByIdAsync(id);
            if (subpoint == null)
            {
                throw new Exception("Subpoint not found.");
            }

            await _repository.DeleteAsync(subpoint);
        }
    }
}
