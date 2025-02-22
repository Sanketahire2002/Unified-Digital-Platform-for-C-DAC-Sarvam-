package com.cdac.sarvam.controller;

import com.cdac.sarvam.dto.AttendanceDTO;
import com.cdac.sarvam.dto.AttendanceRequestDTO;
import com.cdac.sarvam.exceptions.ResourceNotFoundException;
import com.cdac.sarvam.model.MasterAttendance;
import com.cdac.sarvam.model.MasterProfile;
import com.cdac.sarvam.repository.MasterAttendanceRepository;
import com.cdac.sarvam.repository.MasterProfileRepository;
import com.cdac.sarvam.service.MasterAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/MasterAttendance")
public class MasterAttendanceController {

    @Autowired
    private MasterAttendanceService masterAttendanceService;
    
    @Autowired
    private MasterAttendanceRepository masterAttendanceRepository;

    @Autowired
    private MasterProfileRepository masterProfileRepository;


//    @GetMapping
//    public List<MasterAttendance> getAllMasterAttendance() {
//        return masterAttendanceService.getAllAttendance();
//    }
    
    @GetMapping
    public ResponseEntity<List<MasterAttendance>> getAllAttendance() {
        try {
            List<MasterAttendance> attendanceList = masterAttendanceRepository.findAll();
            
            if (attendanceList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(attendanceList);
            }

            return ResponseEntity.ok(attendanceList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    
    @PostMapping
    public ResponseEntity<String> submitAttendance(@RequestBody List<AttendanceDTO> attendanceList) {
        try {
            //System.out.println("Received Attendance List: " + attendanceList);

            for (AttendanceDTO attendanceDTO : attendanceList) {
                if (attendanceDTO.getPRN() == null || attendanceDTO.getDate() == null || attendanceDTO.getDate().isEmpty()) {
                    return ResponseEntity.badRequest().body("PRN or Date is missing.");
                }

                // Parse date if needed
                LocalDate date = LocalDate.parse(attendanceDTO.getDate());

                // Fetch profile
                MasterProfile profile = masterProfileRepository.findById(attendanceDTO.getPRN())
                    .orElseThrow(() -> new ResourceNotFoundException("Profile not found for PRN: " + attendanceDTO.getPRN()));

                // Save attendance
                masterAttendanceService.saveAttendance(profile, date, attendanceDTO.isStatus());
            }

            return ResponseEntity.ok("Attendance marked successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/get-by-prn")
    public List<MasterAttendance> getAttendanceByPrn(@RequestBody Map<String, Long> request) {
        Long prn = request.get("prn");
        //System.out.println("Received PRN: " + prn);
        return masterAttendanceService.getAttendanceByPrn(prn);
    }

}
