package com.cdac.sarvam.controller;

import com.cdac.sarvam.model.MasterCompanies;
import com.cdac.sarvam.service.MasterCompaniesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor

public class MasterCompaniesController {

    private final MasterCompaniesService service;

    @GetMapping
    public List<MasterCompanies> getAllCompanies() {
        return service.getAllCompanies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MasterCompanies> getCompanyById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getCompanyById(id));
    }

    @PostMapping
    public ResponseEntity<MasterCompanies> addCompany(@RequestBody MasterCompanies company) {
        return ResponseEntity.ok(service.addCompany(company));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MasterCompanies> updateCompany(@PathVariable Integer id, @RequestBody MasterCompanies company) {
        return ResponseEntity.ok(service.updateCompany(id, company));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Integer id) {
        service.deleteCompany(id);
        return ResponseEntity.noContent().build();
    }
}
