# The Antiques - Design Rulebook

> **STRICT DESIGN SYSTEM** - All rules are constraints, not suggestions.
> Based on reference UI analysis, adapted for dark theme.

---

## 1. Global Design Principles

### 1.1 Core Philosophy
- **Monochromatic foundation:** The design uses a dark grayscale palette as its primary visual language. Color is reserved exclusively for semantic meaning.
- **Minimal elevation:** Flat design with subtle, restrained shadow usage. Depth is communicated through background color differences, not heavy shadows.
- **High contrast:** Text and interactive elements maintain strong contrast against dark backgrounds for readability.
- **Purposeful whitespace:** Generous spacing creates visual hierarchy and breathing room. Empty space is intentional, not accidental.

### 1.2 Constraints
- DO NOT use color for decoration. Color indicates state or meaning only.
- DO NOT use multiple font families. One sans-serif font throughout.
- DO NOT use heavy shadows or glows. Elevation is subtle.
- DO NOT use borders heavier than 1px.
- DO NOT center-align body text. Left-align all content text.
- DO NOT use more than 3 levels of visual hierarchy per screen.

---

## 2. Layout Rules

### 2.1 Screen Structure
Every screen follows this exact structure:

```
┌─────────────────────────────┐
│ Header (64px height)        │
│ [Back] [Title center] [Act] │
├─────────────────────────────┤
│                             │
│ Content Area (scrollable)   │
│ 24px horizontal padding     │
│                             │
├─────────────────────────────┤
│ Fixed Bottom Action (opt)   │
│ 24px padding, 24px bottom   │
└─────────────────────────────┘
```

### 2.2 Header Rules
- Height: 64px exactly
- Back button: Left-aligned, 24px icon, 44px touch target
- Title: Center-aligned, bold weight
- Right action: Icon (24px) or text link, right-aligned
- Background: Transparent (scrolls with content) OR solid dark when content scrolls behind

### 2.3 Grid Rules
- **Single column:** Default for all content
- **Two column grid:** Product cards only, 16px gap between columns
- **Column width:** Equal width, calculated as `(screen - 48px - 16px) / 2`
- Cards stretch to fill available column width

### 2.4 Content Width
- Maximum content width on desktop: 480px (mobile-first, centered on larger screens)
- All content respects 24px horizontal margins

### 2.5 Section Rules
- Sections are separated by 32px vertical space
- Section headers are followed by 16px space before content
- Related items within a section have 0px gap (separated by dividers)

---

## 3. Spacing Rules

### 3.1 Base Unit
- **Base unit: 8px**
- All spacing values are multiples of 8px: 8, 16, 24, 32, 40, 48, 56, 64

### 3.2 Screen Padding
- Horizontal screen padding: **24px** (both sides, always)
- Top padding below header: **24px**
- Bottom padding above fixed action: **24px**
- Bottom safe area: **24px** minimum

### 3.3 Component Spacing

| Context | Spacing |
|---------|---------|
| Between sections | 32px |
| Section header to content | 16px |
| Between cards (grid) | 16px |
| Between list items | 0px (use divider) |
| Inside card padding | 16px |
| Inside button padding | 16px vertical, 24px horizontal |
| Icon to adjacent text | 12px |
| Form label to input | 8px |
| Between form fields | 16px |
| Paragraph spacing | 16px |

### 3.4 Touch Targets
- Minimum touch target: **44px height**
- Minimum touch target: **44px width** for icon-only buttons
- Full-width buttons: extend to screen edges minus 24px padding

---

## 4. Typography Rules

### 4.1 Font Family
- **Primary font:** Inter (fallback: SF Pro, -apple-system, sans-serif)
- **Single font family only.** No secondary fonts.

### 4.2 Type Scale (Fixed)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| display | 32px | 700 (Bold) | 40px | Large numbers, hero stats |
| title-1 | 24px | 700 (Bold) | 32px | Screen titles |
| title-2 | 20px | 600 (Semibold) | 28px | Section headers |
| title-3 | 18px | 600 (Semibold) | 24px | Card titles, modal titles |
| body | 16px | 400 (Regular) | 24px | Body text, descriptions |
| body-medium | 16px | 500 (Medium) | 24px | Emphasized body text |
| body-bold | 16px | 600 (Semibold) | 24px | Prices, important values |
| caption | 14px | 400 (Regular) | 20px | Secondary text, metadata |
| caption-medium | 14px | 500 (Medium) | 20px | Labels, navigation |
| small | 12px | 400 (Regular) | 16px | Timestamps, tertiary info |
| small-medium | 12px | 500 (Medium) | 16px | Badges, tags |
| button | 16px | 600 (Semibold) | 24px | Button text |
| button-small | 14px | 600 (Semibold) | 20px | Small button text |

### 4.3 Typography Rules
- Screen titles use `title-1`, center-aligned in headers only
- Section headers use `title-2`, left-aligned
- Body text uses `body`, left-aligned, max-width for readability
- Prices always use `body-bold`
- Dates and timestamps use `small`, muted color
- Never use font sizes outside this scale
- Never use weights outside 400, 500, 600, 700

### 4.4 Text Truncation
- Single-line text: Truncate with ellipsis
- Product titles: Maximum 2 lines, then ellipsis
- Descriptions: Maximum 3 lines, then ellipsis
- Prices: Never truncate

