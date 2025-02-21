package com.cdac.sarvam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.sarvam.model.ContactUs;
import com.cdac.sarvam.repository.ContactUsRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactUsService {

    @Autowired
    private ContactUsRepository repository;

    // Get all messages
    public List<ContactUs> getAllMessages() {
        return repository.findAll();
    }

    // Save message
    public ContactUs saveMessage(ContactUs contactUs) {
        if (contactUs.getDateTime() == null) {
            contactUs.setDateTime(java.time.LocalDateTime.now()); // Set current dateTime if not provided
        }
        if (contactUs.getResDateTime() == null) {
            contactUs.setResDateTime(LocalDateTime.now()); // Set resDateTime to current dateTime if not provided
        }
        return repository.save(contactUs);
    }

    // Get a message by ID
    public ContactUs getMessageById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message with ID " + id + " not found."));
    }

    // Delete message by ID
    public void deleteMessage(Long id) {
        repository.deleteById(id);
    }
}
