package com.arnaudkiema.portfolio.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Tests d'intégration pour la configuration CORS.
 * Vérifie que les origines autorisées sont correctement configurées.
 */
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("CorsConfig — Tests d'intégration CORS")
class CorsConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("doit autoriser les requêtes preflight OPTIONS depuis l'origine localhost:4200")
    void shouldAllowPreflightFromLocalhost4200() throws Exception {
        mockMvc.perform(options("/api/health")
                        .header("Origin", "http://localhost:4200")
                        .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk())
                .andExpect(header().exists("Access-Control-Allow-Origin"));
    }

    @Test
    @DisplayName("doit autoriser les méthodes GET et POST dans la config CORS")
    void shouldAllowGetAndPost() throws Exception {
        mockMvc.perform(options("/api/health")
                        .header("Origin", "http://localhost:4200")
                        .header("Access-Control-Request-Method", "POST"))
                .andExpect(status().isOk());
    }
}
