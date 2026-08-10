# FasoPharma - Gestion de Stock Pharmaceutique Multi-sites

FasoPharma est une plateforme web moderne et sécurisée conçue pour la gestion des stocks de produits pharmaceutiques à travers plusieurs sites (Dépôts, Pharmacies, Services). Elle permet un suivi rigoureux des mouvements de stocks, des ventes, des inventaires et des alertes de péremption.

## 🛠️ Stack Technique

- **Backend** : Java 17, Spring Boot 3.2.5, Spring Security, JPA/Hibernate.
- **Frontend** : Angular 17.3, Angular Material, RxJS.
- **Base de données** : PostgreSQL 15.
- **Reporting** : OpenPDF, Apache POI (Export PDF et Excel).
- **Docker** : Docker Compose pour l'orchestration des services.

---

## 📊 Diagrammes du Système

### 1. Diagramme de Classe (Cœur Métier)

```mermaid
classDiagram
    class User {
        +Long id
        +String username
        +String email
        +String password
        +Site site
        +Set~Role~ roles
    }
    class Role {
        +Long id
        +RoleName name
    }
    class Site {
        +Long id
        +String name
        +String type
        +Organization organization
        +Site parentSite
    }
    class Organization {
        +Long id
        +String name
    }
    class Product {
        +Long id
        +String code
        +String name
        +Category category
        +Manufacturer manufacturer
        +BigDecimal sellingPrice
    }
    class Category {
        +Long id
        +String name
    }
    class Lot {
        +Long id
        +String lotNumber
        +LocalDate expirationDate
        +Product product
        +Site site
        +Integer quantity
    }
    class StockMovement {
        +Long id
        +String reference
        +MovementType type
        +MovementReason reason
        +Site site
        +List~Movement~ items
    }
    class Movement {
        +Long id
        +Product product
        +Lot lot
        +Integer quantity
    }

    User "M" -- "M" Role
    User "M" -- "1" Site
    Site "M" -- "1" Organization
    Site "1" -- "M" Site : parent
    Product "M" -- "1" Category
    Lot "M" -- "1" Product
    Lot "M" -- "1" Site
    StockMovement "1" -- "M" Movement
    Movement "M" -- "1" Product
    Movement "M" -- "1" Lot
    StockMovement "M" -- "1" Site
```

### 2. Diagramme de Séquence (Processus de Vente/Sortie)

```mermaid
sequenceDiagram
    participant U as Utilisateur (Pharmacien)
    participant F as Frontend (Angular)
    participant B as Backend (Spring Boot)
    participant D as Database (Postgres)

    U->>F: Sélectionne les produits et valide la vente
    F->>B: POST /api/sales (SaleRequest)
    B->>B: Valider les stocks disponibles
    B->>D: Décrémenter la quantité dans Lot
    D-->>B: OK
    B->>D: Enregistrer la Vente et les SaleItems
    D-->>B: OK
    B->>D: Enregistrer le mouvement de stock (Type: OUT)
    D-->>B: OK
    B-->>F: HTTP 201 (Sale Created)
    F-->>U: Affiche succès + Option impression ticket
```

### 3. Diagramme de Déploiement

```mermaid
graph TD
    subgraph "Infrastructure Docker"
        UI[Container: pharmastock-ui\nAngular/Nginx\nPort: 4201]
        BE[Container: pharmastock-backend\nSpring Boot\nPort: 8087]
        DB[(Container: pharmastock-db\nPostgreSQL\nPort: 5436)]
        PGA[Container: pharmastock-pgadmin\nPort: 5050]
    end

    Internet([Utilisateurs / Browser]) --> UI
    UI --> BE
    BE --> DB
    PGA --> DB
```

---

## 🚀 Installation et Démarrage

### Prérequis
- Docker et Docker Compose installés.
- Java 17+ (pour le développement local).
- Node.js 18+ (pour le développement frontend).

### Lancement avec Docker
1. Clonez le dépôt.
2. À la racine du projet, lancez :
   ```bash
   docker-compose up --build
   ```
3. Accédez à l'application :
   - Frontend : `http://localhost:4201`
   - Backend API : `http://localhost:8087/api`
   - pgAdmin : `http://localhost:5050` (admin@admin.com / admin)

### Comptes par défaut (Initialisation)
- **Admin** : admin / admin123
- **Pharmacien** : pharma / pharma123

## 🔒 Sécurité et Performance
- Authentification par **JWT (Stateless)**.
- **CORS** restreint aux domaines autorisés.
- **Rate Limiting** sur les tentatives de connexion.
- **Pagination côté serveur** pour toutes les listes volumineuses.
- **Indexation** SQL sur les colonnes de recherche (codes, numéros de lots).
