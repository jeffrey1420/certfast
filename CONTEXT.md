# CertFast AI Team - CONTEXT.md

**Project Knowledge Base** - Maintained by all agents

---

## 🎯 Project Fundamentals

### Vision
CertFast is an AI-powered compliance automation platform for B2B SaaS startups. From zero to audit-ready in 90 days at one-tenth the cost of traditional solutions.

### Target Customer
- **Primary**: B2B SaaS startups, $1M-$50M ARR, selling to enterprise
- **Decision Maker**: CTO/CEO/Founder (technical background preferred)
- **Pain**: SOC 2/ISO 27001 blocking enterprise deals, 6-12 month traditional timeline

### Key Constraints
- EU data residency required (GDPR)
- Must support SOC 2, ISO 27001, GDPR at launch
- Four pricing tiers: Lite (€199), Starter (€499), Pro (€999), Enterprise (custom)
- 90-day compliance timeline is the core promise
- **Infrastructure: Bare metal + Docker Compose + Cloudflare R2** (updated 2026-03-15)

### Success Metrics
- LTV:CAC > 10:1 for all tiers
- Customer achieves compliance in < 90 days
- 99.9% uptime for Enterprise tier

---

## 🏗️ Architecture Decisions

### Infrastructure Stack (Updated 2026-03-15)
| Component | Technology | Notes |
|-----------|------------|-------|
| **Hosting** | Bare metal server | EU-based datacenter |
| **Containerization** | Docker + Docker Compose | Single-node deployment |
| **Reverse Proxy** | Nginx | SSL termination, rate limiting |
| **API** | AdonisJS v6 | Node.js 20, TypeScript |
| **Database** | PostgreSQL 15 | Self-hosted in Docker |
| **Cache** | Redis 7 | Sessions + caching |
| **Analytics** | ClickHouse 23 | Event tracking |
| **Storage** | Cloudflare R2 | S3-compatible, EU regions |
| **Frontend** | React 18 + Vite | Tailwind CSS, shadcn/ui |
| **Auth** | JWT (AdonisJS Auth) | Access + refresh tokens |
| **SSL** | Let's Encrypt (certbot) | Auto-renewal |
| **Monitoring** | Prometheus + Grafana | Self-hosted |
| **Backups** | Local + R2 offsite | Daily automated |

### Data Model
- Multi-tenant with complete isolation
- Audit logs immutable
- GDPR: Right to deletion implemented

---

## 📋 Active Decisions Log

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-03-15 | EU-first strategy | GDPR compliance is non-negotiable for target market | Active |
| 2026-03-15 | Four-tier pricing | Cover startup to enterprise spectrum | Active |
| 2026-03-15 | CPA partnerships | Reduce CAC by 25%, accelerate trust | Active |
| 2026-03-15 | **Bare metal infrastructure** | Cost control, data sovereignty, simpler ops | Active |
| 2026-03-15 | **Cloudflare R2 for storage** | S3-compatible, EU regions, lower cost than AWS | Active |
| 2026-03-15 | **Docker Compose deployment** | Simpler than K8s for single-node bare metal | Active |

---

## 🔄 Current State

**Sprint**: #1.5 - Architecture Realignment (bare metal transition)  
**Active Tracks**:
- Strategy: Sprint #1 Complete → Sprint #2 Ready
- Design: Sprint #1 Complete → Sprint #2 Ready
- Tech: Sprint #1 Complete → **#1.5 Architecture Realignment IN PROGRESS**

**Blocking Issue**: Architecture docs (TEC-001, TEC-005) are AWS-based and must be updated for bare metal before Sprint #2 development begins.

**Next Milestone**: Complete architecture realignment → Begin Sprint #2 development

---

## 📚 Glossary

- **ICP**: Ideal Customer Profile
- **LTV**: Lifetime Value
- **CAC**: Customer Acquisition Cost
- **SOC 2**: Service Organization Control 2 (security compliance)
- **ISO 27001**: Information security management standard
- **DORA**: Digital Operational Resilience Act (EU regulation)
- **R2**: Cloudflare R2 object storage (S3-compatible)

---

*Updated by: Project Manager at 2026-03-15 19:00 CET*  
*Next review: After architecture realignment complete*
