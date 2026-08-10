# Portfolio — Arnaud Kiema

Portfolio professionnel orienté **Architecte logiciel / Développeur Java & Fullstack Senior**.

---

## 🛠️ Stack Technique

| Couche | Technologies & Outils |
|---|---|
| **Frontend** | Angular 20, Tailwind CSS 4, Angular Material, RxJS, `@ngx-translate` (i18n FR/EN) |
| **Backend** | Spring Boot 3.4, Java 21, Spring Mail, Spring Actuator |
| **Qualité & Tests** | **JUnit 5**, **Mockito**, **MockMvc**, **Jasmine**, **Karma**, **HttpClientTesting** *(97 tests)* |
| **DevOps & Infra** | Docker, Docker Compose, Nginx, GitHub Actions |
| **Intégrations** | GitHub REST API, GitLab API, QR Code API |

---

## 🧪 Assurance Qualité & Suite de Tests

Le projet dispose d'une couverture de tests complète (unitaires, intégration Web, services et composants UI) totalisant **97 tests (100% de réussite)**.

### Exécuter les tests Backend (30 tests)

```bash
cd backend
mvn test
```

*Couverture :*
- `ContactServiceTest` : Logique d'envoi de mail, mode offline/disabled, vérification des en-têtes et du corps.
- `GithubServiceTest` : Stratégie de fallback hors-ligne, sérialisation DTOs et comportement du cache (TTL/LRU).
- `ContactControllerTest` : Intégration couche Web (MockMvc), validations `@Valid` / `@NotBlank` / `@Email`.
- `GithubControllerTest` : API stats GitHub & GitLab multi-comptes.
- `CorsConfigTest` : Validation des requêtes preflight CORS (`OPTIONS`).

### Exécuter les tests Frontend (67 tests)

```bash
cd frontend
npx ng test --watch=false --no-progress --browsers=ChromeHeadless
```

*Couverture :*
- `portfolio-data.service.spec.ts` : Mock HTTP, gestion des observables et endpoints API.
- `theme.service.spec.ts` : Gestion des thèmes (Dark/Light mode, persistance `localStorage` et détection du système OS).
- `language.service.spec.ts` : Gestion i18n (`fr`/`en`), détection et bascule dynamique.
- `contact.component.spec.ts` : Formulaire réactif, règles de validation et états d'envoi.
- `github.component.spec.ts` : Composant d'affichage des dépôts et métriques.
- `app.spec.ts` : Test d'intégration du composant racine.

---

## 🚀 Démarrage Rapide

### 1. Frontend

```bash
cd frontend
npm install
npm start
```
Accessible sur [http://localhost:4200](http://localhost:4200)

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```
API accessible sur [http://localhost:8080/api](http://localhost:8080/api)

### 3. Déploiement Docker Compose

```bash
docker compose up --build
```
- **Frontend Nginx** : [http://localhost](http://localhost)
- **Backend Spring Boot** : [http://localhost:8080](http://localhost:8080)

---

## ⚙️ Configuration & Variables d'Environnement

| Variable | Description | Valeur par défaut |
|---|---|---|
| `MAIL_ENABLED` | Active l'envoi effectif d'e-mails via SMTP | `false` |
| `MAIL_HOST` | Serveur SMTP d'envoi | `smtp.gmail.com` |
| `MAIL_PORT` | Port SMTP | `587` |
| `MAIL_USERNAME` | Identifiant SMTP | — |
| `MAIL_PASSWORD` | Mot de passe SMTP | — |
| `CONTACT_RECIPIENT` | Adresse destinataire du formulaire de contact | `contact@arnaud-kiema.dev` |
| `CORS_ORIGINS` | Origines HTTP autorisées pour CORS | `http://localhost:4200,http://localhost` |
| `GITHUB_TOKEN` | Token GitHub (optionnel, pour éviter les limites de rate limit) | — |

---

## 🎨 Fonctionnalités & Sections

- **Hero & Présentation** : Titre dynamique, appel à l'action et téléchargement de CV.
- **À propos & Expérience** : Parcours professionnel détaillé et compétences clés.
- **Matrice de Compétences** : Compétences classées par domaines (Backend, Frontend, DevOps, Architecture).
- **Projets & Réalisations** : Vitrine interactive avec détails d'architecture, défis et résultats.
- **Intégrations GitHub & GitLab** : Synchronisation en direct des statistiques et dépôts.
- **Contact & QR Code** : Formulaire réactif sécurisé avec QR Code dynamique de partage.
- **Internationalisation (i18n)** : Support complet Français & Anglais.
- **Mode Sombre / Clair** : Gestionnaire de thème dynamique.
