# User Journey Maps - CertFast

## Overview

This document maps the user journeys for key workflows in CertFast. Journey maps visualize the end-to-end experience, identifying pain points, opportunities, and emotional states at each stage.

**Methodology**: Based on persona research and competitive analysis  
**Personas Covered**: Alex (CTO), Fiona (CEO), Sam (Security), Olivia (Ops)  
**Journeys Mapped**: Trial to First Value, First Compliance Achievement, Continuous Compliance  
**Last Updated**: March 15, 2026

---

## Journey Map 1: Trial to First Value

**Primary Persona**: Alex Chen (CTO)  
**Duration**: 0-24 hours  
**Goal**: Collect first evidence and experience platform value  
**Success Metric**: First evidence collected within 24 hours

### Journey Stages

#### Stage 1: Discovery (0-30 minutes)
| Element | Details |
|---------|---------|
| **Context** | Alex just lost a €150K deal to "no SOC 2". Urgently searching for solutions. |
| **Touchpoints** | Google search, Hacker News, founder Slack communities |
| **Actions** | Reads comparison articles, checks integration lists, visits pricing pages |
| **Emotional State** | Frustrated, urgent, cautiously hopeful |
| **Pain Points** | "Contact Sales" gates, unclear pricing, missing integration info |
| **Opportunities** | Clear value prop, visible integration list, transparent pricing |

#### Stage 2: Signup (30-45 minutes)
| Element | Details |
|---------|---------|
| **Context** | Alex finds CertFast, checks integrations (AWS, GitHub, Slack ✓), likes transparent pricing |
| **Touchpoints** | Landing page, signup form, email confirmation |
| **Actions** | Clicks "Start Free Trial", enters work email, verifies account |
| **Emotional State** | Hopeful, skeptical of claims |
| **Pain Points** | Credit card requirements, lengthy signup forms, mandatory demo calls |
| **Opportunities** | No-CC trial, quick email-only signup, immediate dashboard access |

**CertFast Design Response:**
- ✓ No credit card required for trial
- ✓ Single-field email signup
- ✓ Immediate dashboard access post-verification
- ✓ Clear "14-day free trial" messaging

#### Stage 3: Onboarding (45-90 minutes)
| Element | Details |
|---------|---------|
| **Context** | First time in platform, evaluating if this will actually work |
| **Touchpoints** | Welcome modal, integration wizard, first evidence view |
| **Actions** | Connects AWS, GitHub, Slack; waits for evidence collection |
| **Emotional State** | Curious, impatient for results |
| **Pain Points** | Complex setup wizards, unclear next steps, long sync times |
| **Opportunities** | Progressive onboarding, quick wins, clear progress indicators |

**Emotion Curve:**
```
Excitement
    │    ╱╲
    │   ╱  ╲
    │  ╱    ╲     ╱╲
    │ ╱      ╲   ╱  ╲______
    │╱        ╲_╱
    └──────────────────────────
    Signup   Setup   First Evidence
```

**CertFast Design Response:**
- ✓ Progressive disclosure: Connect top 3 integrations first
- ✓ Real-time sync progress indicators
- ✓ "First evidence collected in 5 minutes" notification
- ✓ Guided tour highlighting key features

#### Stage 4: First Evidence (90 minutes - 4 hours)
| Element | Details |
|---------|---------|
| **Context** | Evidence starting to appear, evaluating quality and coverage |
| **Touchpoints** | Evidence dashboard, control mapping view, policy templates |
| **Actions** | Reviews auto-collected evidence, explores policy generator |
| **Emotional State** | Impressed, evaluating depth |
| **Pain Points** | Missing evidence gaps, unclear control mapping, generic policies |
| **Opportunities** | Show automation value, demonstrate AI capabilities |

**CertFast Design Response:**
- ✓ Evidence quality scoring ("90% complete for this control")
- ✓ AI-generated policy preview (first 3 policies free)
- ✓ Coverage dashboard ("You have 47 of 127 controls covered")
- ✓ "What's next" recommendations

