#!/bin/bash
# Auto-push script for CertFast agents
# Usage: /work/certfast/workflow/scripts/auto-push.sh "commit message"

set -e

REPO_DIR="/work/certfast"
TOKEN_FILE="/root/.openclaw/workspace/.github_token"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 Auto-push script starting..."

# Check if token exists
if [ ! -f "$TOKEN_FILE" ]; then
    echo -e "${RED}❌ Error: GitHub token not found at $TOKEN_FILE${NC}"
    exit 1
fi

TOKEN=$(cat "$TOKEN_FILE")

# Go to repo
cd "$REPO_DIR"

# Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
    
    # Check if there are unpushed commits
    UNPUSHED=$(git rev-list --count HEAD ^origin/main 2>/dev/null || echo "0")
    if [ "$UNPUSHED" -gt 0 ]; then
        echo -e "${YELLOW}📤 Found $UNPUSHED unpushed commits${NC}"
    else
        echo -e "${GREEN}✅ Everything up to date${NC}"
        exit 0
    fi
else
    # Configure git
    git config user.name "jeffrey1420"
    git config user.email "126.leschevin@gmail.com"
    
    # Add all changes
    git add -A
    
    # Commit with provided message or default
    COMMIT_MSG="${1:-agent/auto-commit: $(date '+%Y-%m-%d %H:%M')}"
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✅ Committed: $COMMIT_MSG${NC}"
fi

# Push with retry
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    echo "📤 Pushing to GitHub (attempt $((RETRY_COUNT + 1))/$MAX_RETRIES)..."
    
    if git push "https://${TOKEN}@github.com/jeffrey1420/certfast.git" main 2>&1; then
        echo -e "${GREEN}✅ Push successful!${NC}"
        
        # Verify
        git fetch origin main
        LOCAL=$(git rev-parse HEAD)
        REMOTE=$(git rev-parse origin/main)
        
        if [ "$LOCAL" = "$REMOTE" ]; then
            echo -e "${GREEN}✅ Verified: Local and remote are in sync${NC}"
            exit 0
        else
            echo -e "${YELLOW}⚠️  Warning: Local and remote differ after push${NC}"
            exit 1
        fi
    else
        echo -e "${RED}❌ Push failed${NC}"
        RETRY_COUNT=$((RETRY_COUNT + 1))
        
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            echo "⏳ Waiting 10 seconds before retry..."
            sleep 10
        fi
    fi
done

echo -e "${RED}❌ Push failed after $MAX_RETRIES attempts${NC}"
exit 1
