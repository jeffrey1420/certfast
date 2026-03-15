# CertFast - Simple Wireframes

This document contains ASCII/text-based wireframes for the CertFast compliance certification platform.

---

## Screen 1: Landing Page

The landing page serves as the primary entry point for potential customers discovering CertFast. It features a clean, professional layout that immediately communicates the platform's value proposition for compliance certification management.

### Wireframe

```
+----------------------------------------------------------+
|  [LOGO]  CertFast                      Home  Features    |
|                                        Pricing  Sign In  |
+----------------------------------------------------------+
|                                                          |
|                                                          |
|              SIMPLIFY YOUR COMPLIANCE                    |
|                                                          |
|         Get certified faster with automated              |
|         evidence collection and assessment               |
|         tracking for SOC 2, ISO 27001, and more.         |
|                                                          |
|              [  Start Free Trial  ]                      |
|                                                          |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|   +--------------+   +--------------+   +--------------+ |
|   |   📋         |   |   🔒         |   |   ⚡         | |
|   |              |   |              |   |              | |
|   |  Automated   |   |   Secure     |   |   Fast       | |
|   |  Evidence    |   |   Storage    |   |   Track      | |
|   |  Collection  |   |   & Sharing  |   |   Progress   | |
|   |              |   |              |   |              | |
|   +--------------+   +--------------+   +--------------+ |
|                                                          |
+----------------------------------------------------------+
|  © 2024 CertFast    Privacy    Terms    Contact          |
+----------------------------------------------------------+
```

### Description

The landing page wireframe showcases a modern SaaS homepage structure designed to convert visitors into trial users. The header section contains the CertFast logo positioned on the left for brand recognition, accompanied by essential navigation links including Home, Features, Pricing, and Sign In options. The hero section dominates the upper viewport with a bold headline "SIMPLIFY YOUR COMPLIANCE" that immediately addresses the target audience's primary pain point. Below the headline, supporting copy elaborates on the platform's core benefits: automated evidence collection, assessment tracking capabilities, and support for multiple compliance frameworks including SOC 2 and ISO 27001. A prominent call-to-action button labeled "Start Free Trial" provides a clear conversion path. The feature cards section displays three key value propositions using iconography and concise labels: Automated Evidence Collection, Secure Storage & Sharing, and Fast Progress Tracking. The footer contains standard legal links and copyright information, completing the professional presentation expected of an enterprise compliance solution.

---

## Screen 2: Dashboard

The dashboard provides users with a comprehensive overview of their compliance certification status, presenting key metrics and progress indicators in an easily digestible format.

### Wireframe

```
+----------------------------------------------------------+
|  [LOGO]                                           [👤 ▼] |
|                                                          |
+--------+-------------------------------------------------+
|        |                                                  |
|  📊    |  DASHBOARD                              🔍     |
|  Dashboard                                          ⚙️   |
|        |                                                  |
|  📋    |  +-------------+  +-------------+  +-------------+
|  Assess|  | COMPLIANCE  |  | ASSESSMENTS |  |  EVIDENCE   |
|        |  |    SCORE    |  |             |  |   FILES     |
|  📁    |  |             |  |             |  |             |
| Evidence| |    ████░░   |  |    12/15    |  |   47/50     |
|        |  |             |  |   Active    |  |   Uploaded  |
|  ⚙️    |  |    78%      |  |             |  |             |
| Settings| +-------------+  +-------------+  +-------------+
|        |                                                  |
|  📈    |  +-------------+  +---------------------------+  |
| Reports|  | DAYS TO     |  | CERTIFICATION PROGRESS    |  |
|        |  |   AUDIT     |  |                           |  |
|  ❓    |  |             |  |  SOC 2 Type II            |  |
| Help   |  |    23       |  |  ████████████████████░░░  |  |
|        |  |             |  |  85% Complete             |  |
|        |  |   days      |  |                           |  |
|        |  |   left      |  |  ISO 27001                |  |
|        |  |             |  |  ██████████████░░░░░░░░░  |  |
|        |  +-------------+  |  60% Complete             |  |
|        |                   |                           |  |
|        |                   +---------------------------+  |
|        |                                                  |
+--------+-------------------------------------------------+
```

### Description

The dashboard wireframe implements a classic sidebar navigation layout optimized for productivity applications. The left sidebar contains primary navigation items with intuitive icons: Dashboard, Assessments, Evidence, Settings, Reports, and Help. Each icon provides quick visual recognition for users navigating between different sections of the platform. The top header displays the CertFast logo and a user profile dropdown menu for account management. The main content area presents four key metric cards arranged in a responsive grid layout. The Compliance Score card shows a circular progress indicator displaying 78%, giving users immediate feedback on their overall compliance health. The Assessments card indicates 12 out of 15 active assessments, helping users track their workload. The Evidence Files card displays 47 out of 50 required files have been uploaded, highlighting progress toward documentation completeness. The Days to Audit card counts down 23 days until the scheduled audit, creating urgency and helping users prioritize tasks. Below the metric cards, a Certification Progress section displays horizontal progress bars for each active certification framework. The SOC 2 Type II certification shows 85% completion with a filled progress bar, while ISO 27001 shows 60% completion. This dual-progress visualization allows users to track multiple concurrent certification efforts simultaneously.

