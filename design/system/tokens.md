# CertFast Design System Tokens

## Overview

This document defines the foundational design tokens for CertFast's product interface. These tokens serve as the single source of truth for colors, typography, spacing, and visual effects across all platforms and implementations.

**Version:** 1.0  
**Last Updated:** March 15, 2026  
**Owner:** Design System Team  
**Status:** Active

---

## Token Naming Convention

All tokens follow a hierarchical naming pattern:

```
{category}-{property}-{variant}-{state}
```

**Examples:**
- `--color-primary-600` — Primary color, 600 shade
- `--spacing-md` — Medium spacing unit
- `--shadow-elevation-lg` — Large elevation shadow

---

## Color Tokens

### Brand Colors

The CertFast brand is built on a foundation of Electric Blue and Deep Indigo, creating a balance between innovation and trust.

#### Primary Scale (Blue)

| Token | Hex | RGB | HSL | Usage |
|-------|-----|-----|-----|-------|
| `--color-primary-50` | `#EFF6FF` | 239, 246, 255 | 214, 100%, 97% | Lightest backgrounds |
| `--color-primary-100` | `#DBEAFE` | 219, 234, 254 | 214, 95%, 93% | Hover states, subtle fills |
| `--color-primary-200` | `#BFDBFE` | 191, 219, 254 | 213, 97%, 87% | Borders, disabled states |
| `--color-primary-300` | `#93C5FD` | 147, 197, 253 | 212, 96%, 78% | Focus rings, accents |
| `--color-primary-400` | `#60A5FA` | 96, 165, 250 | 213, 94%, 68% | Secondary actions (dark mode) |
| `--color-primary-500` | `#3B82F6` | 59, 130, 246 | 217, 91%, 60% | Links, interactive elements |
| `--color-primary-600` | `#2563EB` | 37, 99, 235 | 221, 83%, 53% | **Primary brand color** |
| `--color-primary-700` | `#1D4ED8` | 29, 78, 216 | 224, 76%, 48% | Primary hover state |
| `--color-primary-800` | `#1E40AF` | 30, 64, 175 | 224, 76%, 40% | Headers, emphasis |
| `--color-primary-900` | `#1E3A8A` | 30, 58, 138 | 226, 71%, 33% | Dark mode primary |

#### Accent Scale (Cyan)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-400` | `#22D3EE` | Highlights on dark |
| `--color-accent-500` | `#06B6D4` | **AI feature accent** |
| `--color-accent-600` | `#0891B2` | Accent hover |

### Semantic Colors

Colors that convey meaning and state.

#### Success (Green)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success-50` | `#ECFDF5` | Success background |
| `--color-success-100` | `#D1FAE5` | Light success fill |
| `--color-success-500` | `#10B981` | **Success indicator** |
| `--color-success-600` | `#059669` | Success hover |
| `--color-success-700` | `#047857` | Success active |

#### Warning (Amber)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-warning-50` | `#FFFBEB` | Warning background |
| `--color-warning-100` | `#FEF3C7` | Light warning fill |
| `--color-warning-500` | `#F59E0B` | **Warning indicator** |
| `--color-warning-600` | `#D97706` | Warning hover |
| `--color-warning-700` | `#B45309` | Warning active |

#### Error (Red)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-error-50` | `#FEF2F2` | Error background |
| `--color-error-100` | `#FEE2E2` | Light error fill |
| `--color-error-500` | `#EF4444` | **Error indicator** |
| `--color-error-600` | `#DC2626` | Error hover |
| `--color-error-700` | `#B91C1C` | Error active |

#### Info (Blue)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-info-50` | `#EFF6FF` | Info background |
| `--color-info-100` | `#DBEAFE` | Light info fill |
| `--color-info-500` | `#3B82F6` | **Info indicator** |
| `--color-info-600` | `#2563EB` | Info hover |

### Neutral Colors (Slate)

