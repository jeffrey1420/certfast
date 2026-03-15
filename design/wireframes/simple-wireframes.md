# CertFast - Simple Wireframes

## Overview
This document contains ASCII/text-based wireframes for the core screens of the CertFast platform. These wireframes provide a visual representation of the layout and structure for the landing page, dashboard, and assessment detail screens. Each wireframe is accompanied by a detailed description explaining the design decisions and functionality of each element.

---

## Screen 1: Landing Page

The landing page serves as the primary entry point for potential customers, designed to communicate value proposition quickly and drive conversion through clear calls-to-action.

```
+------------------------------------------------------------------+
|                                                                   |
|   [LOGO]              Home  Features  Pricing  About    [Login]   |
|                                                                   |
+------------------------------------------------------------------+
|                                                                   |
|                                                                   |
|         ╔═══════════════════════════════════════════╗             |
|         ║                                           ║             |
|         ║    ACHIEVE COMPLIANCE FASTER              ║             |
|         ║                                           ║             |
|         ║    Streamline your certification process  ║             |
|         ║    with automated assessments, evidence   ║             |
|         ║    tracking, and real-time progress.      ║             |
|         ║                                           ║             |
|         ║    +----------------------------------+   ║             |
|         ║    |     GET STARTED FREE             |   ║             |
|         ║    +----------------------------------+   ║             |
|         ║                                           ║             |
|         ╚═══════════════════════════════════════════╝             |
|                                                                   |
|                                                                   |
+------------------------------------------------------------------+
|                                                                   |
|    +------------------+  +------------------+  +---------------+  |
|    |   [ICON]         |  |   [ICON]         |  |   [ICON]      |  |
|    |                  |  |                  |  |               |  |
|    |  Auto Assessment |  |  Evidence Hub    |  |  Progress     |  |
|    |                  |  |                  |  |  Tracking     |  |
|    |  Automated scan  |  |  Centralized     |  |  Real-time    |  |
|    |  your systems    |  |  document        |  |  compliance   |  |
|    |  against standards|  |  management      |  |  dashboard    |  |
|    |                  |  |                  |  |               |  |
|    +------------------+  +------------------+  +---------------+  |
|                                                                   |
+------------------------------------------------------------------+
|                                                                   |
|   © 2026 CertFast    Privacy    Terms    Contact                  |
|                                                                   |
+------------------------------------------------------------------+
```

### Description

The landing page wireframe presents a clean, professional layout that immediately captures visitor attention with a bold headline announcing the platform's core value proposition. The header section maintains consistent branding with the CertFast logo positioned on the left, followed by a straightforward navigation menu containing essential links to Home, Features, Pricing, and About sections. The login button appears prominently on the far right, providing easy access for returning users.

The hero section dominates the upper portion of the page, utilizing generous white space to create visual breathing room and focus attention on the messaging. The main headline "ACHIEVE COMPLIANCE FASTER" is displayed in uppercase to convey urgency and importance, while the supporting subtext explains the three core platform capabilities: automated assessments, evidence tracking, and real-time progress monitoring. This combination addresses the primary pain points experienced by compliance teams.

The call-to-action button uses clear, action-oriented language with "GET STARTED FREE" to reduce friction and encourage immediate signup. By offering a free option, the design removes the barrier of financial commitment, which is particularly effective for B2B software where decision-makers often want to evaluate the product before purchase approval.

Below the hero section, three feature cards provide a quick overview of key platform capabilities. Each card follows a consistent structure with an icon placeholder at the top, a bold feature title in the middle, and a brief descriptive text explaining the benefit. The Auto Assessment card highlights the platform's ability to automatically scan systems against compliance standards. The Evidence Hub card emphasizes centralized document management, addressing the common challenge of scattered compliance documentation. The Progress Tracking card showcases real-time compliance dashboards, giving stakeholders visibility into certification status.

The footer contains standard legal and contact links, maintaining a minimal design that doesn't distract from the primary conversion goals of the page. This layout prioritizes clarity and conversion optimization while establishing trust through professional design aesthetics.

---

## Screen 2: Dashboard

The dashboard serves as the command center for compliance managers, providing at-a-glance visibility into certification status, pending tasks, and overall compliance health.

