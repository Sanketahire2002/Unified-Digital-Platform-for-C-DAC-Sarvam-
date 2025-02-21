package com.cdac.sarvam.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String cardHolderName;
    private String maskedCardNumber;
    private String expiryMonth;
    private String expiryYear;
    private Double amount;
    private String currency;
    private String status; // "Successful" or "Failed"
    private String transactionId;
}
