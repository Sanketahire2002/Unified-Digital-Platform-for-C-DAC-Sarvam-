package com.cdac.sarvam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cdac.sarvam.model.ContactUs;
import com.cdac.sarvam.service.ContactUsService;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173") // Adjust origin as per your frontend
public class ContactUsController {

    @Autowired
    private ContactUsService service;

    @GetMapping
    public List<ContactUs> getAllMessages() {
        return service.getAllMessages();
    }

    @PostMapping
    public ContactUs saveMessage(@RequestBody ContactUs contactUs) {
        return service.saveMessage(contactUs);
    }

    @GetMapping("/{id}")
    public ContactUs getMessage(@PathVariable Long id) {
        return service.getMessageById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        service.deleteMessage(id);
    }
}
