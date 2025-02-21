package com.cdac.sarvam.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "master_profiles")
public class MasterProfile {

    @Id
    @Column(name = "PRN", nullable = false)
    private Long prn; // Primary Key (PK), also used as FK

    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleEnum role = RoleEnum.Student;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Enum to enforce valid roles in the application
    public enum RoleEnum {
        Student,
        Admin,
        CoCo,
        MoCo,
        Instructor,
        TPO
    }
}
