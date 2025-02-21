package com.cdac.sarvam.service;

import org.springframework.stereotype.Service;

import com.cdac.sarvam.dto.QuestionRequest;
import com.cdac.sarvam.model.AnswerModel;
import com.cdac.sarvam.model.MasterModule;
import com.cdac.sarvam.model.Question;
import com.cdac.sarvam.model.QuizResult;
import com.cdac.sarvam.repository.QuestionRepository;
import com.cdac.sarvam.repository.MasterModuleRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MasterModuleRepository masterModuleRepository;

    public QuestionService(QuestionRepository questionRepository, MasterModuleRepository masterModuleRepository) {
        this.questionRepository = questionRepository;
        this.masterModuleRepository = masterModuleRepository;
    }

    // Get questions by module
    public List<Question> getQuestionsByModule(int moduleId) {
        MasterModule module = masterModuleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));
        return questionRepository.findByModule(module);
    }

    // 📌 Generate Quiz with Random Questions
    public List<Question> generateQuiz(int moduleId, int questionCount) {
        List<Question> questions = getQuestionsByModule(moduleId);
        if (questions.size() < questionCount) {
            throw new IllegalArgumentException("Not enough questions available in the module.");
        }
        Collections.shuffle(questions);
        return questions.subList(0, questionCount);
    }

    // Check submitted answers and evaluate score
    public QuizResult checkAnswers(List<AnswerModel> answers) {
        int correctCount = 0;
        int moduleId = 0;
        int totalQuestions = answers.size();

        for (AnswerModel answer : answers) {
            Optional<Question> questionOpt = questionRepository.findById(answer.getQuestionId());
            if (questionOpt.isPresent()) {
                Question question = questionOpt.get();
                if (question.getCorrectAnswer().equalsIgnoreCase(answer.getSelectedAnswer())) {
                    correctCount++;
                }
                moduleId = question.getModule().getModuleId();
            }
        }
        return new QuizResult(moduleId, correctCount, totalQuestions);
    }

    // Add a single question
    public Question addQuestion(QuestionRequest questionRequest) {
        MasterModule module = masterModuleRepository.findById(questionRequest.getModuleId())
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));

        Question question = new Question();
        question.setQuestionText(questionRequest.getQuestionText());
        question.setOption1(questionRequest.getOption1());
        question.setOption2(questionRequest.getOption2());
        question.setOption3(questionRequest.getOption3());
        question.setOption4(questionRequest.getOption4());
        question.setCorrectAnswer(questionRequest.getCorrectAnswer());
        question.setModule(module);

        return questionRepository.save(question);
    }

    // Add multiple questions
    public List<Question> addMultipleQuestions(List<QuestionRequest> questionRequests) {
        return questionRequests.stream().map(request -> {
            MasterModule module = masterModuleRepository.findById(request.getModuleId())
                    .orElseThrow(() -> new IllegalArgumentException("Module not found"));

            Question question = new Question();
            question.setQuestionText(request.getQuestionText());
            question.setOption1(request.getOption1());
            question.setOption2(request.getOption2());
            question.setOption3(request.getOption3());
            question.setOption4(request.getOption4());
            question.setCorrectAnswer(request.getCorrectAnswer());
            question.setModule(module);

            return question;
        }).collect(Collectors.toList());
    }

    // 📌 Save all questions at once
    public List<Question> saveMultipleQuestions(List<QuestionRequest> questionRequests) {
        List<Question> questions = addMultipleQuestions(questionRequests);
        return questionRepository.saveAll(questions);
    }

    // Delete question by ID
    public void deleteQuestion(int questionId) {
        questionRepository.deleteById(questionId);
    }

    // Update question by ID
    public Question updateQuestion(int id, QuestionRequest questionRequest) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));

        MasterModule module = masterModuleRepository.findById(questionRequest.getModuleId())
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));

        question.setQuestionText(questionRequest.getQuestionText());
        question.setOption1(questionRequest.getOption1());
        question.setOption2(questionRequest.getOption2());
        question.setOption3(questionRequest.getOption3());
        question.setOption4(questionRequest.getOption4());
        question.setCorrectAnswer(questionRequest.getCorrectAnswer());
        question.setModule(module);

        return questionRepository.save(question);
    }

    public Question getQuestionById(int id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Question not found"));
    }

}
