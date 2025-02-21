package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.MasterModuleSubpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MasterModuleSubpointRepository extends JpaRepository<MasterModuleSubpoint, Integer> {
    List<MasterModuleSubpoint> findByModuleModuleId(Integer moduleId);
}
