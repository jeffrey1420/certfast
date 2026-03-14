# CertFast Workflow Migration Guide

## v1 → v2 Transition

### What Changed

| v1 (Sequential) | v2 (Multi-Track) |
|-----------------|------------------|
| Single sprint file | 3 parallel tracks |
| One agent at a time | 3 agents simultaneously |
| Simple handoffs | Track-specific handoffs |
| Basic quality checks | 7 quality gates |
| 24 roles in one queue | Roles assigned to tracks |

### File Mapping

| v1 Path | v2 Path | Purpose |
|---------|---------|---------|
| `current-sprint/ASSIGNED_TASK.md` | `tracks/strategy/tasks.md` | Strategy tasks |
| `current-sprint/ASSIGNED_TASK.md` | `tracks/design/tasks.md` | Design tasks |
| `current-sprint/ASSIGNED_TASK.md` | `tracks/tech/tasks.md` | Tech tasks |
| `backlog/sprint-1.md` | `tracks/*/tasks.md` Backlog sections | Future tasks |
| `roles/*.md` | `TRACK_EXECUTOR.md` | Agent instructions |
| N/A | `CONTEXT.md` | Project knowledge base |
| N/A | `ORCHESTRATOR.md` | System architecture |

### New Files in v2

- `CONTEXT.md` - Shared project knowledge
- `ORCHESTRATOR.md` - Master architecture doc
- `TRACK_EXECUTOR.md` - Guide for track agents
- `PM_MASTER_REVIEW.md` - PM review protocol
- `QUALITY_GATES.md` - Quality standards
- `REVIEW_PROCESS.md` - Review workflow
- `MONITOR.md` - Monitoring system
- `HEALTH.md` - Real-time status
- `tracks/strategy/tasks.md` - Strategy queue
- `tracks/design/tasks.md` - Design queue
- `tracks/tech/tasks.md` - Tech queue

### Task ID Changes

| v1 ID | v2 ID | Track | Task |
|-------|-------|-------|------|
| S1-T1 | STR-001 | Strategy | Product Vision |
| S1-T2 | STR-002 | Strategy | Customer Validation |
| S1-T3 | STR-003 | Strategy | Business Model |
| S1-T4 | TEC-001 | Tech | System Architecture |
| N/A | DSG-001 | Design | Brand Identity |
| N/A | STR-005 | Strategy | Positioning Strategy |
| N/A | DSG-002 | Design | UX Research |
| N/A | TEC-003 | Tech | API Specification |

### Commit Format Changes

```bash
# v1 format (deprecated)
git commit -m "system-architect: designed database schema"

# v2 format (current)
git commit -m "strategy/product-strategist: refined positioning"
git commit -m "design/ux-researcher: created personas"
git commit -m "tech/api-designer: refined API spec"
```

### Cron Job Changes

| v1 Job | v2 Jobs |
|--------|---------|
| `certfast-task-executor` | `certfast-strategy-track` |
| | `certfast-design-track` |
| | `certfast-tech-track` |
| `certfast-pm-review` | `certfast-pm-master` |
| N/A | `certfast-workflow-monitor` |

### Track Assignments

**Strategy Track Roles**:
- product-strategist
- market-researcher
- business-analyst

**Design Track Roles**:
- brand-designer
- ux-researcher
- ui-designer

**Tech Track Roles**:
- system-architect
- api-designer
- database-architect
- security-architect
- devops-engineer

### Quality Gates (New in v2)

Every task must pass:
1. Completeness - All deliverables present
2. Template compliance
3. Word count (Quick:300/Standard:800/Deep:1500)
4. No placeholders
5. Cross-references work
6. English only
7. Auto-evaluation honest
8. Git push verified

### Review Loops (New in v2)

- Quick tasks: Review if confidence < 4
- Standard tasks: Review if confidence < 4
- Deep tasks: **Always reviewed**
- Max 1 revision iteration

---

*Migration completed: 2026-03-15*  
*Current system: v2 Multi-Track with Quality Gates*
