using Sarvam.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sarvam.Repository.RepositoryInterfaces
{
    public interface IMasterProfileRepository
    {
        Task<IEnumerable<MasterProfile>> GetStudentsAsync();
        Task<MasterProfile> GetStudentByPRNAsync(long prn);

        Task<IEnumerable<MasterProfile>> GetAllProfilesAsync();
        Task<MasterProfile> GetProfileByIdAsync(long id);
        Task<IEnumerable<MasterProfile>> GetProfilesByRoleAsync(string role);
        Task CreateProfileAsync(MasterProfile profile);
        Task UpdateProfileAsync(MasterProfile profile);
        Task DeleteProfileAsync(MasterProfile profile);
        Task<bool> ProfileExistsAsync(long id);
    }
}
