package com.cdac.sarvam.controller;

import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.sarvam.model.UserCredentials;
import com.cdac.sarvam.model.UserCredentials.Role;
import com.cdac.sarvam.model.UserCredentials.Status;
import com.cdac.sarvam.service.EmailService;
import com.cdac.sarvam.service.UserCredentialsService;

@RestController
@RequestMapping("/api/users")
public class UserCredentialsController {

    @Autowired
    private UserCredentialsService userCredentialsService;
    
    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    // public ResponseEntity<UserCredentials> registerUser(@RequestBody UserCredentials user) {
    public String registerUser(@RequestBody UserCredentials user) {
    	Long pRN = new UserCredentialsController().generateUnique12DigitNumber();
    	String password = user.getFirstName() + "@" + String.valueOf(pRN).substring(7);
    	user.setPrn(pRN);
    	user.setRole(Role.Student);
    	user.setStatus(Status.Active);
    	user.setPassword(password);
        UserCredentials savedUser = userCredentialsService.saveUser(user);
        emailService.sendEmail(user.getFirstName(), user.getLastName(), pRN, password, user.getEmail());
        //return ResponseEntity.ok(savedUser);
        return "Admission taken Successfully. Login credentials shared on your email " + user.getEmail();
    }
    
    public long generateUnique12DigitNumber() {
        Random random = new Random();
        long uniqueNumber = Math.abs(UUID.randomUUID().getMostSignificantBits()) % 1000000000000L;
        
        // Ensure it is always 12 digits
        while (uniqueNumber < 100000000000L) {
            uniqueNumber = uniqueNumber * 10 + random.nextInt(10);
        }
        
        return uniqueNumber;
    }
}
