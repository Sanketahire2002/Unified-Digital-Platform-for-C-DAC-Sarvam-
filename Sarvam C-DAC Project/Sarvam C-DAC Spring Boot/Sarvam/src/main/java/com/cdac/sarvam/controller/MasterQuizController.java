package com.cdac.sarvam.controller;

import com.cdac.sarvam.dto.MasterQuizResultDTO;
import com.cdac.sarvam.model.MasterQuizDetail;
import com.cdac.sarvam.model.MasterQuizResult;
import com.cdac.sarvam.service.MasterQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/master-quizzes")
public class MasterQuizController {

    @Autowired
    private MasterQuizService masterQuizService;

    // Get all quizzes
    @GetMapping
    public CompletableFuture<List<MasterQuizDetail>> getAllQuizzes() {
        return masterQuizService.getAllQuizzesAsync();
    }

    // Get quiz by ID
    @GetMapping("/{quizId}")
    public CompletableFuture<MasterQuizDetail> getQuizById(@PathVariable int quizId) {
        return masterQuizService.getQuizByIdAsync(quizId);
    }

    // Get quiz by title
    @GetMapping("/title/{quizTitle}")
    public CompletableFuture<MasterQuizDetail> getQuizByTitle(@PathVariable String quizTitle) {
        return masterQuizService.getQuizByTitleAsync(quizTitle);
    }

    // Add new quiz
    @PostMapping
    public CompletableFuture<Void> addQuiz(@RequestBody MasterQuizDetail quiz) {
        return masterQuizService.addQuizAsync(quiz);
    }

    // Update quiz
    @PutMapping("/{quizId}")
    public CompletableFuture<Void> updateQuiz(@PathVariable int quizId, @RequestBody MasterQuizDetail quiz) {
        return masterQuizService.updateQuizAsync(quizId, quiz);
    }


    // Delete quiz
    @DeleteMapping("/{quizId}")
    public CompletableFuture<Void> deleteQuiz(@PathVariable int quizId) {
        return masterQuizService.deleteQuizAsync(quizId);
    }

    // Get all quiz results
    @GetMapping("/results")
    public CompletableFuture<List<MasterQuizResult>> getAllQuizResults() {
        return masterQuizService.getAllQuizResultsAsync();
    }

    // Get quiz results by quiz ID
    @GetMapping("/results/quiz/{quizId}")
    public CompletableFuture<List<MasterQuizResult>> getResultsByQuizId(@PathVariable int quizId) {
        return masterQuizService.getResultsByQuizIdAsync(quizId);
    }

    // Get quiz results by PRN
    @GetMapping("/results/prn/{prn}")
    public CompletableFuture<List<MasterQuizResult>> getResultsByPRN(@PathVariable long prn) {
        return masterQuizService.getResultsByPRNAsync(prn);
    }

    // Get quiz result by result ID
    @GetMapping("/results/{resultId}")
    public CompletableFuture<MasterQuizResult> getResultById(@PathVariable int resultId) {
        return masterQuizService.getResultByIdAsync(resultId);
    }

    // Add new result
    @PostMapping("/results")
    public CompletableFuture<ResponseEntity<String>> addResult(@RequestBody MasterQuizResultDTO quizResultDTO) {
        return CompletableFuture.supplyAsync(() -> {
            MasterQuizResult quizResult = new MasterQuizResult();
            quizResult.setObtainedMarks(quizResultDTO.getObtainedMarks());

            masterQuizService.addResultAsync(quizResult, quizResultDTO.getPrn(), quizResultDTO.getQuizId());

            return ResponseEntity.ok("Result added successfully!");
        });
    }


    // Update result
    @PutMapping("/results/{resultId}")
    public CompletableFuture<Void> updateResult(@PathVariable int resultId, @RequestBody MasterQuizResult result) {
        return masterQuizService.updateResultAsync(resultId, result);
    }


    // Delete result
    @DeleteMapping("/results/{resultId}")
    public CompletableFuture<Void> deleteResult(@PathVariable int resultId) {
        return masterQuizService.deleteResultAsync(resultId);
    }
}
