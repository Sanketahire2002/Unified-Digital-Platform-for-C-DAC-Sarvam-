package com.cdac.sarvam.controller;

import com.cdac.sarvam.model.MasterLeaveRequest;
import com.cdac.sarvam.model.MasterProfile;
import com.cdac.sarvam.dto.MasterLeaveRequestDTO;
import com.cdac.sarvam.service.MasterLeaveRequestService;
import com.cdac.sarvam.service.MasterProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/MasterLeaveRequest")
public class MasterLeaveRequestController {

    private final MasterLeaveRequestService leaveRequestService;
    private final MasterProfileService masterProfileService;

    public MasterLeaveRequestController(MasterLeaveRequestService leaveRequestService, MasterProfileService masterProfileService) {
        this.leaveRequestService = leaveRequestService;
        this.masterProfileService = masterProfileService;
    }

    @PostMapping
    public ResponseEntity<?> createLeaveRequest(@RequestBody MasterLeaveRequestDTO leaveRequestDTO) {
        // Fetch MasterProfile by PRN
        MasterProfile masterProfile = masterProfileService.findByPrn(leaveRequestDTO.getPrn());

        if (masterProfile == null) {
            return ResponseEntity.badRequest().body("Invalid PRN: MasterProfile not found");
        }

        // Create MasterLeaveRequest object
        MasterLeaveRequest leaveRequest = new MasterLeaveRequest();
        leaveRequest.setMasterProfile(masterProfile);
        leaveRequest.setFromDate(leaveRequestDTO.getFromDate());
        leaveRequest.setEndDate(leaveRequestDTO.getToDate());
        leaveRequest.setSubject(leaveRequestDTO.getSubject());
        leaveRequest.setDescription(leaveRequestDTO.getDescription());
        leaveRequest.setStatus("Pending");
        leaveRequest.setCreatedAt(LocalDateTime.now());
        leaveRequest.setUpdatedAt(LocalDateTime.now());

        // Save to database
        MasterLeaveRequest savedRequest = leaveRequestService.saveLeaveRequest(leaveRequest);

        return ResponseEntity.ok(savedRequest);
    }
    
    @PostMapping("/GetByPrn")
    public ResponseEntity<?> getLeaveRequestsByPrn(@RequestBody Map<String, Long> request) {
        Long prn = request.get("prn");
        
        // Validate PRN
        if (prn == null) {
            return ResponseEntity.badRequest().body("PRN is required");
        }

        // Fetch MasterProfile by PRN
        MasterProfile masterProfile = masterProfileService.findByPrn(prn);
        if (masterProfile == null) {
            return ResponseEntity.badRequest().body("Invalid PRN: MasterProfile not found");
        }

        // Fetch Leave Requests
        List<MasterLeaveRequest> leaveRequests = leaveRequestService.getLeaveRequestsByPrn(prn);

        // Return Response
        return ResponseEntity.ok(leaveRequests);
    }
    
    @PostMapping("/Delete")
    public ResponseEntity<?> deleteLeaveRequest(@RequestBody Map<String, Long> request) {
        Long requestId = request.get("requestId");

        // Validate requestId
        if (requestId == null) {
            return ResponseEntity.badRequest().body("Request ID is required");
        }

        // Check if leave request exists
        boolean exists = leaveRequestService.existsById(requestId);
        if (!exists) {
            return ResponseEntity.badRequest().body("Leave request not found for ID: " + requestId);
        }

        // Delete the leave request
        leaveRequestService.deleteLeaveRequest(requestId);

        return ResponseEntity.ok("Leave request deleted successfully.");
    }

    @GetMapping
    public ResponseEntity<?> getAllLeaveRequests() {
        List<MasterLeaveRequest> leaveRequests = leaveRequestService.getAllLeaveRequests();

        if (leaveRequests.isEmpty()) {
            return ResponseEntity.ok("No leave requests found.");
        }

        return ResponseEntity.ok(leaveRequests);
    }

    @PostMapping("/Accept")
    public ResponseEntity<?> acceptLeaveRequest(@RequestBody Map<String, Long> request) {
        Long requestId = request.get("requestId");

        // Validate requestId
        if (requestId == null) {
            return ResponseEntity.badRequest().body("Request ID is required");
        }

        // Check if leave request exists
        MasterLeaveRequest leaveRequest = leaveRequestService.getLeaveRequestById(requestId);
        if (leaveRequest == null) {
            return ResponseEntity.badRequest().body("Leave request not found for ID: " + requestId);
        }

        // Update status to "Accepted"
        leaveRequest.setStatus("Accepted");
        leaveRequest.setUpdatedAt(LocalDateTime.now());

        // Save updated leave request
        leaveRequestService.saveLeaveRequest(leaveRequest);

        return ResponseEntity.ok("Leave request accepted successfully.");
    }
    
    @PostMapping("/Decline")
    public ResponseEntity<?> declineLeaveRequest(@RequestBody Map<String, Long> request) {
        Long requestId = request.get("requestId");

        // Validate requestId
        if (requestId == null) {
            return ResponseEntity.badRequest().body("Request ID is required");
        }

        // Check if leave request exists
        MasterLeaveRequest leaveRequest = leaveRequestService.getLeaveRequestById(requestId);
        if (leaveRequest == null) {
            return ResponseEntity.badRequest().body("Leave request not found for ID: " + requestId);
        }

        // Update status to "Accepted"
        leaveRequest.setStatus("Declined");
        leaveRequest.setUpdatedAt(LocalDateTime.now());

        // Save updated leave request
        leaveRequestService.saveLeaveRequest(leaveRequest);

        return ResponseEntity.ok("Leave request declined successfully.");
    }

}
