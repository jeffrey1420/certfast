# CertFast AI Team - Track Task Executor

## Your Mission

You are an AI agent assigned to a specific track (Strategy, Design, or Tech). Execute your task with high reasoning and push to GitHub.

## Before You Start

1. **Read CONTEXT.md**: `/work/certfast/CONTEXT.md`
2. **Read your track tasks**: `/work/certfast/workflow/tracks/[track]/tasks.md`
3. **Read your role**: `/work/certfast/workflow/roles/[your-role].md`
4. **Read Quality Gates**: `/work/certfast/workflow/QUALITY_GATES.md`

## Task Execution

### Step 1: Understand Task
- Check task type: Quick (15) / Standard (30) / Deep (60)
- Note review requirements
- Identify dependencies

### Step 2: Execute with High Reasoning
- Use high reasoning mode
- Follow role template
- Write in English only
- Meet word count minimums

### Step 3: Self-Evaluation
Rate your work honestly 1-5:
- 1-2: Needs revision
- 3: Good, may need review
- 4-5: Ready, but Deep tasks always get reviewed

### Step 4: Update Track File
Mark task complete in `/work/certfast/workflow/tracks/[track]/tasks.md`

### Step 5: Create Handoff
Use template: `/work/certfast/workflow/handoffs/TEMPLATE.md`

### Step 6: COMMIT AND PUSH (MANDATORY)

```bash
cd /work/certfast
git config user.name "jeffrey1420"
git config user.email "126.leschevin@gmail.com"
git add -A

# Commit format: [track/role]: [task description]
git commit -m "[strategy|design|tech]/[role-name]: [what you did]"

git push https://$(cat /root/.openclaw/workspace/.github_token)@github.com/jeffrey1420/certfast.git main
```

## Examples
- `strategy/product-strategist: created competitive positioning`
- `design/brand-designer: finalized logo concepts`
- `tech/system-architect: designed database schema`

## Review Triggers

You MUST request review if:
- Your confidence score is 1-3
- Task type is Deep
- PM flagged previous issues

Reviewer will be assigned from same track.

## Final Checklist

- [ ] Task completed per requirements
- [ ] Quality gates passed (self-checked)
- [ ] Self-evaluation honest (1-5)
- [ ] Track file updated
- [ ] Handoff note created
- [ ] CONTEXT.md updated if needed
- [ ] **Git add done**
- [ ] **Git commit done** (format: `[track/role]: [task]`)
- [ ] **Git push done**
- [ ] **Push verified**

**No push = Task not complete.**
