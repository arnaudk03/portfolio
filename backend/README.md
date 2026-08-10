# Backend Portfolio — Spring Boot 3.4

API backend REST pour le portfolio d'Arnaud Kiema développée avec **Spring Boot 3.4** et **Java 21**.

## 🛠️ Tech Stack

- **Framework** : Spring Boot 3.4.1
- **Langage** : Java 21
- **Modules** : Spring Web, Spring Mail, Spring Validation, Spring Actuator
- **Tests** : JUnit 5, Mockito, Spring Boot Test / MockMvc (30 tests)

## 🚀 Démarrage rapide

```bash
# Lancement de l'application en local
mvn spring-boot:run
```

L'API sera accessible sur `http://localhost:8080/api`.

## 🧪 Tests Unitaires & d'Intégration

```bash
# Lancement de la suite de tests (30 tests)
mvn test
```

## 🔌 Endpoints REST

| Méthode | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Healthcheck (retourne `{"message": "OK"}`) |
| `POST` | `/api/contact` | Envoi d'un message de contact (validé par `@Valid`) |
| `GET` | `/api/github/stats` | Récupération des métriques & dépôts (avec fallback & cache) |
