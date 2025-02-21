package com.cdac.sarvam.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MasterModuleSubpointDTO {
    private Integer subId;
    private Integer moduleId;
    private String moduleSubpointName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
