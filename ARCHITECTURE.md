# CertFast — Real-First Architecture

## Stack
- **Backend**: AdonisJS v6 + Lucid ORM
- **Database**: PostgreSQL 16 (dev, test, prod)
- **Cache/Queue**: Redis 7
- **Testing**: Japa avec transactions (rollback auto)
- **Containers**: Docker Compose pour tout

## Principles

1. **No Mocks in Tests** — On teste contre une vraie DB PostgreSQL
2. **Transactions Everywhere** — Chaque test roule dans une transaction qui rollback à la fin
3. **No Server Required** — Tests qui démarrent/arrêtent le serveur automatiquement
4. **One Command** — `npm test` fait tout (DB, migrations, tests, cleanup)

## Test Architecture

```
Test Suite
    ↓
Global Setup: Start PostgreSQL container (if not running)
    ↓
Per-Test Setup: BEGIN TRANSACTION
    ↓
Test Runs (queries against real DB)
    ↓
Per-Test Teardown: ROLLBACK
    ↓
Global Teardown: (nothing, container keeps running for next run)
```

## Database Per Environment

| Environment | Database | Purpose |
|-------------|----------|---------|
| Development | `certfast_dev` | Dev server, persistant |
| Testing | `certfast_test` | Tests, truncated entre suites |
| CI | `certfast_test` | Same, ephemeral container |

## Cron Strategy

Pas de "fait tout et voit ce qui passe". Chaque cron a **une tâche unique**, **contexte minimal**, et **critère de succès clair**:

### Types de Cron

1. **Health Check** — Vérifie un état, alerte si ko
2. **Single Task** — Une feature, un fichier, un test à faire passer
3. **Fixer** — Détecte un problème connu, applique la solution

### Règles
- Max 15 min par exécution
- Contexte: fichier de tâche + code source cible uniquement
- Doit produire: commit ou rapport d'échec détaillé
- Pas de boucle infinie: max 3 tentatives puis alerte
