# CertFast Workflow Monitor - Lessons Learned

## 2026-03-16: Successful Auto-Recovery - Uncommitted Changes (15:16)

### Problem
Workflow stalled for **109 minutes** with uncommitted UI component files.

### Evidence
- GitHub last push: 109 minutes ago
- Local files: select.tsx, table.tsx (uncommitted)
- No unpushed commits
- Git config valid

### Root Cause
Agent created UI components but failed to commit/push. This matches the **Scenario B** pattern from the monitor playbook.

### Auto-Recovery Success
The monitor successfully:
1. ✅ Detected uncommitted changes (2 files)
2. ✅ Auto-committed with descriptive message
3. ✅ Pushed to GitHub
4. ✅ Verified fix (exit 0 on re-run)

### Time to Recovery
- Detection to fix: <2 minutes
- Commits pushed: 1 (269 insertions)
- Workflow status: Resumed

### Key Insight
This was a **clean Scenario B** recovery - no agent execution issues, just a commit/push failure. Contrast this with the 09:16 and 11:31 incidents where agents failed to execute at all.

### Differentiating Incident Types
| Incident | Scenario | Auto-Recovery | Requires Manual |
|----------|----------|---------------|-----------------|
| 15:16 (this) | B - Uncommitted changes | ✅ SUCCESS | No |
| 11:31 | C - Agent execution failure | ❌ FAILED | Yes |
| 09:16 | C - Agent execution failure | ❌ FAILED | Yes |
| 07:46 | B - Uncommitted changes | ✅ SUCCESS | No |

### Monitor Effectiveness
- Detection: ✅ Working (caught at 109 min)
- Diagnosis: ✅ Correct (identified as Scenario B)
- Recovery: ✅ Successful (auto-committed and pushed)
- Verification: ✅ Confirmed (exit 0)

### Key Takeaway
**Monitor auto-recovery works for git workflow issues, not agent execution failures.** Scenario B (uncommitted/unpushed changes) is fully automatable. Scenario C (agent not producing work) requires manual intervention.

---

## 2026-03-16: Agent Execution Failure - RECURRING (11:31)

### Problem
**RECURRENCE** of the 09:16 incident. Workflow stalled for **63 minutes** with identical symptoms.

### Evidence
| Metric | 09:16 Incident | 11:31 Incident |
|--------|----------------|----------------|
| Duration stuck | 89 min | 63 min |
| Tech track exec time | 41 sec | 38 sec |
| Design track exec time | 54 sec | 55 sec |
| Strategy track exec time | 26 sec | N/A (not run) |
| Git activity | None | None |
| Subagents | None | None |

### Root Cause Confirmed
This is **NOT** a transient issue. The agent execution problem is **PERSISTENT**.

Agents continue to spawn and immediately terminate without:
- Reading task files
- Creating deliverables
- Making git commits
- Producing any output

### Why Auto-Recovery Failed Again
The monitor cannot fix this because:
1. **Out of scope**: Monitor cannot execute agent tasks
2. **No diagnostic visibility**: Cannot see why agents terminate early
3. **No control over agent runtime**: Cannot force agents to complete work
4. **Silent failure**: No error messages to act upon

### Impact
- **150+ minutes** of total workflow stall time (09:16 + 11:31 incidents)
- **6 agent executions wasted** across both incidents
- **Zero progress** on all 3 active tasks
- **Recurring pattern** suggests systemic issue, not transient failure

### Required Action
**Louis must:**
1. Check agent session transcripts for actual error messages
2. Verify if this is API rate limiting (token exhaustion?)
3. Review if agent prompts are causing parse failures
4. Consider simplifying agent prompts
5. May need to manually execute tasks to unblock workflow

### Prevention - What's Been Tried
- ✅ Monitor detection working (caught both incidents)
- ❌ Auto-recovery not possible for this failure mode
- ⚠️ Need upstream fix at agent execution level

### Key Takeaway
**Monitor ≠ Fixer.** The monitor's job is to DETECT issues, not fix all of them. Some issues (like agent runtime failures) require human intervention at the source. This incident pattern should trigger a review of the agent execution infrastructure, not just the monitor.

