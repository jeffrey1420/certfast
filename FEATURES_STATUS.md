# CertFast - Features Status

**Dernière mise à jour** : 2026-03-16  
**Version** : V1.0

Ce document clarifie ce qui est réellement implémenté dans le code vs ce qui est décrit dans les PRDs mais pas encore codé.

---

## Légende

| Statut | Description |
|--------|-------------|
| ✅ **CODÉ** | Feature complètement implémentée et fonctionnelle |
| 🟡 **PARTIEL** | Feature implémentée mais incomplète ou basique |
| 🔵 **EN COURS** | Feature en développement actif |
| ⚪ **PRD** | Décrit dans les documents produit mais non implémenté |
| ❌ **NON PRÉVU** | Hors scope V1, peut-être plus tard |

---

## État des Features par Epic

### EPIC-001 : Assessment (Auto-évaluation)

| Feature | Statut | Notes |
|---------|--------|-------|
| CRUD Assessments | ✅ CODÉ | Backend + Frontend complet |
| Types d'assessments (SOC2, ISO27001, GDPR) | ✅ CODÉ | Enum implémenté |
| Statuts d'assessments | ✅ CODÉ | draft/in_progress/completed |
| Gap analysis | ⚪ PRD | Algorithme non implémenté |
| Roadmap personnalisée | ⚪ PRD | Génération automatique non codée |
| Score de compliance | 🟡 PARTIEL | Frontend affiche des métriques basiques |

### EPIC-002 : Controls (Contrôles)

| Feature | Statut | Notes |
|---------|--------|-------|
| CRUD Controls | ✅ CODÉ | Backend + Frontend complet |
| Code unique par organisation | ✅ CODÉ | Généré automatiquement |
| Catégorisation des controls | ✅ CODÉ | Par framework |
| Implementation Guidance | ✅ CODÉ | Texte stocké en DB |
| Testing Procedure | ✅ CODÉ | Texte stocké en DB |
| Maturité levels | ✅ CODÉ | 1-5 scale |
| **Automated evidence collection** | ⚪ PRD | ❌ **PAS CODÉ** - Intégrations à venir |
| **Drift detection** | ⚪ PRD | ❌ **PAS CODÉ** - Feature future |
| **100+ intégrations** | ⚪ PRD | ❌ **PAS CODÉ** - AWS/GitHub/Slack/etc. |

### EPIC-003 : Policies (Politiques)

| Feature | Statut | Notes |
|---------|--------|-------|
| CRUD Policies | ✅ CODÉ | Backend + Frontend complet |
| Versioning des policies | ✅ CODÉ | Numéros de version gérés |
| Templates de policies | ⚪ PRD | ❌ **PAS CODÉ** - AI Generator à venir |
| Approval workflows | ⚪ PRD | ❌ **PAS CODÉ** - Feature V2 |
| Employee attestation | ⚪ PRD | ❌ **PAS CODÉ** - Feature V2 |
| Rich text editor | ⚪ PRD | Markdown basique pour l'instant |

### EPIC-000 : Security (Plateforme)

| Feature | Statut | Notes |
|---------|--------|-------|
| Authentification JWT | ✅ CODÉ | Tokens stockés en DB |
| Register/Login/Logout | ✅ CODÉ | Flow complet |
| Auth middleware | ✅ CODÉ | Vérifie token vs DB |
| Organizations multi-tenancy | ✅ CODÉ | Isolation par org |
| Rôles et permissions | 🟡 PARTIEL | Basique (owner/member) |
| Audit logs | ⚪ PRD | ❌ **PAS CODÉ** |
| SSO/SAML | ❌ NON PRÉVU | Enterprise V2+ |
| 2FA | ❌ NON PRÉVU | Feature future |

### EPIC-004 : Dashboard & Reporting

| Feature | Statut | Notes |
|---------|--------|-------|
| Activity feed | ✅ CODÉ | Endpoint `/dashboard/activity` |
| Métriques basiques | ✅ CODÉ | Nombre d'assessments/controls/policies |
| Executive dashboard | ⚪ PRD | ❌ **PAS CODÉ** |
| Compliance health score | ⚪ PRD | ❌ **PAS CODÉ** - Algorithme complexe |
| Trend analysis | ⚪ PRD | ❌ **PAS CODÉ** |
| Scheduled reports | ❌ NON PRÉVU | Feature V2+ |

### EPIC-005 : Integrations (Non commencé)

| Feature | Statut | Notes |
|---------|--------|-------|
| AWS integration | ⚪ PRD | ❌ **PAS CODÉ** |
| GitHub integration | ⚪ PRD | ❌ **PAS CODÉ** |
| Slack notifications | ⚪ PRD | ❌ **PAS CODÉ** |
| Google Workspace | ⚪ PRD | ❌ **PAS CODÉ** |
| Okta/SSO | ⚪ PRD | ❌ **PAS CODÉ** |
| JIRA sync | ⚪ PRD | ❌ **PAS CODÉ** |

---

## Synthèse V1

### ✅ Ce qui marche aujourd'hui

L'utilisateur peut :
1. **Créer un compte** et s'authentifier
2. **Créer une organisation**
3. **Créer des assessments** (SOC2, ISO27001, GDPR)
4. **Créer des controls** avec guidance et procédures de test
5. **Créer des policies** avec versioning
6. **Voir un dashboard** avec métriques basiques
7. **Naviguer** entre toutes ces entités via l'interface web

### ⚠️ Ce qui ne marche PAS (encore)

Ce qui est décrit dans les PRDs mais **non implémenté** :
- **Intégrations automatiques** — Pas de connexion AWS/GitHub/Slack
- **Collecte d'evidence auto** — L'utilisateur doit uploader manuellement
- **AI Policy Generator** — Les policies sont créées vides
- **Gap Analysis intelligente** — Pas d'algorithme de scoring avancé
- **Drift Detection** — Pas de surveillance continue
- **Compliance Copilot** — Pas d'interface IA conversationnelle

---

## Roadmap

| Version | Focus | ETA |
|---------|-------|-----|
| **V1.0** | Core platform (CRUD, Auth, UI) | ✅ Livré |
| **V1.1** | Tests stabilisation, bug fixes | 1 semaine |
| **V1.5** | Intégrations (GitHub, AWS basique) | 1 mois |
| **V2.0** | AI features, automations avancées | 2-3 mois |

---

## Notes pour les développeurs

Quand vous lisez un PRD, vérifiez toujours ce fichier avant de supposer qu'une feature existe. Les PRDs décrivent la **vision** — ce fichier décrit la **réalité du code**.

Pour mettre à jour ce fichier : éditez-le directement quand vous ajoutez une feature.
