package com.cdac.sarvam.controller;

import com.cdac.sarvam.model.MasterProfile;
import com.cdac.sarvam.service.MasterProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/MasterProfiles")
public class MasterProfilesController {

    @Autowired
    private MasterProfileService masterProfileService;

    // Endpoint to get all students
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/students")
    public List<MasterProfile> getStudents() {
        return masterProfileService.getStudents();
    }
    
    @GetMapping("/student/{prn}")
    public MasterProfile getStudentByPRN(@PathVariable Long prn) {
        return masterProfileService.getStudentByPRN(prn);
    }

    @GetMapping
    public List<MasterProfile> getAllProfiles() {
        return masterProfileService.getAllProfiles();
    }

    @GetMapping("/{id}")
    public MasterProfile getProfileById(@PathVariable Long id) {
        return masterProfileService.getProfileById(id);
    }

    @PostMapping
    public MasterProfile createProfile(@RequestBody MasterProfile profile) {
        return masterProfileService.createProfile(profile);
    }

    @PutMapping("/{id}")
    public MasterProfile updateProfile(@PathVariable Long id, @RequestBody MasterProfile profile) {
        return masterProfileService.updateProfile(id, profile);
    }

    @DeleteMapping("/{id}")
    public boolean deleteProfile(@PathVariable Long id) {
        return masterProfileService.deleteProfile(id);
    }

    @GetMapping("/Instructor")
    public List<MasterProfile> getInstructors() {
        return masterProfileService.getProfilesByRole("Instructor");
    }

    @GetMapping("/MoCo")
    public List<MasterProfile> getMoCos() {
        return masterProfileService.getProfilesByRole("MoCo");
    }
}
