# CertFast Testing Guide - End-to-End

**Version**: 1.0  
**Purpose**: Test complet du MVP avant mise en prod

---

## 🎯 Objectif

Valider que CertFast fonctionne de A à Z avant déploiement.

---

## Phase 1: Tests Locaux (Développement)

### 1.1 Démarrer l'environnement

```bash
cd /work/certfast

# 1. Démarrer les services
docker-compose up -d

# 2. Vérifier que tout est up
docker-compose ps

# 3. Logs
docker-compose logs -f app
```

**Attendre que tous les services soient "healthy" :**
- ✅ PostgreSQL
- ✅ Redis  
- ✅ ClickHouse
- ✅ API AdonisJS
- ✅ Nginx

### 1.2 Test API (Backend)

```bash
# Dans un autre terminal

# Test health check
curl http://localhost:3333/health
# Expected: {"status":"ok"}

# Test auth - Register
curl -X POST http://localhost:3333/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "password": "SecurePass123!",
    "firstName": "Test",
    "lastName": "User"
  }'
# Expected: 201 + user object (sans password)

# Test auth - Login
curl -X POST http://localhost:3333/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@company.com",
    "password": "SecurePass123!"
  }'
# Expected: 200 + {token, user}

# Sauvegarder le token
TOKEN="eyJhbGc..."

# Test créer une organisation
curl -X POST http://localhost:3333/api/v1/organizations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Company",
    "framework": "SOC2"
  }'
# Expected: 201 + org object

# Test créer une assessment
curl -X POST http://localhost:3333/api/v1/assessments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "SOC2 Type II 2026",
    "framework": "SOC2",
    "targetDate": "2026-12-31"
  }'
# Expected: 201 + assessment object

# Test lister les assessments
curl http://localhost:3333/api/v1/assessments \
  -H "Authorization: Bearer $TOKEN"
# Expected: 200 + array of assessments
```

### 1.3 Test Frontend

```bash
# Démarrer le frontend
cd apps/web
npm run dev

# Ouvrir http://localhost:5173
```

**Checklist manuelle :**
- [ ] Page Login s'affiche
- [ ] Login fonctionne avec le compte créé
- [ ] Dashboard s'affiche avec metrics
- [ ] Créer une assessment fonctionne
- [ ] Voir liste des assessments
- [ ] Responsive (mobile) OK

---

## Phase 2: Tests Automatisés

### 2.1 Backend Tests

```bash
cd apps/api

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific file
npm test -- tests/functional/auth.spec.ts
```

**Expected :**
- Tous les tests passent (green)
- Coverage > 80% services, > 70% controllers
- Aucun test skipped

### 2.2 Test Database

```bash
# Vérifier les migrations
node ace migration:status

# Test rollback
node ace migration:rollback
node ace migration:run

# Test seeders (si existants)
node ace db:seed
```

---

## Phase 3: Tests Intégration (Docker)

### 3.1 Clean Slate Test

```bash
# Nettoyer completement
docker-compose down -v
docker-compose up -d --build

# Attendre 30s
sleep 30

# Vérifier tous les services
docker-compose ps

# Run les tests dans le container
docker-compose exec app npm test
```

### 3.2 Test Persistance

```bash
# 1. Créer des données
curl -X POST http://localhost:3333/api/v1/auth/register \
  -d '{"email":"persist@test.com","password":"test123"}'

# 2. Stopper les containers
docker-compose down

# 3. Redémarrer
docker-compose up -d

# 4. Vérifier que les données sont là
curl -X POST http://localhost:3333/api/v1/auth/login \
  -d '{"email":"persist@test.com","password":"test123"}'
# Expected: 200 (pas 401)
```

---

## Phase 4: Tests Production (Staging)

### 4.1 Déploiement Staging

```bash
# Sur ton serveur bare metal
git clone https://github.com/jeffrey1420/certfast.git
cd certfast

# Configurer les variables d'environnement
cp infrastructure/.env.example infrastructure/.env
nano infrastructure/.env  # Remplir les valeurs

# Démarrer
docker-compose -f infrastructure/docker-compose.yml up -d
```

### 4.2 Test SSL (si configuré)

```bash
# Vérifier le certificat
curl -I https://staging.tondomaine.com
# Expected: 200 + HTTPS OK
```

### 4.3 Test Performance (Basique)

