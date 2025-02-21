package com.cdac.sarvam.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "master_leave_request")
public class MasterLeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @ManyToOne
    @JoinColumn(name = "prn", referencedColumnName = "PRN", nullable = false)
    private MasterProfile masterProfile; // Foreign key reference to MasterProfile

    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "subject", length = 255, nullable = false)
    private String subject;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "status", nullable = false)
    private String status = "Pending"; // Default value

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}
