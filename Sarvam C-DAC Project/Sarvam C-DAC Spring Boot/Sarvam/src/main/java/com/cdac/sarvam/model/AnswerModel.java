package com.cdac.sarvam.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerModel {
    private int questionId;
    private String selectedAnswer;
}
