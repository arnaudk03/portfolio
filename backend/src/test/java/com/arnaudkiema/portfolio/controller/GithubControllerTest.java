package com.arnaudkiema.portfolio.controller;

import com.arnaudkiema.portfolio.dto.GithubRepoDto;
import com.arnaudkiema.portfolio.dto.GithubStatsResponse;
import com.arnaudkiema.portfolio.service.GithubService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GithubController.class)
@DisplayName("GithubController — Tests d'intégration Web Layer")
class GithubControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private GithubService githubService;

    private GithubStatsResponse buildStats(String username) {
        return new GithubStatsResponse(
                username,
                25,
                100,
                30,
                List.of(
                        new GithubRepoDto("repo-a", "Desc A", "https://github.com/" + username + "/repo-a", "Java", 50, 10),
                        new GithubRepoDto("repo-b", null, "https://github.com/" + username + "/repo-b", null, 5, 1)
                )
        );
    }

    // =========================================================================
    // GET /api/github/stats
    // =========================================================================

    @Nested
    @DisplayName("GET /api/github/stats")
    class GetStats {

        @Test
        @DisplayName("doit retourner 200 avec le username par défaut 'arnaudkiema'")
        void shouldReturnDefaultUsername() throws Exception {
            when(githubService.getStats("arnaudkiema")).thenReturn(buildStats("arnaudkiema"));

            mockMvc.perform(get("/api/github/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.username").value("arnaudkiema"))
                    .andExpect(jsonPath("$.publicRepos").value(25))
                    .andExpect(jsonPath("$.followers").value(100))
                    .andExpect(jsonPath("$.following").value(30));
        }

        @Test
        @DisplayName("doit retourner les stats du username passé en query param")
        void shouldReturnStatsForGivenUsername() throws Exception {
            String user = "autre_user";
            when(githubService.getStats(user)).thenReturn(buildStats(user));

            mockMvc.perform(get("/api/github/stats").param("username", user))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.username").value(user));
        }

        @Test
        @DisplayName("la liste de repos dans la réponse ne doit pas être nulle")
        void shouldReturnNonNullReposList() throws Exception {
            when(githubService.getStats(anyString())).thenReturn(buildStats("arnaudkiema"));

            mockMvc.perform(get("/api/github/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.repos").isArray())
                    .andExpect(jsonPath("$.repos", hasSize(2)));
        }

        @Test
        @DisplayName("les champs optionnels null ne doivent pas faire planter la sérialisation JSON")
        void shouldHandleNullOptionalFields() throws Exception {
            when(githubService.getStats(anyString())).thenReturn(buildStats("arnaudkiema"));

            // repo-b a description=null et language=null — doit sérialiser sans erreur
            mockMvc.perform(get("/api/github/stats"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.repos[1].name").value("repo-b"));
        }

        @Test
        @DisplayName("doit retourner le Content-Type application/json")
        void shouldReturnJsonContentType() throws Exception {
            when(githubService.getStats(anyString())).thenReturn(buildStats("arnaudkiema"));

            mockMvc.perform(get("/api/github/stats"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith("application/json"));
        }
    }
}
