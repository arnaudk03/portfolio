# Frontend Portfolio — Angular 20

Application web du portfolio d'Arnaud Kiema développée avec **Angular 20**, **Tailwind CSS 4** et **Angular Material**.

## 🛠️ Tech Stack

- **Framework** : Angular 20 (Standalone Components, Signals, Hydration)
- **Style** : Tailwind CSS 4, SCSS
- **UI Components** : Angular Material
- **Internationalisation** : `@ngx-translate/core` & `@ngx-translate/http-loader` (FR / EN)
- **Tests** : Jasmine, Karma (67 tests unitaires et composants UI)

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement local
npm start
# ou
ng serve --proxy-config proxy.conf.json
```

L'application sera disponible sur `http://localhost:4200/`.

## 🧪 Tests Unitaires

```bash
# Exécution des tests unitaires en mode Headless
npm test
# ou
npx ng test --watch=false --no-progress --browsers=ChromeHeadless
```

## 📦 Build de Production

```bash
ng build --configuration production
```

Les fichiers compilés seront générés dans le dossier `dist/frontend/browser`.
