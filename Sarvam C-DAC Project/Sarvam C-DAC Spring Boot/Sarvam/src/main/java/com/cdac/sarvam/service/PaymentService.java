package com.cdac.sarvam.service;

import com.cdac.sarvam.dto.PaymentRequestDTO;
import com.cdac.sarvam.dto.PaymentResponseDTO;
import com.cdac.sarvam.model.Payment;
import com.cdac.sarvam.repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentMethodCreateParams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    
    private static final String secretKey = "sk_test_51Qptht2LriASASPNEU6SD4jvtWWFKEHACTLW9wZdfnumW3x0ctvspg7EpuqVEusq2KPdbbysnLpR5BK49vTcKBc400FGijDuYv";

    public PaymentIntent createPayment(PaymentRequestDTO paymentRequest) throws StripeException {
        try {
            // Create PaymentIntent in Stripe
        	Stripe.apiKey = "sk_test_51Qptht2LriASASPNEU6SD4jvtWWFKEHACTLW9wZdfnumW3x0ctvspg7EpuqVEusq2KPdbbysnLpR5BK49vTcKBc400FGijDuYv";
        			
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount((long) (paymentRequest.getAmount()*1)) // Convert to cents
                    .setCurrency(paymentRequest.getCurrency())
                    .setPaymentMethod(paymentRequest.getPaymentToken())
                    .setReceiptEmail(paymentRequest.getEmail())
                    .setReturnUrl("https://www.google.co.in/") 
                    //.setPaymentMethod("pm_card_visa") // Example test card
                    .setConfirm(true) // Automatically confirm payment
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            String paymentStatus = paymentIntent.getStatus().equals("succeeded") ? "Successful" : "Failed";

            // Save payment record in database
            Payment payment = new Payment();
            payment.setEmail(paymentRequest.getEmail());
            payment.setCardHolderName(paymentRequest.getCardHolderName());
            payment.setMaskedCardNumber(paymentRequest.getCardNumber());
            payment.setExpiryMonth(paymentRequest.getExpiryMonth());
            payment.setExpiryYear(paymentRequest.getExpiryYear());
            payment.setAmount(paymentRequest.getAmount());
            payment.setCurrency(paymentRequest.getCurrency());
            payment.setStatus(paymentStatus); // Custom status
            payment.setTransactionId(paymentIntent.getId());

            paymentRepository.save(payment);
            return paymentIntent;

        } catch (StripeException e) {
            // Handle failed payment
            Payment failedPayment = new Payment();
            failedPayment.setEmail(paymentRequest.getEmail());
            failedPayment.setCardHolderName(paymentRequest.getCardHolderName());
            failedPayment.setMaskedCardNumber(paymentRequest.getCardNumber());
            failedPayment.setExpiryMonth(paymentRequest.getExpiryMonth());
            failedPayment.setExpiryYear(paymentRequest.getExpiryYear());
            failedPayment.setAmount(paymentRequest.getAmount());
            failedPayment.setCurrency(paymentRequest.getCurrency());
            failedPayment.setStatus("Failed"); // Store as "Failed"
            failedPayment.setTransactionId("N/A");

            paymentRepository.save(failedPayment);

            throw new RuntimeException("Payment failed: " + e.getMessage());
        }
    }
}
