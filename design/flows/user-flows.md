# User Flow Diagrams - CertFast

## Overview

This document defines detailed user flows for core CertFast workflows, mapping decision points, error states, and cross-functional coordination. These flows guide the design and development of the platform's key user journeys.

**Based on**: Personas and Journey Maps from research phase  
**Primary Personas**: Alex (CTO), Fiona (CEO), Sam (Security), Olivia (Ops)  
**Created**: March 15, 2026  
**Status**: Complete

---

## Flow 1: Trial Onboarding - First Value

**Goal**: User signs up and collects first evidence within 24 hours  
**Primary Persona**: Alex Chen (CTO)  
**Success Metric**: First evidence collected in <24 hours

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         START: Landing Page Visit                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Integration Match                                                   │
│  Does user see required integrations? (AWS, GitHub, Slack, etc.)           │
└─────────────────────────────────────────────────────────────────────────────┘
           │                                    │
      YES  │                                    │  NO
           ▼                                    ▼
┌──────────────────────┐              ┌─────────────────────────┐
│ Proceed to Signup    │              │ Show Integration        │
│                      │              │ Request Form            │
└──────────────────────┘              │ • Capture integration   │
           │                          │   need                  │
           │                          │ • Notify on availability│
           │                          └─────────────────────────┘
           ▼                                    │
┌─────────────────────────────────────────────────────────────────────────────┐
│  ACTION: Signup (Email Only)                                                │
│  • Single-field email input                                                 │
│  • No credit card required                                                  │
│  • Immediate email verification sent                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Email Verified?                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
           │                                    │
      YES  │                                    │  NO / EXPIRED
           ▼                                    ▼
┌──────────────────────┐              ┌─────────────────────────┐
│ Enter Dashboard      │              │ Resend Verification     │
│                      │              │ • Max 3 resends         │
└──────────────────────┘              │ • Offer support chat    │
           │                          │   after 3rd attempt     │
           │                          └─────────────────────────┘
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  SCREEN: Welcome & Onboarding Choice                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Branch based on persona detection (optional survey or behavior)           │
└─────────────────────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌──────────────┐      ┌────────────────┐    ┌──────────────────┐
│ Quick Start  │      │ Guided Setup   │    │ I'm Technical    │
│ (Recommended)│      │ (For Fiona)    │    │ (For Alex/Sam)   │
└──────────────┘      └────────────────┘    └──────────────────┘
       │                       │                    │
       │                       ▼                    │
       │         ┌──────────────────────┐          │
       │         │ Success Manager      │          │
       │         │ Scheduling           │          │
       │         │ (High-touch path)    │          │
       │         └──────────────────────┘          │
       │                       │                    │
       └───────────────────────┴────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  SCREEN: Integration Selection                                              │
│  Progressive disclosure - show top 3 recommended based on detected stack   │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Connection Method                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
           │              │              │
           ▼              ▼              ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │ OAuth    │   │ API Key  │   │ Manual   │
    │ (GitHub) │   │ (AWS)    │   │ Upload   │
    └──────────┘   └──────────┘   └──────────┘
           │              │              │
           └──────────────┼──────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Connection Success?                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
           │                                    │
      YES  │                                    │  NO
           ▼                                    ▼
┌──────────────────────┐              ┌─────────────────────────┐
│ Start Evidence       │              │ ERROR: Connection       │
│ Collection           │              │ Failed                  │
│                      │              │                         │
│ Show progress        │              │ RETRY LOGIC:            │
│ indicator            │              │ 1. Auto-retry (2x)      │
└──────────────────────┘              │ 2. Show detailed error  │
           │                          │ 3. Link to docs         │
           │                          │ 4. Offer support chat   │
           │                          │ 5. Skip & continue      │
           │                          └─────────────────────────┘
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: First Evidence Collected?                                           │
│  Poll every 30 seconds, timeout after 10 minutes                            │
└─────────────────────────────────────────────────────────────────────────────┘
           │                                    │
      YES  │                                    │  TIMEOUT
           ▼                                    ▼