---

## Screen 3: Assessment Detail

The assessment detail page provides a focused workspace for completing individual compliance assessments, featuring evidence upload capabilities and a detailed requirement checklist.

### Wireframe

```
+----------------------------------------------------------+
|  [LOGO]  CertFast                               [👤 ▼]   |
+----------------------------------------------------------+
|                                                          |
|  [← Back to Assessments]                                 |
|                                                          |
|  Access Control Review                          [IN PROGRESS]
|  Assessment #AC-2024-001                         🔵      |
|                                                          |
+----------------------------------------------------------+
+----------------------------------------------------------+
|                                                          |
|  EVIDENCE UPLOAD                                         |
|  ─────────────────                                       |
|                                                          |
|  +--------------------------------------------------+    |
|  |                                                  |    |
|  |            📤                                    |    |
|  |                                                  |    |
|  |      Drag & drop files here                      |    |
|  |         or click to browse                       |    |
|  |                                                  |    |
|  |      Supported: PDF, DOCX, XLSX, PNG, JPG        |    |
|  |      Max size: 50MB per file                     |    |
|  |                                                  |    |
|  +--------------------------------------------------+    |
|                                                          |
|  Uploaded Files:                                         |
|  📄 access_policy_v2.pdf                    ✅ 2.3MB    |
|  📄 user_access_matrix.xlsx                 ✅ 1.1MB    |
|                                                          |
+----------------------------------------------------------+
+----------------------------------------------------------+
|                                                          |
|  REQUIREMENT CHECKLIST                                   |
|  ─────────────────────                                   |
|                                                          |
|  ☐ 1. Document access control policies are in place      |
|     and reviewed quarterly                              |
|                                    [Add Evidence] [?]    |
|                                                          |
|  ✅ 2. User access rights are defined and documented       |
|     [access_matrix.xlsx]                        [?]      |
|                                                          |
|  ✅ 3. Access provisioning and de-provisioning           |
|     procedures are established                          |
|     [access_policy_v2.pdf]                      [?]      |
|                                                          |
|  ☐ 4. Regular access reviews are conducted and           |
|     documented                                           |
|                                    [Add Evidence] [?]    |
|                                                          |
|  ☐ 5. Privileged access is restricted and monitored       |
|                                    [Add Evidence] [?]    |
|                                                          |
|  ☐ 6. System access is logged and logs are retained      |
|     for required periods                                   |
|                                    [Add Evidence] [?]    |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|                                          [Save Draft]   [Submit Assessment]
|                                                          |
+----------------------------------------------------------+
```

### Description

The assessment detail page wireframe creates a focused workspace for completing compliance assessments efficiently. The page header includes a back navigation link allowing users to return to the assessments list, followed by the assessment title "Access Control Review" and assessment identifier "Assessment #AC-2024-001" for reference. A status badge displays "IN PROGRESS" with a blue indicator, providing immediate visual feedback on the assessment state. The evidence upload section occupies a prominent position with a large drag-and-drop zone featuring a cloud upload icon and clear instructions. The zone accepts PDF, DOCX, XLSX, PNG, and JPG formats up to 50MB per file, accommodating common business document types. Below the upload zone, a file list displays previously uploaded documents with file names, verification checkmarks, and file sizes: access_policy_v2.pdf at 2.3MB and user_access_matrix.xlsx at 1.1MB. The requirement checklist section presents six compliance requirements in a vertical list format. Each requirement includes a checkbox for completion tracking, descriptive text explaining the requirement, and contextual action buttons. Requirements 2 and 3 are marked complete with green checkmarks and display their associated evidence files. Requirements 1, 4, 5, and 6 remain incomplete with empty checkboxes and "Add Evidence" buttons for quick access. Help icons accompany each requirement for accessing additional guidance. The bottom of the page contains action buttons allowing users to save their progress as a draft or submit the completed assessment for review.

---

## Summary

These three wireframes represent the core user flows in the CertFast compliance platform:

1. **Landing Page**: Converts visitors through clear value proposition and feature highlights
2. **Dashboard**: Provides at-a-glance compliance health monitoring and progress tracking
3. **Assessment Detail**: Enables focused task completion with evidence management and checklist tracking

The ASCII format prioritizes structural clarity and content hierarchy over visual polish, serving as an effective foundation for development handoff and stakeholder review.

---

*Wireframes created for CertFast Design Track - Task DSG-005-SIMPLE*
