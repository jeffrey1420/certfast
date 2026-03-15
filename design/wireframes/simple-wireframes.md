# CertFast - Simple Wireframes

This document contains ASCII/text-based wireframes for the core screens of the CertFast compliance management platform.

---

## Screen 1: Landing Page

The landing page serves as the primary entry point for potential customers. It features a clean, professional design that immediately communicates CertFast's value proposition as a streamlined compliance certification platform. The header maintains brand consistency with the logo positioned prominently alongside intuitive navigation. The hero section captures visitor attention with a compelling headline that addresses their pain points, supported by persuasive subtext that elaborates on the benefits. The call-to-action button is strategically placed to drive conversions, using contrasting colors to stand out. Below the hero section, three feature cards highlight key platform capabilities, each with an icon, title, and brief description. The footer provides essential links and builds trust through contact information and social proof elements.

```
+============================================================================+
|                                                                            |
|   [LOGO]  CertFast                    Home | Features | Pricing | Login   |
|                                                                            |
+============================================================================+
|                                                                            |
|                                                                            |
|                    STREAMLINE YOUR COMPLIANCE JOURNEY                      |
|                                                                            |
|          Simplify certification management with automated workflows,       |
|          evidence tracking, and real-time progress monitoring.             |
|                                                                            |
|                                                                            |
|                      [ Get Started Free ]                                  |
|                                                                            |
|                         Trusted by 500+ companies                          |
|                                                                            |
|                                                                            |
+============================================================================+
|                                                                            |
|   +-------------------+  +-------------------+  +-------------------+     |
|   |    [ICON]         |  |    [ICON]         |  |    [ICON]         |     |
|   |                   |  |                   |  |                   |     |
|   |  Automated        |  |  Evidence         |  |  Real-Time        |     |
|   |  Assessments      |  |  Management       |  |  Tracking         |     |
|   |                   |  |                   |  |                   |     |
|   |  Streamline your  |  |  Centralize all   |  |  Monitor progress |     |
|   |  certification    |  |  compliance docs  |  |  with intuitive   |     |
|   |  workflows with   |  |  in one secure    |  |  dashboards and   |     |
|   |  smart templates  |  |  location         |  |  notifications    |     |
|   |                   |  |                   |  |                   |     |
|   +-------------------+  +-------------------+  +-------------------+     |
|                                                                            |
+============================================================================+
|                                                                            |
|   About | Features | Pricing | Contact | Privacy | Terms of Service       |
|                                                                            |
|   © 2026 CertFast. All rights reserved.                                    |
|                                                                            |
+============================================================================+
```

### Landing Page Specifications
- **Header Height**: 72px with centered vertical alignment
- **Logo Position**: Left-aligned with 24px padding
- **Navigation**: Right-aligned with 32px gap between items
- **Hero Section**: Full-width, min-height 500px, vertically centered content
- **Headline**: Large typography (48px), bold weight, centered
- **CTA Button**: Primary brand color, 16px padding, rounded corners (8px)
- **Feature Cards**: Equal width (33.33%), 24px gap, card padding 32px
- **Card Shadow**: Subtle elevation for depth perception

---

## Screen 2: Dashboard

The dashboard is the central hub where users monitor their compliance status and manage ongoing certifications. The layout follows a classic sidebar navigation pattern that maximizes screen real estate for content while maintaining easy access to all platform features. The sidebar provides persistent navigation across all dashboard views, with clear visual hierarchy distinguishing primary and secondary menu items. The top header displays contextual information and user controls, including notifications and account settings. The main content area presents four key metric cards that provide at-a-glance insights into compliance health. Each metric card uses distinct visual indicators to communicate status effectively. Below the metrics, a prominent progress bar visualization shows the overall certification journey, breaking down completion by individual requirements. This design enables compliance officers to quickly assess priorities and track advancement toward certification goals.

