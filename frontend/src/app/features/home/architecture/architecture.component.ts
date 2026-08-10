import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';

interface ArchLayer {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  roleFr: string;
  roleEn: string;
  techs: string[];
  patternsFr: string[];
  patternsEn: string[];
}

@Component({
  selector: 'app-architecture',
  imports: [TranslatePipe, SectionTitleComponent],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent {
  activeTab: 'flow' | 'hexagonal' | 'uml' = 'flow';
  selectedLayerId = 'gateway';

  readonly layers: ArchLayer[] = [
    {
      id: 'angular',
      name: 'Angular SPA',
      subtitle: 'Frontend Enterprise UI',
      icon: 'fa-brands fa-angular',
      color: '#DD0031',
      roleFr: "Interface utilisateur Single Page Application réactive avec Angular 20, Angular Material et Tailwind CSS. Authentification déléguée via OIDC PKCE flow.",
      roleEn: "Reactive Single Page Application UI with Angular 20, Angular Material and Tailwind CSS. Delegated authentication via OIDC PKCE flow.",
      techs: ['Angular 20', 'TypeScript', 'RxJS', 'NgRx / Signals', 'Angular Material'],
      patternsFr: ['State Management', 'Lazy Loading Modules', 'HTTP Interceptor Token Relay', 'Guards & Resolvers'],
      patternsEn: ['State Management', 'Lazy Loading Modules', 'HTTP Interceptor Token Relay', 'Guards & Resolvers'],
    },
    {
      id: 'gateway',
      name: 'Spring Cloud Gateway',
      subtitle: 'Edge Routing & Token Validation',
      icon: 'fa-solid fa-door-open',
      color: '#2563EB',
      roleFr: "Point d'entrée unique (API Gateway) assurant le routage dynamique, la limitation de débit (Rate Limiting Resilience4j), la validation centralisée des JWT Keycloak et l'injection des headers de corrélation.",
      roleEn: "Single entry point (API Gateway) providing dynamic routing, rate limiting (Resilience4j), centralized Keycloak JWT validation, and correlation ID header injection.",
      techs: ['Spring Cloud Gateway', 'Spring WebFlux', 'Resilience4j', 'Netty'],
      patternsFr: ['API Gateway Pattern', 'Circuit Breaker', 'Rate Limiting', 'Cross-Cutting Concerns (CORS, Trace ID)'],
      patternsEn: ['API Gateway Pattern', 'Circuit Breaker', 'Rate Limiting', 'Cross-Cutting Concerns (CORS, Trace ID)'],
    },
    {
      id: 'keycloak',
      name: 'Keycloak IAM',
      subtitle: 'Single Sign-On & Identity Federation',
      icon: 'fa-solid fa-shield-halved',
      color: '#7C3AED',
      roleFr: "Gestionnaire d'identités centralisé (IAM) fournissant SSO OAuth2 / OpenID Connect, gestion des rôles (RBAC), fédération d'identités e-Gov et authentification multi-facteurs (MFA).",
      roleEn: "Centralized Identity & Access Management (IAM) providing OAuth2 / OpenID Connect SSO, RBAC role management, e-Gov identity federation, and Multi-Factor Auth (MFA).",
      techs: ['Keycloak', 'OAuth2 / OpenID Connect', 'JWT Tokens', 'Realms & SPI Custom'],
      patternsFr: ['Federated Identity', 'RBAC & Fine-grained Authz', 'PKCE Security Flow', 'Token Exchange'],
      patternsEn: ['Federated Identity', 'RBAC & Fine-grained Authz', 'PKCE Security Flow', 'Token Exchange'],
    },
    {
      id: 'microservices',
      name: 'Spring Boot Microservices',
      subtitle: 'Core Domain & Business Services',
      icon: 'fa-solid fa-cubes',
      color: '#059669',
      roleFr: "Ensemble de microservices autonomes conçus en Architecture Hexagonale (DDD), exposant des API REST documentées OpenAPI et appliquant une séparation stricte des domaines métier.",
      roleEn: "Set of autonomous microservices designed using Hexagonal Architecture (DDD), exposing OpenAPI documented REST APIs and enforcing domain isolation.",
      techs: ['Java 21', 'Spring Boot 3', 'Spring Data JPA', 'OpenAPI / Swagger'],
      patternsFr: ['Hexagonal Architecture (Ports & Adapters)', 'Domain-Driven Design (DDD)', 'CQRS Lite', 'DTO Mapping MapStruct'],
      patternsEn: ['Hexagonal Architecture (Ports & Adapters)', 'Domain-Driven Design (DDD)', 'CQRS Lite', 'DTO Mapping MapStruct'],
    },
    {
      id: 'rabbitmq',
      name: 'RabbitMQ / Kafka',
      subtitle: 'Asynchronous Event Bus',
      icon: 'fa-solid fa-envelope-open-text',
      color: '#EA580C',
      roleFr: "Bus de messages asynchrone pour la communication inter-services découplée, la gestion des événements métier (Domain Events) et l'exécution des traitements d'arrière-plan avec garantie d'idempotence.",
      roleEn: "Asynchronous message bus for decoupled inter-service communication, domain event handling, and background task execution with idempotency guarantees.",
      techs: ['RabbitMQ', 'Spring AMQP', 'Jackson Serialization', 'Dead Letter Exchange'],
      patternsFr: ['Event-Driven Architecture', 'Transactional Outbox Pattern', 'Consumer Idempotency', 'Retry & Dead Letter Queue'],
      patternsEn: ['Event-Driven Architecture', 'Transactional Outbox Pattern', 'Consumer Idempotency', 'Retry & Dead Letter Queue'],
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL DB',
      subtitle: 'Database per Service Pattern',
      icon: 'fa-solid fa-database',
      color: '#0284C7',
      roleFr: "Base de données relationnelle haute performance isolée par microservice (Database-per-service), avec migrations de schéma versionnées Flyway / Liquibase et indexation optimisée.",
      roleEn: "High-performance relational database isolated per microservice (Database-per-service), with versioned Flyway / Liquibase schema migrations and optimized indexing.",
      techs: ['PostgreSQL 16', 'Hibernate ORM', 'Flyway Migrations', 'Connection Pooling HikariCP'],
      patternsFr: ['Database per Service', 'Optimistic Locking', 'Connection Pooling', 'JSONB Hybrid Storage'],
      patternsEn: ['Database per Service', 'Optimistic Locking', 'Connection Pooling', 'JSONB Hybrid Storage'],
    },
  ];

  readonly principles = [
    { icon: 'fa-solid fa-shield-halved', title: 'Security First', desc: 'OAuth2/OIDC via Keycloak, JWT Tokens, RBAC & SSL/TLS Encryption' },
    { icon: 'fa-solid fa-arrows-split-up-and-left', title: 'Loose Coupling', desc: 'Microservices architecture, Event-driven communication, API Gateway' },
    { icon: 'fa-solid fa-cubes-stacked', title: 'Scalability & Resilience', desc: 'Kubernetes orchestration, Circuit Breakers, Auto-scaling & Replication' },
    { icon: 'fa-solid fa-code-branch', title: 'Clean & Domain-Driven Design', desc: 'Hexagonal Architecture (Ports & Adapters), DDD, CQRS, 100% Test Coverage' },
  ];

  selectLayer(id: string): void {
    this.selectedLayerId = id;
  }

  getSelectedLayer(): ArchLayer {
    return this.layers.find((l) => l.id === this.selectedLayerId) || this.layers[1];
  }
}
