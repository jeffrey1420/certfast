# CertFast - Simple Wireframes

This document contains ASCII/text-based wireframes for the core screens of the CertFast platform. These wireframes provide a clear visual structure for each screen, focusing on layout, hierarchy, and user flow without detailed styling.

---

## Screen 1: Landing Page

The Landing Page serves as the primary entry point for potential users, designed to communicate CertFast's value proposition quickly and guide visitors toward conversion. The layout follows a standard hero-centric pattern with clear navigation and compelling call-to-action elements.

### Wireframe

```
+================================================================================+
|                                                                                |
|    [LOGO]                              Home  Features  Pricing  Login  [CTA]   |
|                                                                                |
+================================================================================+
|                                                                                |
|                                                                                |
|                           ACHIEVE COMPLIANCE FASTER                            |
|                                                                                |
|                   Simplify your certification journey with AI-powered           |
|                   assessment tools and automated evidence collection            |
|                                                                                |
|                           [ GET STARTED FREE ]                                 |
|                                                                                |
|                           [Watch Demo] [Learn More]                            |
|                                                                                |
|                                                                                |
|              +---------------+  +---------------+  +---------------+             |
|              |   📋          |  |   📊          |  |   🛡️          |             |
|              |               |  |               |  |               |             |
|              | Smart         |  | Progress      |  | Evidence      |             |
|              | Assessments   |  | Tracking      |  | Management    |             |
|              |               |  |               |  |               |             |
|              | AI-powered    |  | Real-time     |  | Organized     |             |
|              | questionnaires|  | dashboards    |  | document      |             |
|              |               |  |               |  | storage       |             |
|              | [Learn More]  |  | [Learn More]  |  | [Learn More]  |             |
|              +---------------+  +---------------+  +---------------+             |
|                                                                                |
+================================================================================+
|                                                                                |
|    [LOGO]        About   Features   Pricing   Support   Legal                   |
|                                                                                |
|    © 2026 CertFast, Inc.                                    Privacy  Terms    |
|                                                                                |
+================================================================================+
```

### Description

The Landing Page features a clean, professional header with the CertFast logo positioned on the left side for strong brand recognition. The navigation bar includes standard links for Home, Features, and Pricing, along with a Login option for returning users. The primary call-to-action button stands out in the header, encouraging immediate sign-ups.

The hero section dominates the upper portion of the screen with a bold, attention-grabbing headline that communicates the core benefit: achieving compliance faster. The subtext provides additional context about CertFast's AI-powered capabilities and automated features. Two action buttons offer different conversion paths—the primary button leads to free registration while secondary links provide alternative engagement options for users who need more information before committing.

Below the hero section, three feature cards present the platform's key capabilities in an easy-to-scan format. Each card includes an icon, title, brief description, and a learn more link. This layout allows visitors to quickly understand what CertFast offers without overwhelming them with too much information at once. The footer provides standard navigation links and legal information, completing the professional presentation of the landing page.

---

## Screen 2: Dashboard

The Dashboard serves as the central hub for users to monitor their compliance progress and access all platform features. The layout prioritizes information hierarchy, presenting key metrics prominently while maintaining easy access to navigation and secondary actions.

### Wireframe

