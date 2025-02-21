package com.cdac.sarvam.service;

import com.cdac.sarvam.model.MasterLeaveRequest;
import com.cdac.sarvam.repository.MasterLeaveRequestRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MasterLeaveRequestService {

    private final MasterLeaveRequestRepository leaveRequestRepository;

    public MasterLeaveRequestService(MasterLeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    public MasterLeaveRequest saveLeaveRequest(MasterLeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }
    
    public List<MasterLeaveRequest> getLeaveRequestsByPrn(Long prn) {
        return leaveRequestRepository.findByMasterProfile_Prn(prn);
    }

    public boolean existsById(Long requestId) {
        return leaveRequestRepository.existsById(requestId);
    }

    public void deleteLeaveRequest(Long requestId) {
        leaveRequestRepository.deleteById(requestId);
    }

    public List<MasterLeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

 // Get leave request by ID
    public MasterLeaveRequest getLeaveRequestById(Long requestId) {
        return leaveRequestRepository.findById(requestId).orElse(null);
    }
}
