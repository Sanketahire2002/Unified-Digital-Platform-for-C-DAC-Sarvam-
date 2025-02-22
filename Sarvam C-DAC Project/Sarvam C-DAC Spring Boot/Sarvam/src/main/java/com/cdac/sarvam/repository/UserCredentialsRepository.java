package com.cdac.sarvam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.sarvam.model.UserCredentials;


@Repository
public interface UserCredentialsRepository extends JpaRepository<UserCredentials, Long> {
}
