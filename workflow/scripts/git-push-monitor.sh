#!/bin/bash
# Git Push Monitor - Checks if commits are being pushed to GitHub
# Run from /work/certfast

set -e

TOKEN=$(cat /root/.openclaw/workspace/.github_token 2>/dev/null || echo "")
REPO="jeffrey1420/certfast"
WORKDIR="/work/certfast"
ALERT_THRESHOLD_MINUTES=40

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=== Git Push Monitor ==="
echo "Threshold: ${ALERT_THRESHOLD_MINUTES} minutes"
echo ""

# Check 1: Get last commit timestamp from GitHub
echo "[1/5] Checking GitHub for last commit..."
LAST_GITHUB_COMMIT=$(curl -s -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/$REPO/commits?per_page=1" | \
  grep -o '"date": "[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$LAST_GITHUB_COMMIT" ]; then
    echo -e "${RED}ERROR: Cannot reach GitHub API${NC}"
    echo "Possible causes:"
    echo "  - Network issue"
    echo "  - Invalid/expired token"
    echo "  - API rate limit"
    exit 1
fi

LAST_GITHUB_TS=$(date -d "$LAST_GITHUB_COMMIT" +%s 2>/dev/null || date -j -f "%Y-%m-%dT%H:%M:%SZ" "$LAST_GITHUB_COMMIT" +%s 2>/dev/null)
NOW_TS=$(date +%s)
MINUTES_SINCE_PUSH=$(( (NOW_TS - LAST_GITHUB_TS) / 60 ))

echo "Last GitHub commit: $LAST_GITHUB_COMMIT"
echo "Minutes since push: $MINUTES_SINCE_PUSH"
echo ""

# Check 2: Check local uncommitted changes
echo "[2/5] Checking local working directory..."
cd "$WORKDIR"

if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
    echo -e "${YELLOW}WARNING: Uncommitted changes detected${NC}"
    git status --short
    HAS_UNCOMMITTED=1
else
    echo -e "${GREEN}OK: Working directory clean${NC}"
    HAS_UNCOMMITTED=0
fi
echo ""

# Check 3: Check local unpushed commits
echo "[3/5] Checking for unpushed commits..."
UNPUSHED_COUNT=$(git rev-list --count HEAD ^origin/main 2>/dev/null || echo "0")

if [ "$UNPUSHED_COUNT" -gt 0 ]; then
    echo -e "${RED}ALERT: $UNPUSHED_COUNT local commits not pushed${NC}"
    echo "Commits waiting:"
    git log --oneline HEAD ^origin/main
    HAS_UNPUSHED=1
else
    echo -e "${GREEN}OK: No unpushed commits${NC}"
    HAS_UNPUSHED=0
fi
echo ""

# Check 4: Check git configuration
echo "[4/5] Checking git configuration..."
GIT_USER=$(git config user.name 2>/dev/null || echo "NOT SET")
GIT_EMAIL=$(git config user.email 2>/dev/null || echo "NOT SET")

echo "Git user.name: $GIT_USER"
echo "Git user.email: $GIT_EMAIL"

if [ "$GIT_USER" = "NOT SET" ] || [ "$GIT_EMAIL" = "NOT SET" ]; then
    echo -e "${RED}ERROR: Git config incomplete${NC}"
    GIT_CONFIG_OK=0
else
    echo -e "${GREEN}OK: Git config valid${NC}"
    GIT_CONFIG_OK=1
fi
echo ""

# Check 5: Test push capability
echo "[5/5] Testing push capability..."
git fetch origin main --dry-run 2>/dev/null && echo -e "${GREEN}OK: Can reach GitHub${NC}" || echo -e "${YELLOW}WARNING: Fetch test inconclusive${NC}"
echo ""

# Summary and Alert Decision
echo "=== DIAGNOSTIC SUMMARY ==="
echo "Minutes since last push: $MINUTES_SINCE_PUSH"
echo "Uncommitted changes: $HAS_UNCOMMITTED"
echo "Unpushed commits: $HAS_UNPUSHED"
echo "Git config OK: $GIT_CONFIG_OK"
echo ""

# Determine alert level
if [ "$MINUTES_SINCE_PUSH" -gt "$ALERT_THRESHOLD_MINUTES" ]; then
    echo -e "${RED}🚨 ALERT: No push in ${MINUTES_SINCE_PUSH} minutes (threshold: ${ALERT_THRESHOLD_MINUTES})${NC}"
    
    # Diagnose root cause
    echo ""
    echo "=== ROOT CAUSE ANALYSIS ==="
    
    if [ "$HAS_UNPUSHED" -gt 0 ]; then
        echo "🔍 CAUSE: Commits created locally but not pushed"
        echo "💡 FIX: Push pending commits now"
        echo ""
        echo "Command to fix:"
        echo "  cd $WORKDIR"
        echo "  export TOKEN=\$(cat /root/.openclaw/workspace/.github_token)"
        echo "  git push https://\${TOKEN}@github.com/$REPO.git main"
    elif [ "$HAS_UNCOMMITTED" -gt 0 ]; then
        echo "🔍 CAUSE: Changes made but not committed"
        echo "💡 FIX: Agent created files but didn't commit/push"
        echo ""
        echo "Command to fix:"
        echo "  cd $WORKDIR"
        echo "  git add -A"
        echo "  git commit -m 'emergency: commit pending changes'"
        echo "  export TOKEN=\$(cat /root/.openclaw/workspace/.github_token)"
        echo "  git push https://\${TOKEN}@github.com/$REPO.git main"
    else
        echo "🔍 CAUSE: No new work produced (agent didn't run or didn't create files)"
        echo "💡 FIX: Check if agent actually ran, check for errors"
        echo ""
        echo "Check:"
        echo "  - Cron job status"
        echo "  - Agent execution logs"
        echo "  - Session history"
    fi
    
    if [ "$GIT_CONFIG_OK" -eq 0 ]; then
        echo ""
        echo "🔍 ADDITIONAL ISSUE: Git config missing"
        echo "💡 FIX: Run git config commands"
    fi
    
    exit 2  # Alert triggered
else
    echo -e "${GREEN}✅ OK: Last push was ${MINUTES_SINCE_PUSH} minutes ago${NC}"
    exit 0  # All good
fi
