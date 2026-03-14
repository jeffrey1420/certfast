# CertFast AI Team - Master Orchestrator

## Architecture Overview

This is a **3-track parallel system** with quality gates and review loops.

```
┌─────────────────────────────────────────────────────────────┐
│                    MASTER ORCHESTRATOR                       │
│                  (Every 6 hours - PM Review)                 │
└──────────────────┬──────────────────────────┬───────────────┘
                   │                          │
        ┌──────────┴──────────┐    ┌─────────┴──────────┐
        │   STRATEGY TRACK    │    │    DESIGN TRACK    │
        │   (15/30/60 min)    │    │    (15/30/60 min)  │
        │                     │    │                    │
        │ • Product Vision    │    │ • Brand Identity   │
        │ • Market Research   │    │ • UX Research      │
        │ • Business Model    │    │ • UI Design        │
        │ • Positioning       │    │ • Design System    │
        └──────────┬──────────┘    └─────────┬──────────┘
                   │                          │
                   └──────────┬───────────────┘
                              │
                   ┌──────────┴──────────┐
                   │    TECH TRACK       │
                   │    (15/30/60 min)   │
                   │                     │
                   │ • Architecture      │
                   │ • Database Design   │
                   │ • API Design        │
                   │ • Security          │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │   REVIEW & MERGE    │
                   │   (Quality Gates)   │
                   └─────────────────────┘
```

## Track System

Each track operates independently with its own:
- Task queue
- Assigned agent
- Review loop
- Quality gates

## Task Types

### Quick (15 minutes)
- Research and information gathering
- Template completion
- Cross-reference updates
- Format fixes
- Simple analysis

### Standard (30 minutes)
- Documentation writing
- Competitive analysis
- User flow design
- Policy drafting
- Requirements gathering

### Deep (60 minutes)
- System architecture
- Database modeling
- Complex UML diagrams
- Financial modeling
- Brand identity system

## Quality Gates (MANDATORY)

Every output must pass:

- [ ] **Completeness**: All required sections present
- [ ] **Template Compliance**: Follows role template structure
- [ ] **Word Count**: Meets minimum (Quick: 300, Standard: 800, Deep: 1500)
- [ ] **No Placeholders**: No "TODO", "TBD", "coming soon"
- [ ] **Cross-References**: Links to CONTEXT.md and related docs work
- [ ] **English Only**: All content in English
- [ ] **Auto-Evaluation**: Agent rated confidence 1-5

## Review Loop

After each task:
1. Agent completes work + self-evaluation
2. If confidence < 4 OR task type is Deep → Reviewer assigned
3. Reviewer validates or requests revision (max 1 iteration)
4. Only then next task starts

## Parallel Execution Rules

- Each track runs independently
- Same agent type can work on different tracks (e.g., 2 UI tasks)
- PM synchronizes every 6 hours
- CONTEXT.md shared across all tracks

## Git Workflow

Each track commits to same repo with track prefix:
- `[strategy/product-strategist]: [task]`
- `[design/brand-designer]: [task]`
- `[tech/system-architect]: [task]`

## Self-Evaluation Scale

1. **Poor**: Rushed, incomplete, needs major revision
2. **Fair**: Basic requirements met but shallow
3. **Good**: Solid work, meets standards
4. **Very Good**: Thorough, well-researched
5. **Excellent**: Exceptional quality, exceeds expectations

Agents must be honest. Underestimating leads to bad foundations.