┌──────────────────────┐              ┌─────────────────────────┐
│ SUCCESS: First       │              │ CHECK: Partial Data?    │
│ Evidence Ready       │              │                         │
│                      │              │ Some evidence but not   │
│ • Celebration UI     │              │ complete                │
│ • "5 min to collect" │              │ → Explain gaps          │
│ • Show evidence      │              │ → Offer manual add      │
│ • Next steps guide   │              │ → Continue anyway       │
└──────────────────────┘              └─────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  SCREEN: Evidence Dashboard                                                 │
│  • Coverage score (e.g., "47/127 controls covered")                        │
│  • Evidence quality ratings                                                 │
│  • "What's next" recommendations                                            │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DECISION: User Path                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
           │              │              │
           ▼              ▼              ▼
    ┌──────────┐   ┌──────────┐   ┌──────────┐
    │ Add More │   │ Explore  │   │ Invite   │
    │Integrations    │ Policies │   │ Team     │
    └──────────┘   └──────────┘   └──────────┘
           │              │              │
           └──────────────┼──────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         24-HOUR CHECKPOINT                                  │
│  Trigger: Send follow-up email if no return visit                           │
│  • Show progress since last visit                                           │
│  • Highlight new features                                                   │
│  • Offer support if stuck                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         END: Trial User Activated                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Error State Handling

| Error State | Trigger | Recovery Path |
|-------------|---------|---------------|
| Invalid Email | Format check fails | Inline validation, format hints |
| Email Exists | Duplicate signup | "Already have an account?" link |
| Verification Expired | >24 hours | Resend with warning |
| OAuth Denied | User cancels auth | Retry with alternative method |
| API Key Invalid | Authentication fails | Validate format, link to docs |
| Connection Timeout | >30s no response | Auto-retry, then manual option |
| Insufficient Permissions | OAuth scope issue | Show required permissions list |
| No Data Found | Empty integration | Explain data requirements |

### Cross-Functional Flows

**Integration Success Notification:**
```
User connects AWS → Evidence collected → Slack notification to team
                                    → Email to compliance lead
                                    → Dashboard update for all users
```

---

## Flow 2: Compliance Achievement (90-Day Journey)

**Goal**: Guide user from signup to audit-ready in 90 days  
**Primary Personas**: Alex (CTO), Fiona (CEO), Olivia (Ops)  
**Success Metric**: Pass SOC 2 audit on first attempt

### Phase Flow: Foundation (Days 1-14)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    START: Foundation Phase (Days 1-14)                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  WEEK 1: Setup & Integration                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Daily Touchpoints:                                                         │
│  • Day 1: Welcome email + onboarding checklist                              │
│  • Day 2: Integration reminder (if incomplete)                              │
│  • Day 3: First evidence celebration + coverage preview                     │
│  • Day 5: Policy generation introduction                                    │
│  • Day 7: Weekly summary + next week preview                                │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Integration Status                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
           │                          │
      YES  │                          │  NO (Incomplete)
           ▼                          ▼
┌──────────────────────┐    ┌─────────────────────────┐
│ Proceed to Evidence  │    │ Escalation Path:        │
│ Review               │    │ • Day 3: Friendly nudge │
│                      │    │ • Day 5: Feature        │
│                      │    │   highlight email       │
│                      │    │ • Day 7: Success        │
│                      │    │   manager outreach      │
└──────────────────────┘    │   (for high-value leads)│
           │                └─────────────────────────┘
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  WEEK 2: Gap Assessment                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  • Generate compliance health score                                         │
│  • Identify missing evidence                                                │
│  • Create prioritized action plan                                           │
│  • Assign tasks to team members                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  SCREEN: Gap Analysis Dashboard                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │ Health Score    │  │ Critical Gaps   │  │ Action Items    │             │
│  │ ████████░░ 78%  │  │ 12 items        │  │ 34 assigned     │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DECISION: User Response to Gaps                                            │
└─────────────────────────────────────────────────────────────────────────────┘
      │           │           │           │
      ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Accept  │ │Delegate │ │Request  │ │Skip for │