---

## 2026-03-16: Agent Execution Failure - Silent Termination

### Problem
Workflow stalled for **89 minutes** with no git activity. Investigation revealed:
- Cron jobs ARE spawning agents on schedule
- Agents are terminating in **15-54 seconds** (way too fast)
- No git commits produced
- No error messages visible
- Tasks remain "ACTIVE" indefinitely

### Agent Execution Times (Abnormal)
| Agent | Expected | Actual | Status |
|-------|----------|--------|--------|
| Tech Track | 30-60 min | 41 sec | ❌ FAILED |
| Design Track | 30-60 min | 54 sec | ❌ FAILED |
| Strategy Track | 30-60 min | 26 sec | ❌ FAILED |
| PM Master | 30-55 min | 27 sec | ❌ FAILED |
| Backend Watchdog | 15-30 min | 36 sec | ❌ FAILED |

### Root Cause Analysis
Agents are **spawning but not actually executing** the task work. Possible causes:

1. **API Rate Limiting**: Silent rate limit hits causing immediate termination
2. **Prompt Parsing Failure**: Agents unable to parse complex task instructions
3. **Context Window Issues**: Task descriptions too long, causing context overflow
4. **Timeout Misconfiguration**: Agent hitting internal timeout before starting work
5. **Dependency Chain Confusion**: Agents unsure how to proceed with TDD/tasks

### Symptoms
- Cron status shows "ok" (session spawned successfully)
- Session duration extremely short
- No subagent processes created (confirmed via `subagents list`)
- No file system changes
- No git activity
- Silent failure - no errors reported to cron

### Failed Recovery
- Cannot auto-execute agent tasks from monitor (out of scope)
- Cannot force agent to complete work
- Cannot diagnose exact failure reason without session logs

### Manual Intervention Required
**Louis should:**
1. Check agent session transcripts for error details
2. Verify API token/rate limit status
3. Review if agent prompts are being parsed correctly
4. Consider simplifying task descriptions
5. May need to manually execute one task to unblock

### Prevention Measures
1. **Add agent execution validation** - Check that agents actually produce output
2. **Add minimum execution time alerts** - Alert if agent completes in <5 minutes
3. **Add commit verification** - Verify git activity within 30 min of agent spawn
4. **Simplify agent prompts** - Reduce complexity to improve completion rates
5. **Add session log inspection** - Auto-check for errors in agent transcripts

### Key Takeaway
**Session spawn ≠ Work completion.** The monitor assumed that if cron spawned an agent, work would be done. This is false - agents can spawn and terminate without producing any output. Need validation that work actually happened.

---

## 2026-03-16: Stale Local Reference Detection (Opposite Direction)

### Problem
Monitor script detected "3 unpushed commits":
- 6951b0b tech/backend-developer: fixed AdonisJS server.ts
- 23c15f8 workflow/pm: marked TEC-009 as complete
- 7b426ad tech/backend-developer: TEC-009 auth system

But GitHub API confirmed these commits were already on remote.

### Root Cause Analysis
This is the **opposite** of the previous stale ref issue:
- Previous: Remote had new commits, local origin/main was behind
- This time: Remote had commits, local origin/main was behind (not fetched)

Agent executions push commits to GitHub, but the monitor (running separately) hadn't fetched the updated refs. This created a false positive "unpushed commits" alert.

### Solution Applied
```bash
git fetch origin main
# Local origin/main updated to match remote
# git status now shows "up to date"
```

### Monitor Script Enhancement
The git-push-monitor.sh already includes fetch in Step 5 (Testing push capability), but the unpushed commit check in Step 3 runs before it. 

**Recommendation:** Move fetch to Step 1 or run unconditionally at script start.

### Verification
- Git push monitor: ✅ All green after fetch
- GitHub API vs local refs: ✅ Synced

### Key Takeaway
Always `git fetch` BEFORE checking for unpushed commits. The monitor script's order of operations matters - we were checking divergence before ensuring refs were current.

---

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
