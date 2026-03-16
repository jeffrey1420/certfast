# CertFast Project Documentation

**Dernière mise à jour** : 2026-03-16

Ce dossier contient toute la documentation stratégique et produit de CertFast.

⚠️ **IMPORTANT** : Certains documents dans ce dossier décrivent des **fonctionnalités futures** non encore implémentées.  
Voir [`/work/certfast/FEATURES_STATUS.md`](../FEATURES_STATUS.md) pour savoir ce qui est réellement codé.

---

## Structure

| Dossier | Contenu | Statut |
|---------|---------|--------|
| `vision/` | Vision produit, positioning | ✅ À jour |
| `research/` | Études de marché, ICPs, concurrents | ✅ À jour |
| `business-model/` | Économique, pricing, projections | ✅ À jour |
| `go-to-market/` | Stratégie de lancement | ✅ À jour |
| `technical-architecture/` | **⚠️ PARTIELLEMENT OBSOLÈTE** | Voir notes ci-dessous |
| `content/` | Copywriting, landing page | ✅ À jour |
| `beta-program/` | Programme bêta | ✅ À jour |

---

## ⚠️ Documents Obsolètes

Les documents suivants décrivent une **architecture AWS** qui a été remplacée par du **Bare Metal + Docker + Cloudflare R2** le 2026-03-15 :

- `technical-architecture/system-architecture.md` — Marqué OBSOLETE
- `technical-architecture/security-architecture.md` — Marqué OBSOLETE  
- `technical-architecture/infrastructure-plan.md` — **Ce fichier n'existe pas ici** (voir `/work/certfast/architecture/`)

**Architecture actuelle** : Voir `/work/certfast/ARCHITECTURE.md` et `/work/certfast/architecture/system-architecture.md`

---

## Documents valides et à jour

### Vision & Stratégie
- `vision/product-vision.md` — Vision long terme
- `positioning/positioning-strategy.md` — Différenciation vs Vanta/Drata
- `research/competitive-analysis.md` — Analyse concurrentielle

### Business
- `business-model/unit-economics.md` — Économie unitaire
- `pricing/pricing-strategy-refinement.md` — Grille de prix (€199-999)

### Architecture technique (à jour)
- `technical-architecture/api-specification.md` — Spécifications API REST
- `technical-architecture/database-schema.md` — Schéma PostgreSQL

---

## ⚠️ Features décrites mais non implémentées

Les documents mentionnent des features qui sont dans la **roadmap** mais pas encore dans le code :

| Feature | Où c'est décrit | Statut réel |
|---------|-----------------|-------------|
| 100+ intégrations (AWS, GitHub, Slack...) | Vision produit | ❌ Non codé — V1.5+ |
| AI Policy Generator | Vision produit | ❌ Non codé — V2.0 |
| Drift Detection | Vision produit | ❌ Non codé — V2.0 |
| Compliance Copilot (IA) | Vision produit | ❌ Non codé — V2.0 |
| SSO/SAML | Architecture sécurité | ❌ Non prévu V1 |
| Audit Management complet | Vision produit | 🟡 Partiel — V1.1 |

**Source de vérité** : [`/work/certfast/FEATURES_STATUS.md`](../FEATURES_STATUS.md)

---

## Comment utiliser cette documentation

1. **Pour comprendre la vision** → Lire `vision/product-vision.md`
2. **Pour connaître l'état du code** → Voir `FEATURES_STATUS.md`
3. **Pour l'architecture technique actuelle** → Voir `/work/certfast/ARCHITECTURE.md`
4. **Pour les specs API** → Voir `technical-architecture/api-specification.md`

---

## Maintenance

Quand vous modifiez un document ici :
1. Mettez à jour la date en haut du fichier
2. Si ça change une feature codée, mettez à jour `FEATURES_STATUS.md`
3. Si c'est un changement d'architecture, marquez l'ancien doc comme OBSOLETE