```
+------------------------------------------------------------------+
|                                                                   |
|  [==] CertFast                                                    |
|                                                                   |
|  +----------------+---------------------------------------------+
  |                |                                             |
  |  DASHBOARD     |   Welcome back, Sarah Chen        [@] [?]   |
  |  ─────────     |   Compliance Manager                        |
  |                |                                             |
  |  Assessments   |  +-----------------------------------------+|
  |  ───────────   |  |  COMPLIANCE SCORE     ASSESSMENTS        ||
  |  • Active (3)  |  |                                         ||
  |  • Completed   |  |  ████████████░░░░░    ┌─────────┐        ||
  |    (12)        |  |  ████████████░░░░░    │  15     │        ||
  |  • Scheduled   |  |  ████████████░░░░░    │  Total  │        ||
  |    (2)         |  |                       │         │        ||
  |                |  |    78%                │ 8 Done  │        ||
  |  Evidence      |  |    Score              │ 7 Open  │        ||
  |  ─────────     |  |                       └─────────┘        ||
  |  • Pending     |  +-----------------------------------------+|
  |    Review (5)  |  |  EVIDENCE UPLOADS     DAYS TO AUDIT      ||
  |  • Uploaded    |  |                                         ||
  |    (42)        |  |  ┌─────────┐           ┌─────────┐       ||
  |                |  |  │  42/60  │           │   23    │       ||
  |  Settings      |  │  │  Items  │           │  Days   │       ||
  |  ─────────     |  │  │         │           │  Left   │       ||
  |  • Profile     |  │  │ 70%     │           │         │       ||
  |  • Team        |  │  └─────────┘           └─────────┘       ||
  |  • Integrations|  +-----------------------------------------+|
  |                |                                             |
  |                |  CERTIFICATION PROGRESS                     |
  |                |  ─────────────────────                      |
  |                |                                             |
  |                |  ISO 27001 Certification                    |
  |                |  [████████████████████░░░░░░░░░░] 67%       |
  |                |  Stage: Evidence Collection                 |
  |                |  Target: April 30, 2026                     |
  |                |                                             |
  |                |  SOC 2 Type II                              |
  |                |  [██████████████░░░░░░░░░░░░░░░░] 45%       |
  |                |  Stage: Policy Review                       |
  |                |  Target: June 15, 2026                      |
  |                |                                             |
  |                |  +---------------------------------------+  |
  |                |  |  Quick Actions:  [+ New Assessment]    |  |
  |                |  |                  [Upload Evidence]      |  |
  |                |  |                  [Generate Report]      |  |
  |                |  +---------------------------------------+  |
  |                |                                             |
  +----------------+---------------------------------------------+
```

### Description

The dashboard wireframe implements a classic sidebar navigation pattern that maximizes screen real estate for content while maintaining persistent access to primary functions. The left sidebar contains the CertFast logo at the top for consistent branding, followed by organized navigation sections. The Dashboard section serves as the home base, with Assessments organized into subcategories showing Active (3), Completed (12), and Scheduled (2) items, giving users immediate awareness of their workload distribution. The Evidence section tracks documentation status with Pending Review (5) and Uploaded (42) counts, highlighting items requiring attention. Settings provides access to Profile, Team management, and Integrations configuration.

The main content area begins with a personalized header displaying "Welcome back, Sarah Chen" along with her role as Compliance Manager. This personalization creates a sense of ownership and relevance. The user menu and help icons positioned on the right provide quick access to account settings and support resources without cluttering the primary interface.

Four metric cards form the core analytics section, arranged in a 2x2 grid for balanced visual weight. The Compliance Score card displays a visual progress bar filling approximately 78% of its container, accompanied by the numerical score of 78%, which provides both visual and precise quantitative feedback. The Assessments card shows total count (15), completed (8), and open (7) assessments, using a card container with clear hierarchy. The Evidence Uploads card indicates 42 items uploaded out of 60 required (70% complete), while the Days to Audit card displays 23 days remaining, creating urgency and helping users prioritize their efforts.

The Certification Progress section displays two active compliance initiatives using horizontal progress bars. The ISO 27001 Certification shows 67% completion at the Evidence Collection stage with an April 30, 2026 target date. The SOC 2 Type II certification displays 45% completion at the Policy Review stage targeting June 15, 2026. These visual progress indicators help stakeholders understand timeline expectations and current status at a glance.

The Quick Actions bar at the bottom provides one-click access to the three most common tasks: creating a New Assessment, uploading Evidence, and generating Reports. This reduces navigation friction and accelerates common workflows for power users who know exactly what they want to accomplish.

---

## Screen 3: Assessment Detail

The assessment detail screen provides a focused workspace for managing individual compliance assessments, tracking requirements, and collecting evidence.