---

## 5. Color Rules

### 5.1 Color Palette (Dark Theme)

#### Base Colors
```css
--color-bg-primary: #09090B;      /* Screen background - zinc-950 */
--color-bg-secondary: #18181B;    /* Card background, elevated surfaces - zinc-900 */
--color-bg-tertiary: #27272A;     /* Input backgrounds, hover states - zinc-800 */
--color-bg-elevated: #3F3F46;     /* Highly elevated elements - zinc-700 */
```

#### Text Colors
```css
--color-text-primary: #FAFAFA;    /* Primary text - zinc-50 */
--color-text-secondary: #A1A1AA;  /* Secondary text - zinc-400 */
--color-text-tertiary: #71717A;   /* Tertiary text, placeholders - zinc-500 */
--color-text-muted: #52525B;      /* Disabled text - zinc-600 */
```

#### Border Colors
```css
--color-border-default: #27272A;  /* Default borders - zinc-800 */
--color-border-subtle: #3F3F46;   /* Subtle borders - zinc-700 */
```

#### Semantic Colors
```css
--color-success: #22C55E;         /* Positive, connected, available - green-500 */
--color-warning: #F59E0B;         /* Pending, attention - amber-500 */
--color-error: #EF4444;           /* Negative, sold, error - red-500 */
--color-info: #3B82F6;            /* Links, information - blue-500 */
```

#### Interactive Colors
```css
--color-button-primary-bg: #FAFAFA;       /* Primary button background */
--color-button-primary-text: #09090B;     /* Primary button text */
--color-button-secondary-bg: transparent; /* Secondary button background */
--color-button-secondary-border: #FAFAFA; /* Secondary button border */
--color-button-secondary-text: #FAFAFA;   /* Secondary button text */
```

### 5.2 Color Usage Rules

#### When to use Primary Text (#FAFAFA)
- Headings
- Primary labels
- Prices
- Active navigation items
- Important values

#### When to use Secondary Text (#A1A1AA)
- Supporting descriptions
- Inactive labels
- Helper text
- Breadcrumbs

#### When to use Tertiary Text (#71717A)
- Placeholders
- Timestamps
- Least important metadata
- Disabled states

