package com.cdac.sarvam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.sarvam.model.MasterLeaveRequest;

public interface MasterLeaveRequestRepository extends JpaRepository<MasterLeaveRequest, Long> {
	List<MasterLeaveRequest> findByMasterProfile_Prn(Long prn);
}
