# CertFast - Simple Wireframes

This document contains ASCII/text-based wireframe sketches for the CertFast compliance management platform. These wireframes provide a visual representation of the key user interfaces without requiring design tools.

---

## Screen 1: Landing Page

The landing page serves as the primary entry point for visitors to understand CertFast's value proposition and begin their compliance journey. It features a clean, professional layout that establishes trust and guides users toward the primary call-to-action. The design prioritizes clarity and conversion by presenting key information in a scannable format while maintaining visual hierarchy through spacing and structure.

```
+================================================================================+
|                                                                                |
|    [CERTFAST LOGO]        Home  Features  Pricing  About          [Sign In]   |
|                                                                                |
+================================================================================+
|                                                                                |
|                                                                                |
|                       +--------------------------------------+                 |
|                       |                                      |                 |
|                       |    SIMPLIFY YOUR COMPLIANCE          |                 |
|                       |    JOURNEY                           |                 |
|                       |                                      |                 |
|                       |    Streamline certifications,        |                 |
|                       |    assessments, and evidence         |                 |
|                       |    management in one platform        |                 |
|                       |                                      |                 |
|                       |    +-----------------------------+   |                 |
|                       |    |   Get Started - It's Free   |   |                 |
|                       |    +-----------------------------+   |                 |
|                       |                                      |                 |
|                       +--------------------------------------+                 |
|                                                                                |
|                                                                                |
+--------------------------------------------------------------------------------+
|                                                                                |
|    +----------------+    +----------------+    +----------------+             |
|    |   [ICON]       |    |   [ICON]       |    |   [ICON]       |             |
|    |                |    |                |    |                |             |
|    | Smart          |    | Collaborative  |    | Audit-Ready    |             |
|    | Assessments    |    | Workspaces     |    | Reports        |             |
|    |                |    |                |    |                |             |
|    | Automate your  |    | Work together  |    | Generate       |             |
|    | compliance     |    | with your team |    | comprehensive  |             |
|    | evaluations    |    | seamlessly     |    | audit trails   |             |
|    |                |    |                |    |                |             |
|    +----------------+    +----------------+    +----------------+             |
|                                                                                |
+================================================================================+
|                                                                                |
|    © 2026 CertFast    |    Privacy    |    Terms    |    Contact              |
|                                                                                |
+================================================================================+
```

**Description:** The landing page wireframe features a fixed header containing the CertFast logo positioned on the left with a horizontal navigation menu and sign-in button aligned to the right. The hero section occupies the majority of the viewport, presenting a bold headline, supportive subtext explaining the platform's value, and a prominent call-to-action button designed to capture user interest. Below the hero, three feature cards are arranged in a horizontal grid, each containing an icon placeholder, feature title, and brief description highlighting key product benefits. The footer provides standard legal links and copyright information, completing the professional appearance expected of a compliance management solution.

---

## Screen 2: Dashboard

The dashboard functions as the central command center where users monitor their overall compliance posture and track progress across multiple dimensions. This interface consolidates critical metrics into an at-a-glance view while providing navigation to deeper functionality. The layout balances information density with readability, ensuring users can quickly assess their status without feeling overwhelmed by data.

