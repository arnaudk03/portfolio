import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { LanguageService } from '../../../core/services/language.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';
import { LocalizedText, Publication } from '../../../core/models/portfolio.models';

interface ArticleDetail extends Publication {
  contentFr: string;
  contentEn: string;
  codeSnippet?: string;
}

@Component({
  selector: 'app-publications',
  imports: [TranslatePipe, SectionTitleComponent],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss',
})
export class PublicationsComponent implements OnInit {
  private readonly dataService = inject(PortfolioDataService);
  readonly languageService = inject(LanguageService);

  publications: Publication[] = [];
  selectedArticle: ArticleDetail | null = null;

  ngOnInit(): void {
    this.dataService.getPublications().subscribe((data) => {
      this.publications = data;
    });
  }

  localized(text: LocalizedText): string {
    return this.languageService.localized(text);
  }

  formatDate(date: string): string {
    const [year, month] = date.split('-');
    const locale = this.languageService.currentLang() === 'fr' ? 'fr-FR' : 'en-US';
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric',
    });
  }

  openArticle(pub: Publication): void {
    let contentFr = '';
    let contentEn = '';
    let codeSnippet = '';

    switch (pub.slug) {
      case 'microservices-spring-boot':
        contentFr = "Dans une architecture microservices d'entreprise, la découplage et la résilience sont primordiaux. Spring Boot 3 & Spring Cloud fournissent des patterns robustes (API Gateway, Resilience4j Circuit Breaker, Centralized Config). La communication entre microservices privilégie l'asynchronisme via RabbitMQ pour éviter le couplage fort HTTP. La gestion des transactions distribuées s'appuie sur le pattern Saga / Outbox Transactionnel pour garantir l'idempotence.";
        contentEn = "In enterprise microservices, decoupling and resilience are paramount. Spring Boot 3 & Spring Cloud provide robust patterns (API Gateway, Resilience4j Circuit Breaker, Centralized Config). Async communication via RabbitMQ is favored to prevent strong HTTP coupling. Distributed transactions rely on the Saga / Transactional Outbox pattern to ensure idempotency.";
        codeSnippet = `@Bean
public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("user-service", r -> r.path("/api/v1/users/**")
            .filters(f -> f.circuitBreaker(c -> c.setName("userCB"))
                           .requestRateLimiter(r -> r.setRateLimiter(redisRateLimiter())))
            .uri("lb://USER-SERVICE"))
        .build();
}`;
        break;
      case 'securiser-api-keycloak':
        contentFr = "Keycloak s'impose comme la solution IAM open-source incontournable pour les infrastructures d'entreprise et l'e-Gouvernement. Grâce au protocole OpenID Connect (OIDC) et OAuth2, l'authentification est totalement externalisée de la couche applicative. Spring Security agit en tant que Resource Server en vérifiant les jetons JWT signés RSA256 et en extrayant les rôles `realm_access.roles` pour alimenter le contrôle d'accès RBAC.";
        contentEn = "Keycloak stands out as the ultimate open-source IAM solution for enterprise and e-Gov infrastructures. Using OpenID Connect (OIDC) and OAuth2, auth is entirely decoupled from the application layer. Spring Security acts as a Resource Server validating RSA256 signed JWT tokens and extracting `realm_access.roles` to enforce fine-grained RBAC.";
        codeSnippet = `@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .oauth2ResourceServer(oauth2 -> oauth2
            .jwt(jwt -> jwt.jwtAuthenticationConverter(customJwtRolesConverter())));
    return http.build();
}`;
        break;
      case 'architecture-hexagonale':
        contentFr = "L'Architecture Hexagonale (Ports & Adapters) garantit l'indépendance totale du domaine métier vis-à-vis des frameworks (Spring Boot, JPA, HTTP). Les Use Cases et Entités restent des classes Java pur sans annotations framework. Les adaptateurs entrants (REST Controllers, RabbitMQ Consumers) appellent les Input Ports, tandis que le domaine utilise les Output Ports pour interagir avec la persistance ou les services externes.";
        contentEn = "Hexagonal Architecture (Ports & Adapters) guarantees complete independence of the business domain from frameworks (Spring Boot, JPA, HTTP). Use Cases and Entities remain pure Java without framework annotations. Primary adapters (REST Controllers, RabbitMQ Consumers) call Input Ports, while the domain uses Output Ports to communicate with persistence or external APIs.";
        codeSnippet = `public class ProcessOrderUseCase implements ProcessOrderInputPort {
    private final OrderRepositoryOutputPort orderRepository;
    private final EventPublisherOutputPort eventPublisher;

    public ProcessOrderUseCase(OrderRepositoryOutputPort repo, EventPublisherOutputPort publisher) {
        this.orderRepository = repo;
        this.eventPublisher = publisher;
    }
}`;
        break;
      case 'dockeriser-application-java':
        contentFr = "La containerisation d'applications Java 21 exige l'optimisation des images pour réduire l'empreinte mémoire et accélérer les démarrages. L'utilisation des Multi-Stage Builds Docker basés sur Eclipse Temurin Alpine réduit la taille de l'image finale à moins de 200MB. L'activation des options JVM `-XX:+UseG1GC` et `-XX:MaxRAMPercentage=75.0` garantit un comportement stable sous Kubernetes.";
        contentEn = "Containerizing Java 21 applications requires image optimization for lower memory footprint and faster startups. Multi-stage Docker builds based on Eclipse Temurin Alpine reduce the final image size to under 200MB. Setting JVM options `-XX:+UseG1GC` and `-XX:MaxRAMPercentage=75.0` ensures stable behavior under Kubernetes.";
        codeSnippet = `FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app.jar"]`;
        break;
      case 'oauth2-explique':
        contentFr = "OAuth2 est un framework d'autorisation déléguée et non de simple authentification. Dans les applications modernes SPA (Angular) ou Mobile (Flutter), le flux recommandé est l'Authorization Code Flow avec PKCE (Proof Key for Code Exchange). Ce mécanisme prévient les attaques par interception de code d'autorisation en générant un secret temporaire à chaque tentative de connexion.";
        contentEn = "OAuth2 is a delegated authorization framework, not just simple authentication. In modern SPA (Angular) or Mobile (Flutter) applications, the recommended flow is Authorization Code Flow with PKCE. This mechanism prevents code interception attacks by generating a temporary secret for every login attempt.";
        codeSnippet = `const codeVerifier = generateRandomString(64);
const codeChallenge = await sha256Base64Url(codeVerifier);

// Auth Request to Keycloak:
// GET /realms/dev/protocol/openid-connect/auth?code_challenge=...&code_challenge_method=S256`;
        break;
    }

    this.selectedArticle = {
      ...pub,
      contentFr,
      contentEn,
      codeSnippet,
    };
  }

  closeArticle(): void {
    this.selectedArticle = null;
  }
}
