# CertFast - Simple Wireframes

This document contains ASCII/text-based wireframes for the core screens of the CertFast compliance platform.

---

## Screen 1: Landing Page

The landing page serves as the entry point for potential customers, showcasing CertFast's value proposition and key features in a clean, professional layout.

```
+======================================================================+
|                                                                      |
|   [LOGO] CertFast                 Features | Pricing | About | Login |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|                                                                      |
|                                                                      |
|              Simplify Your Compliance Journey                        |
|                                                                      |
|        Streamline ISO 27001, SOC 2, and GDPR certifications          |
|        with intelligent automation and guided assessments.           |
|                                                                      |
|                     [ Get Started Free ]                             |
|                                                                      |
|                                                                      |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|   +-------------------+  +-------------------+  +----------------+   |
|   |                   |  |                   |  |                |   |
|   |   [Chart Icon]    |  |   [Shield Icon]   |  |  [Clock Icon]  |   |
|   |                   |  |                   |  |                |   |
|   | Automated         |  | Risk Assessment   |  |  Fast Track    |   |
|   | Evidence          |  | & Scoring         |  |  Certification |   |
|   | Collection        |  |                   |  |                |   |
|   |                   |  | AI-powered risk   |  |  Reduce time   |   |
|   | Gather and        |  | analysis with     |  |  to audit by   |   |
|   | organize proof    |  | visual dashboards |  |  up to 60%     |   |
|   | automatically.    |  | and insights.     |  |                |   |
|   |                   |  |                   |  |                |   |
|   +-------------------+  +-------------------+  +----------------+   |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|   © 2026 CertFast    Privacy Policy    Terms of Service    Contact   |
|                                                                      |
+======================================================================+
```

**Description (50 words):**
The landing page features a clean header with the CertFast logo and primary navigation. The hero section prominently displays the main headline with a supporting subtext and a clear call-to-action button. Three feature cards below highlight key product benefits: automated evidence collection, risk assessment capabilities, and fast-track certification timelines.

---

## Screen 2: Dashboard

The dashboard provides users with an overview of their compliance status, displaying key metrics and progress indicators at a glance.

```
+================================================================================+
|                                                                                |
|  [LOGO]                    Dashboard    Assessments    Reports    Settings     |
|                                                                                |
|  +------------+                                                      [User ▼]  |
|  |  Overview  |                                                                 |
|  |  Assess.   |  +----------------------------------------------------------+  |
|  |  Evidence  |  |  Welcome back, Alex!                                     |  |
|  |  Reports   |  |  Here's your compliance overview                         |  |
|  |  Team      |  +----------------------------------------------------------+  |
|  |  Settings  |                                                                 |
|  +------------+  +------------------+  +------------------+  +----------------+|
|                  |                  |  |                  |  |                ||
|                  |   Compliance     |  |   Assessments    |  |   Evidence     ||
|                  |     Score        |  |                  |  |                ||
|                  |                  |  |                  |  |                ||
|                  |       87%        |  |       12         |  |      45/60     ||
|                  |                  |  |   In Progress    |  |   Uploaded     ||
|                  |  [#######---]    |  |                  |  |                ||
|                  |   +8% vs last    |  |  5 Due Soon      |  |  15 Pending    ||
|                  |     month        |  |                  |  |                ||
|                  +------------------+  +------------------+  +----------------+|
|                                                                                |
|                  +--------------------------------------------------------+    |
|                  |                  Days to Audit: 45                     |    |
|                  |                                                        |    |
|                  |   ISO 27001 Certification Progress                     |    |
|                  |                                                        |    |
|                  |   [████████████████████████████████████------------]   |    |
|                  |   0%                                    75%      100%  |    |
|                  |                                                        |    |
|                  |   ✓ Policies Documented    ✓ Risk Assessment          |    |
|                  |   ✓ Access Controls        ⏳ Evidence Review          |    |
|                  |   ✓ Incident Response      ⏳ Internal Audit           |    |
|                  |                                                        |    |
|                  +--------------------------------------------------------+    |
|                                                                                |
|                  +--------------------------------------------------------+    |
|                  | Recent Activity                                          |    |
|                  | • Evidence uploaded: "Firewall Config" (2 hours ago)     |    |
|                  | • Assessment completed: "Access Control Review"          |    |
|                  | • New requirement added: ISO 27001:A.12.1.1             |    |
|                  +--------------------------------------------------------+    |
|                                                                                |
+================================================================================+
```

