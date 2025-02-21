package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.MasterQuizDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MasterQuizDetailRepository extends JpaRepository<MasterQuizDetail, Integer> {
	Optional<MasterQuizDetail> findByQuizTitle(String quizTitle);
}
