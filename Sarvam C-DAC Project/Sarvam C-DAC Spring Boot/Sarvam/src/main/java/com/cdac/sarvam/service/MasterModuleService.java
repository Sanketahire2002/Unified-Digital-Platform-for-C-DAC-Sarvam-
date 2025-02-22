package com.cdac.sarvam.service;

import com.cdac.sarvam.dto.MasterModuleDTO;
import com.cdac.sarvam.dto.MasterModuleSubpointDTO;
import com.cdac.sarvam.model.MasterModule;
import com.cdac.sarvam.model.MasterModuleSubpoint;
import com.cdac.sarvam.model.MasterProfile;
import com.cdac.sarvam.repository.MasterModuleRepository;
import com.cdac.sarvam.repository.MasterProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MasterModuleService {

    @Autowired
    private MasterModuleRepository masterModuleRepository;

    @Autowired
    private MasterProfileRepository masterProfileRepository;

    public List<MasterModuleDTO> getAllModules() {
        return masterModuleRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MasterModuleDTO getById(int id) {
        MasterModule module = masterModuleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));
        return convertToDTO(module);
    }

    public MasterModuleDTO addModule(MasterModuleDTO dto) {
        MasterModule module = convertToEntity(dto);
        masterModuleRepository.save(module);
        return convertToDTO(module);
    }

    public void deleteModule(int id) {
        masterModuleRepository.deleteById(id);
    }
    
 // Fetch module by name
    public MasterModuleDTO getByName(String moduleName) {
        MasterModule module = masterModuleRepository.findByModuleName(moduleName)
                .orElseThrow(() -> new RuntimeException("Module not found"));
        return convertToDTO(module);
    }

    // Update module
    public MasterModuleDTO updateModule(int id, MasterModuleDTO dto) {
        MasterModule module = masterModuleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        module.setModuleName(dto.getModuleName());
        module.setModuleStartDate(dto.getModuleStartDate());
        module.setModuleEndDate(dto.getModuleEndDate());
        module.setNoOfDays(dto.getNoOfDays());
        module.setDurationHours(dto.getDurationHours());
        
        MasterProfile instructor = masterProfileRepository.findById(dto.getInstructorId())
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        module.setInstructor(instructor);
        
        MasterProfile moCo = masterProfileRepository.findById(dto.getMoCoId())
                .orElseThrow(() -> new RuntimeException("MoCo not found"));
        module.setMoCo(moCo);
        
        // Save updated module
        masterModuleRepository.save(module);
        return convertToDTO(module);
    }

    private MasterModuleDTO convertToDTO(MasterModule module) {
        return new MasterModuleDTO(
                module.getModuleId(),
                module.getModuleName(),
                module.getModuleStartDate(),
                module.getModuleEndDate(),
                module.getInstructor().getPrn(),
                module.getInstructor().getFirstName(),
                module.getInstructor().getLastName(),
                module.getMoCo().getPrn(),
                module.getMoCo().getFirstName(),
                module.getMoCo().getLastName(),
                module.getNoOfDays(),
                module.getDurationHours(),
                module.getMasterModuleSubpoints() != null ? 
                        module.getMasterModuleSubpoints().stream()
                        .map(sub -> new MasterModuleSubpointDTO(
                                sub.getSubId(),
                                module.getModuleId(), // Ensuring moduleId is passed
                                sub.getModuleSubpointName(),
                                sub.getCreatedAt(),
                                sub.getUpdatedAt()
                        ))
                        .collect(Collectors.toList()) : 
                        List.of() // Return an empty list if subpoints are null
        );
    }

    private MasterModule convertToEntity(MasterModuleDTO dto) {
        MasterModule module = new MasterModule();
        module.setModuleName(dto.getModuleName());
        module.setModuleStartDate(dto.getModuleStartDate());
        module.setModuleEndDate(dto.getModuleEndDate());
        module.setInstructor(masterProfileRepository.findById(dto.getInstructorId()).orElseThrow());
        module.setMoCo(masterProfileRepository.findById(dto.getMoCoId()).orElseThrow());
        module.setNoOfDays(dto.getNoOfDays());
        module.setDurationHours(dto.getDurationHours());
        return module;
    }
}
