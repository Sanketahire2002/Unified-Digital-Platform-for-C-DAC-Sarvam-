package com.cdac.sarvam.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.sarvam.model.MasterStudyMaterial;

@Repository
public interface MasterStudyMaterialRepository extends JpaRepository<MasterStudyMaterial, Long> {
}
