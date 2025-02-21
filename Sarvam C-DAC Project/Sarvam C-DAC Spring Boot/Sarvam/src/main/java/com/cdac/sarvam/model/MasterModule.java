package com.cdac.sarvam.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "master_modules")
public class MasterModule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer moduleId;

    private String moduleName;
    private LocalDateTime moduleStartDate;
    private LocalDateTime moduleEndDate;

    @ManyToOne
    @JoinColumn(name = "instructor_id", nullable = false)
    private MasterProfile instructor;

    @ManyToOne
    @JoinColumn(name = "moco_id", nullable = false)
    private MasterProfile moCo;

    private Byte noOfDays;
    private Byte durationHours;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<MasterResult> masterResults;
    
    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<MasterModuleSubpoint> masterModuleSubpoints;
    
    @OneToMany(mappedBy = "module")
    private List<Question> questions;
}