│ & Start │ │Tasks    │ │Help     │ │Now      │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
      │           │           │           │
      │           │           │           │
      ▼           ▼           ▼           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  BRANCH: Delegate Tasks (Cross-Functional)                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│  │ Assign to   │     │ Assign to   │     │ Assign to   │                   │
│  │ Security    │     │ Engineering │     │ Operations  │                   │
│  │ (Sam)       │     │ (Alex)      │     │ (Olivia)    │                   │
│  └─────────────┘     └─────────────┘     └─────────────┘                   │
│         │                  │                  │                             │
│         ▼                  ▼                  ▼                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│  │ Email +     │     │ Slack +     │     │ Email +     │                   │
│  │ Dashboard   │     │ Jira ticket │     │ Calendar    │                   │
│  │ notification│     │ creation    │     │ invite      │                   │
│  └─────────────┘     └─────────────┘     └─────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase Flow: Sprint (Days 15-60)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SPRINT PHASE (Days 15-60)                                │
│                    Daily Workflow Automation                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DAILY AUTOMATED WORKFLOW                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  09:00 - Morning Health Check                                       │   │
│  │  • Sync new evidence from integrations                              │   │
│  │  • Update health score                                              │   │
│  │  • Flag new gaps or drift                                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  IF drift detected:                                                 │   │
│  │    ├── Send alert to owner                                          │   │
│  │    ├── Update dashboard                                             │   │
│  │    └── Escalate if unresolved >48hrs                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  14:00 - Evidence Review Window                                     │   │
│  │  • New evidence notification                                        │   │
│  │  • Auto-approval for high-confidence items                          │   │
│  │  • Manual review queue for flagged items                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  17:00 - Daily Summary                                              │   │
│  │  • Progress update email                                            │   │
│  │  • Overdue task reminders                                           │   │
│  │  • Tomorrow's priorities                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  WEEKLY RHYTHM (Every Monday)                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │ Week 3-4:       │    │ Week 5-6:       │    │ Week 7-8:       │         │
│  │ Evidence Sprint │───▶│ Policy          │───▶│ Control         │         │
│  │                 │    │ Finalization    │    │ Testing         │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
│         │                      │                      │                     │
│         ▼                      ▼                      ▼                     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │ Target: 80%     │    │ Target: 100%    │    │ Target: All     │         │
│  │ coverage        │    │ policies        │    │ tests passed    │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase Flow: Audit Preparation (Days 61-85)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUDIT PREPARATION (Days 61-85)                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  READINESS CHECKPOINT                                                       │
│  Automated assessment: Are we audit-ready?                                  │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Readiness Score                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
    │              │              │              │
    ▼              ▼              ▼              ▼
┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
│ 95-100%│   │ 80-94% │   │ 60-79% │   │ <60%   │
│ Ready  │   │ Minor  │   │ Major  │   │ Not    │
│        │   │ Gaps   │   │ Gaps   │   │ Ready  │
└────────┘   └────────┘   └────────┘   └────────┘
    │              │              │              │
    ▼              ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  PATH: 95-100% READY                                                        │
│  • Schedule audit                                                           │
│  • Generate evidence package                                                │
│  • Prepare auditor portal                                                   │
│  • Send celebration message                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  PATH: 80-94% (Minor Gaps)                                                  │
│  • Show specific gap list                                                   │
│  • Estimate time to close: 3-5 days                                         │
│  • Prioritized action plan                                                  │
│  • Offer expedited support                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  PATH: <80% (Major Gaps)                                                    │
│  • Honest assessment: "Need 2-3 more weeks"                                 │
│  • Detailed recovery plan                                                   │
│  • Success manager call (if available)                                      │
│  • Option to delay audit                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Audit Week Flow (Days 86-90)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AUDIT WEEK FLOW                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DAY 1-2: Auditor Access                                                    │
│  • Grant auditor portal access                                              │
│  • Provide evidence package                                                 │
│  • Auditor reviews documentation                                            │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Auditor Requests                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
           │                          │
      NONE │                          │  REQUESTS RECEIVED
           │                          ▼
           │            ┌─────────────────────────┐
           │            │ Fast-Response Protocol  │
           │            │                         │
           │            │ • Alert assigned owner  │
           │            │ • 4-hour SLA for initial│
           │            │   response              │
           │            │ • 24-hour for evidence  │
           │            │   delivery              │
           │            └─────────────────────────┘
           │                          │
           └──────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DAY 3-4: Interviews                                                        │
