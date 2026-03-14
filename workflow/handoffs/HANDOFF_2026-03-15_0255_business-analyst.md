# Handoff: Business Analyst → System Architect

**Date**: Sunday, March 15, 2026 — 2:55 AM (Asia/Shanghai)  
**From**: Business Analyst  
**To**: System Architect  
**Task**: S1-T3 - Business Model & Unit Economics Refinement

---

## Summary of Work Completed

### Deliverables Created

1. **Unit Economics Analysis**  
   Location: `/work/certfast/project/business-model/unit-economics.md`
   
   **Contents**:
   - Complete 4-tier pricing model with Lite tier (€199/month)
   - CAC analysis by channel (Organic, Paid, Partnerships, Outbound)
   - LTV calculations with expansion revenue
   - LTV:CAC ratios and payback periods by tier
   - Gross margin analysis (75-85% by tier)
   
   **Key Finding**: Lite tier has exceptional unit economics with 15:1 LTV:CAC and 2-month payback.

2. **3-Year Financial Projections**  
   Location: `/work/certfast/project/business-model/financial-projections-v2.md`
   
   **Contents**:
   - Month-by-month MRR projections
   - Customer acquisition forecast by tier
   - Complete P&L with COGS and OpEx
   - Cash flow analysis
   - Path to profitability (Q2 Year 3)
   
   **Key Finding**: €12M ARR target by Year 3 with €2.7M net income.

3. **Partnership Economics**  
   Location: `/work/certfast/project/business-model/partnership-economics.md`
   
   **Contents**:
   - CPA firm partnership model
   - Revenue share scenarios (10%, 15%, 20%)
   - Recommended 15%/10% structure
   - Audit bundling economics
   - 3-year partner revenue projections
   
   **Key Finding**: Partnerships reduce CAC by 25% and generate €323K net revenue in Year 1.

4. **Sensitivity Analysis**  
   Location: `/work/certfast/project/business-model/sensitivity-analysis.md`
   
   **Contents**:
   - Best/Base/Worst case scenarios
   - Variable sensitivity (ARPU, churn, acquisition, CAC)
   - Break-even analysis by scenario
   - Monte Carlo simulation results
   
   **Key Finding**: 75% probability of €8.5M+ ARR and profitability by Year 3.

---

## Key Financial Decisions Made

### Pricing Structure (Final)

| Tier | Monthly | Annual | Target | LTV:CAC | Payback |
|------|---------|--------|--------|---------|---------|
| **Lite** | €199 | €1,990 | <15 emp | 15:1 | 2.0 mo |
| **Starter** | €299 | €2,990 | 15-50 | 11:1 | 3.5 mo |
| **Pro** | €499 | €4,990 | 50-100 | 12:1 | 5.0 mo |
| **Enterprise** | €999 | €9,990 | 100+ | 12:1 | 7.5 mo |

### Partnership Terms

- **Revenue Share**: 15% Year 1, 10% ongoing
- **Expected Partners**: 3 EU CPA firms
- **Target**: 25% of customers via partnerships
- **Impact**: 25% CAC reduction

### Financial Targets

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| **ARR** | €1.2M | €4.7M | €12.0M |
| **Customers** | 320 | 900 | 1,900 |
| **Gross Margin** | 79% | 86% | 89% |
| **Net Income** | (€679K) | (€174K) | €2.7M |

### Funding Requirements

- **Seed Round**: €1.5M (sufficient to profitability)
- **Runway**: 26 months
- **Break-even**: Q2 Year 3

---

## Git Commit

**Commit**: [TO BE CREATED]  
**Message**: `business-analyst: refined unit economics with Lite tier, partnership models, and 3-year financial projections`

**Files Added**:
- `/work/certfast/project/business-model/unit-economics.md`
- `/work/certfast/project/business-model/financial-projections-v2.md`
- `/work/certfast/project/business-model/partnership-economics.md`
- `/work/certfast/project/business-model/sensitivity-analysis.md`

---

## Open Questions for Next Agent

1. **Technical Feasibility of Tiers**: Can the Lite tier limitations (<15 employees, 1 framework) be enforced technically?
2. **Partnership API Requirements**: What APIs do CPA firms need for audit integration?
3. **Multi-tenancy Cost**: How does customer isolation affect infrastructure costs per tier?
4. **EU Data Residency**: Which cloud regions and what cost premium?
5. **Scalability**: Can the architecture support 1,900 customers by Year 3?

---

## Recommended Next Task

### Recommended Role: **System Architect**

**Task ID**: S1-T4  
**Title**: System Architecture & Technical Foundation  
**Priority**: High

### Rationale

With validated business model and unit economics, CertFast needs a technical foundation that supports:
- Four-tier pricing with feature differentiation
- Three frameworks (SOC 2, ISO 27001, GDPR) at launch
- EU data residency for GDPR compliance
- Partner APIs for CPA firm integration
- 90-day compliance automation workflows

### Task Description

1. **System Architecture Document**
   - High-level design with diagrams
   - Technology stack selection
   - Security-first approach
   - Scalability for 1,900 customers

2. **Database Schema Design**
   - Multi-tenant data model
   - Core entities (companies, frameworks, controls)
   - GDPR-compliant data retention

3. **API Specification**
   - RESTful API design
   - Partner APIs for CPA firms
   - Authentication/authorization

4. **Infrastructure Plan**
   - EU cloud region selection
   - CI/CD pipeline
   - Cost estimates

### Acceptance Criteria

- [ ] System architecture document
- [ ] Database schema (ER diagram)
- [ ] API specification (OpenAPI)
- [ ] Security architecture
- [ ] Infrastructure plan with costs

### Output Location

`/work/certfast/project/technical-architecture/system-architecture.md`
`/work/certfast/project/technical-architecture/database-schema.md`
`/work/certfast/project/technical-architecture/api-specification.md`

---

## Alternative Next Roles (If Not System Architect)

1. **UX Researcher** — If customer journey mapping should precede technical design
2. **Security Architect** — If compliance/security architecture needs dedicated focus
3. **Product Manager** — If detailed feature roadmap is needed before architecture

---

## Notes for Future Agents

- All financial models assume normal market conditions
- Partnership program requires 3 CPA firm agreements
- Lite tier is profitable but monitor cannibalization closely
- Year 1 funding of €1.5M is calculated to reach profitability
- Customer acquisition is the most sensitive variable in the model

---

## Resources Created

| File | Purpose | Key Content |
|------|---------|-------------|
| unit-economics.md | Unit economics deep-dive | CAC, LTV, LTV:CAC, payback by tier |
| financial-projections-v2.md | 3-year forecast | P&L, cash flow, customer growth |
| partnership-economics.md | Partnership strategy | Revenue share, CPA firm model |
| sensitivity-analysis.md | Risk analysis | Best/base/worst scenarios |

---

**Status**: ✅ Complete — Ready for System Architect handoff

**Git Push Required**: YES — All files staged and ready for commit