The Slate scale provides UI structure and text hierarchy.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-slate-50` | `#F8FAFC` | 248, 250, 252 | Page backgrounds |
| `--color-slate-100` | `#F1F5F9` | 241, 245, 249 | Card backgrounds |
| `--color-slate-200` | `#E2E8F0` | 226, 232, 240 | Borders, dividers |
| `--color-slate-300` | `#CBD5E1` | 203, 213, 225 | Disabled states |
| `--color-slate-400` | `#94A3B8` | 148, 163, 184 | Placeholder text |
| `--color-slate-500` | `#64748B` | 100, 116, 139 | Secondary text |
| `--color-slate-600` | `#475569` | 71, 85, 105 | Body text |
| `--color-slate-700` | `#334155` | 51, 65, 85 | Strong text |
| `--color-slate-800` | `#1E293B` | 30, 41, 59 | Headings |
| `--color-slate-900` | `#0F172A` | 15, 23, 42 | Dark backgrounds |

### Base Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-white` | `#FFFFFF` | White backgrounds, reversed text |
| `--color-black` | `#000000` | High contrast elements |
| `--color-transparent` | `transparent` | Transparent states |

### Tier Colors

Colors for pricing tier differentiation.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-tier-lite` | `#0EA5E9` | Lite tier (€199) |
| `--color-tier-starter` | `#2563EB` | Starter tier (€499) |
| `--color-tier-pro` | `#4F46E5` | Pro tier (€999) |
| `--color-tier-enterprise` | `#1E40AF` | Enterprise tier |

---

## Typography Tokens

### Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `--font-primary` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | All UI text |
| `--font-mono` | `'Source Code Pro', 'SF Mono', Monaco, monospace` | Code, data |

### Font Sizes

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `--font-size-display` | 48px / 3rem | 1.1 | -0.02em | Hero headlines |
| `--font-size-h1` | 36px / 2.25rem | 1.2 | -0.02em | Page titles |
| `--font-size-h2` | 30px / 1.875rem | 1.25 | -0.015em | Section headers |
| `--font-size-h3` | 24px / 1.5rem | 1.3 | -0.01em | Subsection headers |
| `--font-size-h4` | 20px / 1.25rem | 1.4 | -0.005em | Card titles |
| `--font-size-h5` | 18px / 1.125rem | 1.4 | 0 | Small headers |
| `--font-size-h6` | 16px / 1rem | 1.5 | 0 | Labels, captions |
| `--font-size-body-lg` | 18px / 1.125rem | 1.6 | 0 | Lead paragraphs |
| `--font-size-body` | 16px / 1rem | 1.6 | 0 | Default body text |
| `--font-size-body-sm` | 14px / 0.875rem | 1.5 | 0 | Secondary text |
| `--font-size-caption` | 12px / 0.75rem | 1.5 | 0.01em | Fine print, metadata |
| `--font-size-overline` | 12px / 0.75rem | 1.5 | 0.1em | Uppercase labels |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | Buttons, emphasis |
| `--font-weight-semibold` | 600 | Headings, strong |
| `--font-weight-bold` | 700 | Display, H1 |

### Typography Presets

Complete text style definitions.

```
--text-display: 700 48px/1.1 Inter, letter-spacing: -0.02em
--text-h1: 700 36px/1.2 Inter, letter-spacing: -0.02em
--text-h2: 600 30px/1.25 Inter, letter-spacing: -0.015em
--text-h3: 600 24px/1.3 Inter, letter-spacing: -0.01em
--text-h4: 600 20px/1.4 Inter, letter-spacing: -0.005em
--text-h5: 600 18px/1.4 Inter
--text-h6: 600 16px/1.5 Inter
--text-body-lg: 400 18px/1.6 Inter
--text-body: 400 16px/1.6 Inter
--text-body-sm: 400 14px/1.5 Inter
--text-caption: 400 12px/1.5 Inter, letter-spacing: 0.01em
--text-overline: 600 12px/1.5 Inter, letter-spacing: 0.1em, uppercase
--text-code: 400 14px/1.5 'Source Code Pro', monospace
```