#### Stage 5: Exploration (4-24 hours)
| Element | Details |
|---------|---------|
| **Context** | Convinced platform works, evaluating if it's the right choice |
| **Touchpoints** | Feature exploration, pricing review, support interaction |
| **Actions** | Tests additional integrations, reviews upgrade options |
| **Emotional State** | Convinced, comparing options |
| **Pain Points** | Feature limits on trial, unclear upgrade path |
| **Opportunities** | Transparent limitations, clear upgrade value |

**CertFast Design Response:**
- ✓ Trial limitations clearly marked ("Upgrade to unlock 50+ more integrations")
- ✓ Side-by-side feature comparison
- ✓ In-app upgrade with clear pricing
- ✓ Support chat for questions

### Journey Insights

**Critical Moments:**
1. **First 5 Minutes**: Must see value or abandonment risk
2. **First Evidence**: Emotional peak when automation works
3. **24-Hour Mark**: Decision point - upgrade or churn

**Pain Points to Address:**
- Integration connection failures
- Long initial sync times
- Unclear "what to do next"

**Opportunities:**
- Gamification of evidence collection
- Success predictions ("You're 65% audit-ready")
- Competitive comparison tool

---

## Journey Map 2: First Compliance Achievement (90 Days)

**Primary Persona**: Alex (CTO) with Fiona (CEO) involvement  
**Duration**: Day 1-90  
**Goal**: Achieve SOC 2 Type I audit-ready status  
**Success Metric**: Pass audit on first attempt

### Phase 1: Foundation (Days 1-14)

#### Week 1: Setup & Integration
| Day | Activity | Touchpoints | Emotion | Pain Points |
|-----|----------|-------------|---------|-------------|
| 1 | Connect core integrations | Integration wizard | Excited | Connection errors |
| 2-3 | Initial evidence collection | Evidence dashboard | Hopeful | Missing data gaps |
| 4-5 | Policy generation | AI policy writer | Impressed | Generic content |
| 6-7 | Team onboarding | User management | Organized | Permission confusion |

**Key Milestone**: All integrations connected, initial evidence flowing

#### Week 2: Gap Assessment
| Activity | Touchpoints | Emotion | Opportunity |
|----------|-------------|---------|-------------|
| Review control coverage | Compliance health dashboard | Anxious | Clear gap visualization |
| Identify missing evidence | Evidence requirements list | Overwhelmed | Prioritized action plan |
| Generate remaining policies | Policy templates | Productive | AI customization |
| Assign tasks to team | Workflow assignments | Delegating | Automated reminders |

**Emotion Curve - Phase 1:**
```
Confidence
    │
    │    ╱╲
    │   ╱  ╲        ╱╲
    │  ╱    ╲      ╱  ╲
    │ ╱      ╲____╱    ╲___
    │╱
    └──────────────────────────
    W1      W2      W3      W4
    Setup   Gaps    Sprint  Prep
```

### Phase 2: Sprint (Days 15-60)

#### Daily Workflow (Alex)
| Time | Activity | Touchpoint | Metric |
|------|----------|------------|--------|
| Morning | Check compliance health | Dashboard | Health score trend |
| Midday | Review new evidence | Evidence feed | Coverage % |
| Weekly | Team standup on compliance | Reports | Blockers identified |
| As needed | Respond to drift alerts | Alert notifications | Response time |

#### Weekly Rhythm
| Week | Focus | Deliverables | Emotional State |
|------|-------|--------------|-----------------|
| 3-4 | Evidence collection sprint | 80% coverage | Focused, busy |
| 5-6 | Policy finalization | All policies approved | Productive |
| 7-8 | Control testing | Test results documented | Confident |

**Fiona's Involvement Points:**
- Week 3: Executive dashboard review
- Week 6: Policy approval (high-level)
- Week 8: Audit readiness assessment

### Phase 3: Preparation (Days 61-85)

