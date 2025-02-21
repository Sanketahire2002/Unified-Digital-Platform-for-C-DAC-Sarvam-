package com.cdac.sarvam.model;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuizResult {
    private int moduleId;
    private int totalQuestions;
    private int correctAnswers;
    private int totalMarks;
    
    public QuizResult(int moduleId, int correctAnswers, int totalQuestions) {
        this.moduleId = moduleId;
        this.correctAnswers = correctAnswers;
        this.totalQuestions = totalQuestions;
        this.totalMarks = correctAnswers * 1; // Assuming 1 mark per correct answer
    }
}