```
+------------------------------------------------------------------+
|                                                                   |
|  [==] CertFast                                                    |
|                                                                   |
|  +----------------+---------------------------------------------+
  |                |                                             |
  |  DASHBOARD     |   [← Back to Assessments]                   |
  |                |                                             |
  |  ...           |   +---------------------------------------+   |
  |                |   |                                       |   |
  |                |   |  Access Control Review                |   |
  |                |   |  ┌─────────────────┐                  |   |
  |                |   │  │  IN PROGRESS    │                  │   |
  |                |   │  └─────────────────┘                  │   |
  |                |   |                                       |   |
  |                |   +---------------------------------------+   |
  |                |                                             |
  |                |   +---------------------------------------+   |
  |                |   |  EVIDENCE UPLOAD ZONE                 |   |
  |                |   |                                       |   |
  |                |   |      ┌─────────────┐                  |   |
  |                |   |      │             │                  |   |
  |                |   |      │    [+]      │                  |   |
  |                |   |      │             │                  |   |
  |                |   |      │  Drop files │                  |   |
  |                |   |      │  or click   │                  |   |
  |                |   |      │  to upload  │                  |   |
  |                |   |      │             │                  |   |
  |                |   |      └─────────────┘                  |   |
  |                |   |                                       |   |
  |                |   |  Supported: PDF, DOCX, XLSX, PNG      |   |
  |                |   |  Max size: 50MB per file              |   |
  |                |   |                                       |   |
  |                |   +---------------------------------------+   |
  |                |                                             |
  |                |   REQUIREMENTS CHECKLIST                    |
  |                |   ─────────────────────                     |
  |                |                                             |
  |                |   ☐ 1. User access policies documented      |
  |                |      [View Template] [Upload Evidence]      |
  |                |      Status: Not Started                    |
  |                |                                             |
  |                |   ☑ 2. Role-based access matrix defined     |
  |                |      [View Uploaded] [Replace]              |
  |                |      Status: Approved ✓                     |
  |                |      File: RBAC_Matrix_v2.xlsx              |
  |                |                                             |
  |                |   ☐ 3. Privileged access procedures         |
  |                |      [View Template] [Upload Evidence]      |
  |                |      Status: In Review                      |
  |                |      Assigned to: John Martinez             |
  |                |                                             |
  |                |   ☐ 4. Access review schedule established   |
  |                |      [View Template] [Upload Evidence]      |
  |                |      Status: Not Started                    |
  |                |      Due: March 20, 2026                    |
  |                |                                             |
  |                |   ─────────────────────────────────────────  |
  |                |                                             |
  |                |   Progress: 1 of 4 complete (25%)           |
  |                |   [████████░░░░░░░░░░░░░░░░░░░░░░░░]        |
  |                |                                             |
  |                |   [Save Progress]  [Submit for Review]      |
  |                |                                             |
  +----------------+---------------------------------------------+
```

### Description

The assessment detail screen maintains the sidebar navigation from the dashboard for consistency and easy navigation between different sections of the platform. The main content area begins with a back navigation element labeled "← Back to Assessments" that allows users to return to the assessment list without using browser controls, maintaining workflow continuity and reducing cognitive load.

The header section prominently displays the assessment title "Access Control Review" with a status badge indicating "IN PROGRESS" in a highlighted container. This status badge uses visual styling to distinguish it from completed or pending states, providing immediate context about where this assessment stands in the overall workflow.

The Evidence Upload Zone occupies a significant portion of the screen to emphasize the importance of documentation in compliance processes. The upload area uses a dashed border container with a large plus icon to create a clear drop zone metaphor. Supporting text indicates accepted file formats (PDF, DOCX, XLSX, PNG) and size limitations (50MB per file), setting clear expectations and preventing upload errors. This section supports both drag-and-drop and click-to-browse interactions, accommodating different user preferences and workflows.

The Requirements Checklist forms the core functional area of this screen, presenting four compliance requirements that must be satisfied. Each checklist item follows a consistent structure with a checkbox for completion tracking, the requirement description, and contextual action buttons. Item 1 "User access policies documented" shows status "Not Started" with template view and upload options. Item 2 "Role-based access matrix defined" demonstrates a completed state with a checked checkbox, status "Approved ✓", and shows the uploaded filename "RBAC_Matrix_v2.xlsx" with options to view or replace the file. Item 3 "Privileged access procedures" shows "In Review" status with assignment to "John Martinez", indicating collaborative workflow capabilities. Item 4 "Access review schedule established" displays "Not Started" status with a due date of March 20, 2026, creating urgency for pending tasks.

The progress summary at the bottom shows "1 of 4 complete (25%)" with a visual progress bar that partially fills to represent current completion status. This provides both precise numerical feedback and visual indication of remaining work. The action buttons "Save Progress" and "Submit for Review" allow users to either checkpoint their work or advance the assessment to the next stage in the approval workflow. The primary "Submit for Review" button is positioned to encourage progression while the secondary "Save Progress" option supports iterative work patterns.

---

## Summary

These three wireframes establish the foundational user interface structure for the CertFast compliance management platform. The landing page focuses on conversion and value communication, the dashboard emphasizes operational visibility and quick access to metrics, and the assessment detail screen provides a focused workspace for compliance task execution. Together, they create a cohesive user experience that guides users from initial discovery through daily operational workflows.

