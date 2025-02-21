package com.cdac.sarvam.service;

import com.cdac.sarvam.dto.CCATDTO;
import com.cdac.sarvam.model.CCAT;
import com.cdac.sarvam.repository.CCATRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CCATService {

    @Autowired
    private CCATRepository ccatRepository;

    public CCATDTO checkAdmission(String formNumber, String password) {
        Optional<CCAT> optionalCCAT = ccatRepository.findByFormNumber(formNumber);

        if (optionalCCAT.isEmpty()) {
            return new CCATDTO("Not Found", null);
        }

        CCAT ccat = optionalCCAT.get();

        if (!ccat.getPassword().equals(password)) {
            return new CCATDTO("Invalid Credentials", null);
        }

        if ("Active".equalsIgnoreCase(ccat.getStatus())) {
            return new CCATDTO("Already Admitted", null);
        }

        return new CCATDTO("Admission Successful", ccat);
    }
    
    public boolean updateStatusToActive(String formNumber) {
        Optional<CCAT> optionalCCAT = ccatRepository.findByFormNumber(formNumber);
        
        if (optionalCCAT.isPresent()) {
            CCAT ccat = optionalCCAT.get();
            ccat.setStatus("Active");  // Updating status to "Active"
            ccatRepository.save(ccat); // Saving updated entity
            return true;
        }
        
        return false;
    }
}
