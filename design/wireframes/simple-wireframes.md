# CertFast - Simple Wireframes

## Overview
This document contains ASCII/text-based wireframes for three core screens of the CertFast ISO 42001 compliance platform. These wireframes illustrate the layout, structure, and key UI elements for each screen.

---

## Screen 1: Landing Page

The landing page serves as the primary entry point for potential customers. It features a clean, professional design that establishes trust and communicates CertFast's value proposition for ISO 42001 compliance. The header provides consistent navigation across the site, while the hero section immediately captures attention with a compelling headline and clear call-to-action. The three feature cards highlight the platform's core benefits: streamlined compliance, automated evidence collection, and expert guidance. The footer contains essential links and legal information, completing the professional presentation that encourages visitors to sign up or learn more about the platform.

```
+--------------------------------------------------------------------------+
|                                                                          |
|   [CERTFAST LOGO]        Products    Pricing    Resources    [Sign In]   |
|                                                                          |
+--------------------------------------------------------------------------+
|                                                                          |
|                                                                          |
|                    Achieve ISO 42001 Compliance                          |
|                         With Confidence                                  |
|                                                                          |
|          Streamline your AI governance certification journey with        |
|              automated evidence collection and expert guidance           |
|                                                                          |
|                        [  Get Started Free  ]                            |
|                                                                          |
|                                                                          |
+--------------------------------------------------------------------------+
|                                                                          |
|   +-------------------+  +-------------------+  +-------------------+   |
|   |                   |  |                   |  |                   |   |
|   |   [ICON]          |  |   [ICON]          |  |   [ICON]          |   |
|   |                   |  |                   |  |                   |   |
|   |   Streamlined     |  |   Automated       |  |   Expert          |   |
|   |   Compliance      |  |   Evidence        |  |   Guidance        |   |
|   |                   |  |   Collection      |  |                   |   |
|   |   Simplify your   |  |   Gather and      |  |   Access to       |   |
|   |   certification   |  |   organize all    |  |   compliance      |   |
|   |   process with    |  |   required        |  |   experts and     |   |
|   |   step-by-step    |  |   documentation   |  |   best practices  |   |
|   |   guidance        |  |   automatically   |  |                   |   |
|   |                   |  |                   |  |                   |   |
|   +-------------------+  +-------------------+  +-------------------+   |
|                                                                          |
+--------------------------------------------------------------------------+
|                                                                          |
|   About Us   |   Privacy Policy   |   Terms of Service   |   Contact    |
|                                                                          |
|                    © 2024 CertFast. All rights reserved.                 |
|                                                                          |
+--------------------------------------------------------------------------+
```

---

## Screen 2: Dashboard

The dashboard is the central hub where users monitor their compliance progress and access all platform features. The sidebar navigation provides quick access to different sections including assessments, evidence management, documentation, and settings. The top header displays the user's profile and notification center. The main content area features four metric cards that give an at-a-glance overview of compliance health: Compliance Score shows overall readiness, Assessments tracks active evaluation items, Evidence displays the count of uploaded documentation, and Days to Audit counts down to the certification deadline. Below the metrics, a prominent progress bar visualizes the certification journey, showing completed, in-progress, and pending milestones. This dashboard design prioritizes clarity and actionable insights, enabling compliance managers to quickly identify areas requiring attention.

```
+--------------------------------------------------------------------------+
|                                                                          |
|  [LOGO]                                           [🔔]  [👤 User ▼]      |
|                                                                          |
+------+-------------------------------------------------------------------+
|      |                                                                   |
|  📊  |   COMPLIANCE DASHBOARD                                            |
|      |                                                                   |
|  📋  |   +----------------+  +----------------+  +----------------+     |
|      |   |                |  |                |  |                |     |
| Assess|   |  COMPLIANCE    |  |  ASSESSMENTS   |  |    EVIDENCE    |     |
|      |   |    SCORE       |  |                |  |                |     |
|  📁  |   |                |  |                |  |                |     |
|      |   |      78%       |  |      24        |  |      156       |     |
| Evid.|   |                |  |                |  |                |     |
|      |   |   [████░░░░]   |  |   In Progress  |  |    Uploaded    |     |
|  📄  |   |                |  |                |  |                |     |
|      |   +----------------+  +----------------+  +----------------+     |
| Docs |                                                                   |
|      |   +----------------+                                                |
|  ⚙️  |   |                |                                                |
|      |   |  DAYS TO AUDIT |                                                |
| Sett.|   |                |                                                |
|      |   |      45        |                                                |
|      |   |                |                                                |
|      |   |     days       |                                                |
|      |   |   remaining    |                                                |
|      |   |                |                                                |
|      |   +----------------+                                                |
|      |                                                                   |
|      |   CERTIFICATION PROGRESS                                            |
|      |                                                                   |
|      |   +--------------------------------------------------------+      |
|      |   |  [✓] Account Setup  →  [✓] Initial Assessment  →         |      |
|      |   |  [●] Gap Analysis  →  [○] Evidence Collection  →         |      |
|      |   |  [○] Documentation  →  [○] Final Audit                   |      |
|      |   +--------------------------------------------------------+      |
|      |                                                                   |
|      |   [View Detailed Roadmap]                                         |
|      |                                                                   |
+------+-------------------------------------------------------------------+
```

