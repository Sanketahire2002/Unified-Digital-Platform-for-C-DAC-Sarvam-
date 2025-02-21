using Sarvam.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sarvam.Data;
using Sarvam.DTO;

namespace Sarvam.Services.ServicesInterfaces
{
    public interface IMasterProfileService
    {
        Task<IEnumerable<MasterProfile>> GetStudentsAsync();

        Task<MasterProfile> GetStudentByPRNAsync(long prn);

        Task<IEnumerable<MasterProfileDTO>> GetAllProfilesAsync();
        Task<MasterProfileDTO> GetProfileByIdAsync(long id);
        Task<IEnumerable<MasterProfileDTO>> GetProfilesByRoleAsync(string role);
        Task CreateProfileAsync(MasterProfileDTO profileDTO);
        Task<bool> UpdateProfileAsync(long id, MasterProfileDTO profileDTO);
        Task<bool> DeleteProfileAsync(long id);
    }
}
