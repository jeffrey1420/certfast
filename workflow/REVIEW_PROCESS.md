# Review Process

## When Review Happens

1. **After every Deep task** (60 min)
2. **When confidence score < 4**
3. **When PM requests it**
4. **When cross-track integration needed**

## Review Types

### Type A: Quick Review (10 min)
For Quick tasks with confidence 3+:
- Spot-check for major errors
- Verify quality gates
- Approve or flag minor issues

### Type B: Standard Review (20 min)
For Standard tasks:
- Read full document
- Check accuracy and completeness
- Verify cross-references
- Provide feedback

### Type C: Deep Review (40 min)
For Deep tasks:
- Thorough analysis
- Technical validation
- Research verification
- Detailed feedback

## Review Workflow

```
Agent completes task
        ↓
Self-evaluation (1-5)
        ↓
    ┌───┴───┐
   ↓       ↓
Score ≥4   Score <4 or Deep task
   ↓       ↓
Optional   Reviewer assigned
Review     (10-40 min)
   ↓       ↓
   └───┬───┘
       ↓
   Approved? 
   ┌───┴───┐
  Yes      No
   ↓       ↓
 Next   Revision
 Task   (20 min)
         ↓
      Review
       Again
```

## Reviewer Roles by Track

| Track | Primary Reviewer | Secondary |
|-------|------------------|-----------|
| Strategy | business-analyst | product-strategist |
| Design | design-reviewer | brand-designer |
| Tech | tech-reviewer | system-architect |

## Review Handoff Format

File: `REVIEW_[task-id]_[reviewer-role].md`

```markdown
# Review: [Task ID]

**Reviewer**: [role]
**Date**: [timestamp]
**Task Type**: [Quick/Standard/Deep]
**Agent Confidence**: [1-5]

## Summary
[One paragraph overview]

## Quality Gates Check
- [ ] Completeness
- [ ] Template Compliance
- [ ] Content Quality
- [ ] No Placeholders
- [ ] Cross-References
- [ ] Language

## Findings
### Strengths
- [What was done well]

### Issues
- [What needs fixing]

### Suggestions
- [Improvements for future]

## Decision
- [ ] **APPROVED**: Proceed to next task
- [ ] **REVISION NEEDED**: Agent must fix issues
  - Priority fixes: [list]
  - Time allocated: 20 min

## Next Task Recommendation
[Recommended next role and task]
```

## Revision Protocol

When revision needed:
1. Reviewer updates ASSIGNED_TASK.md with revision requirements
2. Same agent returns for revision (not a new agent)
3. 20 minutes allocated
4. Focus only on flagged issues
5. Quick re-review (10 min)
6. If still not approved → PM intervention