---

## Spacing Tokens

### Base Scale

Base unit: 4px

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--spacing-0` | 0 | 0px | None |
| `--spacing-1` | 0.25rem | 4px | Tight spacing, icon padding |
| `--spacing-2` | 0.5rem | 8px | Component internal spacing |
| `--spacing-3` | 0.75rem | 12px | Small gaps |
| `--spacing-4` | 1rem | 16px | Default spacing |
| `--spacing-5` | 1.25rem | 20px | Medium gaps |
| `--spacing-6` | 1.5rem | 24px | Section padding |
| `--spacing-8` | 2rem | 32px | Large gaps |
| `--spacing-10` | 2.5rem | 40px | Section separation |
| `--spacing-12` | 3rem | 48px | Major sections |
| `--spacing-16` | 4rem | 64px | Page sections |
| `--spacing-20` | 5rem | 80px | Hero spacing |
| `--spacing-24` | 6rem | 96px | Large sections |

### Semantic Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 4px | Extra small |
| `--spacing-sm` | 8px | Small |
| `--spacing-md` | 16px | Medium (default) |
| `--spacing-lg` | 24px | Large |
| `--spacing-xl` | 32px | Extra large |
| `--spacing-2xl` | 48px | 2x large |
| `--spacing-3xl` | 64px | 3x large |

### Layout Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--page-padding-x` | 24px (mobile), 48px (desktop) | Horizontal page padding |
| `--page-padding-y` | 24px | Vertical page padding |
| `--container-max-width` | 1200px | Maximum content width |
| `--container-narrow` | 720px | Narrow content width |

---

## Sizing Tokens

### Component Sizes

| Token | Value | Usage |
|-------|-------|-------|
| `--size-icon-xs` | 12px | Extra small icons |
| `--size-icon-sm` | 16px | Small icons |
| `--size-icon-md` | 20px | Medium icons |
| `--size-icon-lg` | 24px | Large icons (default) |
| `--size-icon-xl` | 32px | Extra large icons |
| `--size-avatar-sm` | 32px | Small avatar |
| `--size-avatar-md` | 40px | Medium avatar |
| `--size-avatar-lg` | 48px | Large avatar |
| `--size-avatar-xl` | 64px | Extra large avatar |

### Input Sizes

| Token | Value | Usage |
|-------|-------|-------|
| `--input-height-sm` | 32px | Small input |
| `--input-height-md` | 40px | Medium input (default) |
| `--input-height-lg` | 48px | Large input |
| `--input-padding-x` | 12px | Horizontal input padding |
| `--button-height-sm` | 32px | Small button |
| `--button-height-md` | 40px | Medium button (default) |
| `--button-height-lg` | 48px | Large button |
| `--button-padding-x` | 24px | Horizontal button padding |

---

## Border Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | 0px | No radius |
| `--radius-sm` | 4px | Small elements, inputs |
| `--radius-md` | 8px | Default radius, buttons, cards |
| `--radius-lg` | 12px | Large cards, modals |
| `--radius-xl` | 16px | Hero sections, major containers |
| `--radius-2xl` | 24px | Extra large containers |
| `--radius-full` | 9999px | Pills, badges, avatars |

---

## Shadow & Elevation Tokens

### Box Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | none | No shadow |
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Default elevation |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Cards on hover |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modals, popovers |
| `--shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Overlays, dialogs |
| `--shadow-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | Inset shadow |

