using Sarvam.Models;
using Sarvam.Repository.RepositoryInterfaces;
using Sarvam.Services.ServicesInterfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sarvam.DTO;
using Microsoft.EntityFrameworkCore;

namespace Sarvam.Services.ServicesImplementations
{
    public class MasterProfileService : IMasterProfileService
    {
        private readonly IMasterProfileRepository _repository;

        public MasterProfileService(IMasterProfileRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MasterProfile>> GetStudentsAsync()
        {
            return await _repository.GetStudentsAsync();
        }

        // Get a student by PRN
        public async Task<MasterProfile> GetStudentByPRNAsync(long prn)
        {
            return await _repository.GetStudentByPRNAsync(prn);
        }


        public async Task<IEnumerable<MasterProfileDTO>> GetAllProfilesAsync()
        {
            var profiles = await _repository.GetAllProfilesAsync();
            return profiles.Select(p => new MasterProfileDTO
            {
                PRN = p.PRN,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Role = p.Role,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            }).ToList();
        }

        public async Task<MasterProfileDTO> GetProfileByIdAsync(long id)
        {
            var profile = await _repository.GetProfileByIdAsync(id);
            if (profile == null) return null;

            return new MasterProfileDTO
            {
                PRN = profile.PRN,
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                Role = profile.Role,
                CreatedAt = profile.CreatedAt,
                UpdatedAt = profile.UpdatedAt
            };
        }

        public async Task<IEnumerable<MasterProfileDTO>> GetProfilesByRoleAsync(string role)
        {
            var profiles = await _repository.GetProfilesByRoleAsync(role);
            return profiles.Select(p => new MasterProfileDTO
            {
                PRN = p.PRN,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Role = p.Role,
            }).ToList();
        }

        public async Task CreateProfileAsync(MasterProfileDTO profileDTO)
        {
            var profile = new MasterProfile
            {
                PRN = profileDTO.PRN,
                FirstName = profileDTO.FirstName,
                LastName = profileDTO.LastName,
                Role = profileDTO.Role,
                CreatedAt = profileDTO.CreatedAt,
                UpdatedAt = profileDTO.UpdatedAt
            };
            await _repository.CreateProfileAsync(profile);
        }

        public async Task<bool> UpdateProfileAsync(long id, MasterProfileDTO profileDTO)
        {
            if (id != profileDTO.PRN)
                return false;

            var existingProfile = await _repository.GetProfileByIdAsync(id);
            if (existingProfile == null)
                return false;

            existingProfile.FirstName = profileDTO.FirstName;
            existingProfile.LastName = profileDTO.LastName;
            existingProfile.Role = profileDTO.Role;
            existingProfile.UpdatedAt = profileDTO.UpdatedAt;

            await _repository.UpdateProfileAsync(existingProfile);
            return true;
        }

        public async Task<bool> DeleteProfileAsync(long id)
        {
            var profile = await _repository.GetProfileByIdAsync(id);
            if (profile == null)
                return false;

            await _repository.DeleteProfileAsync(profile);
            return true;
        }
    }
}