**Description (50 words):**
The dashboard layout includes a sidebar for navigation and a top header with user menu. Four metric cards display key data points: overall compliance score with trend indicator, active assessments count with due-soon warnings, and evidence upload progress. A progress bar shows certification advancement with completed and pending milestones listed below.

---

## Screen 3: Assessment Detail

This screen allows users to view and complete individual assessment requirements with evidence upload capabilities.

```
+================================================================================+
|                                                                                |
|  [LOGO]                    Dashboard    Assessments    Reports    Settings     |
|                                                                                |
|  +------------+                                                      [User ▼]  |
|  |  Overview  |                                                                 |
|  |  Assess.   |  +----------------------------------------------------------+  |
|  |  Evidence  |  |  [← Back to Assessments]                                 |  |
|  +------------+  +----------------------------------------------------------+  |
|                                                                                |
|                  +--------------------------------------------------------+    |
|                  |  Access Control Assessment                             |    |
|                  |  [In Progress]                                         |    |
|                  |  ISO 27001:A.9 - Information Access Management          |    |
|                  +--------------------------------------------------------+    |
|                                                                                |
|                  +--------------------------------------------------------+    |
|                  | Evidence Upload Zone                                   |    |
|                  |                                                        |    |
|                  |              ┌─────────────────────┐                   |    |
|                  |              │                     │                   |    |
|                  |              │    [Cloud Icon]     │                   |    |
|                  |              │                     │                   |    |
|                  |              │   Drag & drop or    │                   |    |
|                  |              │   click to upload   │                   |    |
|                  |              │                     │                   |    |
|                  |              │   PDF, DOCX, PNG,   │                   |    |
|                  |              │   JPG up to 50MB    │                   |    |
|                  |              │                     │                   |    |
|                  |              └─────────────────────┘                   |    |
|                  |                                                        |    |
|                  |   [Browse Files]                                       |    |
|                  |                                                        |    |
|                  |   Uploaded Files:                                      |    |
|                  |   ✓ access_policy_v2.pdf        2.3 MB    Just now    |    |
|                  |   ✓ user_role_matrix.xlsx       156 KB    2 hours ago |    |
|                  |   ⏳ access_review_log.csv      45 KB     Uploading...|    |
|                  |                                                        |    |
|                  +--------------------------------------------------------+    |
|                                                                                |
|                  +--------------------------------------------------------+    |
|                  | Requirements Checklist                                 |    |
|                  |                                                        |    |
|                  |   ✓ A.9.1.1 Access control policy                      |    |
|                  |     Document describing access control policy           |    |
|                  |     Evidence: access_policy_v2.pdf                      |    |
|                  |                                                        |    |
|                  |   ✓ A.9.2.1 User registration and de-registration      |    |
|                  |     Procedures for adding and removing users            |    |
|                  |     Evidence: user_role_matrix.xlsx                     |    |
|                  |                                                        |    |
|                  |   ⏳ A.9.2.2 User access provisioning                    |    |
|                  |     Privilege allocation and modification procedures    |    |
|                  |     Status: Pending evidence                            |    |
|                  |                                                        |    |
|                  |   ⬚ A.9.2.3 Management of secret authentication info   |    |
|                  |     Password and credential management policies         |    |
|                  |     Status: Not started                                 |    |
|                  |                                                        |    |
|                  |   ⏳ A.9.2.4 Review of user access rights               |    |
|                  |     Regular access review process documentation         |    |
|                  |     Status: Pending evidence                            |    |
|                  |                                                        |    |
|                  |   ⏳ A.9.2.5 Removal of access rights                    |    |
|                  |     Procedure for revoking access upon termination      |    |
|                  |     Status: Pending evidence                            |    |
|                  |                                                        |    |
|                  +--------------------------------------------------------+    |
|                                                                                |
|                  [Save Progress]                    [Submit Assessment]        |
|                                                                                |
+================================================================================+
```

**Description (50 words):**
The assessment detail page includes a back navigation button and status badge indicating progress. An evidence upload zone supports drag-and-drop functionality with file type and size guidelines. Below, a checklist displays all requirements with visual indicators for completed, in-progress, and pending items, along with linked evidence documents for quick reference.

---

## Design Notes

These wireframes establish the foundational layout and structure for CertFast's core user experience. The design prioritizes:

1. **Clarity**: Each screen has a clear visual hierarchy guiding users to key actions
2. **Efficiency**: Information is organized to minimize clicks for common tasks
3. **Progress Visibility**: Users can easily track their compliance status and next steps

The ASCII representations above serve as a blueprint for the high-fidelity designs, ensuring alignment between UX intent and visual implementation.

---

*Document Version: 1.0*
*Created: March 15, 2026*
