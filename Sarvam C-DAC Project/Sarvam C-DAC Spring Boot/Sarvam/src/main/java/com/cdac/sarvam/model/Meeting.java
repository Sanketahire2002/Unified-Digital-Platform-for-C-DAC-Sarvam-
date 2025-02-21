package com.cdac.sarvam.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.AssertTrue;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "master_meeting")
public class Meeting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int meetingId;
    
    @NotNull(message = "Meeting topic cannot be null")
    @Size(min = 1, max = 255, message = "Meeting topic must be between 1 and 255 characters")
    @Column(length = 255)
    private String meetingTopic;

    @NotNull(message = "Conducted by cannot be null")
    @Size(min = 1, max = 100, message = "Conducted by must be between 1 and 100 characters")
    @Column(length = 100)
    private String conductedBy;

    @NotNull(message = "Meeting date cannot be null")
    private Date meetingDate;

    @NotNull(message = "From time cannot be null")
    @JsonFormat(pattern = "HH:mm") // Ensure proper time format for JSON parsing
    private LocalTime fromTime;

    @NotNull(message = "End time cannot be null")
    @JsonFormat(pattern = "HH:mm") // Ensure proper time format for JSON parsing
    private LocalTime endTime;

    @NotNull(message = "Meeting link cannot be null")
    @Column(columnDefinition = "TEXT")
    private String meetingLink;

    @Column(updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Custom validation to ensure fromTime is before endTime
    @AssertTrue(message = "From time must be before end time")
    public boolean isValidTimes() {
        return fromTime.isBefore(endTime);
    }
}