#### Activities
| Task | Owner | Touchpoint | Duration |
|------|-------|------------|----------|
| Evidence package compilation | Alex | Export wizard | 2 hours |
| Auditor portal preparation | Team | Auditor view | 1 day |
| Pre-audit self-assessment | Alex | Readiness checker | 4 hours |
| Final policy review | Fiona | Policy dashboard | 2 hours |

**Emotion Curve - Audit Prep:**
```
Anxiety
    │                    ╱╲
    │                   ╱  ╲
    │                  ╱    ╲
    │    _____________╱      ╲
    │   ╱                     ╲___
    │  ╱
    └──────────────────────────────
         Prep    Audit    Pass
```

### Phase 4: Audit (Days 86-90)

#### Audit Day Journey
| Stage | Activity | Touchpoint | Support Needed |
|-------|----------|------------|----------------|
| Day 86-87 | Auditor evidence requests | Auditor portal | Fast response |
| Day 88 | Auditor interviews | Scheduling | Prep guidance |
| Day 89 | Final documentation | Evidence export | Technical support |
| Day 90 | Audit completion | Status update | Celebration moment |

**Success Moment**: Audit report received - "Passed with no findings"

### Journey Insights

**Critical Success Factors:**
1. **Daily Engagement**: Platform must become part of workflow
2. **Progress Visibility**: Health score prevents abandonment
3. **Team Coordination**: Workflow tools reduce friction
4. **Audit Confidence**: Readiness prediction reduces anxiety

**Drop-off Risk Points:**
- Week 2-3: Overwhelmed by gap analysis
- Week 6-7: Fatigue from sustained effort
- Pre-audit: Anxiety peaks, support needs increase

---

## Journey Map 3: Continuous Compliance (Ongoing)

**Primary Persona**: Sam (Security Engineer) + Olivia (Ops)  
**Duration**: Post-audit, ongoing  
**Goal**: Maintain compliance posture with minimal effort  
**Success Metric**: <5 hours/week on compliance maintenance

### Weekly Workflow

#### Monday: Weekly Review (15 minutes)
| Activity | Touchpoint | Owner | Output |
|----------|------------|-------|--------|
| Check compliance health | Health dashboard | Sam | Status summary |
| Review drift alerts | Alert inbox | Sam | Action items |
| Update stakeholders | Slack notification | Automated | Team awareness |

#### Daily: Monitoring (5 minutes)
| Activity | Touchpoint | Automated? |
|----------|------------|------------|
| New evidence review | Evidence feed | Yes |
| Alert triage | Alert center | Partial |
| Control status check | Control dashboard | Yes |

#### Monthly: Reporting (1 hour)
| Activity | Touchpoint | Owner |
|----------|------------|-------|
| Executive summary | Report generator | Olivia |
| Evidence completeness | Coverage report | Sam |
| Policy updates | Policy review queue | Sam |
| Team training | Training dashboard | Olivia |

### Quarterly: Audit Readiness (2 hours)
| Activity | Touchpoint | Output |
|----------|------------|--------|
| Full evidence export | Export center | Audit package |
| Control re-assessment | Compliance matrix | Gap report |
| Framework expansion | Multi-framework view | Roadmap |
| Board presentation | Executive slides | Board deck |

### Journey Stages

#### Stage 1: Honeymoon (Months 1-3 post-audit)
| Element | Details |
|---------|---------|
| **Context** | Just passed audit, relieved, establishing routines |
| **Activities** | Setting up monitoring, training team, documenting processes |
| **Touchpoints** | Alert configuration, team training, process docs |
| **Emotion** | Relieved, vigilant, optimistic |
| **Pain Points** | Alert fatigue, false positives |

#### Stage 2: Optimization (Months 4-9)
| Element | Details |
|---------|---------|
| **Context** | Routines established, looking for efficiency gains |
| **Activities** | Tuning alerts, automating workflows, expanding frameworks |
| **Touchpoints** | Automation rules, custom frameworks, API usage |
| **Emotion** | Efficient, proactive |
| **Pain Points** | Limited customization, integration gaps |

