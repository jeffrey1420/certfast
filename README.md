# 🚀 CertFast

**Compliance automation for B2B startups**

> From zero to audit-ready in 90 days

---

## 🤖 AI Team Architecture v2

This project is developed by a **coordinated multi-track AI system** with quality gates and review loops.

### 3-Track Parallel System

| Track | Focus | Task Types |
|-------|-------|------------|
| **Strategy** | Product vision, market research, business model | 15/30/60 min |
| **Design** | Brand identity, UX research, UI design | 15/30/60 min |
| **Tech** | Architecture, database, API, security | 15/30/60 min |

### How It Works

**Every 30 minutes:**
- Each track agent wakes up independently
- Reads active task from `workflow/tracks/[track]/tasks.md`
- Executes task with self-evaluation (1-5)
- Commits with format: `[track/role]: [description]`
- Creates handoff document

**Every 6 hours:**
- Project Manager reviews all 3 tracks
- Synchronizes dependencies
- Assigns next tasks
- Updates dashboard and CONTEXT.md

**Quality Gates (mandatory):**
- [ ] Completeness - All deliverables present
- [ ] Word count: Quick(300)/Standard(800)/Deep(1500)
- [ ] No TODOs remaining
- [ ] All English
- [ ] Self-evaluation honest
- [ ] Git push verified

### Task Types

| Type | Duration | Min Words | Review |
|------|----------|-----------|--------|
| **Quick** | 15 min | 300 | If confidence < 4 |
| **Standard** | 30 min | 800 | If confidence < 4 |
| **Deep** | 60 min | 1500 | **Mandatory** |

---

## 📁 Project Structure

```
/work/certfast/
├── 📋 project/               # Product vision, positioning, business model
│   ├── vision/
│   ├── research/
│   ├── business-model/
│   └── positioning/
├── 🎨 design/                # Brand, UX research, UI
│   ├── brand/
│   ├── research/
│   ├── system/
│   └── flows/
├── 🏗️ architecture/          # System docs, API, security
│   ├── system-architecture.md
│   ├── database-schema.md
│   ├── api-specification.yaml
│   ├── security-architecture.md
│   ├── infrastructure-plan.md
│   └── migrations/
├── ⚙️ workflow/              # Multi-agent orchestration
│   ├── ORCHESTRATOR.md       # Master architecture
│   ├── CONTEXT.md            # Project knowledge base
│   ├── TRACK_EXECUTOR.md     # Agent guide
│   ├── PM_MASTER_REVIEW.md   # PM guide
│   ├── QUALITY_GATES.md      # Quality standards
│   ├── MONITOR.md            # Monitoring protocol
│   ├── HEALTH.md             # Real-time status
│   └── tracks/               # Track task queues
│       ├── strategy/tasks.md
│       ├── design/tasks.md
│       └── tech/tasks.md
├── 📁 src/                   # Source code (future)
└── 📊 dashboard.md           # Project status
```

---

## 📊 Current Status

See [`dashboard.md`](dashboard.md) for real-time project status.

**Current Sprint**: #1 - Foundation  
**Status**: 🟢 Active  
**Started**: 2026-03-15

### Track Progress

| Track | Completed | Active | Quality Avg |
|-------|-----------|--------|-------------|
| Strategy | 4/6 | STR-005 | 4.75/5 |
| Design | 1/5 | DSG-002 | 4.0/5 |
| Tech | 2/6 | TEC-003 | 5.0/5 |

---

## 🎯 Goals

1. **Clear Product Vision** - What we're building and why
2. **Strong Positioning** - How we're different from competitors
3. **Solid Architecture** - Technical foundation for scale
4. **Beautiful Design** - Brand identity and user experience
5. **Organized Documentation** - Everything in its place

---

## 🔗 Quick Links

- [Dashboard](dashboard.md) - Project status
- [Context](workflow/CONTEXT.md) - Project knowledge base
- [Orchestrator](workflow/ORCHESTRATOR.md) - System architecture
- [Strategy Tasks](workflow/tracks/strategy/tasks.md)
- [Design Tasks](workflow/tracks/design/tasks.md)
- [Tech Tasks](workflow/tracks/tech/tasks.md)

---

*This project is automatically maintained by the CertFast AI team.*  
*Architecture: v2 Multi-Track with Quality Gates*
