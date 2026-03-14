# 🏢 CertFast AI Team - Organization Structure

## Project Root
`/work/certfast/` - Single source of truth for the entire project

## Directory Structure

```
/work/certfast/
├── 📋 project/               # Product & Business documentation
│   ├── vision/
│   ├── positioning/
│   ├── business-model/
│   └── go-to-market/
│
├── 🎨 design/                # Design & UX documentation
│   ├── brand/
│   ├── design-system/
│   ├── user-flows/
│   └── wireframes/
│
├── 🏗️  architecture/         # Technical documentation
│   ├── uml/
│   ├── api-spec/
│   ├── database/
│   └── infrastructure/
│
├── ⚙️  workflow/             # Multi-agent orchestration (managed by system)
│   ├── roles/                # Role definitions
│   ├── current-sprint/       # Current 6-hour sprint state
│   ├── handoffs/             # Handoff notes between agents
│   ├── backlog/              # Task backlog
│   └── completed/            # Completed sprints archive
│
├── 📁 src/                   # Source code (when we start coding)
│   ├── apps/
│   └── packages/
│
└── 📊 dashboard.md           # Project status overview
```

## Role System

### Core Roles (24 total)

**Strategy & Product (4 roles)**
1. **Product Strategist** - Vision, positioning, competitive analysis
2. **Market Researcher** - Customer research, market sizing, trends
3. **Business Analyst** - Business model, pricing, monetization
4. **Product Manager** - Features prioritization, roadmap

**Design & UX (4 roles)**
5. **Brand Designer** - Logo, visual identity, brand guidelines
6. **UX Researcher** - User research, personas, journey mapping
7. **UI Designer** - Interface design, components, design system
8. **Design Reviewer** - Consistency checks, design critiques

**Technical Architecture (6 roles)**
9. **System Architect** - High-level architecture, tech stack decisions
10. **API Designer** - REST/GraphQL API design, OpenAPI specs
11. **Database Architect** - Schema design, data modeling
12. **Security Architect** - Security patterns, compliance mapping
13. **DevOps Engineer** - CI/CD, infrastructure, deployment
14. **Tech Reviewer** - Architecture reviews, technical debt assessment

**Content & Communication (4 roles)**
15. **Content Writer** - Copywriting, documentation, blog posts
16. **Technical Writer** - API docs, technical specifications
17. **Communication Strategist** - Messaging, pitch decks, presentations
18. **Editor/Reviewer** - Content quality, consistency, tone

**Quality & Organization (4 roles)**
19. **File Organizer** - Structure maintenance, naming conventions
20. **Quality Assurance** - Cross-document consistency, completeness checks
21. **Documentation Synthesizer** - Summaries, indexes, cross-references
22. **Project Librarian** - Archive management, searchability

**Management (2 roles)**
23. **Project Manager** - Sprint planning, resource allocation, blocker resolution
24. **Sprint Coordinator** - Daily standups, task assignment, progress tracking

## Workflow Rules

### Every 30 Minutes (Task Agent)
1. Read `/work/certfast/workflow/current-sprint/ASSIGNED_TASK.md`
2. Execute the assigned task with x-high thinking
3. Write output to appropriate project folder
4. Create handoff note in `/work/certfast/workflow/handoffs/`
5. Assign next role and task

### Every 6 Hours (Project Manager)
1. Review all work completed in last sprint
2. Update `/work/certfast/dashboard.md`
3. Decide next sprint focus area
4. Create new sprint tasks
5. Archive completed sprint

### Handoff Format
Each agent must leave:
- What was completed
- Key decisions made
- Open questions
- Next recommended role with justification
- Estimated complexity of remaining work
