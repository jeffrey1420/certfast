# Agent Execution Guide - SIMPLIFIED

**Pour les agents qui exécutent les tâches de Sprint #2**

---

## ⚡ RÈGLE D'OR : Lis MOINS, fais PLUS

**Tu as 15-30 minutes MAX. Ne perds pas de temps à lire des tonnes de fichiers.**

---

## 📋 Checklist avant de commencer

1. ✅ Lis SEULEMENT cette tâche dans `tasks.md`
2. ✅ Vérifie le type : Quick (15min) / Standard (30min)
3. ✅ Crée le livrable directement
4. ✅ Commit + push

**NE LIS PAS :**
- ❌ Tous les fichiers d'architecture
- ❌ CONTEXT.md entier
- ❌ Les autres tâches
- ❌ Les fichiers de design

---

## 🏗️ Architecture Bare Metal (Résumé 10 secondes)

```
Nginx (SSL) → AdonisJS API → PostgreSQL + Redis + ClickHouse + R2
```

**Stack :**
- Backend : AdonisJS v6 (Node.js 20)
- Frontend : React 18 + Vite (déjà créé dans `apps/web/`)
- DB : PostgreSQL 15 (Docker)
- Cache : Redis 7 (Docker)
- Analytics : ClickHouse 23 (Docker)
- Storage : Cloudflare R2 (S3-compatible)
- Proxy : Nginx + Let's Encrypt

---

## 💾 Cloudflare R2 (Stockage fichiers)

**Pour TEC-012 (Evidence upload) :**

```typescript
// Utilise le SDK AWS S3 (compatible R2)
import { S3Client } from '@aws-sdk/client-s3'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  }
})
```

**Buckets nécessaires :**
- `certfast-evidence-{env}` - Fichiers d'évidence
- `certfast-backups-{env}` - Backups DB

---

## 🔧 Tâches Sprint #2 - Mode d'emploi

### TEC-006 : Docker Compose
**Fichiers à créer :**
- `infrastructure/docker-compose.yml`
- `infrastructure/.env.example`

**Services obligatoires :**
```yaml
# 6 services : app, postgres, redis, clickhouse, nginx, (minio optionnel)
# Copie la structure de la doc d'architecture
```

### TEC-007 : Setup AdonisJS
**Commande :**
```bash
cd apps/
npm init adonis-ts-app api
cd api
npm install @adonisjs/auth @adonisjs/lucid @adonisjs/redis luxon
npm install @aws-sdk/client-s3 clickhouse
```

### TEC-008 : Migrations
**Tables :** users, organizations, organization_users, assessments, controls, evidence, audit_logs
**Copie le schéma de :** `/work/certfast/architecture/database-schema.md`

### TEC-009 : Auth
**Endpoints :** register, login, refresh, logout, forgot-password, reset-password, me
**JWT :** access token 15min, refresh token 7jours dans Redis

### TEC-010 à TEC-012 : APIs
**Base URL :** `/api/v1/`
**Format :** REST JSON
**Auth :** Bearer token

### DSG-008 à DSG-014 : Frontend
**Déjà setup dans :** `apps/web/`
**API URL :** utilise `import.meta.env.VITE_API_URL`
**Composants :** shadcn/ui déjà installés

---

## ✅ Quality Gates SIMPLIFIÉS

| Check | Quick (15min) | Standard (30min) |
|-------|---------------|------------------|
| Fichier créé | ✅ | ✅ |
| Code compile/parses | ✅ | ✅ |
| `.env.example` à jour | - | ✅ |
| Commit + push | ✅ | ✅ |

**Word count :** Pas important pour le code, mais commente ton code.

---

## 🚨 Anti-Patterns à ÉVITER

❌ **Ne fais pas :**
- Lire 10 fichiers avant de commencer
- Réécrire toute l'architecture
- Créer des générateurs de code complexes
- Chercher la perfection

✅ **Fais :**
- Copier les patterns de la doc d'architecture
- Utiliser les valeurs par défaut raisonnables
- Tester que ça compile/démarre
- Push rapidement

---

## 💡 Rappels

- **15 min = Quick** : Fichier simple, config basique
- **30 min = Standard** : Setup complet, mais pas over-engineered
- **PAS de Deep (60min)** pour le code initial
- **Commit format :** `tech/backend-developer: setup Adonis project`
- **Push OBLIGATOIRE** avant de finir

---

## 📁 Structure attendue après Sprint #2

```
/work/certfast/
├── apps/
│   ├── api/              # AdonisJS (TEC-007)
│   │   ├── app/
│   │   ├── config/
│   │   ├── database/
│   │   └── start/
│   └── web/              # React (déjà créé)
├── infrastructure/
│   ├── docker-compose.yml    # (TEC-006)
│   ├── docker-compose.prod.yml
│   └── .env.example
└── architecture/         # Docs déjà créées
```

---

**Questions ?** Réfère-toi à `/work/certfast/architecture/system-architecture.md` UNIQUEMENT si tu bloques sur une décision technique.

**Maintenant : EXECUTE ta tâche et PUSH !** 🚀
