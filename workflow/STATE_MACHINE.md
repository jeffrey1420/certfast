# Task State Machine

## Valid States

```
BACKLOG → READY → ACTIVE → IN_PROGRESS → REVIEW → COMPLETE
   ↑___________________________________________|
```

## State Definitions

### BACKLOG
- Future work, not yet prioritized
- Dependencies may not be met
- No role assigned
- **Agent action**: Ignore unless no other work exists

### READY
- Prioritized and planned
- Dependencies met or marked ✅
- Role assigned
- **Agent action**: Can auto-promote to ACTIVE if no ACTIVE exists

### ACTIVE - EXECUTE NOW
- Currently being worked on
- Fully specified with requirements
- **Agent action**: EXECUTE THIS TASK

### IN_PROGRESS
- Work started but not complete
- May span multiple agent cycles (Deep tasks)
- **Agent action**: Continue work, update progress

### REVIEW
- Work complete, awaiting review
- Reviewer assigned
- **Agent action**: Wait for review (don't start new work)

### COMPLETE
- Work finished and reviewed
- Deliverables committed
- **Agent action**: Move to next task

## State Transitions

| From | To | Trigger | Who |
|------|-----|---------|-----|
| BACKLOG | READY | Dependencies met, prioritized | PM or Auto |
| READY | ACTIVE | No ACTIVE task exists, agent picks up | Agent (Auto) |
| ACTIVE | IN_PROGRESS | Agent starts work | Agent |
| IN_PROGRESS | REVIEW | Work complete, needs review | Agent |
| IN_PROGRESS | ACTIVE | Work incomplete, agent cycle ends | Agent |
| REVIEW | COMPLETE | Reviewer approves | Reviewer |
| REVIEW | ACTIVE | Reviewer requests changes | Reviewer |
| COMPLETE | - | Task done | - |

## Auto-Transition Rules

### Rule 1: Ready → Active
```
IF (no ACTIVE task) AND (READY tasks exist) AND (dependencies met):
  → Auto-promote highest priority READY to ACTIVE
```

### Rule 2: Active → In Progress
```
IF (ACTIVE task) AND (agent starts working):
  → Change to IN_PROGRESS (optional for tracking)
```

### Rule 3: In Progress → Complete
```
IF (IN_PROGRESS task) AND (agent completes work) AND (self-eval >= 4) AND (not Deep):
  → Mark COMPLETE
  → Auto-promote next READY task
```

### Rule 4: In Progress → Review
```
IF (IN_PROGRESS task) AND (agent completes work) AND ((self-eval < 4) OR (Deep task)):
  → Mark REVIEW
  → Assign reviewer
```

## File Format Standards

### ACTIVE Task Format
```markdown
## Active Task (CURRENT) - EXECUTE NOW

**Task ID**: XXX-###
**Type**: Quick/Standard/Deep
**Assigned Role**: `role-name`
**Status**: ACTIVE - EXECUTE NOW
**Priority**: High/Medium/Low
**Depends on**: XXX-### ✅
```

### READY Task Format
```markdown
### XXX-###: Task Name
- **Role**: role-name
- **Type**: Quick/Standard/Deep
- **Status**: READY
- **Depends on**: XXX-###
```

### COMPLETE Task Format
```markdown
### XXX-###: Task Name ✅
**Role**: role-name
**Status**: ✅ COMPLETE
**Quality Score**: X/5
**Commit**: `commit-message`
```

## Maintenance

Agents must ensure task files follow these formats.
If a task lacks proper status markers, agent should:
1. Infer status from context
2. Update to proper format
3. Continue with work

---

*Standardized task states for autonomous operation*
