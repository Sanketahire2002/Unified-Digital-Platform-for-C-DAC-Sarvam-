package com.cdac.sarvam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.sarvam.model.MasterProfile;

import java.util.List;
import java.util.Optional;

@Repository
public interface MasterProfileRepository extends JpaRepository<MasterProfile, Long> {
    
    // Custom query method to find users by role (assuming "STUDENT" role)
    public List<MasterProfile> findByRole(MasterProfile.RoleEnum role); 
    
    Optional<MasterProfile> findByPrn(Long prn);
}
