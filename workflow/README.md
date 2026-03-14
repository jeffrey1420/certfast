# Multi-Agent Workflow System v2

## Architecture Overview

This is a **3-track parallel system** with quality gates, review loops, and automated monitoring.

```
┌─────────────────────────────────────────────────────────────┐
│                    MASTER ORCHESTRATOR                       │
│                  (Every 6 hours - PM Review)                 │
└──────────────────┬──────────────────────────┬───────────────┘
                   │                          │
        ┌──────────┴──────────┐    ┌─────────┴──────────┐
        │   STRATEGY TRACK    │    │    DESIGN TRACK    │
        │   (15/30/60 min)    │    │    (15/30/60 min)  │
        │                     │    │                    │
        │ • Product Vision    │    │ • Brand Identity   │
        │ • Market Research   │    │ • UX Research      │
        │ • Business Model    │    │ • UI Design        │
        │ • Positioning       │    │ • Design System    │
        └──────────┬──────────┘    └─────────┬──────────┘
                   │                          │
                   └──────────┬───────────────┘
                              │
                   ┌──────────┴──────────┐
                   │    TECH TRACK       │
                   │    (15/30/60 min)   │
                   │                     │
                   │ • Architecture      │
                   │ • Database Design   │
                   │ • API Design        │
                   │ • Security          │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │   REVIEW & MERGE    │
                   │   (Quality Gates)   │
                   └─────────────────────┘
```

## How It Works

### Agent Cycle (Every 30 Minutes)

1. **Wake up** with specific track and role
2. **Read** `CONTEXT.md` for project context
3. **Read** track tasks from `tracks/[track]/tasks.md`
4. **Execute** active task with high thinking
5. **Self-evaluate** confidence 1-5
6. **Create handoff** in `workflow/handoffs/`
7. **Commit** with format: `[track/role]: [description]`
8. **Push** to GitHub (mandatory)

### PM Review (Every 6 Hours)

1. Read `PM_MASTER_REVIEW.md`
2. Review all 3 track files
3. Check recent handoffs
4. Update `CONTEXT.md` with major decisions
5. Update `dashboard.md`
6. Assign next tasks
7. Commit and push

## Directory Structure

```
workflow/
├── ORCHESTRATOR.md           # Master architecture (this system)
├── CONTEXT.md                # Project knowledge base
├── TRACK_EXECUTOR.md         # Guide for agent execution
├── PM_MASTER_REVIEW.md       # Guide for PM reviews
├── QUALITY_GATES.md          # Quality standards
├── REVIEW_PROCESS.md         # Review workflow
├── MONITOR.md                # Monitoring protocol
├── HEALTH.md                 # Real-time status
├── roles/                    # Role definitions (legacy)
├── handoffs/                 # Agent handoff documents
└── tracks/                   # Track task queues (v2)
    ├── strategy/
    │   └── tasks.md          # Strategy track tasks
    ├── design/
    │   └── tasks.md          # Design track tasks
    └── tech/
        └── tasks.md          # Tech track tasks
```

## Task Types

| Type | Duration | Min Words | Review Required |
|------|----------|-----------|-----------------|
| **Quick** | 15 min | 300 | If confidence < 4 |
| **Standard** | 30 min | 800 | If confidence < 4 |
| **Deep** | 60 min | 1500 | **Always** |

## Quality Gates (MANDATORY)

Every output must pass:

- [ ] **Completeness** - All required deliverables present
- [ ] **Template Compliance** - Follows structure
- [ ] **Word Count** - Meets minimum for task type
- [ ] **No Placeholders** - No "TODO", "TBD", "coming soon"
- [ ] **Cross-References** - Links work
- [ ] **English Only** - All content in English
- [ ] **Auto-Evaluation** - Honest confidence 1-5
- [ ] **Git Push** - Verified push to GitHub

## Review Loop

1. Agent completes work + self-evaluation
2. If confidence < 4 OR task type is Deep → Reviewer assigned
3. Reviewer validates or requests revision (max 1 iteration)
4. Only then next task becomes active

## Git Workflow

Each track commits to same repo with track prefix:

```bash
git commit -m "strategy/product-strategist: refined positioning strategy"
git commit -m "design/brand-designer: created logo concepts"
git commit -m "tech/system-architect: designed database schema"
```

**Mandatory push**: No push = Task not complete

## Self-Evaluation Scale

| Score | Meaning |
|-------|---------|
| 1 | Poor: Rushed, incomplete, major revision needed |
| 2 | Fair: Basic requirements met but shallow |
| 3 | Good: Solid work, meets standards |
| 4 | Very Good: Thorough, well-researched |
| 5 | Excellent: Exceptional quality, exceeds expectations |

Agents must be honest. Underestimating leads to bad foundations.

## Monitoring

The `certfast-workflow-monitor` cron job checks every 30 minutes:
- Git activity (alert if no commits in 45 min)
- Task status (alert if stuck >60 min)
- Handoff quality
- Updates `HEALTH.md`

## Cron Jobs

| Job | Frequency | Purpose |
|-----|-----------|---------|
| `certfast-strategy-track` | 30 min | Strategy agents |
| `certfast-design-track` | 30 min | Design agents |
| `certfast-tech-track` | 30 min | Tech agents |
| `certfast-pm-master` | 6h | PM review |
| `certfast-workflow-monitor` | 30 min | Health monitoring |

## Track Categories

### Strategy Track
- product-strategist
- market-researcher
- business-analyst

### Design Track
- brand-designer
- ux-researcher
- ui-designer

### Tech Track
- system-architect
- api-designer
- database-architect
- security-architect
- devops-engineer

---

*System Version: v2 Multi-Track with Quality Gates*
