package com.cdac.sarvam.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.sarvam.model.ContactUs;


@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs, Long> {
}
