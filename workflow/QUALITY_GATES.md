# Quality Gates Checklist

## Universal Quality Standards

Every task output MUST pass these gates before push:

---

## Gate 1: Completeness
- [ ] All deliverables listed in task are present
- [ ] Each document has required sections (per role template)
- [ ] No missing diagrams, tables, or code blocks

## Gate 2: Template Compliance
- [ ] Document structure matches role template
- [ ] Headings follow conventions (H1 title, H2 sections, H3 subsections)
- [ ] Formatting consistent with existing docs

## Gate 3: Content Quality
- [ ] **Quick tasks**: Min 300 words
- [ ] **Standard tasks**: Min 800 words  
- [ ] **Deep tasks**: Min 1500 words
- [ ] No filler text or repetition
- [ ] Concrete examples, not generic statements

## Gate 4: No Placeholders
- [ ] No "TODO" or "TBD" remaining
- [ ] No "coming soon" or "to be defined"
- [ ] All links are functional
- [ ] All code examples are complete

## Gate 5: Cross-References
- [ ] Links to CONTEXT.md work
- [ ] Links to related docs work
- [ ] No broken internal references
- [ ] Consistent terminology with glossary

## Gate 6: Language
- [ ] All content in English
- [ ] No mixed languages
- [ ] Consistent technical terminology

## Gate 7: Self-Evaluation
- [ ] Confidence rated 1-5 (honest assessment)
- [ ] Rationale for rating provided
- [ ] Known limitations documented

---

## Self-Evaluation Scale

| Score | Meaning | Action Required |
|-------|---------|-----------------|
| 1 | Poor - Rushed, incomplete | Revision required |
| 2 | Fair - Basic, shallow | Minor revision |
| 3 | Good - Meets standards | Reviewer spot-check |
| 4 | Very Good - Thorough | Ready for next task |
| 5 | Excellent - Exceptional | Exemplary work |

---

## Review Triggers

**Automatic Review Required** (Reviewer assigned):
- Confidence score < 4
- Task type is Deep
- Previous agent had issues
- Cross-track dependencies

**Optional Review**:
- Confidence score 4-5 on Standard/Quick tasks
- Agent requests feedback

---

## Reviewer Checklist

When reviewing, check:
- [ ] Quality gates passed
- [ ] Accuracy of technical content
- [ ] Consistency with project context
- [ ] Completeness of research
- [ ] Clarity of writing

**Review Outcomes**:
- ✅ **Approve**: Proceed to next task
- 🔄 **Revise**: Agent fixes issues (20 min)
- ❌ **Reject**: Restart task (rare)