### Colored Shadows (Glow Effects)

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-glow-primary` | `0 0 20px rgba(37, 99, 235, 0.3)` | Primary glow |
| `--shadow-glow-accent` | `0 0 30px rgba(6, 182, 212, 0.4)` | AI feature glow |
| `--shadow-glow-success` | `0 0 20px rgba(16, 185, 129, 0.3)` | Success glow |
| `--shadow-glow-error` | `0 0 20px rgba(239, 68, 68, 0.3)` | Error glow |

### Focus Ring Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-focus-ring` | `0 0 0 3px rgba(37, 99, 235, 0.3)` | Primary focus ring |
| `--shadow-focus-ring-error` | `0 0 0 3px rgba(239, 68, 68, 0.3)` | Error focus ring |

---

## Border Tokens

### Border Width

| Token | Value | Usage |
|-------|-------|-------|
| `--border-width-0` | 0px | No border |
| `--border-width-1` | 1px | Default borders |
| `--border-width-2` | 2px | Strong borders |
| `--border-width-4` | 4px | Emphasis borders |

### Border Color

| Token | Value | Usage |
|-------|-------|-------|
| `--border-color-default` | `--color-slate-200` | Default borders |
| `--border-color-hover` | `--color-slate-300` | Hover state borders |
| `--border-color-focus` | `--color-primary-500` | Focus state borders |
| `--border-color-error` | `--color-error-500` | Error state borders |
| `--border-color-success` | `--color-success-500` | Success state borders |

---

## Z-Index Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--z-index-base` | 0 | Base layer |
| `--z-index-dropdown` | 1000 | Dropdown menus |
| `--z-index-sticky` | 1020 | Sticky elements |
| `--z-index-fixed` | 1030 | Fixed navigation |
| `--z-index-modal-backdrop` | 1040 | Modal backdrop |
| `--z-index-modal` | 1050 | Modal content |
| `--z-index-popover` | 1060 | Popovers |
| `--z-index-tooltip` | 1070 | Tooltips |
| `--z-index-toast` | 1080 | Toast notifications |

---

## Transition Tokens

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 0ms | No animation |
| `--duration-fast` | 150ms | Quick feedback |
| `--duration-normal` | 200ms | Default transitions |
| `--duration-slow` | 300ms | Emphasis animations |
| `--duration-slower` | 500ms | Page transitions |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-linear` | linear | Constant speed |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Accelerate |
| `--ease-out` | cubic-bezier(0, 0, 0.2, 1) | Decelerate |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Smooth |
| `--ease-bounce` | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Playful |

### Preset Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-colors` | `color, background-color, border-color 200ms ease-in-out` | Color changes |
| `--transition-opacity` | `opacity 200ms ease-in-out` | Fade effects |
| `--transition-transform` | `transform 200ms ease-in-out` | Scale/move |
| `--transition-shadow` | `box-shadow 200ms ease-in-out` | Shadow changes |
| `--transition-all` | `all 200ms ease-in-out` | General transitions |

---

## Breakpoint Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--breakpoint-xs` | 0px | Mobile first |
| `--breakpoint-sm` | 640px | Small devices |
| `--breakpoint-md` | 768px | Tablets |
| `--breakpoint-lg` | 1024px | Laptops |
| `--breakpoint-xl` | 1280px | Desktops |
| `--breakpoint-2xl` | 1536px | Large screens |

---

## Component Tokens

### Button Tokens

| Token | Value |
|-------|-------|
| `--button-primary-bg` | `--color-primary-600` |
| `--button-primary-bg-hover` | `--color-primary-700` |
| `--button-primary-bg-active` | `--color-primary-800` |
| `--button-primary-text` | `--color-white` |
| `--button-secondary-bg` | `--color-white` |
| `--button-secondary-bg-hover` | `--color-slate-50` |
| `--button-secondary-border` | `--color-slate-200` |
| `--button-secondary-text` | `--color-slate-700` |
| `--button-ghost-text` | `--color-primary-600` |
| `--button-ghost-bg-hover` | `--color-primary-50` |
| `--button-disabled-bg` | `--color-slate-100` |
| `--button-disabled-text` | `--color-slate-400` |
| `--button-border-radius` | `--radius-md` |