---

## Screen 3: Assessment Detail

The assessment detail page provides a focused view for completing individual compliance requirements. The page header includes a back button for easy navigation to the assessment list, followed by the assessment title that clearly identifies which requirement is being evaluated. The status badge prominently displays the current state—either "In Progress" or "Completed"—using distinct colors for quick visual recognition. The evidence upload zone offers a drag-and-drop interface where users can attach supporting documentation, with visual feedback showing the upload area. Below that, the checklist of requirements breaks down the assessment into actionable items that can be marked complete as the user works through them. Each checklist item has a checkbox and descriptive text explaining what needs to be addressed. This design ensures compliance officers have all necessary information and tools in one place to efficiently complete assessments and gather the required evidence for ISO 42001 certification.

```
+--------------------------------------------------------------------------+
|                                                                          |
|  [LOGO]                                           [🔔]  [👤 User ▼]      |
|                                                                          |
+------+-------------------------------------------------------------------+
|      |                                                                   |
|  📊  |   [← Back to Assessments]                                         |
|      |                                                                   |
|  📋  |                                                                   |
|      |   AI Risk Assessment - Governance Control 4.2.1                   |
| Assess|                                                                   |
|      |   [IN PROGRESS]                                                   |
|  📁  |                                                                   |
|      |   +--------------------------------------------------------+      |
| Evid.|   |                                                        |      |
|      |   |              EVIDENCE UPLOAD ZONE                      |      |
|  📄  |   |                                                        |      |
|      |   |              [    📤    ]                              |      |
| Docs |   |                                                        |      |
|      |   |         Drag & drop files here                         |      |
|  ⚙️  |   |         or click to browse                             |      |
|      |   |                                                        |      |
| Sett.|   |         Supported: PDF, DOCX, PNG, JPG (max 50MB)      |      |
|      |   |                                                        |      |
|      |   +--------------------------------------------------------+      |
|      |                                                                   |
|      |   UPLOADED EVIDENCE                                               |
|      |   +--------------------------------------------------------+      |
|      |   | [📄] Risk_Assessment_Matrix_v2.pdf      [✓] Verified  |      |
|      |   | [📄] Governance_Framework.docx          [⏳] Pending  |      |
|      |   +--------------------------------------------------------+      |
|      |                                                                   |
|      |   REQUIREMENTS CHECKLIST                                          |
|      |                                                                   |
|      |   +--------------------------------------------------------+      |
|      |   |                                                        |      |
|      |   |   ☐ Establish AI governance framework documentation    |      |
|      |   |     Define roles, responsibilities, and accountability |      |
|      |                                                        |      |
|      |   |   ☐ Document AI risk assessment methodology            |      |
|      |   |     Include risk scoring and mitigation strategies     |      |
|      |                                                        |      |
|      |   |   ☑ Define AI system inventory and categorization      |      |
|      |   |     List all AI systems with risk classifications        |      |
|      |                                                        |      |
|      |   |   ☐ Implement stakeholder consultation process         |      |
|      |   |     Document feedback collection and integration         |      |
|      |                                                        |      |
|      |   |   ☐ Establish monitoring and review procedures         |      |
|      |   |     Define KPIs and periodic review schedule             |      |
|      |                                                        |      |
|      |   +--------------------------------------------------------+      |
|      |                                                                   |
|      |   [Save Progress]              [Mark Complete]                    |
|      |                                                                   |
+------+-------------------------------------------------------------------+
```

---

## Design Notes

### Visual Hierarchy
Each wireframe follows a consistent visual hierarchy: header at the top for branding and primary navigation, main content area in the center for key information and actions, and supporting elements arranged by importance. This ensures users can quickly locate critical functions.

### Navigation Patterns
- **Landing Page**: Horizontal top navigation for marketing flow
- **Dashboard**: Vertical sidebar for persistent access to tools
- **Assessment Detail**: Breadcrumb-style back button for context preservation

### Responsive Considerations
While these wireframes show desktop layouts, the designs are intended to be responsive. The card-based layouts and modular components will stack vertically on mobile devices, maintaining usability across screen sizes.

### Accessibility
All wireframes include clear labels, sufficient spacing between interactive elements, and status indicators that don't rely solely on color. The checklist items have clear hit targets, and the upload zone provides multiple interaction methods.

---

*Document Version: 1.0*  
*Last Updated: March 15, 2026*  
*Design Track: CertFast Wireframes*
