# FF-Inspired Design System & Content Rulebook (Dark Theme)

This document defines the **complete design system, layout rules, component rules, and homepage content structure** inspired by the FF Framer template reference.

The goal is to **rebuild the app UI to match the reference system**, while:
- preserving existing functionality
- enforcing a **dark theme**
- maintaining strict consistency
- adapting sections where no 1:1 mapping exists

This document is intended to be used as **source-of-truth input for an LLM (Claude)**.

---

## 0. Reference Material

All visual rules and patterns are derived from the following reference images:

/reference/FF/homepage-1.png
/reference/FF/homepage-2.png
/reference/FF/homepage-3.png
/reference/FF/homepage-4.png
/reference/FF/homepage-5.png
/reference/FF/homepage-6.png
/reference/FF/homepage-7.png
/reference/FF/homepage-8.png
/reference/FF/homepage-all.png
/reference/FF/homepage-mobile.png
/reference/FF/about.png
/reference/FF/contact.png

yaml
Copia codice

These images collectively define:
- layout rhythm
- typography hierarchy
- spacing system
- component anatomy
- content strategy

---

## 1. Global Design Principles

1. **Editorial over transactional**
   - Pages feel like a curated publication, not an e-commerce funnel.
2. **Whitespace as structure**
   - Space replaces decoration.
3. **Hard geometry, soft content**
   - Straight lines, sharp grids, gentle imagery.
4. **Content blocks are self-contained**
   - Each section is visually boxed and separated.
5. **Typography is the main design element**
   - No decorative UI elements.
6. **Consistency beats novelty**
   - No one-off styles.

---

## 2. Color System (Dark Theme)

### Core Palette

```css
--bg-primary: #0E0E0E;        /* main background */
--bg-secondary: #141414;      /* section blocks */
--bg-tertiary: #1B1B1B;       /* cards, containers */

--border-primary: #2A2A2A;
--border-secondary: #333333;

--text-primary: #EDEDED;
--text-secondary: #B5B5B5;
--text-tertiary: #7A7A7A;

--accent-primary: #EDEDED;    /* used sparingly for CTAs */
--accent-muted: #8A8A8A;
Color Rules
Background is never pure black

Borders are always visible but subtle

Accent color == primary text color

No bright colors, no gradients

3. Typography System
Font Strategy
One primary sans-serif

Optional secondary serif ONLY for quotes

Scale (Desktop)
Role	Size	Weight	Line Height
Hero Manifesto	48–56px	500	1.15
Section Title	24–28px	500	1.3
Body Text	16px	400	1.6
Caption	13px	400	1.4
Price / Meta	14px	500	1.3

Rules
No uppercase body text

Max line width ≈ 60–65ch

Centered text only for manifesto / quotes

4. Layout & Grid
Global Grid
Desktop: 3-column editorial grid

Mobile: 1-column stacked

Gutter: 24px

Section padding: 96px vertical (desktop), 64px (mobile)

Dividers
Thin 1px lines using --border-primary

Used frequently to segment sections

5. Component Rules
Navigation (Ref: homepage-1.png, homepage-mobile.png)
Fixed top bar

Left: “Menu”

Center: Brand

Right: Search, Bag

Bottom ticker optional (scrolling info)

Rules:

Text-only nav

No backgrounds on hover, only underline or opacity

Buttons
Types:

Primary (outline)

Secondary (ghost)

Rules:

Border radius: 999px (pill)

Height: 36–40px

Text + arrow icon

No filled buttons

Product Cards (Ref: homepage-3.png, homepage-4.png)
Structure:

Image

Name

Price

Optional tag (New)

Rules:

No shadows

Image sits in padded container

Text aligned left

Price is visually quieter than title

Editorial Cards (Ref: homepage-8.png)
Structure:

Large image

Title

Date or subtitle

Rules:

Same width as product cards

Treated as content, not products

Quote / Testimonial (Ref: homepage-8.png)
Structure:

Avatar (circular)

Quote (centered)

Author + arrow link

Rules:

Single column

Generous vertical spacing

Secondary text color

6. Homepage Content Structure (Dark Theme)
1. Hero Editorial Block
Ref: homepage-1.png

Content:

Full-width image

Minimal overlay CTA

No headline over image

Purpose:

Set tone, not explain

2. Manifesto Section
Ref: homepage-2.png

Content (example copy):

A carefully curated collection of timeless objects.
Designed with restraint. Chosen with intention.

Rules:

Centered text

Large type

No CTA

3. Featured Collection Grid
Ref: homepage-3.png

Content:

6–9 curated items

Rotating selection

Rules:

Editorial pacing

No pagination here

4. Cinematic Break
Ref: homepage-6.png

Content:

Full-width muted video or image

No text overlay

Purpose:

Visual breathing space

5. Highlighted Object Section
Ref: homepage-7.png

Layout:

Split 50/50

Left: Object image

Right: Description + CTA

Content:

Product story

Materials

Limited language

CTA:

“View Object”

6. Editorial Stories
Ref: homepage-8.png

Content:

3 stories

Date + title

Purpose:

Brand depth

Not sales-driven

7. Quote Section
Ref: homepage-8.png

Content:

Curator or external voice

Purpose:

Authority + taste validation

8. Newsletter
Ref: homepage-8.png footer

Content:

One-line value proposition

Email input + button

Rules:

Inline form

No background box

7. About Page Structure
Ref: about.png

Sections:

Hero manifesto text

Three-column blocks:

Manifesto

Team

Press kit

Full-width image

Footer

Rules:

Text-forward

Minimal imagery

Strong grid discipline

8. Contact Page Structure
Ref: contact.png

Layout:

Split screen

Left: Address + contact methods

Right: Minimal form

Rules:

Large address typography

Inputs are border-only

Submit is a pill button

9. Interaction & Motion
Hover = opacity shift or underline

Transition duration: 150–200ms

No easing theatrics

No parallax

10. Adaptation Rules (Important)
If a screen does not exist in the reference:

Identify closest existing section

Reuse grid, spacing, typography

Do NOT invent new component styles

Default to:

boxed sections

clear dividers

editorial pacing

11. Absolute Constraints
No bright colors

No gradients

No card shadows

No decorative icons

No UI noise

This system must feel:
quiet, confident, deliberate, editorial