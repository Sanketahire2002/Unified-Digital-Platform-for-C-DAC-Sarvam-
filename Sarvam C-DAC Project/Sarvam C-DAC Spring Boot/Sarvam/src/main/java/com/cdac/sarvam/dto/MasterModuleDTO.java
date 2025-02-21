package com.cdac.sarvam.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MasterModuleDTO {
    private Integer moduleId;
    private String moduleName;
    private LocalDateTime moduleStartDate;
    private LocalDateTime moduleEndDate;
    private Long instructorId;
    private String instructorName;
    private String instructorLastName;
    private Long moCoId;
    private String moCoName;
    private String lastName;
    private Byte noOfDays;
    private Byte durationHours;
    private List<MasterModuleSubpointDTO> masterModuleSubpoints;
}
