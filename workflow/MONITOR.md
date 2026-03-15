# Workflow Monitor Protocol (Auto-Recovery Enabled)

## Purpose
Detect and automatically recover from workflow blockages.

## Critical Threshold
🚨 **Alert if no push in 40 minutes**

## Auto-Recovery Capabilities

The monitor can now:
1. **Detect** the exact root cause using `git-push-monitor.sh`
2. **Auto-fix** common issues:
   - Unpushed commits → Push them
   - Uncommitted changes → Commit and push
   - Git config issues → Fix config
3. **Alert** only when auto-recovery fails

## Diagnostic Script

```bash
/work/certfast/workflow/scripts/git-push-monitor.sh
```

Exit codes:
- 0: All good
- 1: GitHub API issue (check token/network)
- 2: No push in 40+ min (action required)

## Response Matrix

| Scenario | Auto-Action | Alert? |
|----------|-------------|--------|
| Unpushed commits | Auto-push | No (if success) |
| Uncommitted changes | Auto-commit + push | No (if success) |
| No agent activity | Investigate, then alert | Yes |
| Git config broken | Auto-fix + retry | Only if fails |
| GitHub API down | Alert immediately | Yes |

## Manual Override

If you want to pause auto-recovery and investigate manually:
1. Create `/work/certfast/workflow/.pause-monitor`
2. Monitor will skip auto-recovery and just alert
3. Delete file to resume auto-recovery

## Success Metrics

Monitor should achieve:
- >95% of push issues auto-resolved
- <5% requiring manual intervention
- Zero data loss (commits always recovered)

## History

### 2026-03-15 13:46 - Uncommitted Changes Auto-Recovered
**Issue**: 112 lines of security documentation uncommitted; 2 stale unpushed commits
**Auto-recovery**: ✅ Success
- Used `git fetch origin` first to resolve stale refs
- Auto-committed pending changes
- Pushed successfully
**Alert sent**: No (successful recovery)
**Note**: No active agents running despite ACTIVE tasks - guardian may need review

### 2026-03-15 07:46 - Silent Agent Failure Detected
**Issue**: Agents scheduled but not producing commits
**Auto-recovery**: Failed - requires manual investigation
**Alert sent**: Yes
**Action**: Updated HEALTH.md, committed incident report

2026-03-15: Implemented auto-recovery system
- Added `git-push-monitor.sh` diagnostic script
- Updated monitor agent with auto-recovery protocol
- Reduced alert noise by fixing issues automatically
