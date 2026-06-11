# Design System — Bijin Beyond Borders

## Color Strategy

**Restrained** — warm off-white base, oxblood as the single brand color, terracotta as warm accent.

### Palette

```css
--bg:       oklch(0.93 0.016 14);   /* warm blush-white — base surface */
--surface:  oklch(0.89 0.020 14);   /* slightly deeper surface for cards, panels */
--surface2: oklch(0.85 0.024 14);   /* deepest surface — image panels, about bg */
--ink:      oklch(0.14 0.022 14);   /* near-black with oxblood warmth — body text */
--primary:  oklch(0.34 0.11 14);    /* deep oxblood — brand color, headings, CTAs */
--accent:   oklch(0.58 0.19 32);    /* terracotta — warm highlight, primary buttons */
--muted:    oklch(0.44 0.010 14);   /* secondary text — minimum 4.5:1 vs --bg */
--rule:     oklch(0.82 0.018 14);   /* borders, dividers */
```

All colors in OKLCH. No hex. Never introduce warmth via bg; let primary and accent carry it.

### Image treatment

Images render at full natural color — no filter, no blend mode. The warm surface lets photography breathe without desaturation.

---

## Typography

### Fonts

| Role    | Family        | Weights       | Source       |
|---------|---------------|---------------|--------------|
| Display | Josefin Sans  | 300 400 700   | Google Fonts |
| Body    | Nunito Sans   | 300 400 500   | Google Fonts |

```html
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;0,700;1,300&family=Nunito+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

### Scale

```css
--text-xs:   clamp(0.65rem, 0.9vw, 0.72rem);
--text-sm:   clamp(0.78rem, 1.0vw, 0.85rem);
--text-base: clamp(0.92rem, 1.2vw, 1.00rem);
--text-lg:   clamp(1.05rem, 1.5vw, 1.20rem);
--text-xl:   clamp(1.30rem, 2.0vw, 1.80rem);
--text-2xl:  clamp(1.80rem, 3.0vw, 2.50rem);
--text-3xl:  clamp(2.50rem, 4.5vw, 3.50rem);
--text-hero: clamp(5.00rem, 10vw, 9.00rem);
```

### Rules

- Display (Josefin Sans): uppercase, weight 700, letter-spacing -0.025em to -0.03em
- Body (Nunito Sans): weight 300–400, line-height 1.75–1.85
- Max body line length: 65ch
- `text-wrap: balance` on h1–h3; `text-wrap: pretty` on long prose
- Hero ceiling: 9rem (clamp max). Letter-spacing floor: -0.03em

---

## Layout

### Spacing scale

```css
--space-1: 0.5rem;
--space-2: 1rem;
--space-3: 1.5rem;
--space-4: 2rem;
--space-6: 3rem;
--space-8: 4rem;
--space-section: clamp(4rem, 10vw, 8rem);
```

### Grid

- **Content max-width**: 1440px, centered
- **Page padding**: 3rem desktop, 1.5rem mobile
- **Bento grid**: `grid-template-columns: repeat(4, 1fr)` — large cell spans 2×2
- **Hero**: `grid-template-columns: 3fr 2fr` — type-dominant left, image right
- **About**: `grid-template-columns: 1fr 1fr` — equal split

### Section borders

Sections divided by `1px solid var(--rule)` — no shadows, no radius on structural elements.

---

## Motion

### Principles

- Josefin Sans display type entrances: slide up + fade, `cubic-bezier(0.16, 1, 0.3, 1)`, 600ms
- Image reveals: scale from 1.05 → 1, fade in, staggered in grids
- Hover on cards: `transform: scale(1.04)`, 700ms `cubic-bezier(0.16, 1, 0.3, 1)`
- Page transitions: crossfade, 300ms ease-out
- Nav: no animation — instant

### Library

Framer Motion (React). Use `useInView` for scroll-triggered reveals.

### Reduced motion

Every animated element must have a `prefers-reduced-motion` fallback — either instant or crossfade only. Never gate content visibility on animation completion.

---

## Components

### Button — Primary

```css
background: var(--accent);
color: oklch(1 0 0);
font-family: Josefin Sans;
font-weight: 700;
font-size: var(--text-sm);
letter-spacing: 0.15em;
text-transform: uppercase;
padding: 0.85rem 1.75rem;
/* No border-radius — sharp edges match the geometric type */
```

### Button — Ghost

```css
color: var(--primary);
border-block-end: 1px solid var(--primary);
padding-block-end: 0.15rem;
font-family: Josefin Sans;
font-weight: 600;
font-size: var(--text-sm);
letter-spacing: 0.12em;
text-transform: uppercase;
```

### Nav brand

```css
font-family: Josefin Sans;
font-weight: 700;
font-size: var(--text-sm);
letter-spacing: 0.2em;
text-transform: uppercase;
color: var(--primary);
```

### Bento card image

Full bleed, `object-fit: cover`, natural color (no filter), `overflow: hidden`.
Hover: `transform: scale(1.04)` on the img, 700ms expo-out.

---

## Absolute bans (inherited from impeccable)

- No gradient text
- No side-stripe borders
- No border-radius > 4px on structural elements (images, panels, sections)
- No hero metric template (big number + stats)
- No repeated uppercase eyebrow above every section
- No warm-cream/sand/beige background (this palette avoids it via hue 14°, not hue 40–100)
- No `box-shadow` + `border` ghost-card pattern
