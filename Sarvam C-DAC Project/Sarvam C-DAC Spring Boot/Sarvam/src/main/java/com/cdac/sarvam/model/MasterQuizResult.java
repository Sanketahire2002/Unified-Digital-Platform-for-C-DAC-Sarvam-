package com.cdac.sarvam.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "master_quiz_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MasterQuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Integer resultId;

    @ManyToOne
    @JoinColumn(name = "prn", referencedColumnName = "PRN", nullable = false) // Correct FK mapping
    private MasterProfile profile; // Reference to MasterProfile

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private MasterQuizDetail quiz; // Reference to MasterQuizDetail

    @Column(name = "obtained_marks", nullable = false)
    private Integer obtainedMarks;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}
