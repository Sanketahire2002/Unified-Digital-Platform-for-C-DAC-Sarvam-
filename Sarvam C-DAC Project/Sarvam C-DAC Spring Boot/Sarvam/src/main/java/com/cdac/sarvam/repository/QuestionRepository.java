package com.cdac.sarvam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.sarvam.model.Question;
import com.cdac.sarvam.model.MasterModule;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByModule(MasterModule module);
}
