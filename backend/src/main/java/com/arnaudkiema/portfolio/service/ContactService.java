package com.arnaudkiema.portfolio.service;

import com.arnaudkiema.portfolio.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final JavaMailSender mailSender;
    private final String recipientEmail;
    private final boolean mailEnabled;

    public ContactService(
            JavaMailSender mailSender,
            @Value("${portfolio.contact.recipient:tonguoa@gmail.com}") String recipientEmail,
            @Value("${portfolio.mail.enabled:false}") boolean mailEnabled) {
        this.mailSender = mailSender;
        this.recipientEmail = recipientEmail;
        this.mailEnabled = mailEnabled;
    }

    public void sendContactMessage(ContactRequest request) {
        log.info("Contact message received from {} <{}>: {}", request.name(), request.email(), request.subject());

        if (!mailEnabled) {
            log.info("Mail disabled — message logged only. Subject: {}", request.subject());
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setReplyTo(request.email());
        message.setSubject("[Portfolio] " + request.subject());
        message.setText("""
                Nouveau message depuis le portfolio

                Nom: %s
                Email: %s
                Sujet: %s

                Message:
                %s
                """.formatted(request.name(), request.email(), request.subject(), request.message()));

        mailSender.send(message);
    }
}
