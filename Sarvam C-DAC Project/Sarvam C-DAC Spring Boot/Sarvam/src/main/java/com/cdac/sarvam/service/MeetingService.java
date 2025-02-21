package com.cdac.sarvam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.sarvam.exceptions.MeetingNotFoundException;
import com.cdac.sarvam.model.Meeting;
import com.cdac.sarvam.repository.MeetingRepository;

import java.util.List;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Meeting getMeetingById(int meetingId) {
        return meetingRepository.findById(meetingId)
                .orElseThrow(() -> new MeetingNotFoundException("Meeting not found with ID: " + meetingId));
    }

    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public Meeting updateMeeting(int meetingId, Meeting meetingDetails) {
        Meeting existingMeeting = getMeetingById(meetingId);
        existingMeeting.setMeetingTopic(meetingDetails.getMeetingTopic());
        existingMeeting.setConductedBy(meetingDetails.getConductedBy());
        existingMeeting.setMeetingDate(meetingDetails.getMeetingDate());
        existingMeeting.setFromTime(meetingDetails.getFromTime());
        existingMeeting.setEndTime(meetingDetails.getEndTime());
        existingMeeting.setMeetingLink(meetingDetails.getMeetingLink());
        return meetingRepository.save(existingMeeting);
    }

    public void deleteMeeting(int meetingId) {
        Meeting existingMeeting = getMeetingById(meetingId);
        meetingRepository.delete(existingMeeting);
    }
}
