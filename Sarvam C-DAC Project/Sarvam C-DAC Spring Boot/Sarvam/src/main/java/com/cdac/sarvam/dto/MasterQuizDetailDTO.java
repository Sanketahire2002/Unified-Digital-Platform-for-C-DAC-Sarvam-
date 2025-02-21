package com.cdac.sarvam.dto;

import lombok.*;

import java.sql.Date;
import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MasterQuizDetailDTO {
    private Integer quizId;
    private Date date;
    private String quizTitle;
    private Time startTime;
    private Time endTime;
    private Integer marks;
}
