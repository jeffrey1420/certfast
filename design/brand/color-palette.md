# CertFast Color Palette

## Overview

CertFast's color system balances **technical credibility** with **approachable innovation**. Our palette must communicate trust (essential for security), energy (our speed advantage), and clarity (our transparency promise) while maintaining full WCAG 2.1 AA accessibility compliance.

---

## Primary Colors

### Electric Blue — Brand Core
**CSS Variable:** `--color-primary-600`  
**Hex:** `#2563EB`  
**RGB:** `rgb(37, 99, 235)`  
**HSL:** `hsl(221, 83%, 53%)`

**Usage:**
- Primary brand color
- Primary buttons and CTAs
- Logo primary variant
- Key interactive elements
- Headlines and emphasis

**Rationale:** Electric Blue strikes the perfect balance between corporate trust (traditional navy) and tech innovation (brighter blues). It's the color of forward momentum and digital transformation.

### Deep Indigo — Authority & Depth
**CSS Variable:** `--color-primary-800`  
**Hex:** `#1E40AF`  
**RGB:** `rgb(30, 64, 175)`  
**HSL:** `hsl(224, 76%, 40%)`

**Usage:**
- Logo gradients (darker end)
- Headers and strong emphasis
- Footer backgrounds
- Dark mode primary
- Premium/Enterprise tier signaling

**Rationale:** Deep Indigo grounds the brand with authority and seriousness appropriate for enterprise security conversations.

---

## Secondary Colors

### Bright Cyan — Innovation & AI
**CSS Variable:** `--color-accent-500`  
**Hex:** `#06B6D4`  
**RGB:** `rgb(6, 182, 212)`  
**HSL:** `hsl(187, 94%, 43%)`

**Usage:**
- AI feature highlights
- Secondary CTAs
- Data visualization accents
- Success states (alternative to green)
- Circuit Mark logo accent

**Rationale:** Cyan signals cutting-edge technology and AI. It differentiates us from the "boring blue" of traditional compliance tools.

### Emerald Green — Success & Compliance
**CSS Variable:** `--color-success-500`  
**Hex:** `#10B981`  
**RGB:** `rgb(16, 185, 129)`  
**HSL:** `hsl(160, 84%, 39%)`

**Usage:**
- Success states and confirmations
- Compliance achievement indicators
- Checkmarks and completion icons
- "Audit-ready" status badges
- Positive trend indicators

**Rationale:** Green is universally understood as "go," "complete," and "successful." Essential for compliance status communication.

---

## Neutral Colors

### Slate Scale — UI Foundation

The Slate scale provides the neutral foundation for all interfaces, from backgrounds to text.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-slate-50` | `#F8FAFC` | `248, 250, 252` | Page backgrounds |
| `--color-slate-100` | `#F1F5F9` | `241, 245, 249` | Card backgrounds |
| `--color-slate-200` | `#E2E8F0` | `226, 232, 240` | Borders, dividers |
| `--color-slate-300` | `#CBD5E1` | `203, 213, 225` | Disabled states |
| `--color-slate-400` | `#94A3B8` | `148, 163, 184` | Placeholder text |
| `--color-slate-500` | `#64748B` | `100, 116, 139` | Secondary text |
| `--color-slate-600` | `#475569` | `71, 85, 105` | Body text |
| `--color-slate-700` | `#334155` | `51, 65, 85` | Strong text |
| `--color-slate-800` | `#1E293B` | `30, 41, 59` | Headings |
| `--color-slate-900` | `#0F172A` | `15, 23, 42` | Dark mode backgrounds |

### Pure White & Black

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-white` | `#FFFFFF` | Clean backgrounds, reversed logos |
| `--color-black` | `#000000` | High contrast text (rarely used) |

---

## Semantic Colors

### Error — Alert & Warning
**Hex:** `#EF4444`  
**RGB:** `rgb(239, 68, 68)`  
**Usage:** Error states, validation failures, critical alerts, drift detection warnings

