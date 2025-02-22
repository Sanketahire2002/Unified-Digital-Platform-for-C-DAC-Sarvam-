package com.cdac.sarvam.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class MasterLeaveRequestDTO {
    private Long prn;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String subject;
    private String description;
}
