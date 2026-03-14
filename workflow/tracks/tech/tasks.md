# Tech Track - Task Queue

**Track Owner**: Technical Pipeline
**Current Focus**: API Design

---

## Active Task (CURRENT)

**Task ID**: TEC-003
**Type**: Standard (30 min) - *Reduced from Deep due to API rate limits*
**Assigned Role**: `api-designer`
**Status**: ACTIVE - EXECUTE NOW
**Depends on**: TEC-002 ✅

### Description
API Specification Refinement (Core Endpoints Only)

The database schema is complete. Design REST/GraphQL API endpoints for core resources:
1. Map endpoints to database schema (focus on main entities: users, orgs, assessments, controls)
2. Define request/response schemas for core endpoints
3. Document authentication (JWT/OAuth2)
4. List remaining endpoints as backlog (don't implement all)

### Input
- Database migrations: `/work/certfast/architecture/migrations/`
- Existing spec: `/work/certfast/architecture/api-specification.yaml`

### Output
- Updated `/work/certfast/architecture/api-specification.yaml` (core endpoints only)
- API documentation for core resources
- Backlog list of remaining endpoints

### Quality Gates
- [ ] Core endpoints defined (users, orgs, assessments, controls)
- [ ] OpenAPI 3.0 valid
- [ ] Word Count: Min 800 words
- [ ] No Placeholders in core section
- [ ] English Only
- [ ] Auto-Evaluation: Confidence 1-5

### Git Commit
Format: `tech/api-designer: refined core API specification`

---

## Completed Tasks

### TEC-001: System Architecture ✅
**Role**: system-architect  
**Status**: ✅ COMPLETE  
**Quality Score**: 5/5  
**Commit**: `tech/system-architect: designed complete system architecture`

### TEC-002: Database Schema ✅
**Role**: database-architect  
**Status**: ✅ COMPLETE  
**Quality Score**: 5/5  
**Commit**: `tech/database-architect: implemented complete database schema`

---

## Backlog

### TEC-004: Security Architecture Review
- **Role**: security-architect
- **Type**: Deep (60 min)

### TEC-005: DevOps & Infrastructure
- **Role**: devops-engineer
- **Type**: Standard (30 min)
- **Depends on**: TEC-004

### TEC-006: Technical Documentation
- **Role**: technical-writer
- **Type**: Standard (30 min)
- **Depends on**: TEC-003, TEC-005

---

## Track Status
| Metric | Value |
|--------|-------|
| Tasks Complete | 2/6 |
| Quality Average | 5.0/5 |
