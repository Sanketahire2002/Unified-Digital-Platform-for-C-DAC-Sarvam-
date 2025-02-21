package com.cdac.sarvam.controller;

import com.cdac.sarvam.dto.MasterModuleSubpointDTO;
import com.cdac.sarvam.service.MasterModuleSubpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subpoints")
public class MasterModuleSubpointController {

    @Autowired
    private MasterModuleSubpointService subpointService;

    @GetMapping
    public ResponseEntity<List<MasterModuleSubpointDTO>> getAllSubpoints() {
        return ResponseEntity.ok(subpointService.getAllSubpoints());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MasterModuleSubpointDTO> getSubpointById(@PathVariable int id) {
        return ResponseEntity.ok(subpointService.getSubpointById(id));
    }

    @PostMapping
    public ResponseEntity<MasterModuleSubpointDTO> createSubpoint(@RequestBody MasterModuleSubpointDTO subpointDTO) {
        MasterModuleSubpointDTO createdSubpoint = subpointService.createSubpoint(subpointDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSubpoint);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateSubpoint(@PathVariable int id, @RequestBody MasterModuleSubpointDTO subpointDTO) {
        subpointService.updateSubpoint(id, subpointDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubpoint(@PathVariable int id) {
        subpointService.deleteSubpoint(id);
        return ResponseEntity.noContent().build();
    }
}
