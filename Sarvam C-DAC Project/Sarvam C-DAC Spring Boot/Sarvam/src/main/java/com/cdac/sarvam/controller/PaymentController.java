package com.cdac.sarvam.controller;

import com.cdac.sarvam.dto.PaymentRequestDTO;
import com.cdac.sarvam.dto.PaymentResponseDTO;
import com.cdac.sarvam.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from Vite React app
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequestDTO paymentRequest) {
        try {
            PaymentIntent paymentIntent = paymentService.createPayment(paymentRequest);

            // Determine status (successful or failed)
            String status = paymentIntent.getStatus().equals("succeeded") ? "Successful" : "Failed";

            // Prepare response DTO
            PaymentResponseDTO responseDTO = new PaymentResponseDTO(
                    paymentIntent.getId(),
                    status, // Status is now "Successful" or "Failed"
                    paymentIntent.getCurrency(),
                    paymentRequest.getAmount(),
                    paymentRequest.getCardHolderName(),
                    paymentRequest.getCardNumber(),
                    paymentRequest.getExpiryMonth(),
                    paymentRequest.getExpiryYear()
            );

            return ResponseEntity.ok(responseDTO);

        } catch (StripeException e) {
            return ResponseEntity.status(400).body("Payment failed: " + e.getMessage());
        }
    }
}
