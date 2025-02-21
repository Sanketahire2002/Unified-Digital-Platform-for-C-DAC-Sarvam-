package com.cdac.sarvam.repository;

import com.cdac.sarvam.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
