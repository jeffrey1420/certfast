# CertFast Typography System

## Overview

CertFast's typography reflects our brand personality: **technically precise yet approachable**, **modern yet trustworthy**. As a B2B SaaS platform serving technical founders, our type system must prioritize readability, hierarchy, and professional credibility while avoiding the sterile corporate feel of traditional compliance tools.

---

## Font Pairing Strategy

### Primary Pairing: Inter + Source Code Pro (RECOMMENDED)

This pairing balances modern SaaS aesthetics with technical credibility, perfectly suited for our developer-founder audience.

#### Inter — Primary Typeface

**Classification:** Sans-serif, Humanist Grotesque  
**Designer:** Rasmus Andersson (former Google, Figma)  
**License:** SIL Open Font License (free, commercial use)  
**Weights Used:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

**Why Inter:**
- **Designed for screens:** Optimized for UI and digital interfaces
- **Excellent readability:** High x-height, open apertures, clear distinctions
- **Technical feel:** Geometric precision without coldness
- **Extensive character set:** Supports 200+ languages including French/German
- **Variable font available:** Single file, infinite weights

**Use Cases:**
- All headings (H1-H6)
- Body text and paragraphs
- Navigation and UI labels
- Marketing copy
- Form labels and inputs

#### Source Code Pro — Monospace Accent

**Classification:** Monospace, Sans-serif  
**Designer:** Paul D. Hunt (Adobe)  
**License:** SIL Open Font License  
**Weights Used:** 400 (Regular), 600 (SemiBold)

**Why Source Code Pro:**
- **Developer familiarity:** Adobe's open-source programming font
- **Excellent distinction:** Clear differentiation between similar characters (0/O, 1/l/I)
- **Professional tone:** Technical without being intimidating
- **Perfect pairing:** Harmonizes visually with Inter

**Use Cases:**
- Inline code snippets
- API endpoints and parameters
- Technical documentation
- Console/log output displays
- Data table monospaced columns

---

## Alternative Pairings

### Option B: Plus Jakarta Sans + JetBrains Mono

**For:** More distinctive, slightly warmer brand personality  
**Trade-off:** Less "standard" for enterprise SaaS, but more memorable

| Use | Font |
|-----|------|
| Headlines | Plus Jakarta Sans (600, 700) |
| Body | Plus Jakarta Sans (400, 500) |
| Code | JetBrains Mono (400, 600) |

### Option C: Geist (Vercel) + Geist Mono

**For:** Cutting-edge, developer-native aesthetic  
**Trade-off:** Very new font (2023), less established recognition

| Use | Font |
|-----|------|
| All text | Geist Sans (400-700) |
| Code | Geist Mono (400, 600) |

---

## Type Scale

### Base Configuration

```css
:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Source Code Pro', 'SF Mono', Monaco, 'Cascadia Code', monospace;
  
  --font-size-base: 16px;
  --line-height-base: 1.6;
  --letter-spacing-base: -0.01em;
}
```

### Scale Specifications

| Token | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| **Display** | 48px (3rem) | 1.1 | -0.02em | 700 | Hero headlines |
| **H1** | 36px (2.25rem) | 1.2 | -0.02em | 700 | Page titles |
| **H2** | 30px (1.875rem) | 1.25 | -0.015em | 600 | Section headers |
| **H3** | 24px (1.5rem) | 1.3 | -0.01em | 600 | Subsection headers |
| **H4** | 20px (1.25rem) | 1.4 | -0.005em | 600 | Card titles |
| **H5** | 18px (1.125rem) | 1.4 | 0 | 600 | Small headers |
| **H6** | 16px (1rem) | 1.5 | 0 | 600 | Labels, captions |
| **Body Large** | 18px (1.125rem) | 1.6 | 0 | 400 | Lead paragraphs |
| **Body** | 16px (1rem) | 1.6 | 0 | 400 | Default text |
| **Body Small** | 14px (0.875rem) | 1.5 | 0 | 400 | Secondary text |
| **Caption** | 12px (0.75rem) | 1.5 | 0.01em | 400 | Fine print, metadata |
| **Overline** | 12px (0.75rem) | 1.5 | 0.1em | 600 | Labels, tags (uppercase) |

### Responsive Scale

**Desktop (≥1024px):** Full scale as specified above  
**Tablet (768px-1023px):** Display: 40px, H1: 32px, H2: 26px  
**Mobile (<768px):** Display: 32px, H1: 28px, H2: 24px

---

## Typography Patterns

### Headlines

**Page Title (H1)**
```
Font: Inter
Size: 36px
Weight: 700
Line-height: 1.2
Letter-spacing: -0.02em
Color: --color-slate-900
Margin-bottom: 24px
```

**Section Header (H2)**
```
Font: Inter
Size: 30px
Weight: 600
Line-height: 1.25
Letter-spacing: -0.015em
Color: --color-slate-900
Margin-bottom: 16px
```

**Card Title (H4)**
```
Font: Inter
Size: 20px
Weight: 600
Line-height: 1.4
Letter-spacing: -0.005em
Color: --color-slate-800
```

### Body Text

**Default Paragraph**
```
Font: Inter
Size: 16px
Weight: 400
Line-height: 1.6
Color: --color-slate-600
Margin-bottom: 16px
Max-width: 65ch (optimal reading)
```

**Lead Paragraph (Marketing)**
```
Font: Inter
Size: 18px
Weight: 400
Line-height: 1.6
Color: --color-slate-600
Margin-bottom: 24px
```

### UI Typography

**Button Labels**
```
Font: Inter
Size: 16px (primary), 14px (small)
Weight: 500
Letter-spacing: 0
Text-transform: none
Line-height: 1 (vertical centering handled by padding)
```

