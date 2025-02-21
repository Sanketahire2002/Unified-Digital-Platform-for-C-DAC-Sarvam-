package com.cdac.sarvam.service;

import com.cdac.sarvam.model.MasterCompanies;
import com.cdac.sarvam.repository.MasterCompaniesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MasterCompaniesService {

    private final MasterCompaniesRepository repository;

    public List<MasterCompanies> getAllCompanies() {
        return repository.findAll();
    }

    public MasterCompanies getCompanyById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
    }

    public MasterCompanies addCompany(MasterCompanies company) {
        return repository.save(company);
    }

    public MasterCompanies updateCompany(Integer id, MasterCompanies updatedCompany) {
        MasterCompanies existingCompany = getCompanyById(id);
        existingCompany.setCompanyName(updatedCompany.getCompanyName());
        existingCompany.setDate(updatedCompany.getDate());
        existingCompany.setCtc(updatedCompany.getCtc());
        existingCompany.setRole(updatedCompany.getRole());
        existingCompany.setJobDescription(updatedCompany.getJobDescription());
        return repository.save(existingCompany);
    }

    public void deleteCompany(Integer id) {
        repository.deleteById(id);
    }
}