```
+================================================================================+
|                                                                                |
|  [LOGO]                                    [🔍 Search...]    [👤 User ▼]      |
|                                                                                |
+================================================================================+
|             |                                                                  |
|             |   DASHBOARD                                          [? Help]  |
|             |                                                                  |
|  DASHBOARD  |   +------------------------------------------------------------+|
|  ─────────  |   |                                                            ||
|             |   |   COMPLIANCE SCORE          ASSESSMENTS      EVIDENCE      ||
|  Assessments|   |   +----------------+      +---------+    +-------------+   ||
|  ─────────  |   |   |                |      |   12    |    |    47/60    |   ||
|             |   |   |     87%        |      |  Active |    |   Uploaded  |   ||
|  Evidence   |   |   |   [███████░░░] |      +---------+    +-------------+   ||
|  ─────────  |   |   |                |                                          |
|             |   |   +----------------+      +-------------+                   |
|  Reports    |   |                         | DAYS TO AUDIT |                   ||
|  ─────────  |   |                         |             |                   ||
|             |   |                         |     14      |                   ||
|  Settings   |   |                         |    Days     |                   ||
|  ─────────  |   |                         +-------------+                   ||
|             |   |                                                            ||
|  [+ New]    |   +------------------------------------------------------------+|
|             |                                                                  |
|             |   +------------------------------------------------------------+|
|             |   |   CERTIFICATION PROGRESS                                   ||
|             |   |                                                            ||
|             |   |   ISO 27001 Implementation                                 ||
|             |   |   +--------------------------------------------------+     ||
|             |   |   [████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 65%  ||
|             |   |   Phase 3: Evidence Collection (In Progress)               ||
|             |   |                                                            ||
|             |   |   SOC 2 Type II Preparation                                ||
|             |   |   +--------------------------------------------------+     ||
|             |   |   [██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 42%  ||
|             |   |   Phase 2: Gap Assessment (In Progress)                    ||
|             |   |                                                            ||
|             |   |   GDPR Compliance Review                                   ||
|             |   |   +--------------------------------------------------+     ||
|             |   |   [████████████████████████████████████████████░░░░] 89%  ||
|             |   |   Phase 5: Final Review (Pending Approval)                 ||
|             |   |                                                            ||
|             |   +------------------------------------------------------------+|
|             |                                                                  |
+================================================================================+
```

**Description:** The dashboard wireframe implements a classic sidebar layout with a fixed left navigation panel containing primary application sections including Dashboard, Assessments, Evidence, Reports, and Settings, with a prominent New action button at the bottom. The main content area begins with a top header bar featuring a search field and user account menu for quick access to profile functions. Below the header, four metric cards are arranged in a responsive grid displaying the Compliance Score with a visual progress indicator, the count of Active Assessments requiring attention, Evidence upload statistics showing completion ratio, and a countdown showing Days to Audit to maintain urgency. The lower section presents Certification Progress tracking, displaying multiple compliance initiatives with labeled progress bars indicating percentage completion and current phase status. This comprehensive overview enables compliance officers to immediately identify priorities and track organizational readiness.

---

## Screen 3: Assessment Detail

The assessment detail page provides a focused workspace for managing individual compliance evaluations. This interface enables users to track specific requirements, upload supporting evidence, and monitor completion status. The design emphasizes task orientation, guiding users through the assessment workflow with clear status indicators and intuitive action placement.

