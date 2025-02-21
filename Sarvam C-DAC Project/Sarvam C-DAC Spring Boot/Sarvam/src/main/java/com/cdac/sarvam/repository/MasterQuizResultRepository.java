package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.MasterQuizResult;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterQuizResultRepository extends JpaRepository<MasterQuizResult, Integer> {
	List<MasterQuizResult> findByQuizQuizId(int quizId);
    List<MasterQuizResult> findByProfilePrn(long prn);
}
