package com.cdac.sarvam.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "master_module_subpoints")
public class MasterModuleSubpoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subId;

    @ManyToOne
    @JoinColumn(name = "module_id", nullable = false)
    private MasterModule module;

    @Column(name = "module_subpoint_name", length = 100, nullable = false)
    private String moduleSubpointName;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}
