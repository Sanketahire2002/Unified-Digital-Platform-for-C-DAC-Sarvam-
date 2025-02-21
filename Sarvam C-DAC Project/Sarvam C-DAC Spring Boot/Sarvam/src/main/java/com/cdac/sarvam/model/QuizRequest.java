package com.cdac.sarvam.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizRequest {
    private int moduleId;
    private int questionCount; // Must be 20 or 40
}
