package com.cdac.sarvam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.sarvam.model.MasterStudyMaterial;
import com.cdac.sarvam.repository.MasterStudyMaterialRepository;

@Service
public class MasterStudyMaterialService {

    @Autowired
    private MasterStudyMaterialRepository repository;

    public MasterStudyMaterial saveStudyMaterial(MasterStudyMaterial material) {
        return repository.save(material);
    }
    
    public List<MasterStudyMaterial> getAllStudyMaterials() {
        return repository.findAll();
    }

    public boolean deleteStudyMaterial(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }


}
