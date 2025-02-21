package com.cdac.sarvam.controller;

import com.cdac.sarvam.dto.QuestionRequest;
import com.cdac.sarvam.model.Question;
import com.cdac.sarvam.model.QuizRequest;
import com.cdac.sarvam.model.QuizResult;
import com.cdac.sarvam.model.AnswerModel;
import com.cdac.sarvam.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // 📌 Get a Question by ID
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable int id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }

    // 📌 Get Questions by Module
    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<Question>> getQuestionsByModule(@PathVariable int moduleId) {
        return ResponseEntity.ok(questionService.getQuestionsByModule(moduleId));
    }

    // 📌 Generate a Random Quiz
    @PostMapping("/generateQuiz")
    public ResponseEntity<List<Question>> generateQuiz(@RequestBody QuizRequest quizRequest) {
        return ResponseEntity.ok(questionService.generateQuiz(quizRequest.getModuleId(), quizRequest.getQuestionCount()));
    }


    // 📌 Submit Answers and Check Score
    @PostMapping("/check-answers")
    public ResponseEntity<QuizResult> checkAnswers(@RequestBody List<AnswerModel> answers) {
        return ResponseEntity.ok(questionService.checkAnswers(answers));
    }

    // 📌 Add a Question
    @PostMapping("/add")
    public ResponseEntity<Question> addQuestion(@RequestBody QuestionRequest questionRequest) {
        return ResponseEntity.ok(questionService.addQuestion(questionRequest));
    }
    
    @PostMapping("/add-multiple")
    public ResponseEntity<List<Question>> addMultipleQuestions(@RequestBody List<QuestionRequest> questionRequests) {
        List<Question> savedQuestions = questionService.saveMultipleQuestions(questionRequests);
        return ResponseEntity.ok(savedQuestions);
    }

    // 📌 Update a Question
    @PutMapping("/update/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable int id, @RequestBody QuestionRequest questionRequest) {
        return ResponseEntity.ok(questionService.updateQuestion(id, questionRequest));
    }

    // 📌 Delete a Question
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable int id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok("Question deleted successfully");
    }
}
