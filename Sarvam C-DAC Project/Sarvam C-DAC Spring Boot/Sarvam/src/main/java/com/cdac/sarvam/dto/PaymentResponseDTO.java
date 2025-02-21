package com.cdac.sarvam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentResponseDTO {

    private String transactionId;
    private String status;
    private String currency;
    private Double amount;
    private String cardHolderName;
    private String maskedCardNumber;
    private String expiryMonth;
    private String expiryYear;

    public PaymentResponseDTO(String transactionId, String status, String currency, Double amount, String cardHolderName, String maskedCardNumber, String expiryMonth, String expiryYear) {
        this.transactionId = transactionId;
        this.status = status;
        this.currency = currency;
        this.amount = amount;
        this.cardHolderName = cardHolderName;
        this.maskedCardNumber = maskedCardNumber;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
    }

    public PaymentResponseDTO(String transactionId, String status, Double amount, String currency, String cardHolderName, String maskedCardNumber, String expiryMonth, String expiryYear) {
        this.transactionId = transactionId;
        this.status = status;
        this.currency = currency;
        this.amount = amount;
        this.cardHolderName = cardHolderName;
        this.maskedCardNumber = maskedCardNumber;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
    }
}
