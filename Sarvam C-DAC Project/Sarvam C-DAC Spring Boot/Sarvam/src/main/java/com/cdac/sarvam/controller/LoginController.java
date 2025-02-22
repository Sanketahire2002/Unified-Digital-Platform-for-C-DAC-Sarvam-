package com.cdac.sarvam.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.sarvam.model.MasterProfile;
import com.cdac.sarvam.model.UserCredentials;
import com.cdac.sarvam.service.MasterProfileService;
import com.cdac.sarvam.service.UserCredentialsService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UserCredentialsService service;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        Long prn = Long.parseLong(credentials.get("prn"));
        String password = credentials.get("password");

        Optional<UserCredentials> user = service.validateLogin(prn, password);

        if (user.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid login credentials.");
        }

        UserCredentials.Status status = user.get().getStatus();
        UserCredentials.Role role = user.get().getRole();
        
        if (status == UserCredentials.Status.Active) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful."+role);
            response.put("role", user.get().getRole().name());
            response.put("firstName", user.get().getFirstName());
            response.put("lastName", user.get().getLastName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(403).body("Account is " + status.name() + ".");
        }
    }
}
