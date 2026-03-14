# CertFast Brand Guidelines

## Comprehensive Brand Standards Document

---

## 1. Brand Overview

### Our Story

CertFast exists because compliance shouldn't be a growth killer. Founded with the belief that every B2B SaaS company deserves access to enterprise-grade security certification without the enterprise-grade price tag or timeline, we're transforming how startups approach SOC 2, ISO 27001, and GDPR compliance.

Our brand represents **technical excellence made accessible**, **automation that actually works**, and **transparency in an industry built on gatekeeping**.

### Brand Promise

> "From zero to audit-ready in 90 days, at one-tenth the cost."

This isn't just a tagline—it's our commitment. Every brand touchpoint should reinforce the promise of speed, affordability, and reliability.

### Brand Pillars

| Pillar | Definition | Expression |
|--------|------------|------------|
| **Velocity** | Move fast without breaking things | Quick time-to-value, rapid iterations, 90-day promise |
| **Clarity** | No BS, no hidden fees, no surprises | Transparent pricing, clear documentation, honest communication |
| **Trust** | Security is serious; we take it seriously | Professional design, compliance expertise, reliable infrastructure |
| **Innovation** | AI-native, not AI-bolted | Technical sophistication, cutting-edge features, developer-first |

---

## 2. Logo Usage

### Primary Logo

**Velocity Shield** is our primary brand mark. Use it in full color for most applications.

### Logo Variants

| Variant | When to Use |
|---------|-------------|
| **Full Color** | Default for all applications |
| **Monochrome** | Single-color printing, watermarks, embossing |
| **Reversed (White)** | Dark backgrounds, photos, video |
| **Icon Only** | Favicons, app icons, avatars, small spaces |

### Clear Space

Always maintain clear space around the logo equal to the height of the "C" in CertFast. No text, graphics, or visual elements should enter this zone.

```
    ┌─────────────────────────────┐
    │         [CLEAR]             │
    │    [CLEAR]  LOGO  [CLEAR]   │
    │         [CLEAR]             │
    └─────────────────────────────┘
```

### Minimum Sizes

| Context | Minimum Size |
|---------|--------------|
| Digital (primary) | 120px width |
| Digital (icon) | 16px width |
| Print (primary) | 30mm width |
| Print (icon) | 8mm width |

### Incorrect Usage

Never:
- Stretch, skew, or distort the logo
- Change the logo colors outside approved palette
- Add effects (shadows, outlines, gradients not in brand)
- Rotate or tilt (except the intentional 5° design element)
- Place on busy backgrounds without sufficient contrast
- Use low-resolution versions for print

---

## 3. Color System

### Primary Palette

**Electric Blue** `#2563EB` — Our hero color. Use for primary buttons, key actions, and brand moments.

**Deep Indigo** `#1E40AF` — Our authority color. Use for headers, emphasis, and premium contexts.

### Secondary Palette

**Bright Cyan** `#06B6D4` — Innovation/AI accent. Use sparingly for highlights and tech moments.

**Emerald Green** `#10B981` — Success/achievement. Use for positive states and compliance completion.

### Neutral Palette

The Slate scale (`#F8FAFC` to `#0F172A`) provides our UI foundation. Use Slate-50 for backgrounds, Slate-900 for primary text, and the mid-tones for hierarchy.

### Color Usage by Context

| Context | Primary | Secondary | Accent |
|---------|---------|-----------|--------|
| Marketing | Blue gradient | White/Light | Cyan highlights |
| Product UI | Blue CTAs | Slate neutrals | Green success |
| Technical | Monochrome | Code cyan | Green success |
| Enterprise | Deep Indigo | White | Subtle blue |

---

## 4. Typography

### Font Families

**Inter** — Primary typeface for all headings and body text. Weights: 400, 500, 600, 700.

**Source Code Pro** — Monospace accent for code, technical terms, and data.

