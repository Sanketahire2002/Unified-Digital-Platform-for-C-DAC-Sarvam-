using Sarvam.DTO;
using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;

namespace Sarvam.Service.ServicesImplementations
{
    public class MasterModuleService : IMasterModuleService
    {
        private readonly IMasterModuleRepository _repository;

        public MasterModuleService(IMasterModuleRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MasterModuleDTO>> GetAllAsync()
        {
            var modules = await _repository.GetAllAsync();
            return modules.Select(MapToDTO).ToList();
        }

        public async Task<MasterModule> GetByNameAsync(string moduleName)
        {
            return await _repository.GetByNameAsync(moduleName);
        }

        public async Task<MasterModuleDTO> GetByIdAsync(int id)
        {
            var module = await _repository.GetByIdAsync(id);
            return module != null ? MapToDTO(module) : null;
        }

        public async Task<MasterModuleDTO> AddAsync(MasterModuleDTO masterModuleDTO)
        {
            //Console.WriteLine(masterModuleDTO.InstructorId);
            var instructor = await _repository.GetProfileByIdAsync(masterModuleDTO.InstructorId);
            if (instructor == null) throw new KeyNotFoundException("Instructor does not exist.");

            var moCo = await _repository.GetProfileByIdAsync(masterModuleDTO.MoCoId);
            if (moCo == null) throw new KeyNotFoundException("MoCo does not exist.");

            var masterModule = new MasterModule
            {
                ModuleName = masterModuleDTO.ModuleName,
                ModuleStartDate = masterModuleDTO.ModuleStartDate,
                ModuleEndDate = masterModuleDTO.ModuleEndDate,
                InstructorId = masterModuleDTO.InstructorId,
                MoCoId = masterModuleDTO.MoCoId,
                NoOfDays = masterModuleDTO.NoOfDays,
                DurationHours = masterModuleDTO.DurationHours,
                Instructor = instructor,
                MoCo = moCo
            };

            await _repository.AddAsync(masterModule);

            return MapToDTO(masterModule);
        }

        public async Task UpdateAsync(int id, MasterModuleDTO masterModuleDTO)
        {
            var module = await _repository.GetByIdAsync(id);
            if (module == null) throw new KeyNotFoundException("Module not found.");

            module.ModuleName = masterModuleDTO.ModuleName;
            module.ModuleStartDate = masterModuleDTO.ModuleStartDate;
            module.ModuleEndDate = masterModuleDTO.ModuleEndDate;
            module.InstructorId = masterModuleDTO.InstructorId;
            module.MoCoId = masterModuleDTO.MoCoId;
            module.NoOfDays = masterModuleDTO.NoOfDays;
            module.DurationHours = masterModuleDTO.DurationHours;

            await _repository.UpdateAsync(module);
        }

        public async Task DeleteAsync(int id)
        {
            var module = await _repository.GetByIdAsync(id);
            if (module == null) throw new KeyNotFoundException("Module not found.");

            await _repository.DeleteAsync(module);
        }

        private MasterModuleDTO MapToDTO(MasterModule module)
        {
            return new MasterModuleDTO
            {
                ModuleId = module.ModuleId,
                ModuleName = module.ModuleName,
                ModuleStartDate = module.ModuleStartDate,
                ModuleEndDate = module.ModuleEndDate,
                InstructorId = (long)(module.Instructor?.PRN), // Null check for Instructor
                InstructorName = module.Instructor?.FirstName, // Null check for Instructor
                InstructorLastName = module.Instructor?.LastName,
                MoCoId = (long)(module.MoCo?.PRN), // Null check for MoCo
                MoCoName = module.MoCo?.FirstName, // Null check for MoCo
                LastName = module.MoCo?.LastName,
                NoOfDays = module.NoOfDays,
                DurationHours = module.DurationHours,
                MasterModuleSubpoints = module.MasterModuleSubpoints?.Select(s => new MasterModuleSubpointDTO
                {
                    SubId = s.SubId,
                    ModuleId = s.ModuleId,
                    ModuleSubpointName = s.ModuleSubpointName
                }).ToList() // Null check for MasterModuleSubpoints
            };
        }

    }
}
