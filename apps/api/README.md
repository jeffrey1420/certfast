# CertFast API V1

API RESTful pour CertFast - Plateforme de compliance automation pour startups B2B.

## Stack Technique

- **Framework**: AdonisJS v6
- **Langage**: TypeScript
- **Base de données**: PostgreSQL 16
- **Cache**: Redis 7
- **Authentification**: JWT (tokens stockés en DB)
- **Tests**: Japa

## Fonctionnalités V1

### ✅ Authentification
- Register / Login / Logout
- JWT tokens avec expiration
- Middleware d'authentification

### ✅ Dashboard
- Vue d'ensemble des activités
- Derniers assessments mis à jour

### ✅ Assessments
- CRUD complet
- Types: soc2_type1, soc2_type2, iso27001, gdpr, hipaa, custom
- Statuts: draft, active, in_review, completed, archived

### ✅ Controls
- CRUD complet
- Catégorisation par organisation
- Code unique par control

### ✅ Policies
- CRUD complet
- Versioning
- Statuts: draft, published, archived, deprecated

## Architecture

```
app/
├── controllers/     # Contrôleurs HTTP
├── models/          # Modèles Lucid ORM
├── middleware/      # Middleware (auth)
├── services/        # Services métier
config/             # Configuration
├── database.ts     # Config PostgreSQL
database/
├── migrations/     # 9 migrations complètes
├── seeders/        # Seeds pour données de test
start/
├── routes.ts       # Définition des routes API
tests/              # Tests fonctionnels
```

## Routes API

### Publiques
```
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /health
```

### Protégées (Bearer token requis)
```
# Auth
GET  /api/v1/auth/me
POST /api/v1/auth/logout

# Users
GET    /api/v1/users
GET    /api/v1/users/:id
GET    /api/v1/users/me
PUT    /api/v1/users/me
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id

# Organizations
GET    /api/v1/organizations
POST   /api/v1/organizations
GET    /api/v1/organizations/:id
PUT    /api/v1/organizations/:id
DELETE /api/v1/organizations/:id

# Assessments
GET    /api/v1/assessments
POST   /api/v1/assessments
GET    /api/v1/assessments/:id
PUT    /api/v1/assessments/:id
DELETE /api/v1/assessments/:id

# Controls
GET    /api/v1/controls
POST   /api/v1/controls
GET    /api/v1/controls/:id
PUT    /api/v1/controls/:id
DELETE /api/v1/controls/:id

# Policies
GET    /api/v1/policies
POST   /api/v1/policies
GET    /api/v1/policies/:id
PUT    /api/v1/policies/:id
DELETE /api/v1/policies/:id

# Dashboard
GET    /api/v1/dashboard/activity
```

## Setup Local

### Prérequis
- Node.js 20+
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose (optionnel)

### 1. Démarrer l'infrastructure (avec Docker)

```bash
cd /work/certfast
docker-compose up -d
```

Cela démarre:
- PostgreSQL sur port 5432
- PostgreSQL (test) sur port 5433
- Redis sur port 6379

### 2. Configurer les variables d'environnement

```bash
cd apps/api
cp .env.example .env
```

Le fichier `.env` contient déjà la config pour Docker:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=certfast
DB_PASSWORD=certfast_dev_password
DB_DATABASE=certfast_dev
```

### 3. Installer les dépendances

```bash
cd apps/api
npm install
```

### 4. Exécuter les migrations

```bash
npm run db:migrate
```

Ou avec ace:
```bash
node ace migration:run
```

### 5. Seed la base de données (optionnel)

```bash
node ace db:seed
```

### 6. Démarrer le serveur

```bash
# Mode développement (hot reload)
npm run dev

# Mode production
npm run build
npm start
```

L'API est disponible sur `http://localhost:3333`

## Tests

### Lancer tous les tests
```bash
npm test
```

### Structure des tests
- `auth.spec.ts` - Tests authentification
- `users_orgs.spec.ts` - Tests users et organisations
- `assessments.spec.ts` - Tests assessments
- `controls.spec.ts` - Tests controls
- `policies.spec.ts` - Tests policies
- `dashboard.spec.ts` - Tests dashboard
- `migrations.spec.ts` - Tests migrations

## Exemples d'utilisation

### Register
```bash
curl -X POST http://localhost:3333/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3333/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Créer un Assessment (authentifié)
```bash
curl -X POST http://localhost:3333/api/v1/assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "organizationId": 1,
    "title": "SOC 2 Assessment",
    "type": "soc2_type1",
    "description": "Initial assessment"
  }'
```

### Créer un Control
```bash
curl -X POST http://localhost:3333/api/v1/controls \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "organizationId": 1,
    "title": "Access Control Policy",
    "category": "Security",
    "code": "SEC-001"
  }'
```

### Créer une Policy
```bash
curl -X POST http://localhost:3333/api/v1/policies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "organizationId": 1,
    "title": "Data Protection Policy",
    "content": "This policy describes..."
  }'
```

## Modèles de Données

### User
- id, email, password (hash), fullName, role, isActive
- Relations: ownedOrganizations, organizations

### Organization
- id, name, slug, description, plan, status, ownerId
- Relations: owner, members

### Assessment
- id, organizationId, title, type, status, description, dueDate
- Relations: organization

### Control
- id, organizationId, title, description, category, code, status
- Relations: organization

### Policy
- id, organizationId, title, content, status, version
- Relations: organization

### UserToken
- id, userId, token, expiresAt, revokedAt
- Pour l'authentification JWT

## Scripts Disponibles

```bash
npm run dev          # Démarrage développement
npm run build        # Compilation TypeScript
npm start            # Démarrage production
npm test             # Lancer les tests
npm run lint         # ESLint
npm run format       # Prettier
```

## Notes pour le Développement

- Les tokens JWT expirent après 30 jours
- Les mots de passe sont hashés avec bcrypt (via AdonisJS hash)
- Les contrôleurs vérifient que l'utilisateur a accès aux ressources (ownerId)
- Les migrations utilisent `naturalSort` pour l'ordre d'exécution

## Licence

Propriétaire - CertFast
