package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.MasterCompanies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterCompaniesRepository extends JpaRepository<MasterCompanies, Integer> {
}
