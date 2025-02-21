package com.cdac.sarvam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

	public void sendEmail(String firstName, String lastName, Long pRN, String password, String email) {
		String emailBody = String.format(
		        "Congratulations!\n\n" +
		        "Hello %s %s,\n\n" +
		        "You have successfully paid the fee. Welcome to C-DAC!\n\n" +
		        "You can now log in to your account using the following credentials:\n\n" +
		        "PRN Number: %d\n" +
		        "Password: %s\n\n" +
		        "Please keep this information confidential.\n\n" +
		        "Best regards,\n" +
		        "C-DAC Team",
		        firstName, lastName, pRN, password
		    );
		
		SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);	
        message.setSubject("Confirmation Mail from C-DAC (Sarvam)");
        message.setText(emailBody);
        
        message.setFrom("sanketahire2002@gmail.com"); // Must be your verified email

        mailSender.send(message);
	}
}
