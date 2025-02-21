package com.cdac.sarvam.service;

import com.cdac.sarvam.dto.MasterModuleSubpointDTO;
import com.cdac.sarvam.model.MasterModule;
import com.cdac.sarvam.model.MasterModuleSubpoint;
import com.cdac.sarvam.repository.MasterModuleRepository;
import com.cdac.sarvam.repository.MasterModuleSubpointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MasterModuleSubpointService {

    @Autowired
    private MasterModuleSubpointRepository subpointRepository;

    @Autowired
    private MasterModuleRepository moduleRepository;

    public List<MasterModuleSubpointDTO> getAllSubpoints() {
        return subpointRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public MasterModuleSubpointDTO getSubpointById(int id) {
        return subpointRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Subpoint not found!"));
    }

    public MasterModuleSubpointDTO createSubpoint(MasterModuleSubpointDTO subpointDTO) {
        MasterModule module = moduleRepository.findById(subpointDTO.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module not found!"));

        MasterModuleSubpoint subpoint = new MasterModuleSubpoint();
        subpoint.setModule(module);
        subpoint.setModuleSubpointName(subpointDTO.getModuleSubpointName());

        MasterModuleSubpoint savedSubpoint = subpointRepository.save(subpoint);
        return convertToDTO(savedSubpoint);
    }


    public void updateSubpoint(int id, MasterModuleSubpointDTO subpointDTO) {
        MasterModuleSubpoint subpoint = subpointRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subpoint not found!"));

        MasterModule module = moduleRepository.findById(subpointDTO.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module not found!"));

        subpoint.setModule(module);
        subpoint.setModuleSubpointName(subpointDTO.getModuleSubpointName());
        subpointRepository.save(subpoint);
    }

    public void deleteSubpoint(int id) {
        subpointRepository.deleteById(id);
    }

    private MasterModuleSubpointDTO convertToDTO(MasterModuleSubpoint subpoint) {
        return new MasterModuleSubpointDTO(
                subpoint.getSubId(),
                subpoint.getModule().getModuleId(),
                subpoint.getModuleSubpointName(),
                subpoint.getCreatedAt(),
                subpoint.getUpdatedAt()
        );
    }
}
