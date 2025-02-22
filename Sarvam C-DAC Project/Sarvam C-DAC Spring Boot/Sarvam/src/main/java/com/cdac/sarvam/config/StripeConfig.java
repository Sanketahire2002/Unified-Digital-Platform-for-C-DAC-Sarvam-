package com.cdac.sarvam.config;

import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    public void configure() {
        Stripe.apiKey = stripeApiKey;
    }
}