```
+============================================================================+
|  SIDEBAR                        |  HEADER                                  |
|                                 |                                          |
|  [LOGO]                         |  Dashboard Overview    [🔔] [👤] Admin ▼ |
|                                 |                                          |
|  ─────────────────────────────  |  ──────────────────────────────────────  |
|                                 |                                          |
|  📊 Dashboard                   |  +----------------+----------------+     |
|                                 |  |  COMPLIANCE    |   ASSESSMENTS    |     |
|  ─────────────────────────────  |  |     SCORE      |                  |     |
|                                 |  |                |       12         |     |
|  NAVIGATION                     |  |      87%       |    In Progress   |     |
|                                 |  |                |                  |     |
|  📋 Assessments                 |  |   [███████░]   |   [View All →]   |     |
|  📁 Evidence Library            |  |                |                  |     |
|  📈 Reports                     |  +----------------+----------------+     |
|  ⚙️ Settings                    |                                          |
|                                 |  +----------------+----------------+     |
|  ─────────────────────────────  |  |    EVIDENCE    |   DAYS TO AUDIT  |     |
|                                 |  |                |                  |     |
|  📚 Resources                   |  |     45/60      |       23         |     |
|  ❓ Help & Support              |  |    Documents   |       Days       |     |
|                                 |  |   Uploaded     |    Remaining     |     |
|                                 |  |                |                  |     |
|                                 |  |  [Upload +]    |   [Schedule →]   |     |
|                                 |  |                |                  |     |
|                                 |  +----------------+----------------+     |
|                                 |                                          |
|                                 |  ──────────────────────────────────────  |
|                                 |                                          |
|                                 |  CERTIFICATION PROGRESS                  |
|                                 |                                          |
|                                 |  ISO 27001 Compliance Certification        |
|                                 |                                          |
|                                 |  [████████████████████░░░░░░░░░░░░] 67%   |
|                                 |                                          |
|                                 |  ┌─────────────────────────────────────┐  |
|                                 |  │ Requirements Completed: 24/36       │  |
|                                 |  │ Evidence Submitted: 20/24           │  |
|                                 |  │ Pending Review: 4                   │  |
|                                 |  │ Estimated Completion: Mar 28, 2026  │  |
|                                 |  └─────────────────────────────────────┘  |
|                                 |                                          |
|                                 |  [Continue Assessment]  [View Details →]   |
|                                 |                                          |
+============================================================================+
```

### Dashboard Specifications
- **Sidebar Width**: 260px fixed, full viewport height
- **Sidebar Background**: Subtle contrast from main content area
- **Menu Items**: 16px font size, 12px vertical padding, icon + text layout
- **Active State**: Left border accent or background highlight
- **Header Height**: 64px, bottom border separator
- **Metric Cards**: 2x2 grid layout, equal sizing, 24px gap
- **Card Internal Padding**: 24px
- **Progress Bar**: Full-width within container, 16px height, rounded ends
- **Progress Bar Segments**: Different colors for completed, in-progress, pending

---

## Screen 3: Assessment Detail

The assessment detail screen provides a focused workspace for managing individual compliance assessments. The layout prioritizes clarity and actionability, presenting all relevant information without overwhelming the user. At the top, a persistent back button enables quick navigation to the assessments list, while the assessment title clearly identifies the current context. The status badge provides immediate visual feedback on where the assessment stands in the workflow, using color coding to distinguish between different states like In Progress, Pending Review, or Complete. The evidence upload zone occupies a prominent position, recognizing that documentation is central to the compliance process. This area supports drag-and-drop functionality and provides clear instructions for accepted file formats. The checklist section breaks down complex requirements into manageable items, each with its own status indicator and evidence attachment capability. This granular approach helps users track exactly which requirements have been satisfied and which need attention, making the path to certification transparent and achievable.

