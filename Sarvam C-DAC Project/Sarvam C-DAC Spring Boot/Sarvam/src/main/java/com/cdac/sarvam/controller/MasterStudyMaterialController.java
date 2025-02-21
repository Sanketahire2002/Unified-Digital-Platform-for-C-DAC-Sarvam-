package com.cdac.sarvam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.sarvam.model.MasterStudyMaterial;
import com.cdac.sarvam.service.MasterStudyMaterialService;


@RestController
@RequestMapping("/study-materials")
@CrossOrigin(origins = "http://localhost:5173")
public class MasterStudyMaterialController {

    @Autowired
    private MasterStudyMaterialService service;

    @PostMapping("/add")
    public ResponseEntity<MasterStudyMaterial> addStudyMaterial(@RequestBody MasterStudyMaterial material) {
        MasterStudyMaterial savedMaterial = service.saveStudyMaterial(material);
        return ResponseEntity.ok(savedMaterial);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<MasterStudyMaterial>> getAllStudyMaterials() {
        List<MasterStudyMaterial> materials = service.getAllStudyMaterials();
        return ResponseEntity.ok(materials);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudyMaterial(@PathVariable Long id) {
        boolean deleted = service.deleteStudyMaterial(id);
        if (deleted) {
            return ResponseEntity.ok("Study material deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Study material not found");
        }
    }



}