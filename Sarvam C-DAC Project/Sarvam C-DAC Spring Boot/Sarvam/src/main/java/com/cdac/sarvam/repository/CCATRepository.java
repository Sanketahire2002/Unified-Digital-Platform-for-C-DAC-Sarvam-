package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.CCAT;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CCATRepository extends JpaRepository<CCAT, Integer> {
    Optional<CCAT> findByFormNumber(String formNumber);
}