```
+================================================================================+
|  [LOGO]                                                      [🔔] [👤] Profile |
|  CERTFAST                                                                      |
+================================================================================+
|                                                                                |
|  +------------------+  +----------------------------------------------------+  |
|  |                  |  |                                                    |  |
|  |  📊 Dashboard    |  |   OVERVIEW                                         |  |
|  |                  |  |                                                    |  |
|  |  📋 Assessments  |  |   +--------------+  +--------------+  +------------+ |  |
|  |                  |  |   | Compliance   |  | Assessments  |  | Evidence   | |  |
|  |  📁 Evidence     |  |   | Score        |  |              |  |            | |  |
|  |                  |  |   |              |  |     12       |  |    45      | |  |
|  |  🎯 Tasks        |  |   |     87%      |  |              |  |            | |  |
|  |                  |  |   |              |  |   Active     |  |   Uploaded | |  |
|  |  📅 Calendar     |  |   |   +4.2%      |  |              |  |            | |  |
|  |                  |  |   +--------------+  +--------------+  +------------+ |  |
|  |  ⚙️ Settings     |  |                                                    |  |
|  |                  |  |   +--------------+  +----------------------------+  |  |
|  |  ❓ Help         |  |   | Days to      |  |  CERTIFICATION PROGRESS    |  |  |
|  |                  |  |   | Audit        |  |                            |  |  |
|  |  [Upgrade]       |  |   |              |  |  SOC 2 Type II             |  |  |
|  |                  |  |   |     23       |  |  ████████████░░░░░░  72%   |  |  |
|  +------------------+  |   |              |  |                            |  |  |
|                        |   |   Urgent!    |  |  ISO 27001                 |  |  |
|                        |   |              |  |  ████████░░░░░░░░░░  45%   |  |  |
|                        |   +--------------+  |                            |  |  |
|                        |                      |  [View All Certifications] |  |  |
|                        |                      +----------------------------+  |  |
|                        |                                                      |  |
|                        |   RECENT ACTIVITY                                  |  |
|                        |   +------------------------------------------------+ |  |
|                        |   | ✓ Evidence uploaded to SOC 2 Control AC-1     | |  |
|                        |   | ✓ Assessment completed: Access Management     | |  |
|                        |   | ⚠️ Task due: Review firewall configuration     | |  |
|                        |   | ✓ New team member added to workspace          | |  |
|                        |   +------------------------------------------------+ |  |
|                        |                                                      |  |
|                        +------------------------------------------------------+
|                                                                                |
+================================================================================+
```

### Description

The Dashboard layout employs a classic sidebar-plus-main-content structure that scales well for complex applications while maintaining visual clarity. The top header bar spans the full width and contains the CertFast logo for consistent branding, alongside notification and user profile controls positioned on the right for quick access to account-related functions.

The left sidebar provides persistent navigation to all major sections of the platform. Navigation items include Dashboard (the current active section), Assessments, Evidence, Tasks, Calendar, Settings, and Help. A prominent Upgrade button at the bottom of the sidebar encourages free users to convert to paid plans. This vertical navigation pattern keeps all primary destinations visible without consuming main content area space.

The main content area displays four key metric cards arranged in a responsive grid. The Compliance Score card shows the overall percentage and trend indicator. The Assessments card displays active assessment count. The Evidence card tracks uploaded documents. The Days to Audit card creates urgency with a countdown and warning indicator. Below the metrics, a Certification Progress section uses progress bars to visualize completion status for each active certification, making it easy to see which areas need attention. The Recent Activity feed at the bottom provides a chronological log of important events and updates.

---

## Screen 3: Assessment Detail

The Assessment Detail page provides a focused workspace for completing individual compliance assessments. The design emphasizes clarity of current status, clear action items, and easy access to evidence upload functionality.

### Wireframe

