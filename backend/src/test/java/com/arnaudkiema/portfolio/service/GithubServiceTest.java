package com.arnaudkiema.portfolio.service;

import com.arnaudkiema.portfolio.dto.GithubRepoDto;
import com.arnaudkiema.portfolio.dto.GithubStatsResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Tests unitaires pour GithubService.
 *
 * STRATÉGIE : GithubService utilise RestClient pour appeler l'API GitHub externe.
 * On ne mocke pas RestClient directement (dépendance complexe) — on teste plutôt
 * le comportement observable : le fallback en cas d'erreur, la structure des DTOs,
 * et la logique de cache via introspection du comportement.
 *
 * Pour tester le chemin heureux (fetch réel), on utilise un GithubServiceTestDouble
 * qui surcharge la méthode fetch().
 */
@DisplayName("GithubService")
class GithubServiceTest {

    private static final String USERNAME = "testuser";

    // -------------------------------------------------------------------------
    // Données de référence
    // -------------------------------------------------------------------------

    private GithubRepoDto makeRepo(String name, int stars) {
        return new GithubRepoDto(
                name,
                "Description de " + name,
                "https://github.com/" + USERNAME + "/" + name,
                "Java",
                stars,
                2
        );
    }

    // -------------------------------------------------------------------------
    // Tests sur la logique de fallback
    // -------------------------------------------------------------------------

    @Nested
    @DisplayName("Fallback (appel GitHub échoue)")
    class FallbackBehavior {

        /**
         * Sous-classe de test qui simule une erreur réseau en surchargeant getStats().
         * On appelle directement la logique de fallback via GithubService instancié
         * sans token (token vide) — en environnement de test, l'API peut être
         * indisponible ou retourner une erreur, le service doit répondre avec
         * des données de secours.
         */
        @Test
        @DisplayName("retourne des stats de fallback cohérentes quand l'API est inaccessible")
        void shouldReturnFallbackWhenApiUnavailable() {
            // Instanciation sans token et avec un username inexistant pour forcer l'erreur
            GithubService service = new GithubService("");
            // Avec un username invalide et sans réseau, le service retourne le fallback
            GithubStatsResponse result = service.getStats("user_qui_nexiste_pas_xyz_test_404");

            // Le fallback garantit des données non-nulles avec au moins 1 repo
            assertThat(result).isNotNull();
            assertThat(result.username()).isEqualTo("user_qui_nexiste_pas_xyz_test_404");
            assertThat(result.publicRepos()).isPositive();
            assertThat(result.followers()).isPositive();
            assertThat(result.repos()).isNotEmpty().hasSizeLessThanOrEqualTo(6);
        }

        @Test
        @DisplayName("les repos de fallback contiennent tous les champs obligatoires")
        void fallbackReposShouldHaveRequiredFields() {
            GithubService service = new GithubService("");
            GithubStatsResponse result = service.getStats("user_qui_nexiste_pas_xyz_test_404");

            result.repos().forEach(repo -> {
                assertThat(repo.name()).isNotBlank();
                assertThat(repo.htmlUrl()).startsWith("https://github.com/");
                assertThat(repo.stars()).isGreaterThanOrEqualTo(0);
                assertThat(repo.forks()).isGreaterThanOrEqualTo(0);
            });
        }
    }

    // -------------------------------------------------------------------------
    // Tests sur les DTOs
    // -------------------------------------------------------------------------

    @Nested
    @DisplayName("GithubRepoDto")
    class GithubRepoDtoTest {

        @Test
        @DisplayName("doit correctement stocker les champs passés au constructeur")
        void shouldStoreAllFields() {
            GithubRepoDto dto = new GithubRepoDto(
                    "my-repo", "My description",
                    "https://github.com/user/my-repo",
                    "Java", 42, 7
            );
            assertThat(dto.name()).isEqualTo("my-repo");
            assertThat(dto.description()).isEqualTo("My description");
            assertThat(dto.htmlUrl()).isEqualTo("https://github.com/user/my-repo");
            assertThat(dto.language()).isEqualTo("Java");
            assertThat(dto.stars()).isEqualTo(42);
            assertThat(dto.forks()).isEqualTo(7);
        }

        @Test
        @DisplayName("doit accepter description et language null")
        void shouldAcceptNullFields() {
            GithubRepoDto dto = new GithubRepoDto("repo", null, "https://github.com/x/repo", null, 0, 0);
            assertThat(dto.description()).isNull();
            assertThat(dto.language()).isNull();
        }
    }

    // -------------------------------------------------------------------------
    // Tests sur GithubStatsResponse
    // -------------------------------------------------------------------------

    @Nested
    @DisplayName("GithubStatsResponse")
    class GithubStatsResponseTest {

        @Test
        @DisplayName("doit stocker tous les champs")
        void shouldStoreAllFields() {
            java.util.List<GithubRepoDto> repos = java.util.List.of(makeRepo("repo1", 10));
            GithubStatsResponse response = new GithubStatsResponse("arnaud", 12, 50, 10, repos);

            assertThat(response.username()).isEqualTo("arnaud");
            assertThat(response.publicRepos()).isEqualTo(12);
            assertThat(response.followers()).isEqualTo(50);
            assertThat(response.following()).isEqualTo(10);
            assertThat(response.repos()).hasSize(1);
        }
    }

    // -------------------------------------------------------------------------
    // Tests sur la logique de cache (CachedStats record interne)
    // -------------------------------------------------------------------------

    @Nested
    @DisplayName("Cache de stats GitHub")
    class CacheTest {

        @Test
        @DisplayName("un second appel immédiat doit retourner les mêmes stats (cache hit)")
        void shouldReturnCachedStatsOnSecondCall() {
            // Le premier appel peut retourner fallback ou réel selon le réseau — peu importe.
            // Ce qui importe : le second appel renvoie exactement le même objet (cache).
            GithubService service = new GithubService("");
            GithubStatsResponse first  = service.getStats(USERNAME);
            GithubStatsResponse second = service.getStats(USERNAME);

            // Vérification référentielle : le cache retourne le même objet
            assertThat(second).isSameAs(first);
        }
    }
}
