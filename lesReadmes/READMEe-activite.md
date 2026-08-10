# E-activite : Plateforme de Suivi et de Gestion des Activités Administratives

**E-activite** est une solution numérique intégrée conçue pour moderniser et optimiser la gestion quotidienne des activités au sein de l'administration publique. Initié par **M. Alidou KOUSSE** (Directeur de la DCSI), développé par **M. Arnaud KIEMA** et **Mlle. Esther Marie DANDJINOU** et amender par **Tout le personnel de la DGTD**  ce projet s'inscrit dans la dynamique de transformation digitale du Ministère de la Transition Digitale, des Postes et des Communications Électroniques (MTDPCE) du Burkina Faso.

---

## 🎯 Vision et Objectifs

### Objectif Général
L'objectif principal est de dématérialiser les processus de suivi des activités et de gestion du personnel pour accroître l'efficacité opérationnelle, la transparence et la traçabilité au sein de la DCSI (Direction de la Communication et des Systèmes d'Information).

### Objectifs Spécifiques
*   **Centralisation des données** : Regrouper toutes les activités, demandes de congés et communications sur une plateforme unique.
*   **Optimisation du Suivi** : Permettre aux responsables de suivre l'état d'avancement des tâches en temps réel.
*   **Gestion Autonome des Congés** : Automatiser le calcul des soldes et le circuit d'approbation des demandes de congés.
*   **Fluidification de la Communication** : Diffuser instantanément des informations officielles via des canaux ciblés (Scopes de diffusion).
*   **Sécurisation et Audit** : Garantir l'intégrité des données par un système de permissions granulaire et un journal d'audit exhaustif.

---

## 🛠️ Méthodologie de Développement

Le projet a été mené selon une approche itérative et incrémentale, inspirée des méthodes agiles, structurée comme suit :
1.  **Analyse des besoins** : Étude approfondie des processus métier (gestion des tâches, workflow des congés).
2.  **Conception Architecturale** : Adoption d'une architecture découplée (Frontend/Backend) pour une meilleure scalabilité et maintenance.
3.  **Développement (Sprint-based)** : Implémentation par modules fonctionnels (Activités, Congés, Publication, Administration).
4.  **Tests et Validation** : Tests unitaires et d'intégration pour assurer la robustesse de la logique métier.
5.  **Déploiement Continu** : Utilisation de profils de configuration (Dev/Prod) pour faciliter la mise en production.

---

## 💻 Technologies Utilisées

La plateforme repose sur des technologies de pointe garantissant performance, sécurité et maintenabilité :

### Backend (Architecture RESTful)
*   **Framework** : Spring Boot 3.1.0 (Java 17)
*   **Sécurité** : Spring Security & JWT (Authentification sans état, sécurisée par jetons).
*   **Mapping** : MapStruct (Conversion efficace entre Entités JPA et DTOs).
*   **Base de Données** : PostgreSQL (Production) / MySQL (Développement).
*   **Rapports** : OpenPDF pour la génération de documents administratifs.

### Frontend (Application Monopage - SPA)
*   **Framework** : Angular 19
*   **Design** : Angular Material (Composants UI modernes et responsifs).
*   **Graphiques** : Chart.js / ng2-charts pour le tableau de bord décisionnel.
*   **UX/UI** : Utilisation de carrousels (Slick) et de notifications dynamiques.

---

### 4. Diagramme de Déploiement
```mermaid
deploymentDiagram
    node "Poste Client" {
        [Navigateur (SPA)]
    }
    node "Serveur Web/App" {
        [Serveur Nginx / Tomcat]
        [Backend API (JAR)]
    }
    node "Serveur DB" {
        database "PostgreSQL"
    }
    [Navigateur (SPA)] -- "HTTPS/REST" : [Backend API (JAR)]
    [Backend API (JAR)] -- "JDBC" : "PostgreSQL"
```

---

## 📊 Résultat Final

Le résultat est une application métier robuste, intuitive et hautement sécurisée offrant :
*   **Un Tableau de Bord décisionnel** : Visualisation instantanée des statistiques clés (taux d'exécution, absences).
*   **Un Workflow de Congés complet** : Gestion automatisée de la demande jusqu'à l'imputation sur le solde.
*   **Une Gestion de Publication dynamique** : Contrôle précis de qui voit quoi grâce aux *Scopes de Diffusion*.
*   **Une Interface d'Administration** : Gestion simplifiée des utilisateurs, des permissions, des types d'activités et de l'organigramme.

---

## 🔒 Focus : Scopes de Diffusion
Le système utilise une table de référence `diffusion_scope` pour gérer la visibilité des contenus :
*   `STRUCTURE_UNIQUEMENT` : Direction locale uniquement.
*   `STRUCTURES_INFERIEURES` : Direction et services rattachés.
*   `STRUCTURES_SUPERIEURES` : Visibilité remontante vers la hiérarchie.
*   `TOUT_LE_MINISTERE` : Communication transversale au ministère.
*   `INTER_MINISTERIEL` : Publication publique sur la plateforme.

---

## 📦 Installation rapide

### Backend
```bash
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend
```bash
cd front-end
npm install
npm start
```

---

## 🚀 Perspectives

E-activite est conçu pour évoluer avec les besoins de l'administration :
1.  **Application Mobile** : Développement d'une version mobile pour les notifications push et l'accès nomade.
2.  **Intelligence Artificielle** : Analyse prédictive des charges de travail et aide à la planification.
3.  **Interfaçage** : Connexion avec d'autres systèmes étatiques (SIGASPE).
4.  **Archivage Numérique** : Intégration d'un module d'archivage à valeur probante pour les documents PDF.

---

## 👥 Équipe Projet
*   **Supervision & Vision** : M. Alidou KOUSSE (Directeur DCSI)
*   **Ingénierie & Développement** : M. Arnaud KIEMA (Développeur Principal), Mlle. Marie Esther DANDJINOU (Développeur)

---
© 2026 DCSI / DGTD - Burkina Faso. La Patrie ou la Mort, nous vaincrons.
