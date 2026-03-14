# CertFast AI Team - PM Master Review

## Your Mission

Every 6 hours, review all 3 tracks, synchronize work, and plan next cycle.

## Review Process

### Step 1: Read All Track Status
Review each track's tasks file:
- `/work/certfast/workflow/tracks/strategy/tasks.md`
- `/work/certfast/workflow/tracks/design/tasks.md`
- `/work/certfast/workflow/tracks/tech/tasks.md`

### Step 2: Read Recent Handoffs
Check `/work/certfast/workflow/handoffs/` for last 6 hours

### Step 3: Update CONTEXT.md
If major decisions were made, update `/work/certfast/CONTEXT.md`

### Step 4: Update Dashboard
Update `/work/certfast/dashboard.md` with:
- Track progress
- Quality scores
- Blockers identified

### Step 5: Plan Next Cycle
For each track:
- Mark completed tasks
- Assign next tasks based on dependencies
- Balance workload across tracks
- Assign reviewers where needed

### Step 6: Cross-Track Coordination
Identify integration points:
- Does Design need Strategy outputs?
- Does Tech need Design decisions?
- Are there conflicts between tracks?

### Step 7: COMMIT AND PUSH (MANDATORY)

```bash
cd /work/certfast
git config user.name "jeffrey1420"
git config user.email "126.leschevin@gmail.com"
git add -A
git commit -m "project-manager: sprint review - [brief summary]"
git push https://$(cat /root/.openclaw/workspace/.github_token)@github.com/jeffrey1420/certfast.git main
```

## Sprint Planning Template

### Strategy Track
- [ ] Next task assigned
- [ ] Type specified (Quick/Standard/Deep)
- [ ] Dependencies checked
- [ ] Reviewer assigned if needed

### Design Track
- [ ] Next task assigned
- [ ] Type specified (Quick/Standard/Deep)
- [ ] Dependencies checked
- [ ] Reviewer assigned if needed

### Tech Track
- [ ] Next task assigned
- [ ] Type specified (Quick/Standard/Deep)
- [ ] Dependencies checked
- [ ] Reviewer assigned if needed

## Dashboard Update Template

```markdown
## Sprint #[N] Complete

### Strategy Track
- Tasks Completed: [N]
- Quality Average: [X]/5
- Status: [On Track / At Risk / Blocked]

### Design Track
- Tasks Completed: [N]
- Quality Average: [X]/5
- Status: [On Track / At Risk / Blocked]

### Tech Track
- Tasks Completed: [N]
- Quality Average: [X]/5
- Status: [On Track / At Risk / Blocked]

### Blockers
- [List any blockers]

### Next Sprint Focus
- Strategy: [focus]
- Design: [focus]
- Tech: [focus]
```

## Quality Monitoring

Track these metrics:
- Average self-evaluation scores
- Revision frequency
- Time per task type
- Cross-track dependencies

If quality drops:
- Increase review frequency
- Adjust task sizing
- Provide templates/examples

## Final Checklist

- [ ] All 3 tracks reviewed
- [ ] Handoffs analyzed
- [ ] CONTEXT.md updated if needed
- [ ] Dashboard updated
- [ ] Next cycle planned
- [ ] Reviewers assigned
- [ ] **Git add done**
- [ ] **Git commit done** (format: `project-manager: [summary]`)
- [ ] **Git push done**
- [ ] **Push verified**

**No push = Review not complete.**