#### When to use Semantic Colors
- **Green (#22C55E):** Available status, positive transactions, success states, "connected" indicators
- **Amber (#F59E0B):** Pending status, warnings, processing states
- **Red (#EF4444):** Sold status, errors, negative transactions, destructive actions
- **Blue (#3B82F6):** Hyperlinks only (use sparingly)

#### Color Constraints
- DO NOT use semantic colors for decoration
- DO NOT use gradients except on special hero cards
- DO NOT use colored backgrounds for cards (use bg-secondary only)
- DO NOT use opacity for text colors (use the defined palette)
- DO NOT use white (#FFFFFF) - use zinc-50 (#FAFAFA) instead

### 5.3 Overlay Colors
```css
--color-overlay: rgba(0, 0, 0, 0.5);      /* Modal backdrop */
--color-overlay-light: rgba(0, 0, 0, 0.3); /* Subtle overlay */
```

---

## 6. Component Rules

### 6.1 Buttons

#### Primary Button
```
- Background: var(--color-button-primary-bg)
- Text: var(--color-button-primary-text)
- Font: button (16px/600)
- Height: 56px
- Border radius: 28px (fully rounded / pill)
- Width: Full width (screen width minus 48px padding)
- Padding: 16px vertical (height is fixed, not padding-derived)
```

#### Secondary Button
```
- Background: transparent
- Border: 1.5px solid var(--color-button-secondary-border)
- Text: var(--color-button-secondary-text)
- Font: button (16px/600)
- Height: 56px
- Border radius: 28px
- Width: Full width
```

#### Small Button (Card actions)
```
- Background: var(--color-button-primary-bg)
- Text: var(--color-button-primary-text)
- Font: button-small (14px/600)
- Height: 36px
- Border radius: 18px
- Padding: 8px 16px
- Width: Auto (fit content)
```

#### Ghost Button / Text Link
```
- Background: transparent
- Text: var(--color-text-primary) or var(--color-text-secondary)
- Font: caption-medium (14px/500)
- No border
- No minimum height (inline)
```

#### Button States
```
Default: As specified above
Hover: Opacity 0.9
Pressed: Opacity 0.8
Disabled: Background var(--color-bg-tertiary), text var(--color-text-muted)
```

### 6.2 Cards

#### Standard Card
```
- Background: var(--color-bg-secondary)
- Border: 1px solid var(--color-border-default)
- Border radius: 16px
- Padding: 16px
- Shadow: none (use border for definition)
```

#### Product Card
```
- Background: var(--color-bg-secondary)
- Border: 1px solid var(--color-border-default)
- Border radius: 16px
- Image container: Top, border-radius 12px (inner), aspect-ratio 1:1
- Content padding: 16px
- Layout: Image → Title (max 2 lines) → Price + Action row
```

#### Selection Card (e.g., Address)
```
- Background: var(--color-bg-secondary)
- Border: 1.5px solid var(--color-border-default)
- Border radius: 16px
- Padding: 16px
- Selected state: Border changes to var(--color-text-primary)
- Radio indicator: Right-aligned
```

### 6.3 List Items

#### Standard List Item
```
- Height: 64px (single line) or 72px (two lines)
- Background: transparent
- Padding: 0px horizontal (inherits screen padding)
- Divider: 1px solid var(--color-border-default), full width OR inset 56px from left
- Layout: [Icon 40px] [12px gap] [Text stack] [Value/Action]
```

#### Icon Container (in lists)
```
- Size: 40px × 40px
- Background: var(--color-bg-tertiary)
- Border radius: 12px
- Icon size: 20px, centered
- Icon color: var(--color-text-primary)
```

#### Transaction List Item
```
- Height: 72px
- Layout: [Category icon 40px] [12px] [Title + Timestamp stack] [Amount right-aligned]
- Amount color: Green for positive (+), Red for negative (-)
```

### 6.4 Inputs

#### Text Input
```
- Height: 56px
- Background: var(--color-bg-tertiary)
- Border: none (default), 1.5px solid var(--color-text-primary) (focus)
- Border radius: 12px
- Padding: 16px horizontal
- Font: body (16px/400)
- Placeholder color: var(--color-text-tertiary)
```

#### Input Label
```
- Font: caption-medium (14px/500)
- Color: var(--color-text-secondary)
- Margin bottom: 8px
- Position: Above input
```

#### Input States
```
Default: No border
Focus: 1.5px solid var(--color-text-primary)
Error: 1.5px solid var(--color-error)
Disabled: Opacity 0.5
```

### 6.5 Badges

#### Status Badge
```
- Padding: 6px 12px
- Border radius: 100px (fully rounded)
- Font: small-medium (12px/500)
- Variants:
  - Available: Background green/10%, text green
  - Pending: Background amber/10%, text amber
  - Sold: Background red/10%, text red
```

#### Tag Badge
```
- Padding: 4px 8px
- Border radius: 6px
- Font: small (12px/400)
- Background: var(--color-bg-tertiary)
- Text: var(--color-text-secondary)
```

### 6.6 Navigation

#### Tab Bar
```
- Height: 64px (plus safe area)
- Background: var(--color-bg-secondary)
- Border top: 1px solid var(--color-border-default)
- Items: 5 maximum
- Item layout: Icon (24px) above Label (small)
- Active: var(--color-text-primary)
- Inactive: var(--color-text-tertiary)
```

#### Segmented Control
```
- Height: 48px
- Background: var(--color-bg-tertiary)
- Border radius: 24px
- Segment padding: 8px
- Active segment: Background var(--color-text-primary), text var(--color-bg-primary)
- Inactive segment: Background transparent, text var(--color-text-secondary)
- Active indicator border radius: 20px
```

### 6.7 Modals

#### Bottom Sheet
```
- Background: var(--color-bg-secondary)
- Border radius: 24px 24px 0 0 (top corners only)
- Padding: 24px horizontal, 16px top, 24px bottom
- Handle: 40px width, 4px height, var(--color-bg-elevated), centered, 8px from top
- Overlay: var(--color-overlay)
- Max height: 90% of screen
```

#### Center Modal
```
- Background: var(--color-bg-secondary)
- Border radius: 24px (all corners)
- Padding: 24px
- Width: Screen width minus 48px, max 360px
- Overlay: var(--color-overlay)
- Layout: Icon (optional) → Title → Subtitle → Actions
- Actions: Stacked vertically, primary on bottom
```

### 6.8 Empty States

```
- Layout: Centered horizontally and vertically
- Illustration/Icon: 120px, centered, muted color
- Title: title-3 (18px/600), var(--color-text-primary), center-aligned
- Subtitle: caption (14px/400), var(--color-text-secondary), center-aligned, max 280px
- CTA button (optional): 16px below subtitle
```

### 6.9 Toggle Switch

```
- Size: 48px width, 28px height
- Track (off): var(--color-bg-elevated)
- Track (on): var(--color-text-primary)
- Thumb: var(--color-bg-primary), 24px diameter
- Border radius: 14px (track), 50% (thumb)
```

---

## 7. Interaction Rules

### 7.1 Touch Feedback
- All interactive elements show feedback on press
- Press state: Reduce opacity to 0.8 or scale to 0.98
- Transition duration: 100ms ease-out

### 7.2 Transitions
- Default transition: 200ms ease
- Modal enter: 300ms ease-out
- Modal exit: 200ms ease-in
- Page transitions: 200ms ease
- Hover transitions: 150ms ease

### 7.3 Hover States (Desktop)
- Buttons: Opacity 0.9
- Cards: Border color lightens to var(--color-border-subtle), subtle lift (translateY -2px)
- List items: Background var(--color-bg-tertiary)
- Links: Underline appears

### 7.4 Focus States
- All focusable elements show visible focus ring
- Focus ring: 2px solid var(--color-text-primary), 2px offset
- Focus is visible on keyboard navigation only (not click)

### 7.5 Selection States
- Selected cards: Border changes to var(--color-text-primary)
- Selected list items: Background var(--color-bg-tertiary)
- Selected tabs: Background var(--color-text-primary), text inverted
- Checkboxes/Radios: Fill with var(--color-text-primary) when selected

### 7.6 Loading States
- Skeleton: var(--color-bg-tertiary) with subtle pulse animation
- Spinner: var(--color-text-primary), 24px, centered
- Button loading: Show spinner, disable interaction, maintain button size

### 7.7 Scroll Behavior
- Vertical scroll: Native momentum scrolling
- Horizontal scroll (carousels): Snap to item, hide scrollbar
- Pull to refresh: Not implemented (use explicit refresh button)
- Infinite scroll: Load indicator at bottom, 32px height

### 7.8 Gestures
- Swipe to go back: Native behavior (iOS)
- Swipe to delete: Red background reveals on swipe left (lists only)
- Pull down to dismiss: Bottom sheets only

---

## 8. Implementation Checklist

When implementing any screen, verify:

- [ ] Screen padding is exactly 24px horizontal
- [ ] All spacing uses 8px increments
- [ ] Typography uses only defined tokens
- [ ] Colors use only defined variables
- [ ] Touch targets are minimum 44px
- [ ] Buttons are full-width on mobile
- [ ] Cards use 16px border radius
- [ ] Inputs use 12px border radius
- [ ] Primary buttons use 28px border radius (pill)
- [ ] Semantic colors are used only for status/state
- [ ] No decorative colors are present
- [ ] Focus states are visible
- [ ] Empty states are handled
- [ ] Loading states are defined

---

## 9. Anti-Patterns (Never Do This)

- Never use shadows heavier than 8px blur
- Never use colored card backgrounds
- Never use multiple font families
- Never use font sizes outside the type scale
- Never center-align paragraph text
- Never use pure black (#000000) for backgrounds - use zinc-950
- Never use pure white (#FFFFFF) for text - use zinc-50
- Never use color for non-semantic decoration
- Never make touch targets smaller than 44px
- Never use inconsistent border radii on same component type
- Never use gradients (except hero cards with explicit approval)
- Never nest cards inside cards
- Never use horizontal scrolling for primary content (only carousels)
- Never truncate prices
- Never hide navigation behind gestures only

---

## 10. Design Tokens

> **CANONICAL TOKEN DEFINITIONS** - Use these exact values for implementation.
> All tokens are derived from the rulebook. No deviations permitted.

### 10.1 Spacing Tokens

```css
/* Base unit: 8px */
--spacing-0: 0px;
--spacing-1: 4px;      /* Half unit - micro adjustments only */
--spacing-2: 8px;      /* Base unit */
--spacing-3: 12px;     /* 1.5 units - icon gaps */
--spacing-4: 16px;     /* 2 units - standard gap */
--spacing-5: 20px;     /* 2.5 units - rare */
--spacing-6: 24px;     /* 3 units - screen padding, sections */
--spacing-8: 32px;     /* 4 units - major sections */
--spacing-10: 40px;    /* 5 units - icon containers */
--spacing-12: 48px;    /* 6 units - large gaps */
--spacing-14: 56px;    /* 7 units - button height */
--spacing-16: 64px;    /* 8 units - header height */
```

#### Semantic Spacing Tokens

```css
/* Screen */
--space-screen-padding: 24px;           /* Horizontal padding on all screens */
--space-screen-padding-total: 48px;     /* Both sides combined */
--space-safe-area-bottom: 24px;         /* Minimum bottom padding */

/* Sections */
--space-section-gap: 32px;              /* Between major sections */
--space-section-header-gap: 16px;       /* Section title to content */

/* Components */
--space-card-padding: 16px;             /* Inside cards */
--space-card-gap: 16px;                 /* Between cards in grid */
--space-list-item-gap: 0px;             /* Between list items (use divider) */
--space-icon-text-gap: 12px;            /* Icon to adjacent text */

/* Forms */
--space-form-field-gap: 16px;           /* Between form fields */
--space-label-input-gap: 8px;           /* Label to input */
--space-input-padding-x: 16px;          /* Horizontal input padding */
--space-input-padding-y: 16px;          /* Vertical input padding */

/* Buttons */
--space-button-padding-x: 24px;         /* Horizontal button padding */
--space-button-padding-y: 16px;         /* Vertical button padding */
--space-button-small-padding-x: 16px;   /* Small button horizontal */
--space-button-small-padding-y: 8px;    /* Small button vertical */

/* Modal */
--space-modal-padding: 24px;            /* Modal content padding */
--space-modal-header-padding: 16px;     /* Modal top padding */
```

#### Tailwind Mapping

| Token | Tailwind Class |
|-------|----------------|
| spacing-2 (8px) | `gap-2`, `p-2`, `m-2` |
| spacing-3 (12px) | `gap-3`, `p-3`, `m-3` |
| spacing-4 (16px) | `gap-4`, `p-4`, `m-4` |
| spacing-6 (24px) | `gap-6`, `p-6`, `m-6` |
| spacing-8 (32px) | `gap-8`, `p-8`, `m-8` |

---

### 10.2 Border Radius Tokens

```css
/* Radius scale */
--radius-none: 0px;
--radius-sm: 6px;       /* Tag badges */
--radius-md: 12px;      /* Inputs, thumbnails, icon containers */
--radius-lg: 16px;      /* Cards */
--radius-xl: 20px;      /* Segmented control indicator */
--radius-2xl: 24px;     /* Modals, bottom sheets */
--radius-full: 9999px;  /* Pills, buttons, status badges */
```

#### Semantic Radius Tokens

```css
/* Components */
--radius-card: 16px;                    /* All card types */
--radius-card-inner: 12px;              /* Images inside cards */
--radius-input: 12px;                   /* Text inputs, selects */
--radius-button: 9999px;                /* Primary/secondary buttons (pill) */
--radius-button-small: 9999px;          /* Small buttons (pill) */
--radius-badge: 9999px;                 /* Status badges (pill) */
--radius-tag: 6px;                      /* Tag badges */
--radius-icon-container: 12px;          /* Icon containers in lists */
--radius-thumbnail: 12px;               /* Image thumbnails */

/* Modals */
--radius-modal: 24px;                   /* Center modals */
--radius-bottom-sheet: 24px;            /* Bottom sheet top corners */

/* Navigation */
--radius-segmented: 24px;               /* Segmented control container */
--radius-segmented-indicator: 20px;     /* Active segment indicator */
```

#### Tailwind Mapping

| Token | Tailwind Class |
|-------|----------------|
| radius-sm (6px) | `rounded-md` |
| radius-md (12px) | `rounded-xl` |
| radius-lg (16px) | `rounded-2xl` |
| radius-2xl (24px) | `rounded-3xl` |
| radius-full | `rounded-full` |

---

### 10.3 Typography Tokens

```css
/* Font family */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro', 'Segoe UI', sans-serif;

/* Font weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Font sizes */
--font-size-xs: 12px;      /* small */
--font-size-sm: 14px;      /* caption */
--font-size-base: 16px;    /* body, button */
--font-size-lg: 18px;      /* title-3 */
--font-size-xl: 20px;      /* title-2 */
--font-size-2xl: 24px;     /* title-1 */
--font-size-3xl: 32px;     /* display */

/* Line heights */
--line-height-xs: 16px;    /* small */
--line-height-sm: 20px;    /* caption */
--line-height-base: 24px;  /* body, title-3 */
--line-height-lg: 28px;    /* title-2 */
--line-height-xl: 32px;    /* title-1 */
--line-height-2xl: 40px;   /* display */
```

#### Typography Composite Tokens

```css
/* Display - Large numbers, hero stats */
--typography-display-size: 32px;
--typography-display-weight: 700;
--typography-display-line-height: 40px;
--typography-display-letter-spacing: -0.02em;

/* Title 1 - Screen titles */
--typography-title1-size: 24px;
--typography-title1-weight: 700;
--typography-title1-line-height: 32px;
--typography-title1-letter-spacing: -0.01em;

/* Title 2 - Section headers */
--typography-title2-size: 20px;
--typography-title2-weight: 600;
--typography-title2-line-height: 28px;
--typography-title2-letter-spacing: 0;

/* Title 3 - Card titles, modal titles */
--typography-title3-size: 18px;
--typography-title3-weight: 600;
--typography-title3-line-height: 24px;
--typography-title3-letter-spacing: 0;

/* Body - Body text, descriptions */
--typography-body-size: 16px;
--typography-body-weight: 400;
--typography-body-line-height: 24px;
--typography-body-letter-spacing: 0;

/* Body Medium - Emphasized body */
--typography-body-medium-size: 16px;
--typography-body-medium-weight: 500;
--typography-body-medium-line-height: 24px;

/* Body Bold - Prices, important values */
--typography-body-bold-size: 16px;
--typography-body-bold-weight: 600;
--typography-body-bold-line-height: 24px;

/* Caption - Secondary text, metadata */
--typography-caption-size: 14px;
--typography-caption-weight: 400;
--typography-caption-line-height: 20px;

/* Caption Medium - Labels, navigation */
--typography-caption-medium-size: 14px;
--typography-caption-medium-weight: 500;
--typography-caption-medium-line-height: 20px;

/* Small - Timestamps, tertiary info */
--typography-small-size: 12px;
--typography-small-weight: 400;
--typography-small-line-height: 16px;

/* Small Medium - Badges, tags */
--typography-small-medium-size: 12px;
--typography-small-medium-weight: 500;
--typography-small-medium-line-height: 16px;

/* Button - Button text */
--typography-button-size: 16px;
--typography-button-weight: 600;
--typography-button-line-height: 24px;

/* Button Small - Small button text */
--typography-button-small-size: 14px;
--typography-button-small-weight: 600;
--typography-button-small-line-height: 20px;
```

#### Tailwind Mapping

| Token | Tailwind Classes |
|-------|------------------|
| display | `text-3xl font-bold leading-10 tracking-tight` |
| title-1 | `text-2xl font-bold leading-8 tracking-tight` |
| title-2 | `text-xl font-semibold leading-7` |
| title-3 | `text-lg font-semibold leading-6` |
| body | `text-base font-normal leading-6` |
| body-medium | `text-base font-medium leading-6` |
| body-bold | `text-base font-semibold leading-6` |
| caption | `text-sm font-normal leading-5` |
| caption-medium | `text-sm font-medium leading-5` |
| small | `text-xs font-normal leading-4` |
| small-medium | `text-xs font-medium leading-4` |

---

### 10.4 Color Tokens

```css
/* ========================================
   BASE COLORS - Backgrounds
   ======================================== */
--color-bg-primary: #09090B;            /* zinc-950 - Screen background */
--color-bg-secondary: #18181B;          /* zinc-900 - Cards, elevated surfaces */
--color-bg-tertiary: #27272A;           /* zinc-800 - Inputs, hover states */
--color-bg-elevated: #3F3F46;           /* zinc-700 - Highly elevated elements */

/* ========================================
   TEXT COLORS
   ======================================== */
--color-text-primary: #FAFAFA;          /* zinc-50 - Primary text */
--color-text-secondary: #A1A1AA;        /* zinc-400 - Secondary text */
--color-text-tertiary: #71717A;         /* zinc-500 - Placeholders, tertiary */
--color-text-muted: #52525B;            /* zinc-600 - Disabled text */

/* ========================================
   BORDER COLORS
   ======================================== */
--color-border-default: #27272A;        /* zinc-800 - Default borders */
--color-border-subtle: #3F3F46;         /* zinc-700 - Hover borders */
--color-border-strong: #FAFAFA;         /* zinc-50 - Focus/selected borders */

/* ========================================
   SEMANTIC COLORS - Status
   ======================================== */
--color-success: #22C55E;               /* green-500 - Available, positive */
--color-success-muted: rgba(34, 197, 94, 0.1);   /* Success background */
--color-warning: #F59E0B;               /* amber-500 - Pending, attention */
--color-warning-muted: rgba(245, 158, 11, 0.1); /* Warning background */
--color-error: #EF4444;                 /* red-500 - Sold, error */
--color-error-muted: rgba(239, 68, 68, 0.1);    /* Error background */
--color-info: #3B82F6;                  /* blue-500 - Links only */

/* ========================================
   INTERACTIVE COLORS - Buttons
   ======================================== */
--color-button-primary-bg: #FAFAFA;
--color-button-primary-text: #09090B;
--color-button-primary-hover: rgba(250, 250, 250, 0.9);
--color-button-primary-pressed: rgba(250, 250, 250, 0.8);
--color-button-primary-disabled-bg: #27272A;
--color-button-primary-disabled-text: #52525B;

--color-button-secondary-bg: transparent;
--color-button-secondary-text: #FAFAFA;
--color-button-secondary-border: #FAFAFA;
--color-button-secondary-hover: rgba(250, 250, 250, 0.1);

--color-button-ghost-text: #FAFAFA;
--color-button-ghost-text-secondary: #A1A1AA;

/* ========================================
   OVERLAY COLORS
   ======================================== */
--color-overlay: rgba(0, 0, 0, 0.5);
--color-overlay-light: rgba(0, 0, 0, 0.3);
--color-overlay-heavy: rgba(0, 0, 0, 0.8);

/* ========================================
   FOCUS COLORS
   ======================================== */
--color-focus-ring: #FAFAFA;
--color-focus-ring-offset: #09090B;
```

#### Tailwind Color Mapping

| Token | Tailwind Class |
|-------|----------------|
| bg-primary | `bg-zinc-950` |
| bg-secondary | `bg-zinc-900` |
| bg-tertiary | `bg-zinc-800` |
| bg-elevated | `bg-zinc-700` |
| text-primary | `text-zinc-50` |
| text-secondary | `text-zinc-400` |
| text-tertiary | `text-zinc-500` |
| text-muted | `text-zinc-600` |
| border-default | `border-zinc-800` |
| border-subtle | `border-zinc-700` |
| success | `text-green-500` |
| warning | `text-amber-500` |
| error | `text-red-500` |

---

### 10.5 Elevation & Shadow Tokens

```css
/* ========================================
   SHADOW TOKENS
   Minimal shadow philosophy - use sparingly
   ======================================== */

/* Level 0 - Flat (default) */
--shadow-none: none;

/* Level 1 - Subtle elevation (cards) */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);

/* Level 2 - Medium elevation (dropdowns, popovers) */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);

/* Level 3 - High elevation (modals) */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);

/* Level 4 - Maximum elevation (search modal) */
--shadow-xl: 0 12px 40px rgba(0, 0, 0, 0.25);
```

#### Semantic Shadow Tokens

```css
/* Components */
--shadow-card: var(--shadow-none);              /* Cards use border, not shadow */
--shadow-card-hover: var(--shadow-sm);          /* Subtle lift on hover */
--shadow-dropdown: var(--shadow-md);            /* Dropdowns, menus */
--shadow-modal: var(--shadow-lg);               /* Center modals */
--shadow-bottom-sheet: 0 -4px 24px rgba(0, 0, 0, 0.2);  /* Bottom sheets */
--shadow-search: var(--shadow-xl);              /* Search modal */
```

#### Elevation Layers (Z-Index)

```css
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-header: 30;
--z-overlay: 40;
--z-modal: 50;
--z-popover: 60;
--z-toast: 70;
--z-tooltip: 80;
--z-max: 100;
```

---

### 10.6 Size Tokens

```css
/* ========================================
   COMPONENT SIZE TOKENS
   ======================================== */

/* Buttons */
--size-button-height: 56px;
--size-button-height-small: 36px;
--size-button-min-width: 120px;

/* Inputs */
--size-input-height: 56px;
--size-input-min-width: 200px;

/* Icons */
--size-icon-xs: 16px;
--size-icon-sm: 20px;
--size-icon-md: 24px;
--size-icon-lg: 32px;
--size-icon-xl: 40px;

/* Icon containers */
--size-icon-container: 40px;
--size-icon-container-lg: 48px;

/* Touch targets */
--size-touch-target-min: 44px;

/* Avatar / Thumbnails */
--size-thumbnail-sm: 40px;
--size-thumbnail-md: 64px;
--size-thumbnail-lg: 80px;
--size-thumbnail-xl: 120px;

/* Header */
--size-header-height: 64px;

/* Tab bar */
--size-tabbar-height: 64px;

/* Modal */
--size-modal-max-width: 360px;
--size-modal-width: calc(100vw - 48px);

/* Bottom sheet handle */
--size-sheet-handle-width: 40px;
--size-sheet-handle-height: 4px;

/* Toggle */
--size-toggle-width: 48px;
--size-toggle-height: 28px;
--size-toggle-thumb: 24px;

/* Segmented control */
--size-segmented-height: 48px;

/* Badge */
--size-badge-height: 24px;
--size-tag-height: 20px;

/* List items */
--size-list-item-single: 64px;
--size-list-item-double: 72px;

/* Empty state icon */
--size-empty-icon: 120px;
```

---

### 10.7 Animation & Transition Tokens

```css
/* ========================================
   DURATION TOKENS
   ======================================== */
--duration-instant: 0ms;
--duration-fast: 100ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;

/* ========================================
   EASING TOKENS
   ======================================== */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);   /* ease */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* ========================================
   SEMANTIC TRANSITION TOKENS
   ======================================== */
--transition-colors: color, background-color, border-color 200ms ease;
--transition-opacity: opacity 150ms ease;
--transition-transform: transform 200ms ease;
--transition-shadow: box-shadow 200ms ease;
--transition-all: all 200ms ease;

/* Component-specific */
--transition-button: opacity 100ms ease-out;
--transition-card-hover: transform 200ms ease, border-color 200ms ease;
--transition-modal-enter: 300ms ease-out;
--transition-modal-exit: 200ms ease-in;
--transition-input-focus: border-color 150ms ease;
```

---

### 10.8 Component Variant Tokens

#### Button Variants

```css
/* PRIMARY BUTTON */
--button-primary-bg: var(--color-button-primary-bg);
--button-primary-text: var(--color-button-primary-text);
--button-primary-height: var(--size-button-height);
--button-primary-radius: var(--radius-full);
--button-primary-font-size: var(--typography-button-size);
--button-primary-font-weight: var(--typography-button-weight);
--button-primary-padding-x: var(--space-button-padding-x);

/* SECONDARY BUTTON */
--button-secondary-bg: transparent;
--button-secondary-text: var(--color-button-secondary-text);
--button-secondary-border: 1.5px solid var(--color-button-secondary-border);
--button-secondary-height: var(--size-button-height);
--button-secondary-radius: var(--radius-full);

/* SMALL BUTTON */
--button-small-bg: var(--color-button-primary-bg);
--button-small-text: var(--color-button-primary-text);
--button-small-height: var(--size-button-height-small);
--button-small-radius: var(--radius-full);
--button-small-font-size: var(--typography-button-small-size);
--button-small-padding-x: var(--space-button-small-padding-x);

/* GHOST BUTTON */
--button-ghost-bg: transparent;
--button-ghost-text: var(--color-text-primary);
--button-ghost-text-secondary: var(--color-text-secondary);

/* DISABLED STATE (all buttons) */
--button-disabled-bg: var(--color-bg-tertiary);
--button-disabled-text: var(--color-text-muted);
--button-disabled-opacity: 1;
```

#### Card Variants

```css
/* STANDARD CARD */
--card-bg: var(--color-bg-secondary);
--card-border: 1px solid var(--color-border-default);
--card-border-hover: 1px solid var(--color-border-subtle);
--card-radius: var(--radius-lg);
--card-padding: var(--space-card-padding);
--card-shadow: var(--shadow-card);
--card-shadow-hover: var(--shadow-card-hover);

/* PRODUCT CARD */
--product-card-bg: var(--color-bg-secondary);
--product-card-border: 1px solid var(--color-border-default);
--product-card-radius: var(--radius-lg);
--product-card-image-radius: var(--radius-md);
--product-card-image-aspect: 1 / 1;
--product-card-padding: var(--space-card-padding);
--product-card-title-lines: 2;

/* SELECTION CARD */
--selection-card-bg: var(--color-bg-secondary);
--selection-card-border: 1.5px solid var(--color-border-default);
--selection-card-border-selected: 1.5px solid var(--color-text-primary);
--selection-card-radius: var(--radius-lg);
--selection-card-padding: var(--space-card-padding);
```

#### Input Variants

```css
/* TEXT INPUT */
--input-bg: var(--color-bg-tertiary);
--input-text: var(--color-text-primary);
--input-placeholder: var(--color-text-tertiary);
--input-border: none;
--input-border-focus: 1.5px solid var(--color-text-primary);
--input-border-error: 1.5px solid var(--color-error);
--input-height: var(--size-input-height);
--input-radius: var(--radius-md);
--input-padding-x: var(--space-input-padding-x);
--input-font-size: var(--typography-body-size);

/* INPUT LABEL */
--input-label-color: var(--color-text-secondary);
--input-label-font-size: var(--typography-caption-medium-size);
--input-label-font-weight: var(--typography-caption-medium-weight);
--input-label-margin-bottom: var(--space-label-input-gap);
```

#### Badge Variants

```css
/* STATUS BADGE - Available */
--badge-available-bg: var(--color-success-muted);
--badge-available-text: var(--color-success);

/* STATUS BADGE - Pending */
--badge-pending-bg: var(--color-warning-muted);
--badge-pending-text: var(--color-warning);

/* STATUS BADGE - Sold */
--badge-sold-bg: var(--color-error-muted);
--badge-sold-text: var(--color-error);

/* BADGE COMMON */
--badge-padding-x: 12px;
--badge-padding-y: 6px;
--badge-radius: var(--radius-full);
--badge-font-size: var(--typography-small-medium-size);
--badge-font-weight: var(--typography-small-medium-weight);

/* TAG BADGE */
--tag-bg: var(--color-bg-tertiary);
--tag-text: var(--color-text-secondary);
--tag-padding-x: 8px;
--tag-padding-y: 4px;
--tag-radius: var(--radius-sm);
--tag-font-size: var(--typography-small-size);
```

#### List Item Variants

```css
/* STANDARD LIST ITEM */
--list-item-bg: transparent;
--list-item-bg-hover: var(--color-bg-tertiary);
--list-item-height-single: var(--size-list-item-single);
--list-item-height-double: var(--size-list-item-double);
--list-item-divider: 1px solid var(--color-border-default);
--list-item-icon-size: var(--size-icon-container);
--list-item-icon-radius: var(--radius-md);
--list-item-icon-bg: var(--color-bg-tertiary);
--list-item-gap: var(--space-icon-text-gap);

/* LIST ITEM TEXT */
--list-item-title-color: var(--color-text-primary);
--list-item-title-size: var(--typography-body-size);
--list-item-subtitle-color: var(--color-text-secondary);
--list-item-subtitle-size: var(--typography-caption-size);
--list-item-value-color: var(--color-text-primary);
```

#### Modal Variants

```css
/* BOTTOM SHEET */
--sheet-bg: var(--color-bg-secondary);
--sheet-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
--sheet-padding-x: var(--space-modal-padding);
--sheet-padding-top: var(--space-modal-header-padding);
--sheet-padding-bottom: var(--space-modal-padding);
--sheet-max-height: 90vh;
--sheet-handle-bg: var(--color-bg-elevated);
--sheet-handle-width: var(--size-sheet-handle-width);
--sheet-handle-height: var(--size-sheet-handle-height);
--sheet-overlay: var(--color-overlay);

/* CENTER MODAL */
--modal-bg: var(--color-bg-secondary);
--modal-radius: var(--radius-2xl);
--modal-padding: var(--space-modal-padding);
--modal-max-width: var(--size-modal-max-width);
--modal-width: var(--size-modal-width);
--modal-overlay: var(--color-overlay);
--modal-shadow: var(--shadow-modal);
```

#### Navigation Variants

```css
/* SEGMENTED CONTROL */
--segmented-bg: var(--color-bg-tertiary);
--segmented-height: var(--size-segmented-height);
--segmented-radius: var(--radius-segmented);
--segmented-padding: 8px;
--segmented-active-bg: var(--color-text-primary);
--segmented-active-text: var(--color-bg-primary);
--segmented-inactive-bg: transparent;
--segmented-inactive-text: var(--color-text-secondary);
--segmented-indicator-radius: var(--radius-xl);

/* TAB BAR */
--tabbar-bg: var(--color-bg-secondary);
--tabbar-height: var(--size-tabbar-height);
--tabbar-border: 1px solid var(--color-border-default);
--tabbar-icon-size: var(--size-icon-md);
--tabbar-active-color: var(--color-text-primary);
--tabbar-inactive-color: var(--color-text-tertiary);
--tabbar-label-size: var(--typography-small-size);
```

---

### 10.9 Token Quick Reference

#### Most Used Tokens

| Purpose | Token | Value |
|---------|-------|-------|
| Screen padding | `--space-screen-padding` | 24px |
| Card padding | `--space-card-padding` | 16px |
| Card radius | `--radius-card` | 16px |
| Input radius | `--radius-input` | 12px |
| Button radius | `--radius-button` | 9999px (pill) |
| Button height | `--size-button-height` | 56px |
| Input height | `--size-input-height` | 56px |
| Header height | `--size-header-height` | 64px |
| Touch target min | `--size-touch-target-min` | 44px |
| Background | `--color-bg-primary` | #09090B |
| Card background | `--color-bg-secondary` | #18181B |
| Input background | `--color-bg-tertiary` | #27272A |
| Text primary | `--color-text-primary` | #FAFAFA |
| Text secondary | `--color-text-secondary` | #A1A1AA |
| Border default | `--color-border-default` | #27272A |
| Transition | `--transition-all` | all 200ms ease |

---

*Tokens are immutable. Use exactly as defined.*
