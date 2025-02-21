package com.cdac.sarvam.controller;

import com.cdac.sarvam.dto.MasterModuleDTO;
import com.cdac.sarvam.service.MasterModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class MasterModuleController {

    @Autowired
    private MasterModuleService masterModuleService;

    @GetMapping
    public List<MasterModuleDTO> getAllModules() {
        return masterModuleService.getAllModules();
    }

    @GetMapping("/{id}")
    public MasterModuleDTO getModuleById(@PathVariable int id) {
        return masterModuleService.getById(id);
    }

    @PostMapping
    public MasterModuleDTO addModule(@RequestBody MasterModuleDTO moduleDTO) {
        return masterModuleService.addModule(moduleDTO);
    }
    
 // Get module by name
    @GetMapping("/name/{moduleName}")
    public ResponseEntity<MasterModuleDTO> getModuleByName(@PathVariable String moduleName) {
        MasterModuleDTO moduleDTO = masterModuleService.getByName(moduleName);
        return ResponseEntity.ok(moduleDTO);
    }

    // Update module by ID
    @PutMapping("/{id}")
    public ResponseEntity<MasterModuleDTO> updateModule(@PathVariable int id, @RequestBody MasterModuleDTO dto) {
        MasterModuleDTO updatedModule = masterModuleService.updateModule(id, dto);
        return ResponseEntity.ok(updatedModule);
    }

    @DeleteMapping("/{id}")
    public void deleteModule(@PathVariable int id) {
        masterModuleService.deleteModule(id);
    }
}