#### Stage 3: Expansion (Months 10-12)
| Element | Details |
|---------|---------|
| **Context** | Planning for re-audit, considering new frameworks |
| **Activities** | ISO 27001 prep, GDPR review, re-audit planning |
| **Touchpoints** | Multi-framework view, gap analysis, auditor selection |
| **Emotion** | Confident, strategic |
| **Pain Points** | Framework complexity, coordination overhead |

### Emotion Curve - Continuous Compliance
```
Engagement
    │
    │  ╱╲                    ╱╲
    │ ╱  ╲                  ╱  ╲
    │╱    ╲________________╱    ╲___
    │      Honeymoon  Optimization  Expansion
    │      (Relief)    (Efficiency) (Strategic)
    └──────────────────────────────────
    M1-3      M4-9         M10-12
```

### Journey Insights

**Retention Factors:**
1. **Time Savings**: Must demonstrably reduce effort vs manual
2. **Peace of Mind**: Confidence in continuous compliance
3. **Expansion Value**: Support for additional frameworks
4. **Integration Growth**: New integrations as stack evolves

**Churn Risk Signals:**
- Alert fatigue (tuning too many alerts)
- Evidence gaps persisting >30 days
- No new framework adoption planned
- Support ticket volume increase

---

## Journey Map 4: Non-Technical Founder Journey

**Primary Persona**: Fiona Martinez (CEO)  
**Duration**: 90 days  
**Goal**: Achieve SOC 2 with minimal technical involvement  
**Success Metric**: <10 hours total time investment

### Modified Journey Stages

#### Stage 1: Hand-Hold Onboarding (Days 1-7)
| Day | Activity | Support Level | Touchpoint |
|-----|----------|---------------|------------|
| 1 | Welcome call with success manager | High-touch | Video call |
| 2-3 | Integration support (delegates to CTO) | Guided | Checklist |
| 4-5 | Policy review sessions | High-touch | Shared docs |
| 6-7 | Progress review | Check-in | Dashboard tour |

#### Stage 2: Delegated Execution (Days 8-75)
| Activity | Fiona's Role | Support | Touchpoint |
|----------|--------------|---------|------------|
| Evidence collection | None (delegated) | Automated | Weekly email summary |
| Policy approval | High-level review | Guided | Approval workflow |
| Team coordination | None (delegated) | Automated | Slack notifications |
| Progress tracking | Dashboard check | Self-serve | Executive dashboard |

#### Stage 3: Executive Visibility (Days 76-90)
| Activity | Touchpoint | Frequency |
|----------|------------|-----------|
| Audit readiness review | Executive report | Weekly |
| Final preparation | Pre-audit checklist | Once |
| Audit completion | Success notification | Once |
| Celebration | Case study invitation | Once |

### Emotion Curve - Fiona's Journey
```
Confidence
    │
    │ ╱╲
    │╱  ╲_______________________
    │    Onboarding    Delegated
    │    (Supported)   (Peace of mind)
    └───────────────────────────────
```

---

## Cross-Journey Insights

### Universal Pain Points
1. **Integration Complexity**: Connection failures across all journeys
2. **Uncertainty**: "Am I doing this right?" at every stage
3. **Time Pressure**: Compliance blocking business outcomes
4. **Coordination Friction**: Multiple stakeholders, unclear ownership

### Universal Delights
1. **First Evidence**: Automation working is an emotional peak
2. **Progress Visibility**: Knowing where you stand reduces anxiety
3. **Audit Pass**: Ultimate success moment
4. **Time Savings**: Realizing how much effort was saved

### Design Principles from Journeys
1. **Progressive Disclosure**: Don't overwhelm on day one
2. **Celebrate Milestones**: Acknowledge progress emotionally
3. **Provide Confidence**: Clear readiness indicators throughout
4. **Enable Delegation**: Support different involvement levels
5. **Reduce Anxiety**: Proactive support at stress points

---

*Document Version: 1.0*  
*Created: March 15, 2026*  
*Next Review: After beta user feedback*  
*Status: Complete - Ready for design implementation*
