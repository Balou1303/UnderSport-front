# UnderSport — Application front-end

Interface web d'UnderSport, une plateforme d'actualités et d'encyclopédie sportive (football, basket) avec back-office d'administration pour la gestion des contenus. Elle consomme l'API REST du repo [UnderSport-back](https://github.com/Balou1303/UnderSport-back).

## Contexte

Projet réalisé dans le cadre de la préparation du titre professionnel **DWWM (Développeur Web et Web Mobile)**, en tant que projet de certification.

## Stack technique

- **Framework** : React 19, Vite 7
- **Routing** : React Router DOM 7
- **Requêtes HTTP** : Axios (instance centralisée avec intercepteur)
- **UI** : Bootstrap 5 / React-Bootstrap
- **Authentification côté client** : décodage de JWT (`jwt-decode`) + persistance dans `localStorage`
- **Édition de contenu riche** : React-Quill (nouvelle version)
- **Notifications** : React-Toastify
- **Qualité de code** : ESLint

## Fonctionnalités principales

- **Partie publique** : page d'accueil (articles à la une), page article, matchs (foot en direct + NBA), encyclopédie sportive (règles par sport, lexique), fiches "légendes du sport", connexion / inscription
- **Partie back-office (`/admin`)**, accessible selon le rôle de l'utilisateur :
  - Gestion des articles (création, édition avec éditeur riche, mise en avant)
  - Gestion des sports, championnats, légendes et leur palmarès
  - Gestion de l'encyclopédie (règles, lexique)
  - Gestion des rôles utilisateurs
  - Statistiques de popularité des articles
- **Gestion des rôles** : affichage et actions conditionnés au rôle décodé depuis le token (admin / rédacteur / utilisateur)
- **Expérience utilisateur** : déconnexion automatique sur session expirée (401/403), avec avertissement spécifique pour ne pas perdre un contenu en cours de rédaction

## Architecture / choix techniques notables

- **Séparation public / admin** via deux layouts distincts (`PublicLayout`, `AdminLayout`) et un composant `AdminRoute` qui protège l'accès aux pages d'administration selon le rôle
- **État d'authentification global** géré par la Context API (`AuthContext`) : stockage du token en `localStorage`, décodage du JWT côté client pour dériver le rôle et les infos utilisateur, sans appel serveur supplémentaire
- **Client HTTP centralisé** (`services/api.js`) : instance Axios unique avec intercepteur de réponse qui gère globalement les erreurs 401/403 (déconnexion, redirection, ou avertissement si l'utilisateur est en train de rédiger un article/une légende)
- **Un service par ressource** (`usersService`, `articlesService`, `sportsService`, etc.) qui encapsule les appels à l'API back

## Installation et lancement en local

### Prérequis
- Node.js 18+
- L'API back-end lancée (voir le repo [UnderSport-back](https://github.com/Balou1303/UnderSport-back))

### Étapes

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Créer un fichier `.env` à la racine avec l'URL de l'API back-end :
   ```
   VITE_URL_API=http://localhost:3000
   ```

3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
   L'application est alors disponible sur `http://localhost:5173` (port par défaut de Vite).

4. Autres commandes disponibles :
   ```bash
   npm run build    # build de production
   npm run preview  # prévisualisation du build
   npm run lint     # analyse ESLint
   ```

## Ce que ce projet démontre

- Structuration d'une SPA React avec routage protégé par rôle (RBAC côté client)
- Gestion d'état d'authentification global via Context API et JWT
- Centralisation des appels API et gestion transverse des erreurs HTTP (intercepteurs Axios)
- Construction d'un back-office complet (CRUD multi-ressources) distinct de la partie publique
- Attention portée à l'expérience utilisateur (retours visuels, prévention de perte de données)
