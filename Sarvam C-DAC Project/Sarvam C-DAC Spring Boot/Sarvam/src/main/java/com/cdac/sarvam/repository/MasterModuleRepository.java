package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.MasterModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MasterModuleRepository extends JpaRepository<MasterModule, Integer> {
    Optional<MasterModule> findByModuleName(String moduleName);
}
