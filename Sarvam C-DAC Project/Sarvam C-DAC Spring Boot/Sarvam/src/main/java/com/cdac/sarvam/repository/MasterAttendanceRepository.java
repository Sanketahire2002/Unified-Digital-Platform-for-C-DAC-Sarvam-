package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.MasterAttendance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterAttendanceRepository extends JpaRepository<MasterAttendance, Long> {
	public List<MasterAttendance> findByMasterProfilePrn(Long prn);
}
