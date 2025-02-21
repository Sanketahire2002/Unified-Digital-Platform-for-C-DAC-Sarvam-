package com.cdac.sarvam.controller;

import com.cdac.sarvam.dto.CCATDTO;
import com.cdac.sarvam.service.CCATService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ccat")
public class CCATController {

    @Autowired
    private CCATService ccatService;

    @PostMapping("/admission")
    public ResponseEntity<CCATDTO> checkAdmission(@RequestBody Map<String, String> request) {
        String formNumber = request.get("formNumber");
        String password = request.get("password");

        CCATDTO response = ccatService.checkAdmission(formNumber, password);

        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/update-status/{formNumber}")
    public ResponseEntity<String> updateStatus(@PathVariable String formNumber) {
        boolean isUpdated = ccatService.updateStatusToActive(formNumber);
        
        if (isUpdated) {
            return ResponseEntity.ok("Status updated to Active for form number: " + formNumber);
        } else {
            return ResponseEntity.badRequest().body("Form number not found or update failed.");
        }
    }

}
