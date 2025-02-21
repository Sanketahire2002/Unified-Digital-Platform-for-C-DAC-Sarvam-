package com.cdac.sarvam.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MasterQuizResultDTO {
    private Integer resultId;
    private Long prn;
    private Integer quizId;
    private Integer obtainedMarks;
}
