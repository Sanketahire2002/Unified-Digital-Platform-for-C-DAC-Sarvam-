package com.cdac.sarvam.controller;

import com.cdac.sarvam.dto.MasterResultDTO;
import com.cdac.sarvam.service.MasterResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master-results")
public class MasterResultController {

    @Autowired
    private MasterResultService masterResultService;

    @GetMapping
    public ResponseEntity<List<MasterResultDTO>> getAllResults() {
        return ResponseEntity.ok(masterResultService.getAllResults());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MasterResultDTO> getResultById(@PathVariable int id) {
        return ResponseEntity.ok(masterResultService.getResultById(id));
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<MasterResultDTO>> getResultsByModuleId(@PathVariable int moduleId) {
        return ResponseEntity.ok(masterResultService.getResultsByModuleId(moduleId));
    }

    @GetMapping("/student/{prn}")
    public ResponseEntity<List<MasterResultDTO>> getResultsByPRN(@PathVariable long prn) {
        return ResponseEntity.ok(masterResultService.getResultsByPRN(prn));
    }

    @PostMapping
    public ResponseEntity<MasterResultDTO> addResult(@RequestBody MasterResultDTO dto) {
        return ResponseEntity.ok(masterResultService.addResult(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateResult(@PathVariable int id, @RequestBody MasterResultDTO dto) {
        dto.setResultId(id);
        masterResultService.updateResult(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable int id) {
        masterResultService.deleteResult(id);
        return ResponseEntity.noContent().build();
    }
}
