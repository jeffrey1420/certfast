# CertFast Workflow Monitor - Lessons Learned

## 2026-03-16: Task Status Synchronization Failure

### Problem
Workflow stalled for 108 minutes despite:
- All 3 track agents running on schedule (cron executing every 30 min)
- Agents completing work (commit e2da033: layout components created)
- Git push working (no technical issues)

**Monitor Alert:** "No push in 108 minutes"
**Reality:** Agents running, work being done, but task files not updated

### Root Cause Analysis
The workflow has a **task tracking gap**:

```
Agent reads task.md → Sees "ACTIVE" → Does work → Commits code → Pushes ✅
                                     ↓
                              FORGETS to update task.md!
                                     ↓
Next agent reads task.md → Still sees "ACTIVE" → Confused → No progress
```

**Design Track Example:**
- DSG-009 marked "ACTIVE - EXECUTE NOW" in tasks.md
- Agent completed layout components, committed, pushed (e2da033)
- tasks.md still showed DSG-009 as "ACTIVE" (should be "COMPLETE")
- Next agent runs, sees DSG-009 still active, doesn't know what to do

### Impact
- 108 minutes of lost productivity
- 3 agent executions wasted (strategy, design, tech all ran without progress)
- Workflow appears "stalled" when agents are actually running

### Solution Applied
1. Updated DSG-009 → COMPLETE in design/tasks.md
2. Promoted DSG-010 → ACTIVE - EXECUTE NOW
3. Committed and pushed task file updates

### Prevention Measures

**For Agents:**
- MUST update task status after completing work
- Format: Change `Status: ACTIVE` → `Status: ✅ COMPLETE`
- Must commit tasks.md with deliverables

**For Monitor:**
- Check both: git activity AND task file synchronization
- If no push for >40 min but agents ran → Task status sync issue

**For Workflow Design:**
- Consider adding task completion verification step
- Handoff files should auto-generate from commit messages
- Consider auto-promoting next task when work detected

### Key Takeaway
Task files are the "source of truth" for the workflow. If agents don't update them, the entire system stalls even though work is being done. **Code commits ≠ Task completion** in this workflow.

---

## 2026-03-15: Stale Remote Reference Detection

### Problem
The git-push-monitor.sh script detected 3 "unpushed" commits:
- cabec17 tech/security-architect
- f8b9709 design/ui-designer  
- af59d36 monitor incident report

But `git push` returned "Everything up-to-date".

### Root Cause Analysis
Git works with **remote tracking branches**. When `git push` succeeds:
1. Commits go to GitHub
2. Local `origin/main` should update to match

However, in some cases (especially with token-based pushes), the local reference doesn't update. This causes `git log origin/main..HEAD` to show commits that ARE on remote but appear unpushed locally.

### Solution
Run `git fetch origin main` before checking divergence:
```bash
git fetch origin main --quiet
git log --oneline origin/main..HEAD
```

This ensures local references match remote before checking.

### Monitor Script Improvement
Updated `/work/certfast/workflow/scripts/git-push-monitor.sh` to include fetch before divergence check.

### Verification
After fix:
```
git status → "Your branch is up to date with 'origin/main'"
```

### Key Takeaway
Always sync remote refs before checking sync status. Git's distributed nature means local caches can drift.