```bash
# Installer hey (load tester)
# brew install hey  # macOS
# apt install hey   # Ubuntu

# Test 100 requêtes, 10 concurrents
hey -n 100 -c 10 http://localhost:3333/health

# Expected:
# - Toutes les requêtes passent (200 OK)
# - Latence moyenne < 100ms
# - Aucune erreur 5xx
```

---

## Phase 5: Tests Utilisateur (Manuels)

### 5.1 Scénario Complet "Happy Path"

**En tant qu'utilisateur final :**

1. **Inscription**
   - Aller sur `/register`
   - Créer compte : louis@grinto.fr / password
   - Vérifier email reçu (si configuré)

2. **Créer Organisation**
   - Cliquer "New Organization"
   - Nom : "Grinto"
   - Framework : SOC2

3. **Créer Assessment**
   - Click "New Assessment"
   - Nom : "SOC2 Type II 2026"
   - Date cible : 31/12/2026
   - Vérifier apparition dans la liste

4. **Ajouter un Contrôle**
   - Ouvrir l'assessment
   - Click "Add Control"
   - Type : "Access Control"
   - Description : "MFA required for all admin accounts"
   - Status : "In Progress"

5. **Uploader Evidence**
   - Sur le contrôle, click "Upload Evidence"
   - Sélectionner un PDF
   - Vérifier upload OK
   - Vérifier apparition dans la liste

6. **Voir Dashboard**
   - Retourner au dashboard
   - Vérifier que "Compliance Score" s'est mis à jour
   - Vérifier graphiques/statistiques

7. **Déconnexion/Reconnexion**
   - Logout
   - Login à nouveau
   - Vérifier que toutes les données sont là

### 5.2 Scénarios Erreur

**Test des cas d'erreur :**

- [ ] Login avec mauvais password → 401
- [ ] Créer org sans nom → 422 validation error
- [ ] Accéder assessment d'une autre org → 403
- [ ] Upload fichier > 10MB → 413
- [ ] Token expiré → 401 + redirect login

---

## Phase 6: Checklist Pré-Prod

### Sécurité
- [ ] JWT secret changé (pas la valeur par défaut)
- [ ] DB passwords forts
- [ ] Redis password configuré
- [ ] R2 credentials OK
- [ ] Headers sécurité (HSTS, CSP)
- [ ] Rate limiting activé

### Performance
- [ ] DB indexes créés
- [ ] Redis cache fonctionne
- [ ] Static files servis par Nginx (pas Node)
- [ ] Gzip compression activé

### Monitoring
- [ ] Logs centralisés (ou au moins persistants)
- [ ] Health check endpoint OK
- [ ] Docker restart policy configuré
- [ ] Backups automatisés (DB → R2)

### Documentation
- [ ] README à jour
- [ ] Variables d'env documentées
- [ ] Procédure de rollback connue

---

## 🚨 Signaux d'Alerte (Ne PAS mettre en prod)

**STOP si :**
- ❌ Tests backend < 70% coverage
- ❌ Plus de 5% de requêtes échouent (load test)
- ❌ Pas de backup automatisé
- ❌ Pas de health check
- ❌ Token JWT hardcodé
- ❌ Passwords en clair dans les logs
- ❌ Database exposée sur internet

---

## ✅ Go-Live Checklist

**Avant ouverture aux utilisateurs :**

- [ ] Tous les tests ci-dessus passent
- [ ] SSL certificate valide
- [ ] Domaine configuré
- [ ] Email service fonctionnel (SendGrid/AWS SES)
- [ ] Monitoring alertes configurées
- [ ] Plan de rollback prêt
- [ ] Database backup testé (restore sur autre instance)

**Soft Launch (Beta) :**
- [ ] 5-10 utilisateurs invités
- [ ] Feedback collecté
- [ ] Bugs critiques fixés

**Launch Public :**
- [ ] Analytics configurés
- [ ] Support email réactif
- [ ] Documentation utilisateur complète

---

## Résultat Attendu

**v1 Fonctionnelle =**
- Backend stable avec tests
- Frontend utilisable (même si pas parfait)
- Docker Compose qui marche en 1 commande
- Documentation pour toi (ou un dev) de déployer

**Prod Ready =**
- Tout ce qui est au-dessus
- Plus sécurité, monitoring, backups
- Performances acceptables (< 200ms par requête)

---

*Document à mettre à jour après chaque déploiement*
