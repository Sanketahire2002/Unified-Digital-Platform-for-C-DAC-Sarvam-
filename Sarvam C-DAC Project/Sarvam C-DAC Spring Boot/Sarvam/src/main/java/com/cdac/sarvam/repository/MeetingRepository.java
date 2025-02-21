package com.cdac.sarvam.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.sarvam.model.Meeting;


@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
}


