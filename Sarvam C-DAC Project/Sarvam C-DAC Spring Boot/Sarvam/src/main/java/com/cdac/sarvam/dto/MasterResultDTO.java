package com.cdac.sarvam.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MasterResultDTO {
    private Integer resultId;
    private Integer moduleId;
    private Long prn; // Use 'prn' instead of 'studentId'
    private Integer internals20;
    private Integer lab40;
    private Integer ccee60;
}
