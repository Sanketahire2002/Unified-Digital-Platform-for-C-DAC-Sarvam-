package com.cdac.sarvam.service;

import com.cdac.sarvam.dto.MasterResultDTO;
import com.cdac.sarvam.model.MasterModule;
import com.cdac.sarvam.model.MasterProfile;
import com.cdac.sarvam.model.MasterResult;
import com.cdac.sarvam.repository.MasterResultRepository;
import com.cdac.sarvam.repository.MasterModuleRepository;
import com.cdac.sarvam.repository.MasterProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MasterResultService {

    @Autowired
    private MasterResultRepository masterResultRepository;

    @Autowired
    private MasterModuleRepository masterModuleRepository;

    @Autowired
    private MasterProfileRepository masterProfileRepository;

    public List<MasterResultDTO> getAllResults() {
        return masterResultRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MasterResultDTO getResultById(int id) {
        MasterResult result = masterResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found with ID: " + id));
        return convertToDTO(result);
    }

    public List<MasterResultDTO> getResultsByModuleId(int moduleId) {
        return masterResultRepository.findByModule_ModuleId(moduleId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MasterResultDTO> getResultsByPRN(long prn) {
        return masterResultRepository.findByStudent_Prn(prn).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MasterResultDTO addResult(MasterResultDTO dto) {
        MasterResult result = convertToEntity(dto);
        masterResultRepository.save(result);
        return convertToDTO(result);
    }

    public void updateResult(MasterResultDTO dto) {
        MasterResult result = masterResultRepository.findById(dto.getResultId())
                .orElseThrow(() -> new RuntimeException("Result not found with ID: " + dto.getResultId()));

        result.setInternals20(dto.getInternals20());
        result.setLab40(dto.getLab40());
        result.setCcee60(dto.getCcee60());
        result.setUpdatedAt(java.time.LocalDateTime.now()); // Ensure updated timestamp is set

        masterResultRepository.save(result);
    }

    public void deleteResult(int id) {
        if (!masterResultRepository.existsById(id)) {
            throw new RuntimeException("Result not found with ID: " + id);
        }
        masterResultRepository.deleteById(id);
    }

    private MasterResultDTO convertToDTO(MasterResult result) {
        return new MasterResultDTO(
                result.getResultId(),
                result.getModule().getModuleId(),
                result.getStudent().getPrn(),
                result.getInternals20(),
                result.getLab40(),
                result.getCcee60()
        );
    }

    private MasterResult convertToEntity(MasterResultDTO dto) {
        if (dto.getPrn() == null) {
            throw new IllegalArgumentException("Student PRN must not be null");
        }
        
        MasterModule module = masterModuleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid module ID: " + dto.getModuleId()));

        MasterProfile student = masterProfileRepository.findById(dto.getPrn())
                .orElseThrow(() -> new IllegalArgumentException("Invalid student PRN: " + dto.getPrn()));

        MasterResult result = new MasterResult();
        result.setModule(module);
        result.setStudent(student);
        result.setInternals20(dto.getInternals20());
        result.setLab40(dto.getLab40());
        result.setCcee60(dto.getCcee60());
        result.setCreatedAt(java.time.LocalDateTime.now());
        result.setUpdatedAt(java.time.LocalDateTime.now());

        return result;
    }
}
