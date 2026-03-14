# CertFast Workflow Monitor

## Surveillance Checklist

Run every 30 minutes during active hours:

### 1. Git Activity Check
```bash
cd /work/certfast
git fetch origin
git log --oneline -5 origin/main
```

**Expected**: New commits every 10-30 minutes with format `[track/role]: [task]`

**Red flags**:
- No commits for >45 minutes
- Commits without push
- Failed push attempts
- Merge conflicts

### 2. Track Status Check
Review each track's task file:
- `/work/certfast/workflow/tracks/strategy/tasks.md`
- `/work/certfast/workflow/tracks/design/tasks.md`
- `/work/certfast/workflow/tracks/tech/tasks.md`

**Expected**: Active task assigned, status updated

**Red flags**:
- Task status stuck "IN PROGRESS" for >60 min
- No handoff created
- Task not marked complete after commit

### 3. Handoff Quality Check
Review recent handoffs:
```
ls -lt /work/certfast/workflow/handoffs/
```

**Expected**: Handoff created with each commit, includes self-evaluation

**Red flags**:
- No handoff for recent commit
- Missing self-evaluation score
- No next task recommendation

### 4. CONTEXT.md Updates
Check if major decisions logged:
```
git diff HEAD~5 CONTEXT.md
```

**Expected**: Major decisions added to decision log

### 5. Quality Metrics
Track across commits:
- Average self-evaluation scores
- Revision frequency
- Word counts vs targets

**Red flags**:
- Average score < 3
- >30% revisions needed
- Word counts consistently below minimum

## Adaptation Triggers

### If agents don't push:
1. Check git config (user.name, user.email)
2. Check token validity
3. Simplify push command in prompts
4. Add explicit "PUSH VERIFIED" check

### If agents don't read handoffs:
1. Make handoff path more prominent in prompts
2. Add "Read handoff" as explicit first step
3. Create handoff summary file (auto-generated)

### If quality is low (score < 3):
1. Increase review frequency
2. Lower task complexity (Deep → Standard)
3. Add more detailed templates
4. Require examples in task descriptions

### If agents conflict on git:
1. Increase stagger delay (10min → 15min)
2. Add "git pull" before work
3. Create branch per track (strategy/, design/, tech/)
4. PM merges during review

### If tracks desynchronize:
1. Increase PM frequency (6h → 4h)
2. Add cross-track dependency checks
3. Create integration tasks
4. Daily standup summary

## Emergency Interventions

### Complete Workflow Failure
If no commits for >2 hours:
1. Check cron job status
2. Restart jobs if needed
3. Simplify workflow (remove tracks, go sequential)
4. Manual task assignment

### Quality Collapse
If >50% tasks need revision:
1. Pause all tracks
2. Review and fix templates
3. Re-train with examples
4. Resume with simplified tasks

### Git Repository Corruption
If merge conflicts or corruption:
1. Clone fresh from GitHub
2. Restore from last good commit
3. Reset workflow state
4. Notify user

## Success Metrics

**Healthy Workflow**:
- 3+ commits per hour (across all tracks)
- Average self-eval score ≥ 3.5
- <20% revision rate
- No git conflicts
- PM reviews on schedule

**Warning Signs**:
- 1-2 commits per hour
- Average score 2.5-3.5
- 20-40% revision rate
- Occasional git issues

**Critical**:
- <1 commit per hour
- Average score < 2.5
- >40% revision rate
- Frequent git failures
