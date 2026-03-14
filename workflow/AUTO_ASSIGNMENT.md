# Auto-Assignment Protocol

## Purpose
Ensure agents are completely autonomous and never blocked by missing task assignments.

## Rule 1: Auto-Promote Ready Tasks

If an agent finds their track with **no ACTIVE task** but tasks in "READY" or "BACKLOG" status:

1. **Auto-promote the next logical task to ACTIVE**
2. **Update the task file** with proper ACTIVE status
3. **Proceed with execution**

### Promotion Logic

```
IF no ACTIVE task exists:
  1. Find first READY task (by priority/dependencies)
  2. Change status to "ACTIVE - EXECUTE NOW"
  3. Add "Assigned Role" if missing
  4. Update file and commit: "[track]/system: auto-promoted [task-id] to ACTIVE"
  5. Execute the task
```

## Rule 2: Dependency Resolution

Before promoting a task, verify dependencies:

```
FOR each task in READY/BACKLOG:
  IF all dependencies marked ✅:
    → Candidate for promotion
  ELSE:
    → Skip, dependencies not met
```

## Rule 3: Auto-Generate Missing Tasks

If a track has **no tasks at all** (no ACTIVE, no READY, no BACKLOG):

1. **Check CONTEXT.md** for project roadmap
2. **Infer next logical task** from completed work
3. **Create task entry** with:
   - Task ID (next in sequence)
   - Appropriate role
   - Standard type (30 min)
   - ACTIVE status
   - Description based on context

## Rule 4: Cross-Track Awareness

Agents should check **other tracks** for:
- Shared/cross-track tasks (like STR-004/TEC-001)
- Dependencies on other tracks
- Completed work that unlocks their tasks

## Rule 5: Self-Healing Task Files

If a task file is corrupted or unreadable:

1. **Create backup**: `tasks.md.backup.[timestamp]`
2. **Regenerate from scratch** using:
   - Completed handoffs
   - CONTEXT.md roadmap
   - Git history of commits
3. **Set most logical next task as ACTIVE**

## Implementation

### Agent Instructions (add to all track prompts)

```
## AUTO-ASSIGNMENT PROTOCOL

Before starting work:
1. Check if there's an ACTIVE task
2. If NO active task:
   a. Look for READY tasks with met dependencies
   b. Auto-promote the highest priority one to ACTIVE
   c. Update the tasks.md file
   d. Commit: "[track]/system: auto-promoted [task-id]"
3. If no READY tasks exist:
   a. Check CONTEXT.md for roadmap
   b. Create next logical task
   c. Mark as ACTIVE
   d. Commit: "[track]/system: auto-created [task-id]"

NEVER skip work because no task is assigned.
NEVER wait for manual assignment.
ALWAYS ensure your track has an ACTIVE task before finishing.
```

### Auto-Promotion Checklist

- [ ] No ACTIVE task exists
- [ ] Found READY task with ✅ dependencies
- [ ] Updated status to "ACTIVE - EXECUTE NOW"
- [ ] Committed auto-promotion
- [ ] Now executing the task

## Emergency Protocol

If completely stuck (no tasks, no context, no roadmap):

1. **Create maintenance task**:
   - Task ID: `[TRACK]-MAINT-[timestamp]`
   - Type: Quick (15 min)
   - Description: "Review and organize [track] documentation"
   - Deliverable: Updated documentation + status report

2. **Execute maintenance task**
3. **Report status** in handoff
4. **Request human guidance** if still blocked after maintenance

---

*This protocol ensures zero-downtime continuous operation*