```
+============================================================================+
|  SIDEBAR                        |  HEADER                                  |
|                                 |                                          |
|  [LOGO]                         |  [← Back to Assessments]    [👤] Admin ▼ |
|                                 |                                          |
|  📊 Dashboard                   |  ──────────────────────────────────────  |
|                                 |                                          |
|  ─────────────────────────────  |  ACCESS CONTROL POLICY ASSESSMENT        |
|                                 |                                          |
|  📋 Assessments  ← ACTIVE       |  ┌────────────────────┐                  |
|  📁 Evidence Library            |  │  🟡 IN PROGRESS    │                  |
|  📈 Reports                     |  │  Started: Mar 1    │                  |
|  ⚙️ Settings                    |  │  Due: Mar 30       │                  |
|                                 |  └────────────────────┘                  |
|  ─────────────────────────────  |                                          |
|                                 |  ──────────────────────────────────────  |
|  📚 Resources                   |  EVIDENCE UPLOAD                         |
|  ❓ Help & Support              |                                          |
|                                 |  +------------------------------------+  |
|                                 |  |                                    |  |
|                                 |  |         [📤 UPLOAD ICON]           |  |
|                                 |  |                                    |  |
|                                 |  |    Drag & drop files here or       |  |
|                                 |  |    click to browse                 |  |
|                                 |  |                                    |  |
|                                 |  |    Supported: PDF, DOCX, XLSX,     |  |
|                                 |  |    PNG, JPG (max 50MB each)        |  |
|                                 |  |                                    |  |
|                                 |  +------------------------------------+  |
|                                 |                                          |
|                                 |  ──────────────────────────────────────  |
|                                 |                                          |
|                                 |  REQUIREMENTS CHECKLIST                  |
|                                 |                                          |
|                                 |  ┌─────────────────────────────────────┐ |
|                                 |  │ ☐ 1. Access control policy defined  │ |
|                                 |  │    Status: Not Started              │ |
|                                 |  │    [Attach Evidence]                │ |
|                                 |  ├─────────────────────────────────────┤ |
|                                 |  │ ☐ 2. User access review process     │ |
|                                 |  │    Status: Not Started              │ |
|                                 |  │    [Attach Evidence]                │ |
|                                 |  ├─────────────────────────────────────┤ |
|                                 |  │ ☑ 3. Role-based access matrix       │ |
|                                 |  │    Status: Complete ✓               │ |
|                                 |  │    [📄 RBAC_Matrix_v2.pdf] [✏️] [🗑️]│ |
|                                 |  ├─────────────────────────────────────┤ |
|                                 |  │ 🟡 4. Privileged access procedures  │ |
|                                 |  │    Status: In Review                │ |
|                                 |  │    [📄 Privileged_Access_SOP.pdf]   │ |
|                                 |  │    [Reupload] [Mark Complete]       │ |
|                                 |  ├─────────────────────────────────────┤ |
|                                 |  │ ☐ 5. Access revocation process      │ |
|                                 |  │    Status: Not Started              │ |
|                                 |  │    [Attach Evidence]                │ |
|                                 |  └─────────────────────────────────────┘ |
|                                 |                                          |
|                                 |  ──────────────────────────────────────  |
|                                 |                                          |
|                                 |  [Save Progress]  [Submit for Review]    |
|                                 |                                          |
+============================================================================+
```

### Assessment Detail Specifications
- **Back Button**: Left-aligned with arrow icon, subtle styling
- **Title**: Large typography (32px), bold, clear hierarchy
- **Status Badge**: Right of title, pill shape, color-coded by state
- **Badge Colors**: 
  - In Progress: Yellow/Orange
  - Complete: Green
  - Pending Review: Blue
  - Overdue: Red
- **Upload Zone**: Dashed border, large touch target, centered icon
- **Upload Zone Hover**: Solid border, background highlight
- **Checklist Container**: Full-width, individual item separation
- **Checklist Item**: 64px min-height, checkbox left, content right
- **Item States**: Visual distinction between complete, in-progress, not-started
- **Action Buttons**: Bottom-aligned, primary action emphasized

---

## Design Principles

These wireframes adhere to the following design principles that guide the CertFast user experience:

### Clarity First
Every element serves a purpose. Information is presented in digestible chunks with clear visual hierarchy. Users should never wonder what action to take next or where to find critical information.

### Efficiency Matters
Compliance work is complex enough without confusing interfaces. These designs minimize clicks required for common tasks and place frequently used actions within easy reach. Smart defaults and progressive disclosure reduce cognitive load.

### Trust Through Transparency
Compliance is serious business. The designs communicate status clearly and honestly. Progress indicators, status badges, and audit trails build user confidence in the platform and their certification journey.

### Consistency Enables Mastery
Common patterns repeat across screens. Navigation stays in the same place, action buttons follow predictable patterns, and status indicators use consistent colors. Users learn the interface once and apply that knowledge everywhere.

### Mobile-Responsive Foundation
While these ASCII wireframes show desktop layouts, the underlying structure supports responsive adaptation. The sidebar collapses to a hamburger menu, grids reflow to single columns, and touch targets expand appropriately for mobile interaction.

---

## Next Steps

These wireframes provide the structural foundation for CertFast's user interface. The next phase involves applying the design system tokens (colors, typography, spacing) to transform these grayscale wireframes into high-fidelity mockups that reflect the brand identity and visual language defined in previous design track tasks.

Key considerations for high-fidelity implementation:
- Maintain the information architecture and layout proportions shown here
- Apply brand colors strategically to guide user attention
- Use typography to reinforce content hierarchy
- Ensure sufficient contrast for accessibility compliance (WCAG 2.1 AA)
- Add micro-interactions to enhance the user experience
- Validate responsive behavior across device breakpoints

---

*Document Version: 1.0*  
*Created: March 15, 2026*  
*Design Track: CertFast Wireframes*