```
+================================================================================+
|  [LOGO]                                           [🔔] [👤] Profile            |
+================================================================================+
|                                                                                |
|  +------------------+  +----------------------------------------------------+  |
|  |  📊 Dashboard    |  |                                                    |  |
|  |  📋 Assessments  |  |   [← Back to Assessments]                          |  |
|  |  📁 Evidence     |  |                                                    |  |
|  |  🎯 Tasks        |  |   ACCESS CONTROL ASSESSMENT                        |  |
|  +------------------+  |                                                    |  |
|                        |   +--------------------------------------------+     |  |
|                        |   | Status: 🔶 IN PROGRESS     Started: Mar 10   |     |  |
|                        |   | Due: Mar 25    Owner: Sarah Chen             |     |  |
|                        |   +--------------------------------------------+     |  |
|                        |                                                    |  |
|                        |   +--------------------------------------------+     |  |
|                        |   | EVIDENCE UPLOAD                              |     |  |
|                        |   |                                              |     |  |
|                        |   |   +------------------------------------+     |     |  |
|                        |   |   |                                    |     |     |  |
|                        |   |   |         [📤 Upload Icon]           |     |     |  |
|                        |   |   |                                    |     |     |  |
|                        |   |   |   Drag and drop files here         |     |     |  |
|                        |   |   |        or                          |     |     |  |
|                        |   |   |   [Browse Files]                   |     |     |  |
|                        |   |   |                                    |     |     |  |
|                        |   |   |   Supported: PDF, DOC, XLS, IMG    |     |     |  |
|                        |   |   +------------------------------------+     |     |  |
|                        |   |                                              |     |  |
|                        |   |   📄 access-policy-v2.pdf    [✓] Uploaded    |     |  |
|                        |   |   📄 user-access-matrix.xlsx [✓] Uploaded    |     |  |
|                        |   |   📄 onboarding-checklist.doc [⟳] Pending    |     |  |
|                        |   |                                              |     |  |
|                        |   +--------------------------------------------+     |  |
|                        |                                                    |  |
|                        |   +--------------------------------------------+     |  |
|                        |   | REQUIREMENTS CHECKLIST                       |     |  |
|                        |   |                                              |     |  |
|                        |   |   ☐ AC-1: Account Management                [?]  |  |
|                        |   |      Description: Processes for account      |     |  |
|                        |   |      creation, modification, and deletion    |     |  |
|                        |   |      ─────────────────────────────────────   |     |  |
|                        |   |                                              |     |  |
|                        |   |   ☑ AC-2: Access Enforcement                [?]  |  |
|                        |   |      ✓ Evidence: access-policy-v2.pdf        |     |  |
|                        |   |      ─────────────────────────────────────   |     |  |
|                        |   |                                              |     |  |
|                        |   |   ☐ AC-3: Separation of Duties              [?]  |  |
|                        |   |      Description: Conflict of interest       |     |  |
|                        |   |      prevention through role separation      |     |  |
|                        |   |      ─────────────────────────────────────   |     |  |
|                        |   |                                              |     |  |
|                        |   |   ☑ AC-4: Least Privilege                   [?]  |  |
|                        |   |      ✓ Evidence: user-access-matrix.xlsx     |     |  |
|                        |   |      ─────────────────────────────────────   |     |  |
|                        |   |                                              |     |  |
|                        |   |   ☐ AC-5: Unsuccessful Login Attempts       [?]  |  |
|                        |   |      Description: Failed authentication      |     |  |
|                        |   |      monitoring and response procedures      |     |  |
|                        |   |      ─────────────────────────────────────   |     |  |
|                        |   |                                              |     |  |
|                        |   |   [Save Progress]        [Submit Assessment]     |  |
|                        |   |                                              |     |  |
|                        |   +--------------------------------------------+     |  |
|                        |                                                    |  |
|                        +----------------------------------------------------+  |
|                                                                                |
+================================================================================+
```

### Description

The Assessment Detail page maintains consistent navigation with the Dashboard through the same top header and sidebar structure, ensuring users always know where they are in the application hierarchy. The main content area begins with a back button that returns users to the assessments list, reducing navigation friction when users need to switch between different assessments.

The assessment title appears prominently below the back navigation, followed by a status card that displays critical metadata. This card shows the current status using a color-coded indicator (orange for in progress), the start date, due date, and assigned owner. This summary information helps users immediately understand the assessment timeline and their responsibilities.

The Evidence Upload section provides a drag-and-drop interface for attaching supporting documentation. The upload zone accepts multiple file types and displays clear instructions. Below the upload area, a file list shows previously uploaded documents with their verification status, making it easy to track which evidence has been properly submitted and which items are still pending review.

The Requirements Checklist forms the core of the assessment interface. Each control item displays a checkbox for completion tracking, a control identifier and title, and a help icon for accessing detailed guidance. Completed items show the linked evidence file, while incomplete items display the requirement description. This layout allows assessors to work through controls systematically, marking items complete as they gather and attach the necessary evidence. Action buttons at the bottom enable users to save their progress or submit the completed assessment for review.

---

## Summary

These three wireframes establish the foundational user interface structure for the CertFast compliance platform. The Landing Page focuses on conversion and user acquisition, the Dashboard emphasizes information density and quick status assessment, and the Assessment Detail page prioritizes task completion and evidence management. Together, they form a cohesive user experience that guides users from initial discovery through active compliance management.

The ASCII format used in these wireframes prioritizes clarity and structural accuracy over visual polish. Each wireframe demonstrates careful attention to information hierarchy, navigation patterns, and interactive element placement. The descriptions accompanying each wireframe provide context for design decisions and explain how the layout supports user goals at each stage of the compliance journey.

---

*Document created: March 15, 2026*  
*Track: Design*  
*Role: UI Designer*
