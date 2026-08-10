package com.arnaudkiema.portfolio.service;

import com.arnaudkiema.portfolio.dto.ContactRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ContactService")
class ContactServiceTest {

    @Mock
    private JavaMailSender mailSender;

    private static final String RECIPIENT = "contact@example.com";
    private static final ContactRequest VALID_REQUEST = new ContactRequest(
            "Arnaud Kiema",
            "arnaud@example.com",
            "Test subject",
            "Ceci est un message de test suffisamment long."
    );

    @Nested
    @DisplayName("Quand l'envoi de mail est désactivé (mailEnabled=false)")
    class MailDisabled {

        private ContactService service;

        @BeforeEach
        void setUp() {
            service = new ContactService(mailSender, RECIPIENT, false);
        }

        @Test
        @DisplayName("ne doit pas appeler mailSender.send()")
        void shouldNotSendEmail() {
            service.sendContactMessage(VALID_REQUEST);
            verifyNoInteractions(mailSender);
        }

        @Test
        @DisplayName("ne doit pas lever d'exception")
        void shouldNotThrow() {
            org.junit.jupiter.api.Assertions.assertDoesNotThrow(
                    () -> service.sendContactMessage(VALID_REQUEST)
            );
        }
    }

    @Nested
    @DisplayName("Quand l'envoi de mail est activé (mailEnabled=true)")
    class MailEnabled {

        private ContactService service;

        @BeforeEach
        void setUp() {
            service = new ContactService(mailSender, RECIPIENT, true);
        }

        @Test
        @DisplayName("doit appeler mailSender.send() exactement une fois")
        void shouldSendExactlyOnce() {
            service.sendContactMessage(VALID_REQUEST);
            verify(mailSender, times(1)).send(any(SimpleMailMessage.class));
        }

        @Test
        @DisplayName("doit envoyer le mail avec le bon destinataire")
        void shouldSendToCorrectRecipient() {
            ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
            service.sendContactMessage(VALID_REQUEST);
            verify(mailSender).send(captor.capture());
            SimpleMailMessage sent = captor.getValue();
            assertThat(sent.getTo()).containsExactly(RECIPIENT);
        }

        @Test
        @DisplayName("doit placer l'email de l'expéditeur en Reply-To")
        void shouldSetReplyTo() {
            ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
            service.sendContactMessage(VALID_REQUEST);
            verify(mailSender).send(captor.capture());
            assertThat(captor.getValue().getReplyTo()).isEqualTo(VALID_REQUEST.email());
        }

        @Test
        @DisplayName("doit préfixer le sujet avec [Portfolio]")
        void shouldPrefixSubject() {
            ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
            service.sendContactMessage(VALID_REQUEST);
            verify(mailSender).send(captor.capture());
            assertThat(captor.getValue().getSubject())
                    .startsWith("[Portfolio]")
                    .contains(VALID_REQUEST.subject());
        }

        @Test
        @DisplayName("le corps du mail doit contenir le nom, l'email, le sujet et le message")
        void shouldIncludeAllFieldsInBody() {
            ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
            service.sendContactMessage(VALID_REQUEST);
            verify(mailSender).send(captor.capture());
            String body = captor.getValue().getText();
            assertThat(body)
                    .contains(VALID_REQUEST.name())
                    .contains(VALID_REQUEST.email())
                    .contains(VALID_REQUEST.subject())
                    .contains(VALID_REQUEST.message());
        }
    }
}
