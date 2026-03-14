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

### Success Metrics
- LTV:CAC > 10:1 for all tiers
- Customer achieves compliance in < 90 days
- 99.9% uptime for Enterprise tier

---

## 🏗️ Architecture Decisions

### Tech Stack (Preliminary)
- Cloud: AWS EU regions (GDPR compliance)
- Database: PostgreSQL with row-level security
- API: REST with OpenAPI spec
- Auth: OAuth 2.0 + SAML for Enterprise

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

---

## 🔄 Current State

**Sprint**: #1 - Foundation  
**Active Tracks**:
- Strategy: Complete (Vision, Research, Business Model)
- Design: Not started
- Tech: In progress (Architecture)

**Next Milestone**: Complete technical architecture for MVP

---

## 📚 Glossary

- **ICP**: Ideal Customer Profile
- **LTV**: Lifetime Value
- **CAC**: Customer Acquisition Cost
- **SOC 2**: Service Organization Control 2 (security compliance)
- **ISO 27001**: Information security management standard
- **DORA**: Digital Operational Resilience Act (EU regulation)

---

*Updated by: [Agent Role] at [Timestamp]*
*Next review: After each sprint completion*