```
+================================================================================+
|                                                                                |
|  [LOGO]                                    [🔍 Search...]    [👤 User ▼]      |
|                                                                                |
+================================================================================+
|             |                                                                  |
|             |   [← Back to Assessments]                                        |
|             |                                                                  |
|  DASHBOARD  |   ISO 27001:2022 - Information Security Management              |
|  ─────────  |                                                                  |
|             |   [🟡 IN PROGRESS]                                    [Edit]   |
|  Assessments|                                                                  |
|  ►────────  |   +------------------------------------------------------------+|
|             |   |   ASSESSMENT DETAILS                                       ||
|  Evidence   |   |                                                            ||
|  ─────────  |   |   Started: March 10, 2026                                  ||
|             |   |   Last Updated: March 14, 2026                             ||
|  Reports    |   |   Assigned: Sarah Chen, James Wilson                       ||
|  ─────────  |   |                                                            ||
|             |   |   Description: Comprehensive evaluation of information      ||
|  Settings   |   |   security controls against ISO 27001:2022 requirements.   ||
|  ─────────  |   |                                                            ||
|             |   +------------------------------------------------------------+|
|  [+ New]    |                                                                  |
|             |   +------------------------------------------------------------+|
|             |   |   EVIDENCE UPLOAD                                          ||
|             |   |                                                            ||
|             |   |   +--------------------------------------------------+     ||
|             |   |   |                                                  |     ||
|             |   |   |              [📁 UPLOAD ZONE]                     |     ||
|             |   |   |                                                  |     ||
|             |   |   |         Drag and drop files here                  |     ||
|             |   |   |              or click to browse                   |     ||
|             |   |   |                                                  |     ||
|             |   |   |         Supported: PDF, DOCX, XLSX, PNG (max 50MB)||
|             |   |   |                                                  |     ||
|             |   |   +--------------------------------------------------+     ||
|             |   |                                                            ||
|             |   |   Recent Uploads:                                          ||
|             |   |   • Risk_Assessment_Q1_2026.pdf    ✓ Verified   [View]   ||
|             |   |   • Access_Control_Policy_v2.docx  ✓ Verified   [View]   ||
|             |   |   • Incident_Response_Log.xlsx     ⏳ Pending   [View]   ||
|             |   |                                                            ||
|             |   +------------------------------------------------------------+|
|             |                                                                  |
|             |   +------------------------------------------------------------+|
|             |   |   REQUIREMENTS CHECKLIST                                   ||
|             |   |                                                            ||
|             |   |   □ A.5 Information Security Policies                      ||
|             |   |     ├─ □ A.5.1 Management direction for information        ||
|             |   |     │      security   [📎 2 files]                 [Start] ||
|             |   |     └─ □ A.5.2 Review of the policies for information      ||
|             |   |            security         [📎 0 files]                 ||
|             |   |                                                            ||
|             |   |   ☑ A.6 Organization of Information Security              ||
|             |   |     ├─ ☑ A.6.1 Internal organization               [View]||
|             |   |     │      [📎 3 files] ✓ Complete                         ||
|             |   |     └─ ☑ A.6.2 Mobile devices and teleworking       [View]||
|             |   |            [📎 1 file] ✓ Complete                          ||
|             |   |                                                            ||
|             |   |   □ A.7 Human Resource Security                           ||
|             |   |     ├─ □ A.7.1 Prior to employment                  [Start]||
|             |   |     │      [📎 0 files]                                    ||
|             |   |     ├─ □ A.7.2 During employment                     [Start]||
|             |   |     │      [📎 0 files]                                    ||
|             |   |     └─ □ A.7.3 Termination and change of              ||
|             |   |            employment   [📎 0 files]                 [Start]||
|             |   |                                                            ||
|             |   |   □ A.8 Asset Management                                  ||
|             |   |     ├─ □ A.8.1 Responsibility for assets             [Start]||
|             |   |     └─ □ A.8.2 Information classification              [Start]||
|             |   |                                                            ||
|             |   |   [+ Load More Requirements...]                           ||
|             |   |                                                            ||
|             |   +------------------------------------------------------------+|
|             |                                                                  |
+================================================================================+
```

**Description:** The assessment detail wireframe maintains the consistent sidebar navigation from the dashboard while dedicating the main content area to assessment-specific functionality. The page header includes a back navigation link for returning to the assessments list, followed by the assessment title and a prominent status badge indicating the current state as In Progress, complemented by an edit action for metadata modification. The Assessment Details section presents essential metadata including start date, last activity timestamp, assigned team members, and a description of the evaluation scope. The Evidence Upload zone occupies a significant portion of the interface, featuring a drag-and-drop area with clear file format and size guidelines, accompanied by a list of recently uploaded documents with verification status indicators. The Requirements Checklist forms the core interactive element, displaying a hierarchical tree structure of compliance controls with expandable sections, completion checkboxes, attached file counts, and contextual action buttons that adapt based on completion status. Completed items display a checkmark and view action, while pending items offer start buttons to initiate evaluation workflows. This structured approach ensures assessors can systematically work through requirements while maintaining complete documentation trails.

---

## Summary

These three wireframes establish the foundational user interface structure for the CertFast platform:

1. **Landing Page** - Focuses on conversion and value communication for prospective users
2. **Dashboard** - Provides operational visibility and progress monitoring for active users  
3. **Assessment Detail** - Enables detailed compliance evaluation and evidence management

The wireframes prioritize clarity, consistency, and task efficiency while maintaining professional aesthetics appropriate for enterprise compliance management use cases.

---

*Document Version: 1.0*  
*Created: March 15, 2026*  
*Track: Design - Wireframes*
