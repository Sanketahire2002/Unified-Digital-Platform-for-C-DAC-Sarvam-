package com.cdac.sarvam.service;

import com.cdac.sarvam.model.MasterProfile;
import com.cdac.sarvam.model.MasterProfile.RoleEnum;
import com.cdac.sarvam.repository.MasterProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MasterProfileService {

    @Autowired
    private MasterProfileRepository masterProfileRepository;
    
    public MasterProfileService() {this.masterProfileRepository = masterProfileRepository;}
    
    public MasterProfileService(MasterProfileRepository masterProfileRepository) {
        this.masterProfileRepository = masterProfileRepository;
    }

    public MasterProfile findByPrn(Long prn) {
        Optional<MasterProfile> profile = masterProfileRepository.findById(prn);
        return profile.orElse(null);
    }

    // Get all students (Assuming "STUDENT" is a role enum value)
    public List<MasterProfile> getStudents() {
        return masterProfileRepository.findByRole(RoleEnum.Student); // Querying for students by role
    }
    

    public MasterProfile getStudentByPRN(Long prn) {
        return masterProfileRepository.findByPrn(prn).orElse(null);
    }

    public List<MasterProfile> getAllProfiles() {
        return masterProfileRepository.findAll();
    }

    public MasterProfile getProfileById(Long id) {
        return masterProfileRepository.findById(id).orElse(null);
    }

    public MasterProfile createProfile(MasterProfile profile) {
        return masterProfileRepository.save(profile);
    }

    public MasterProfile updateProfile(Long id, MasterProfile updatedProfile) {
        if (!masterProfileRepository.existsById(id)) {
            return null;
        }
        updatedProfile.setPrn(id);
        return masterProfileRepository.save(updatedProfile);
    }

    public boolean deleteProfile(Long id) {
        if (!masterProfileRepository.existsById(id)) {
            return false;
        }
        masterProfileRepository.deleteById(id);
        return true;
    }

    public List<MasterProfile> getProfilesByRole(String role) {
        return masterProfileRepository.findByRole(RoleEnum.valueOf(role));
    }
}