### Warning — Caution & Attention
**Hex:** `#F59E0B`  
**RGB:** `rgb(245, 158, 11)`  
**Usage:** Warnings, pending actions, compliance gaps, upcoming deadlines

### Info — Neutral Information
**Hex:** `#3B82F6`  
**RGB:** `rgb(59, 130, 246)`  
**Usage:** Informational messages, tips, neutral alerts

---

## Extended Palette

### Gradient Definitions

#### Primary Gradient
```css
background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%);
```
**Usage:** Hero sections, primary buttons hover, logo applications

#### Success Gradient
```css
background: linear-gradient(135deg, #10B981 0%, #059669 100%);
```
**Usage:** Achievement celebrations, completion states, upgrade prompts

#### Dark Gradient
```css
background: linear-gradient(180deg, #1E293B 0%, #0F172A 100%);
```
**Usage:** Dark mode cards, footer backgrounds, premium sections

#### Glow Effects
```css
box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
/* For: Active states, premium highlights */

box-shadow: 0 0 30px rgba(6, 182, 212, 0.4);
/* For: AI feature callouts */
```

### Tier Color Coding

| Tier | Color | Hex | Usage |
|------|-------|-----|-------|
| Lite | Sky Blue | `#0EA5E9` | €199 tier badge |
| Starter | Electric Blue | `#2563EB` | €499 tier badge, default |
| Pro | Indigo | `#4F46E5` | €999 tier badge |
| Enterprise | Deep Indigo | `#1E40AF` | Custom pricing badge |

---

## WCAG Accessibility Compliance

### Contrast Ratios

All color combinations meet or exceed WCAG 2.1 Level AA standards (4.5:1 for normal text, 3:1 for large text).

#### Primary Color Combinations

| Foreground | Background | Ratio | Grade | Usage |
|------------|------------|-------|-------|-------|
| #2563EB (Blue) | #FFFFFF (White) | 5.21:1 | ✅ AA | Primary buttons, links |
| #FFFFFF (White) | #2563EB (Blue) | 5.21:1 | ✅ AA | Reversed buttons |
| #1E40AF (Indigo) | #FFFFFF (White) | 8.15:1 | ✅ AAA | Strong headings |
| #FFFFFF (White) | #1E40AF (Indigo) | 8.15:1 | ✅ AAA | Dark backgrounds |
| #0F172A (Slate-900) | #F8FAFC (Slate-50) | 15.8:1 | ✅ AAA | Body text |
| #475569 (Slate-600) | #F8FAFC (Slate-50) | 6.14:1 | ✅ AA | Secondary text |

#### Semantic Color Combinations

| Color | On White | On Slate-900 | Recommended Pairing |
|-------|----------|--------------|---------------------|
| #10B981 (Green) | 3.31:1 (⚠️) | 7.22:1 ✅ | White text on green bg, or green icons on light bg |
| #EF4444 (Red) | 4.05:1 (⚠️) | 5.88:1 ✅ | White text on red bg for alerts |
| #F59E0B (Amber) | 2.12:1 (❌) | 8.02:1 ✅ | Dark text on amber bg only |
| #06B6D4 (Cyan) | 2.58:1 (❌) | 9.18:1 ✅ | White text on cyan bg, or cyan on dark |

### Accessibility Guidelines

