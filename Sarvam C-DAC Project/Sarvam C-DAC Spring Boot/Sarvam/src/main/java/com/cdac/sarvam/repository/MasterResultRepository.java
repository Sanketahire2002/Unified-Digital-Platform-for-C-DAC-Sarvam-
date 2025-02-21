package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.MasterResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MasterResultRepository extends JpaRepository<MasterResult, Integer> {
    List<MasterResult> findByModule_ModuleId(Integer moduleId);
    List<MasterResult> findByStudent_Prn(Long prn);
}
