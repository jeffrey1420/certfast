# CertFast Workflow Monitor - Lessons Learned

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