**Navigation Links**
```
Font: Inter
Size: 14px
Weight: 500
Color: --color-slate-600 (default), --color-primary-600 (active)
```

**Form Labels**
```
Font: Inter
Size: 14px
Weight: 500
Color: --color-slate-700
Margin-bottom: 6px
```

**Input Text**
```
Font: Inter
Size: 16px
Weight: 400
Color: --color-slate-900
Line-height: 1.5
```

### Code Typography

**Inline Code**
```
Font: Source Code Pro
Size: 0.9em (relative to parent)
Weight: 400
Background: --color-slate-100
Padding: 2px 6px
Border-radius: 4px
Color: --color-primary-700
```

Example: Use `GET /api/v1/compliance/status` to check compliance.

**Code Blocks**
```
Font: Source Code Pro
Size: 14px
Weight: 400
Line-height: 1.5
Background: --color-slate-900
Color: --color-slate-50
Padding: 16px
Border-radius: 8px
Overflow-x: auto
```

**API Endpoint Display**
```
Font: Source Code Pro
Size: 14px
Weight: 600 (method), 400 (path)
Color: --color-success-500 (GET), --color-primary-500 (POST), --color-warning-500 (PUT), --color-error-500 (DELETE)
```

Example: **GET** `/api/v1/frameworks/soc2/controls`

---

## Hierarchy & Spacing

### Vertical Rhythm

**Type Scale Modular Ratio:** 1.25 (Major Third)  
**Base Unit:** 4px  
**Line Height Base:** 1.6 (25.6px at 16px)

```
Spacing Scale:
4px  - xs
8px  - sm
12px - md
16px - base
24px - lg
32px - xl
48px - 2xl
64px - 3xl
```

### Heading Hierarchy

```
H1 (36px)
  ↓ 24px gap
H2 (30px)
  ↓ 16px gap
H3 (24px)
  ↓ 12px gap
H4 (20px)
  ↓ 12px gap
Body (16px)
  ↓ 16px gap
Body (16px)
```

### Content Spacing

| Element | Margin Top | Margin Bottom |
|---------|------------|---------------|
| H1 | 0 | 24px |
| H2 | 48px | 16px |
| H3 | 32px | 12px |
| H4 | 24px | 12px |
| Paragraph | 0 | 16px |
| List | 0 | 16px |
| Code Block | 16px | 16px |

---

## Special Typography Treatments

### Marketing Headlines

**Gradient Text (Hero)**
```css
.hero-headline {
  font: 700 48px/1.1 Inter;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #2563EB 0%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Stats/Numbers**
```
Font: Inter
Size: 48px (large), 32px (medium)
Weight: 700
Color: --color-primary-600
Tabular nums: enabled (for alignment)
```

Example: 90 days, 95% pass rate, €199/mo

### Data Tables

**Table Headers**
```
Font: Inter
Size: 12px
Weight: 600
Text-transform: uppercase
Letter-spacing: 0.05em
Color: --color-slate-500
```

**Table Cells**
```
Font: Inter
Size: 14px
Weight: 400
Color: --color-slate-700
```

**Numeric Columns (Monospace)**
```
Font: Source Code Pro
Size: 14px
Weight: 400
Font-feature-settings: 'tnum' 1;
Text-align: right;
```

### Pricing Display

**Price Large**
```
Font: Inter
Size: 48px
Weight: 700
Color: --color-slate-900
Font-feature-settings: 'tnum' 1;
```

**Currency Symbol**
```
Font: Inter
Size: 24px
Weight: 600
Vertical-align: super;
Color: --color-slate-500;
```

**Period (/month)**
```
Font: Inter
Size: 16px
Weight: 400
Color: --color-slate-500;
```

Example: **€**199**/month**

---

## Web Font Loading

### Google Fonts Implementation

```html
<!-- Preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load Inter and Source Code Pro -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet">
```

### Font Display Strategy

```css
/* Prevent FOUT (Flash of Unstyled Text) */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  /* ... */
}
```

### Fallback Stack

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

code, pre, kbd {
  font-family: 'Source Code Pro', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
}
```

---

## Accessibility Guidelines

### Minimum Sizes

| Element | Minimum Size | Notes |
|---------|--------------|-------|
| Body text | 16px | Never smaller for main content |
| Form inputs | 16px | Prevents iOS zoom on focus |
| Small text | 12px | Only for metadata/fine print |
| Button text | 14px | Maintain tap target size |

### Line Length

**Optimal reading width:** 45-75 characters  
**Maximum width:** 90 characters  
**Implementation:**
```css
.article-content {
  max-width: 65ch;
}
```

### Contrast

All text must meet WCAG 2.1 AA standards:
- Normal text (16px): 4.5:1 minimum contrast
- Large text (18px+ bold, 24px+ normal): 3:1 minimum contrast

### Dynamic Type (iOS)

Respect user font size preferences:
```css
body {
  font-size: 16px; /* Base */
}

@supports (font: -apple-system-body) {
  body {
    font: -apple-system-body; /* Respects iOS settings */
  }
}
```

---

## Implementation Checklist

- [ ] Web fonts loaded with `font-display: swap`
- [ ] Fallback fonts specified for all font families
- [ ] Type scale implemented in CSS/Tailwind
- [ ] Responsive adjustments for mobile
- [ ] Code font distinct from body font
- [ ] Tabular numbers enabled for data
- [ ] Maximum line lengths enforced
- [ ] Contrast ratios verified

---

*Document Version: 1.0*
*Created: March 15, 2026*
*Author: Brand Designer*
*Status: Brand Foundation - Sprint #1*
*Fonts: Inter + Source Code Pro*
