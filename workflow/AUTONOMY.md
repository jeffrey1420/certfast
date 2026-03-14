# CertFast Autonomy System

## Overview

CertFast now operates with **complete agent autonomy**. The system is designed to never block and self-heal when issues occur.

## Three Layers of Protection

### Layer 1: Agent Auto-Assignment (Primary)

**Every agent** now has the `AUTO-ASSIGNMENT PROTOCOL`:

```
BEFORE starting work:
1. Check for ACTIVE task
2. If NONE found:
   → Auto-promote READY task to ACTIVE
   → Commit the promotion
   → Execute the task
3. If no READY tasks:
   → Read CONTEXT.md
   → Create next logical task
   → Execute it
```

**Agents never wait for manual assignment.**

### Layer 2: Track Guardian (Backup)

**Every 15 minutes**, the Track Guardian checks all 3 tracks:

```
FOR each track:
  IF no ACTIVE task:
    → Find READY task with ✅ dependencies
    → Auto-promote to ACTIVE
    → Commit and push
    → Alert if intervention needed
```

**Guardian ensures zero downtime.**

### Layer 3: Self-Healing (Emergency)

If a track has **no tasks at all**:

```
1. Check CONTEXT.md for roadmap
2. Create maintenance task
3. Mark as ACTIVE
4. Execute it
5. Report status
```

**System always has work to do.**

---

## What Changed

### For Agents

| Before | After |
|--------|-------|
| Wait for ACTIVE task | Auto-promote READY tasks |
| Skip if no assignment | Create tasks if none exist |
| Manual PM assignment | Self-governing |

### For Monitoring

| Before | After |
|--------|-------|
| Alert when stuck | Auto-fix when stuck |
| Human intervention | Self-healing |
| 30-min check | 15-min guardian + agent auto-assign |

---

## Cron Jobs (Autonomy-Enabled)

| Job | Frequency | Purpose |
|-----|-----------|---------|
| `certfast-strategy-track` | 30 min | Strategy agents (auto-assign enabled) |
| `certfast-design-track` | 30 min | Design agents (auto-assign enabled) |
| `certfast-tech-track` | 30 min | Tech agents (auto-assign enabled) |
| `certfast-track-guardian` | 15 min | **NEW** - Backup auto-assignment |
| `certfast-workflow-monitor` | 30 min | Health monitoring |
| `certfast-pm-master` | 6h | PM review (synchronization) |

**Total: 7 cron jobs** (was 6)

---

## Task State Machine

```
BACKLOG → READY → ACTIVE → IN_PROGRESS → REVIEW → COMPLETE
            ↑______________|               |
            └______Auto-promote____________|
```

### Auto-Transitions

| Condition | Action |
|-----------|--------|
| No ACTIVE + READY exists | Auto-promote READY → ACTIVE |
| No ACTIVE + no READY | Create task from CONTEXT.md |
| Task COMPLETE | Auto-promote next READY task |

---

## Commit Patterns

### Normal Work
```
design/ux-researcher: completed user flow diagrams
```

### Auto-Promotion
```
guardian/design: auto-promoted DSG-004 to ACTIVE - no active task found
```

### Auto-Creation
```
strategy/system: auto-created STR-007 maintenance task - no tasks available
```

---

## Files

| File | Purpose |
|------|---------|
| `AUTO_ASSIGNMENT.md` | Auto-assignment protocol |
| `STATE_MACHINE.md` | Task state definitions |
| `ORCHESTRATOR.md` | Master architecture |
| `TRACK_EXECUTOR.md` | Agent execution guide |

---

## Success Metrics

| Metric | Target | How Achieved |
|--------|--------|--------------|
| Zero blocking | 100% | Auto-assignment + Guardian |
| Agent uptime | 100% | Self-healing tasks |
| Human intervention | <1/day | Autonomous operation |

---

*System Version: v2.1 Autonomous Multi-Track*