│  • Schedule stakeholder interviews                                          │
│  • Provide prep materials                                                   │
│  • Interview conducted                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DAY 5: Audit Complete                                                      │
│  • Final documentation                                                      │
│  • Await report                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Audit Result                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
    │                    │                    │
    ▼                    ▼                    ▼
┌────────┐        ┌────────┐          ┌────────┐
│ PASS   │        │ MINOR  │          │ MAJOR  │
│        │        │ FINDING│          │ FINDING│
└────────┘        └────────┘          └────────┘
    │                    │                    │
    ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  PASS (Target: 95% first-attempt)                                           │
│  • Celebration flow                                                         │
│  • Case study invitation                                                    │
│  • Referral program                                                         │
│  • Transition to continuous compliance                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Flow 3: Non-Technical Founder Journey (Fiona)

**Goal**: Achieve compliance with <10 hours total time investment  
**Primary Persona**: Fiona Martinez (CEO)  
**Success Metric**: Minimal involvement, maximum confidence

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    NON-TECHNICAL FOUNDER FLOW                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DETECTION: Low Technical Confidence                                        │
│  Signals:                                                                   │
│  • Guided setup selected                                                    │
│  • Self-reported "not technical"                                            │
│  • Integration attempts fail repeatedly                                     │
│  • Support ticket mentions overwhelm                                        │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  PATH: High-Touch Onboarding                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Day 1: Welcome Call                                                        │
│  ├── Schedule with Success Manager                                          │
│  ├── Understand current situation                                           │
│  ├── Set expectations ("We handle the complex parts")                       │
│  └── Assign dedicated contact                                               │
│                                                                             │
│  Day 2-3: Integration Support                                               │
│  ├── Offer to connect with their CTO/engineer                               │
│  ├── Provide step-by-step video guides                                      │
│  └── Check in daily                                                         │
│                                                                             │
│  Day 4-7: Policy Review Sessions                                            │
│  ├── Schedule 30-min policy walkthrough                                     │
│  ├── Explain in plain language                                              │
│  └── Get approval signatures                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ONGOING: Delegation Mode                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Fiona's Dashboard (Simplified)                                     │   │
│  │                                                                     │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │ Overall      │  │ Items Need   │  │ Next         │              │   │
│  │  │ Progress     │  │ Your         │  │ Milestone    │              │   │
│  │  │ ██████░░░ 67%│  │ Attention: 2 │  │ Audit: Day 45│              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  │                                                                     │   │
│  │  "You're on track! Two items need your approval:"                   │   │
│  │  [View Items →]                                                     │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  NOTIFICATION STRATEGY (Weekly Email Summary)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Subject: "CertFast Weekly: You're 67% Audit-Ready"                         │
│                                                                             │
│  Hi Fiona,                                                                  │
│                                                                             │
│  Great progress this week! Here's what happened:                            │
│                                                                             │
│  ✅ Completed:                                                              │
│     • 12 new pieces of evidence collected automatically                     │
│     • Your engineering team completed 3 tasks                               │
│                                                                             │
│  ⚠️ Needs Your Attention:                                                   │
│     • Policy approval: Remote Work Policy (2 min review)                    │
│     • Vendor security review: New tool added (approve/reject)               │
│                                                                             │
│  📅 Coming Up:                                                              │
│     • Audit scheduled: 45 days away                                         │
│     • Team training: Next Tuesday                                           │
│                                                                             │
│  Questions? Reply to this email or call your dedicated contact.             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CRITICAL TOUCHPOINTS (Fiona's Minimal Involvement)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Week 3: Executive Review    │  One 30-min call to review progress         │
│  Week 6: Policy Approvals    │  15-min review of final policies            │
│  Week 8: Readiness Check     │  Dashboard review, go/no-go decision        │
│  Week 12: Pre-Audit          │  30-min prep for auditor interview          │
│  Week 13: Audit Complete     │  Celebration call!                          │
│                                                                             │
│  Total Time: ~2 hours + email reviews                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Flow 4: Continuous Compliance (Sam + Olivia)

**Goal**: Maintain compliance with <5 hours/week effort  
**Primary Personas**: Sam (Security), Olivia (Ops)  
**Success Metric**: Sustainable compliance operations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONTINUOUS COMPLIANCE FLOW                               │
│                    Post-Audit Maintenance Mode                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  WEEKLY AUTOMATED WORKFLOW                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  MONDAY: Weekly Review (Sam - 15 min)                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  09:00 - Automated Digest Sent                                      │   │
│  │                                                                     │   │
│  │  This Week's Status:                                                │   │
│  │  • Health Score: 94% (+2% from last week)                           │   │
│  │  • New Evidence: 23 items auto-collected                            │   │
│  │  • Drift Alerts: 1 (low priority)                                   │   │
│  │  • Tasks Due: 3 (all on track)                                      │   │
│  │                                                                     │   │
│  │  [View Dashboard →]  [Take Action →]                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DAILY: Monitoring (Automated + 5 min review)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Automated:                                                         │   │
│  │  • Evidence collection from all integrations                        │   │
│  │  • Drift detection and alerting                                     │   │
│  │  • Control status updates                                           │   │
│  │                                                                     │   │
│  │  Manual (Sam - 5 min):                                              │   │
│  │  • Review alert inbox                                               │   │
│  │  • Triage any high-priority items                                   │   │
│  │  • Check team task completion                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  DRIFT DETECTION & RESPONSE FLOW                                            │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Drift Detected                                                      │
│  Types: Configuration change, Missing evidence, Policy violation           │
└─────────────────────────────────────────────────────────────────────────────┘
           │                          │
      NO   │                          │  YES
           │                          ▼
           │            ┌─────────────────────────┐
           │            │ CLASSIFY SEVERITY       │
           │            │                         │
           │            │ • Critical: Immediate   │
           │            │   compliance risk       │
           │            │ • High: Control failure │
           │            │ • Medium: Gap forming   │
           │            │ • Low: Best practice    │
           │            └─────────────────────────┘
           │                          │
           │        ┌─────────────────┼─────────────────┐
           │        ▼                 ▼                 ▼
           │   ┌─────────┐      ┌─────────┐      ┌─────────┐
           │   │CRITICAL │      │ HIGH    │      │ MED/LOW │
           │   └─────────┘      └─────────┘      └─────────┘
           │        │                 │                 │
           │        ▼                 ▼                 ▼
           │   Immediate        4-hour SLA        Weekly digest
           │   escalation       notification      inclusion
           │        │                 │                 │
           │        ▼                 ▼                 │
           │   Page + Email     Email + Slack           │
           │   + SMS            notification            │
           │                                             │
           └─────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  RESOLUTION WORKFLOW                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ACTION: User Response                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
    │              │              │              │
    ▼              ▼              ▼              ▼
┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
│ Fix    │   │Accept  │   │Delegate│   │Dismiss │
│ Issue  │   │Risk    │   │Task    │   │False   │
│        │   │        │   │        │   │Positive│
└────────┘   └────────┘   └────────┘   └────────┘
    │              │              │              │
    ▼              ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  Fix Issue:         Accept Risk:      Delegate:       Dismiss:              │
│  • Mark resolved    • Document        • Assign to   • Explain reason        │
│  • Evidence auto-     rationale         owner         • Update detection    │
│    collected        • Set review      • Set SLA       rules                 │
│  • Control re-        date              • Track                           │
│    assessed         • Notify board      • Escalate                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Monthly Executive Reporting (Olivia - 1 hour)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MONTHLY EXECUTIVE REPORTING                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  AUTOMATED: First Monday of Month                                           │
│  • Generate executive summary report                                        │
│  • Email to Olivia with board-ready attachments                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  REPORT CONTENTS                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Executive Summary (Board-Ready)                                    │   │
│  │                                                                     │   │
│  │  Compliance Posture:                                                │   │
│  │  • Overall Health: 94% ████████████████████░░                       │   │
│  │  • SOC 2: Compliant (last audit: 3 months ago)                      │   │
│  │  • ISO 27001: In progress (67% complete)                            │   │
│  │  • GDPR: Compliant                                                  │   │
│  │                                                                     │   │
│  │  This Month:                                                        │   │
│  │  • Evidence collected: 127 items                                    │   │
│  │  • Drift incidents: 3 (all resolved)                                │   │
│  │  • Time invested: 18 hours (vs 45 hours manual)                     │   │
│  │  • Cost savings: €2,700 this month                                  │   │
│  │                                                                     │   │
│  │  Risk Items:                                                        │   │
│  │  • 1 medium-risk item under review                                  │   │
│  │  • 0 critical or high-risk items                                    │   │
│  │                                                                     │   │
│  │  [Download Full Report] [Schedule Board Review]                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Quarterly Audit Readiness (2 hours)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    QUARTERLY AUDIT READINESS                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  QUARTER 1, 2, 3: PREPARATION                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Week 1: Self-Assessment                                                    │
│  • Run automated readiness check                                            │
│  • Generate gap report                                                      │
│  • Identify remediation tasks                                               │
│                                                                             │
│  Week 2: Evidence Package                                                   │
│  • Export complete evidence archive                                         │
│  • Verify evidence completeness                                             │
│  • Prepare auditor handoff                                                  │
│                                                                             │
│  Week 3: Team Review                                                        │
│  • Stakeholder walkthrough                                                  │
│  • Policy refresher training                                                │
│  • Final readiness confirmation                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  QUARTER 4: RE-AUDIT                                                        │
│  • Full audit process (see 90-day flow)                                     │
│  • SOC 2 Type II or ISO 27001 surveillance audit                            │
│  • Board presentation of results                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Flow 5: Cross-Functional Team Coordination

**Goal**: Enable seamless collaboration across security, engineering, and ops  
**Primary Personas**: All personas in multi-user organizations  
**Success Metric**: Clear ownership, minimal friction

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CROSS-FUNCTIONAL COORDINATION FLOW                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  SCENARIO: New Task Created                                                 │
│  Example: "Configure MFA for all admin accounts"                           │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Can This Be Automated?                                              │
└─────────────────────────────────────────────────────────────────────────────┘
    │                                          │
 YES│                                          │NO - Requires Human
    ▼                                          ▼
┌──────────────────────┐              ┌─────────────────────────┐
│ Auto-Execute         │              │ Task Assignment Flow    │
│ • Run script         │              │                         │
│ • Collect evidence   │              │                         │
│ • Mark complete      │              │                         │
└──────────────────────┘              └─────────────────────────┘
                                                 │
                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  TASK ASSIGNMENT MATRIX                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CLASSIFY: Task Type                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
    │              │              │              │
    ▼              ▼              ▼              ▼
┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
│Security│   │Engineer│   │Operations      │   │Executive│
│Config  │   │Implement      │   │Policy  │   │Approval │
└────────┘   └────────┘   └────────┘   └────────┘
    │              │              │              │
    ▼              ▼              ▼              ▼
┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
│Assign  │   │Assign  │   │Assign  │   │Assign  │
│to: Sam │   │to: Alex│   │to:Olivia      │   │to:Fiona│
└────────┘   └────────┘   └────────┘   └────────┘
    │              │              │              │
    └──────────────┴──────────────┴──────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  NOTIFICATION CASCADE                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  PRIMARY: Task Owner                                                        │
│  • Email notification                                                       │
│  • Slack DM (if integrated)                                                 │
│  • Dashboard notification badge                                             │
│  • Calendar block (if >30 min estimated)                                    │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  SECONDARY: Manager/Coordinator                                             │
│  Olivia receives weekly summary of all team tasks                           │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCALATION: Overdue Tasks                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ESCALATION TIMELINE                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Day 0:   Task assigned → Primary owner notified                           │
│                                                                             │
│  Day 3:   Friendly reminder → Email to owner                               │
│                                                                             │
│  Day 5:   Urgent reminder → Email + Slack to owner                         │
│                                                                             │
│  Day 7:   Escalation → Notify Olivia (coordinator)                         │
│          → Consider re-assignment                                          │
│                                                                             │
│  Day 10:  Critical → Notify Fiona (executive)                              │
│          → Compliance risk flagged                                         │
│                                                                             │
│  Day 14:  Override → Auto-assign to backup owner                           │
│          → Document for audit trail                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Task Completion Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TASK COMPLETION FLOW                                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ACTION: Owner Marks Task Complete                                          │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CHECK: Evidence Required?                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
    │                                          │
  NO│                                          │YES
    ▼                                          ▼
┌──────────────────────┐              ┌─────────────────────────┐
│ Auto-Verify          │              │ Evidence Upload Flow    │
│ • Update control     │              │                         │
│ • Notify coordinator │              │ • Owner uploads/        │
│ • Close task         │              │   provides evidence     │
└──────────────────────┘              │ • AI validates format   │
           │                          │ • Reviewer approves     │
           │                          │ • Task closes           │
           │                          └─────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  POST-COMPLETION ACTIONS                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  1. Update Compliance Health Score                                          │
│  2. Generate completion notification to team                                │
│  3. Check for dependent tasks (unblock if ready)                            │
│  4. Award progress badge (gamification)                                     │
│  5. Schedule follow-up if recurring task                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Decision Points Summary

| Flow | Key Decision Point | Branching Logic |
|------|-------------------|-----------------|
| Trial Onboarding | Integration method | OAuth → API Key → Manual |
| Trial Onboarding | First evidence timeout | Partial → Retry → Skip |
| Compliance Sprint | Readiness score | Ready → Minor gaps → Major gaps |
| Continuous | Drift severity | Critical → High → Medium/Low |
| Task Management | Assignment | Security → Engineering → Ops → Executive |
| Task Management | Completion | Auto-verify → Evidence upload → Review |

---

## Error State Summary

| Flow Stage | Error Type | User Impact | Recovery |
|------------|------------|-------------|----------|
| Signup | Invalid email | Can't proceed | Inline validation |
| Signup | Duplicate account | Confusion | Login redirect |
| Integration | OAuth denied | Connection fails | Retry alternative |
| Integration | Permissions insufficient | Partial data | Show required perms |
| Integration | API timeout | Delayed sync | Auto-retry + notify |
| Evidence | No data found | Empty results | Explain requirements |
| Task | Assignment failed | Unowned task | Escalate to coordinator |
| Audit | Evidence rejected | Audit risk | Fast-response protocol |

---

## Self-Evaluation

**Confidence Score**: 4/5

**Rationale**:
- Comprehensive coverage of all primary user flows based on research
- Clear decision points and error handling throughout
- Cross-functional flows address multi-stakeholder coordination
- Branching logic covers main persona variations
- Concrete examples and time estimates for realistic scenarios

**Limitations**:
- Some error states may need refinement after user testing
- Time estimates are preliminary and should be validated
- Integration-specific error flows could be more detailed

**Recommended Next Steps**:
1. UI Designer: Create wireframes from these flows
2. Frontend Developer: Implement flow state machines
3. Product Manager: Prioritize flow automation features

---

*Document Version: 1.0*  
*Created: March 15, 2026*  
*Next Review: After wireframe completion*  
*Status: Complete - Ready for design implementation*