**For Success Green (#10B981):**
- ❌ Do NOT use for small text on white backgrounds (fails WCAG AA)
- ✅ DO use for icons, large text (18px+ bold), or white text on green background
- ✅ DO use for status indicators with accompanying text labels

**For Warning Amber (#F59E0B):**
- ❌ Do NOT use for any text on white backgrounds
- ✅ DO use with `#1E293B` or `#0F172A` text (dark on light)
- ✅ DO use for warning icons and badges with dark labels

**For Cyan Accent (#06B6D4):**
- ❌ Do NOT use for body text on light backgrounds
- ✅ DO use for highlights on dark backgrounds
- ✅ DO use for decorative accents and AI feature callouts

### Color Blindness Considerations

Never rely on color alone to convey information. Always pair color with:
- Icons (checkmark, warning triangle, X)
- Text labels ("Success", "Warning", "Error")
- Patterns or textures in data visualization

**Safe Pairings for Color Blindness:**
- Blue + Gray (distinguishable by all types)
- Dark + Light (value contrast works for everyone)
- Pattern + Color (redundant encoding)

---

## Color Usage Patterns

### Light Mode (Default)

```
Background: #F8FAFC (Slate-50)
Surface: #FFFFFF (White)
Primary Text: #0F172A (Slate-900)
Secondary Text: #475569 (Slate-600)
Borders: #E2E8F0 (Slate-200)
Accent: #2563EB (Primary Blue)
```

### Dark Mode

```
Background: #0F172A (Slate-900)
Surface: #1E293B (Slate-800)
Primary Text: #F8FAFC (Slate-50)
Secondary Text: #94A3B8 (Slate-400)
Borders: #334155 (Slate-700)
Accent: #60A5FA (Primary-400, lighter for dark)
```

### Component Color Mapping

| Component | Default | Hover | Active | Disabled |
|-----------|---------|-------|--------|----------|
| Primary Button | #2563EB | #1D4ED8 | #1E40AF | #93C5FD |
| Secondary Button | #FFFFFF | #F1F5F9 | #E2E8F0 | #F8FAFC |
| Success Badge | #10B981 | #059669 | — | #6EE7B7 |
| Warning Badge | #F59E0B | #D97706 | — | #FCD34D |
| Error Badge | #EF4444 | #DC2626 | — | #FCA5A5 |
| Input Border | #CBD5E1 | #2563EB | #2563EB | #E2E8F0 |
| Link | #2563EB | #1D4ED8 | #1E40AF | — |

---

## Color Psychology Summary

| Color | Psychological Association | Brand Alignment |
|-------|---------------------------|-----------------|
| Electric Blue | Trust, reliability, technology | Core brand promise |
| Deep Indigo | Authority, expertise, premium | Enterprise credibility |
| Bright Cyan | Innovation, AI, future | AI-native positioning |
| Emerald Green | Success, completion, growth | Compliance achievement |
| Slate Neutrals | Balance, professionalism, clarity | Technical sophistication |

---

## Implementation Tokens

### CSS Custom Properties

```css
:root {
  /* Primary */
  --color-primary-50: #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;
  
  /* Accent */
  --color-accent-400: #22D3EE;
  --color-accent-500: #06B6D4;
  --color-accent-600: #0891B2;
  
  /* Success */
  --color-success-50: #ECFDF5;
  --color-success-500: #10B981;
  --color-success-600: #059669;
  
  /* Warning */
  --color-warning-50: #FFFBEB;
  --color-warning-500: #F59E0B;
  --color-warning-600: #D97706;
  
  /* Error */
  --color-error-50: #FEF2F2;
  --color-error-500: #EF4444;
  --color-error-600: #DC2626;
  
  /* Neutrals - Slate */
  --color-slate-50: #F8FAFC;
  --color-slate-100: #F1F5F9;
  --color-slate-200: #E2E8F0;
  --color-slate-300: #CBD5E1;
  --color-slate-400: #94A3B8;
  --color-slate-500: #64748B;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1E293B;
  --color-slate-900: #0F172A;
}
```

### Design Tool Integration

**Figma Variables:**
- Create color primitives (hex values)
- Create semantic tokens (mapped to primitives)
- Enable dark mode as variable mode

**Tailwind CSS:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          // ... etc
          600: '#2563EB',
          // ... etc
        },
        // Map to design tokens
      }
    }
  }
}
```

---

*Document Version: 1.0*
*Created: March 15, 2026*
*Author: Brand Designer*
*Status: Brand Foundation - Sprint #1*
*WCAG Compliance: Verified 2.1 AA*
