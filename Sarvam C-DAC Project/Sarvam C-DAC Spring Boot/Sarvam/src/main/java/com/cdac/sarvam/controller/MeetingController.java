package com.cdac.sarvam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.sarvam.exceptions.MeetingNotFoundException;
import com.cdac.sarvam.model.Meeting;
import com.cdac.sarvam.service.MeetingService;

import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/meetings")
@CrossOrigin(origins = "http://localhost:5173")  // ReactJS running on localhost:5173
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @GetMapping
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        List<Meeting> meetings = meetingService.getAllMeetings();
        return meetings.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(meetings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable int id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().body(null); // Invalid ID
        }
        try {
            Meeting meeting = meetingService.getMeetingById(id);
            return ResponseEntity.ok(meeting);
        } catch (MeetingNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Meeting not found
        }
    }

    @PostMapping
    public ResponseEntity<Meeting> createMeeting(@RequestBody @Valid Meeting meeting) {
        return ResponseEntity.status(HttpStatus.CREATED).body(meetingService.createMeeting(meeting));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meeting> updateMeeting(@PathVariable int id, @RequestBody @Valid Meeting meetingDetails) {
        if (id <= 0) {
            return ResponseEntity.badRequest().body(null); // Invalid ID
        }
        try {
            return ResponseEntity.ok(meetingService.updateMeeting(id, meetingDetails));
        } catch (MeetingNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Meeting not found
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMeeting(@PathVariable int id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().body("Invalid ID");
        }
        try {
            meetingService.deleteMeeting(id);
            return ResponseEntity.ok("Meeting with ID " + id + " has been deleted.");
        } catch (MeetingNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Meeting not found.");
        }
    }
}