### Input Tokens

| Token | Value |
|-------|-------|
| `--input-bg` | `--color-white` |
| `--input-bg-disabled` | `--color-slate-50` |
| `--input-border` | `--color-slate-300` |
| `--input-border-hover` | `--color-slate-400` |
| `--input-border-focus` | `--color-primary-500` |
| `--input-border-error` | `--color-error-500` |
| `--input-text` | `--color-slate-900` |
| `--input-placeholder` | `--color-slate-400` |
| `--input-border-radius` | `--radius-md` |
| `--input-padding-x` | 12px |
| `--input-padding-y` | 10px |

### Card Tokens

| Token | Value |
|-------|-------|
| `--card-bg` | `--color-white` |
| `--card-border` | `--color-slate-200` |
| `--card-border-radius` | `--radius-lg` |
| `--card-padding` | `--spacing-6` |
| `--card-shadow` | `--shadow-none` |
| `--card-shadow-hover` | `--shadow-md` |

### Badge Tokens

| Token | Value |
|-------|-------|
| `--badge-success-bg` | `--color-success-50` |
| `--badge-success-text` | `--color-success-700` |
| `--badge-warning-bg` | `--color-warning-50` |
| `--badge-warning-text` | `--color-warning-700` |
| `--badge-error-bg` | `--color-error-50` |
| `--badge-error-text` | `--color-error-700` |
| `--badge-info-bg` | `--color-primary-50` |
| `--badge-info-text` | `--color-primary-700` |
| `--badge-border-radius` | `--radius-full` |

---

## Dark Mode Tokens

When dark mode is active, these token overrides apply:

| Light Token | Dark Override |
|-------------|---------------|
| `--color-bg-primary` | `--color-slate-900` |
| `--color-bg-secondary` | `--color-slate-800` |
| `--color-bg-tertiary` | `--color-slate-700` |
| `--color-text-primary` | `--color-slate-50` |
| `--color-text-secondary` | `--color-slate-400` |
| `--color-text-tertiary` | `--color-slate-500` |
| `--color-border-default` | `--color-slate-700` |
| `--card-bg` | `--color-slate-800` |
| `--card-border` | `--color-slate-700` |
| `--input-bg` | `--color-slate-800` |
| `--input-border` | `--color-slate-600` |
| `--button-secondary-bg` | `--color-slate-800` |
| `--button-secondary-text` | `--color-slate-200` |

---

## Implementation Reference

### CSS Custom Properties

```css
:root {
  /* Import all tokens as CSS custom properties */
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  /* ... all tokens ... */
}
```

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          // ... etc
          600: '#2563EB',
          // ... etc
        },
        // Map all tokens
      },
      spacing: {
        '4': '1rem',
        '6': '1.5rem',
        // ... etc
      },
      borderRadius: {
        'md': '8px',
        'lg': '12px',
        // ... etc
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        // ... etc
      }
    }
  }
}
```

### Figma Variables

- Create color primitives (hex values)
- Create semantic tokens (mapped to primitives)
- Enable dark mode as variable mode
- Share tokens across design system files

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | March 15, 2026 | Initial token system |

---

## Quality Checklist

- [x] All brand colors tokenized with full scale
- [x] Semantic colors defined (success, warning, error, info)
- [x] Neutral slate scale complete
- [x] Typography tokens with full type scale
- [x] Spacing tokens following 4px base unit
- [x] Sizing tokens for components
- [x] Border radius tokens defined
- [x] Shadow/elevation tokens complete
- [x] Border tokens specified
- [x] Z-index tokens organized
- [x] Transition tokens defined
- [x] Component-specific tokens created
- [x] Dark mode overrides documented
- [x] Implementation examples provided

---

*Document Status: Complete*  
*Word Count: ~2,400*  
*Next Review: After design system v2.0*
