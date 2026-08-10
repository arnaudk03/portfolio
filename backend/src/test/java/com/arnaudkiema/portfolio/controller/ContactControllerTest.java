package com.arnaudkiema.portfolio.controller;

import com.arnaudkiema.portfolio.dto.ContactRequest;
import com.arnaudkiema.portfolio.service.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactController.class)
@DisplayName("ContactController — Tests d'intégration Web Layer")
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ContactService contactService;

    // =========================================================================
    // GET /api/health
    // =========================================================================

    @Nested
    @DisplayName("GET /api/health")
    class HealthEndpoint {

        @Test
        @DisplayName("doit retourner 200 OK avec le message 'OK'")
        void shouldReturn200WithOkMessage() throws Exception {
            mockMvc.perform(get("/api/health"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.message").value("OK"));
        }
    }

    // =========================================================================
    // POST /api/contact
    // =========================================================================

    @Nested
    @DisplayName("POST /api/contact")
    class ContactEndpoint {

        private final ContactRequest validRequest = new ContactRequest(
                "Arnaud Kiema",
                "arnaud@example.com",
                "Sujet de test",
                "Ceci est un message de test suffisamment long pour passer la validation."
        );

        @Test
        @DisplayName("doit retourner 200 OK avec un corps de requête valide")
        void shouldReturn200WithValidBody() throws Exception {
            mockMvc.perform(post("/api/contact")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validRequest)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.message").value("Message sent successfully"));

            verify(contactService, times(1)).sendContactMessage(any(ContactRequest.class));
        }

        @Test
        @DisplayName("doit appeler contactService.sendContactMessage() avec les bonnes données")
        void shouldDelegateToService() throws Exception {
            mockMvc.perform(post("/api/contact")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(validRequest)))
                    .andExpect(status().isOk());

            verify(contactService).sendContactMessage(validRequest);
        }

        @Nested
        @DisplayName("Validation des champs obligatoires")
        class FieldValidation {

            @Test
            @DisplayName("name vide → 400 Bad Request")
            void missingName() throws Exception {
                ContactRequest bad = new ContactRequest("", "arnaud@example.com", "Sujet", "Message assez long.");
                mockMvc.perform(post("/api/contact")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(bad)))
                        .andExpect(status().isBadRequest());
                verifyNoInteractions(contactService);
            }

            @Test
            @DisplayName("email invalide → 400 Bad Request")
            void invalidEmail() throws Exception {
                ContactRequest bad = new ContactRequest("Arnaud", "not-an-email", "Sujet", "Message assez long.");
                mockMvc.perform(post("/api/contact")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(bad)))
                        .andExpect(status().isBadRequest());
                verifyNoInteractions(contactService);
            }

            @Test
            @DisplayName("sujet trop court (< 3 chars) → 400 Bad Request")
            void subjectTooShort() throws Exception {
                ContactRequest bad = new ContactRequest("Arnaud", "arnaud@example.com", "AB", "Message assez long.");
                mockMvc.perform(post("/api/contact")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(bad)))
                        .andExpect(status().isBadRequest());
                verifyNoInteractions(contactService);
            }

            @Test
            @DisplayName("message trop court (< 10 chars) → 400 Bad Request")
            void messageTooShort() throws Exception {
                ContactRequest bad = new ContactRequest("Arnaud", "arnaud@example.com", "Sujet valide", "Court");
                mockMvc.perform(post("/api/contact")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(bad)))
                        .andExpect(status().isBadRequest());
                verifyNoInteractions(contactService);
            }

            @Test
            @DisplayName("corps JSON vide → 400 Bad Request")
            void emptyBody() throws Exception {
                mockMvc.perform(post("/api/contact")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{}"))
                        .andExpect(status().isBadRequest());
                verifyNoInteractions(contactService);
            }

            @Test
            @DisplayName("nom trop long (> 100 chars) → 400 Bad Request")
            void nameTooLong() throws Exception {
                String longName = "A".repeat(101);
                ContactRequest bad = new ContactRequest(longName, "arnaud@example.com", "Sujet", "Message assez long.");
                mockMvc.perform(post("/api/contact")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(bad)))
                        .andExpect(status().isBadRequest());
                verifyNoInteractions(contactService);
            }
        }

        @Test
        @DisplayName("Content-Type non JSON → 415 Unsupported Media Type")
        void noContentType() throws Exception {
            mockMvc.perform(post("/api/contact").content("plain text"))
                    .andExpect(status().isUnsupportedMediaType());
        }
    }
}