### Type Scale

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Display | Inter | 48px | 700 |
| H1 | Inter | 36px | 700 |
| H2 | Inter | 30px | 600 |
| H3 | Inter | 24px | 600 |
| Body | Inter | 16px | 400 |
| Small | Inter | 14px | 400 |
| Code | Source Code Pro | 14px | 400 |

---

## 5. Imagery & Photography

### Photography Style

**Authentic, not stocky.** Our photography features:

- **Real people** — Actual developers, founders, security teams (not models)
- **Real environments** — Modern offices, coworking spaces, home setups
- **Diverse representation** — Reflecting the global tech community
- **Candid moments** — Working, collaborating, celebrating, not posed

### Subject Matter

| Category | Examples |
|----------|----------|
| **People** | Developers at work, team celebrations, customer success |
| **Technology** | Screens showing CertFast UI, code, dashboards |
| **Abstract** | Data visualization, network diagrams, security patterns |
| **Workplace** | Modern offices, remote setups, collaborative spaces |

### Image Treatment

**Preferred:** Clean, natural lighting, minimal retouching  
**Color Grade:** Slight blue/cool tint to align with brand  
**Avoid:** Heavy filters, oversaturated colors, generic stock poses

### Illustration Style

Use for:
- Product feature explanations
- Complex concept visualization
- Empty states and onboarding

**Style:** Clean, geometric, isometric or flat design  
**Colors:** Brand palette only  
**Complexity:** Simple and scannable

### Iconography

**Style:** Line icons, 2px stroke, rounded caps  
**Size:** 24px default, 16px small, 32px large  
**Library:** Lucide or custom brand icons

---

## 6. Layout & Composition

### Grid System

**Desktop:** 12-column grid, 24px gutters, 1200px max-width  
**Tablet:** 8-column grid, 16px gutters  
**Mobile:** 4-column grid, 16px gutters

### Spacing Scale

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing, icon padding |
| sm | 8px | Component internal spacing |
| md | 16px | Default gap, section padding |
| lg | 24px | Section separation |
| xl | 32px | Major section breaks |
| 2xl | 48px | Hero sections |
| 3xl | 64px | Page sections |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Inputs, small buttons |
| md | 8px | Cards, modals, containers |
| lg | 12px | Large cards, feature blocks |
| xl | 16px | Hero sections, major containers |
| full | 9999px | Pills, badges, avatars |

### Shadows

```css
/* Elevation levels */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
--shadow-glow: 0 0 20px rgba(37, 99, 235, 0.3);
```

---

## 7. UI Components

### Buttons

**Primary Button**
```
Background: #2563EB
Text: #FFFFFF
Padding: 12px 24px
Border-radius: 8px
Font: Inter 16px 500
Hover: #1D4ED8
```

**Secondary Button**
```
Background: #FFFFFF
Border: 1px solid #E2E8F0
Text: #475569
Padding: 12px 24px
Border-radius: 8px
Font: Inter 16px 500
Hover: #F8FAFC
```

**Ghost Button**
```
Background: transparent
Text: #2563EB
Padding: 12px 24px
Border-radius: 8px
Font: Inter 16px 500
Hover: #EFF6FF
```

### Cards

**Default Card**
```
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 8px
Padding: 24px
Shadow: none (or --shadow-sm on hover)
```

**Featured Card**
```
Background: #FFFFFF
Border: 2px solid #2563EB
Border-radius: 12px
Padding: 32px
Shadow: --shadow-lg
```

### Forms

**Input Field**
```
Background: #FFFFFF
Border: 1px solid #CBD5E1
Border-radius: 8px
Padding: 12px 16px
Font: Inter 16px
Focus: border-color #2563EB, ring 3px #BFDBFE
```

### Badges

| Type | Background | Text |
|------|------------|------|
| Success | #ECFDF5 | #059669 |
| Warning | #FFFBEB | #B45309 |
| Error | #FEF2F2 | #DC2626 |
| Info | #EFF6FF | #2563EB |
| Neutral | #F1F5F9 | #475569 |

