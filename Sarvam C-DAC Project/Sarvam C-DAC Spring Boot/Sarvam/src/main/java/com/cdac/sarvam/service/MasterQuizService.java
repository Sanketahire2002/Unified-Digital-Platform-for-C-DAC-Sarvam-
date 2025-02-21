package com.cdac.sarvam.service;

import com.cdac.sarvam.model.MasterProfile;
import com.cdac.sarvam.model.MasterQuizDetail;
import com.cdac.sarvam.model.MasterQuizResult;
import com.cdac.sarvam.repository.MasterProfileRepository;
import com.cdac.sarvam.repository.MasterQuizDetailRepository;
import com.cdac.sarvam.repository.MasterQuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class MasterQuizService {

    @Autowired
    private MasterQuizDetailRepository quizDetailRepository;

    @Autowired
    private MasterQuizResultRepository quizResultRepository;
    
    @Autowired
    private MasterProfileRepository profileRepository; // Add this

    public CompletableFuture<List<MasterQuizDetail>> getAllQuizzesAsync() {
        return CompletableFuture.supplyAsync(quizDetailRepository::findAll);
    }

    public CompletableFuture<MasterQuizDetail> getQuizByIdAsync(int quizId) {
        return CompletableFuture.supplyAsync(() ->
                quizDetailRepository.findById(quizId)
                        .orElseThrow(() -> new RuntimeException("Quiz not found!")));
    }

    public CompletableFuture<MasterQuizDetail> getQuizByTitleAsync(String quizTitle) {
        return CompletableFuture.supplyAsync(() ->
                quizDetailRepository.findByQuizTitle(quizTitle)
                        .orElseThrow(() -> new RuntimeException("Quiz not found!")));
    }

    public CompletableFuture<List<MasterQuizResult>> getAllQuizResultsAsync() {
        return CompletableFuture.supplyAsync(quizResultRepository::findAll);
    }

    public CompletableFuture<List<MasterQuizResult>> getResultsByQuizIdAsync(int quizId) {
        return CompletableFuture.supplyAsync(() -> quizResultRepository.findByQuizQuizId(quizId));
    }

    public CompletableFuture<List<MasterQuizResult>> getResultsByPRNAsync(long prn) {
        return CompletableFuture.supplyAsync(() -> quizResultRepository.findByProfilePrn(prn));
    }

    public CompletableFuture<MasterQuizResult> getResultByIdAsync(int resultId) {
        return CompletableFuture.supplyAsync(() ->
                quizResultRepository.findById(resultId)
                        .orElseThrow(() -> new RuntimeException("Result not found!")));
    }

    public CompletableFuture<Void> addQuizAsync(MasterQuizDetail quizDetails) {
        return CompletableFuture.runAsync(() -> quizDetailRepository.save(quizDetails));
    }

    public CompletableFuture<Void> addResultAsync(MasterQuizResult quizResults, long prn, int quizId) {
        return CompletableFuture.runAsync(() -> {
            // Fetch the MasterProfile (Student) using PRN
            MasterProfile profile = profileRepository.findById(prn)
                    .orElseThrow(() -> new RuntimeException("Profile not found for PRN: " + prn));

            // Fetch the MasterQuizDetail using Quiz ID
            MasterQuizDetail quiz = quizDetailRepository.findById(quizId)
                    .orElseThrow(() -> new RuntimeException("Quiz not found for ID: " + quizId));

            // Set the profile and quiz before saving
            quizResults.setProfile(profile);
            quizResults.setQuiz(quiz);
            
            // Save the result
            quizResultRepository.save(quizResults);
        });
    }


    public CompletableFuture<Void> updateQuizAsync(int quizId, MasterQuizDetail quizDetails) {
        return CompletableFuture.runAsync(() -> {
            // Check if quiz exists before updating
            MasterQuizDetail existingQuiz = quizDetailRepository.findById(quizId)
                    .orElseThrow(() -> new RuntimeException("Quiz not found for ID: " + quizId));

            // Update only allowed fields
            existingQuiz.setQuizTitle(quizDetails.getQuizTitle());
            existingQuiz.setDate(quizDetails.getDate());
            existingQuiz.setStartTime(quizDetails.getStartTime());
            existingQuiz.setEndTime(quizDetails.getEndTime());
            existingQuiz.setMarks(quizDetails.getMarks());
            existingQuiz.setUpdatedAt(LocalDateTime.now());

            // Save the updated entity
            quizDetailRepository.save(existingQuiz);
        });
    }



    public CompletableFuture<Void> updateResultAsync(int resultId, MasterQuizResult quizResults) {
        return CompletableFuture.runAsync(() -> {
            // Check if result exists before updating
            MasterQuizResult existingResult = quizResultRepository.findById(resultId)
                    .orElseThrow(() -> new RuntimeException("Result not found for ID: " + resultId));

            // Update only allowed fields
            existingResult.setObtainedMarks(quizResults.getObtainedMarks());
            existingResult.setUpdatedAt(LocalDateTime.now());

            // Save the updated entity
            quizResultRepository.save(existingResult);
        });
    }



    public CompletableFuture<Void> deleteQuizAsync(int quizId) {
        return CompletableFuture.runAsync(() -> quizDetailRepository.deleteById(quizId));
    }

    public CompletableFuture<Void> deleteResultAsync(int resultId) {
        return CompletableFuture.runAsync(() -> quizResultRepository.deleteById(resultId));
    }
}