---

## 8. Tone of Voice

(See dedicated Voice & Tone document for comprehensive guidelines)

**Quick Reference:**
- **Confident, not arrogant** — We know our stuff, but we're helpful
- **Technical, not jargon-heavy** — Speak the user's language
- **Direct, not blunt** — Get to the point with warmth
- **Professional, not stiff** — Enterprise-ready without being boring

---

## 9. Application Examples

### Website

**Homepage Hero:**
- Dark gradient background (#0F172A to #1E293B)
- Gradient text headline (Blue to Cyan)
- Primary CTA button (Electric Blue)
- Product screenshot with subtle shadow

**Pricing Page:**
- Clean white background
- Card-based layout
- Featured tier highlighted (Pro)
- Clear typography hierarchy

### Marketing Materials

**Whitepaper:**
- Clean, academic layout
- Ample white space
- Data visualizations in brand colors
- Professional photography

**Social Media:**
- Consistent profile imagery
- Template-based post designs
- Branded quote graphics
- Product feature highlights

### Product Interface

**Dashboard:**
- Light mode default (Slate-50 background)
- Blue primary actions
- Green success states
- Clear data visualization

**Documentation:**
- Maximum readability (16px body, 1.6 line height)
- Code blocks in Source Code Pro
- Clear hierarchy with Inter

---

## 10. Brand Applications

### Business Cards

- Front: Logo, name, title
- Back: Tagline, contact info, QR code
- Stock: 16pt matte, subtle texture
- Colors: White background, blue accent

### Swag

**Apparel:**
- T-shirts: Logo left chest, full back
- Hoodies: Subtle tonal embroidery
- Socks: Pattern-based, brand colors

**Accessories:**
- Stickers: Icon mark, holographic option
- Notebooks: Embossed logo
- Water bottles: Laser-etched

### Conference Materials

- Booth: Large logo, clear messaging
- Banners: High contrast, readable from distance
- Handouts: Template-based, consistent layout

---

## 11. Digital Applications

### Email Templates

**Header:** Logo centered, 80px width  
**Body:** Max-width 600px, 16px Inter  
**CTA:** Primary button, centered  
**Footer:** Social links, unsubscribe, address

### Social Media Templates

**LinkedIn:** 1200×627px, headline + image + CTA  
**Twitter:** 1200×675px, concise message  
**Instagram:** 1080×1080px, visual-first

### Video

**Intro/Outro:** 3-second logo animation  
**Lower Thirds:** Name + title, brand colors  
**Transitions:** Subtle, professional

---

## 12. Dos and Don'ts

### ✅ Do

- Use the logo with clear space
- Stick to the approved color palette
- Maintain consistent typography
- Prioritize readability
- Use high-quality imagery
- Keep layouts clean and uncluttered
- Apply the brand consistently

### ❌ Don't

- Modify the logo in any way
- Use colors outside the brand palette
- Use unapproved fonts
- Crowd layouts with too much content
- Use low-resolution or stock-looking photos
- Apply inconsistent styling
- Break accessibility guidelines

---

## 13. Brand Evolution

This brand system is designed to grow with CertFast. As we expand:

- **New frameworks** may introduce additional accent colors
- **Enterprise tier** may warrant a premium visual treatment
- **International markets** will require cultural adaptation

All changes should be documented and approved to maintain brand integrity.

---

## 14. Resources & Assets

### Available Downloads

- Logo package (SVG, PNG, PDF)
- Color palette (ASE, CLR, CSS)
- Typography (font files, CSS)
- Templates (Figma, Sketch, Adobe)
- Presentation template
- Email templates
- Social media templates

### Contact

For brand questions, asset requests, or approval:  
**Email:** brand@certfast.io  
**Figma:** CertFast Brand Workspace

---

*Document Version: 1.0*
*Created: March 15, 2026*
*Author: Brand Designer*
*Status: Brand Foundation - Sprint #1*
*Next Review: After Series A announcement*
