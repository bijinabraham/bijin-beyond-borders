# Mobile-Considered Responsive Redesign

**Date:** 2026-07-04
**Scope:** Full site pass to give mobile visitors an intentional experience instead of a squashed desktop.
**Non-goal:** Removing or degrading any desktop quirk. All existing effects stay on desktop.
**Ship:** One combined spec, three commits (one per phase).

---

## Guiding constraint

**Nothing from the original quirks is removed.** Interpretation:

- **Desktop unchanged.** Every effect, quirk, animation, and layout that exists today keeps working exactly as it does now on `≥900px` widths.
- **Mobile gets touch-appropriate variants** of cursor-dependent effects. Since a touchscreen has no cursor, MagneticBtn magnetism, PhotoTrail cursor trail, TiltCard hover-tilt, and Cursor context states are silent on mobile — the underlying elements render as well-styled static or touch-appropriate versions. This is not "removing" the effect: desktop users still get it.
- **Cursor-independent effects stay on mobile** because they already work with touch: text scramble, idle glitch, tag word rotator, intensity wave canvas, film grain, Marquee ticker, adrenaline horizontal drag (touch drag is native), D3 globe drag rotation, moon orbit.

---

## Breakpoint system

Introduce four consistent breakpoints, defined once in `globals.css` and mirrored in `tailwind.config.ts`:

| Token | Width | Purpose |
|-------|-------|---------|
| `--bp-sm` | 480px | phone / small phone boundary |
| `--bp-md` | 768px | tablet / large phone boundary |
| `--bp-lg` | 900px | current "mobile stack" threshold |
| `--bp-xl` | 1200px | wide desktop |

Existing `@media (max-width: 900px)` blocks stay working; new rules layer on at 768/480 where components currently jump from desktop straight to broken.

Safe-area insets added for notched phones via `env(safe-area-inset-*)` on the root layout.

---

## Phase 1 — Foundation (single commit)

Global changes that everything downstream depends on.

### 1.1 Viewport metadata

`app/layout.tsx`: add explicit `viewport` export.

```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
```

Guarantees survival across `output: "export"` build regardless of Next.js version defaults.

### 1.2 `globals.css` base tokens

- Add breakpoint custom properties from the table above.
- Update `--text-hero` clamp: `clamp(3.25rem, 10vw, 9rem)` (was `clamp(5rem, 10vw, 9rem)` — the 5rem floor was still too big on 320px screens).
- New `--page-px` values: `1rem` at ≤480px, `1.5rem` at ≤768px (existing), `2.5rem` above.
- Add `padding-inline: max(var(--page-px), env(safe-area-inset-left))` pattern on top-level containers.
- Add `body { overflow-x: hidden; -webkit-text-size-adjust: 100%; }` guard.

### 1.3 `tailwind.config.ts`

Mirror the breakpoints so any Tailwind classes added later resolve consistently:

```ts
theme: {
  screens: {
    sm: "480px",
    md: "768px",
    lg: "900px",
    xl: "1200px",
  },
}
```

### 1.4 `Footer.module.css` (zero MQ today)

- Vertical stack at ≤640px: brand + tagline on top, social/nav links below with generous tap targets (min 44×44px).
- `gap: 1rem` on mobile (was 2rem).
- Links get `padding: 0.75rem 0` to hit 44px minimum touch target.

### 1.5 `Nav.module.css` mobile drawer

- Replace hardcoded `max-height: 420px` with `max-height: calc(100dvh - var(--nav-h, 60px))` and `overflow-y: auto`.
- Drawer links get `padding: 1rem var(--page-px)` (removes ultra-narrow-screen crush).
- Compass icon shrinks slightly on ≤480px.

---

## Phase 2 — Homepage (single commit)

### 2.1 `Hero.tsx` + `Hero.module.css`

**Desktop (≥900px):** unchanged. 3fr/2fr grid, clip-path title reveal, parallax image, stat counters, MagneticBtn CTA — all intact.

**Mobile (<900px):** stacked composition.
- Order: nav → image full-bleed (aspect-ratio 4/5, `object-fit: cover`) → text panel with `padding: 2rem var(--page-px)`.
- Title clip-path reveal still fires (animation works at any size, no change needed).
- Stat counters: horizontal strip below title (was aligned right on desktop), each stat gets equal width via `flex: 1`.
- MagneticBtn: JS effect self-disables on touch devices (`if ('ontouchstart' in window) return;`). Button renders as a normal well-styled CTA with the same visual treatment (border, letter-spacing, arrow). Tap target ≥44px.
- Border between image and text panel: replace `border-inline-end` (desktop) with `border-block-start` (mobile) inside a media query.

### 2.2 `Marquee.module.css`

- Slow scroll animation on mobile: `--marquee-duration: 45s` on ≤768px (was 30s). Same visual effect, more readable at narrow widths.
- No layout change needed.

### 2.3 `PlacesGrid.module.css`

Three breakpoint tiers:
- **≥900px:** current 5-card bento (`grid-template-columns: 2fr 1fr 1fr`) — unchanged.
- **481–899px:** `grid-template-columns: 1fr 1fr`, cards flow naturally, each min-height 220px.
- **≤480px:** `grid-template-columns: 1fr`, single column stack, card min-height 260px (photos remain generously proportioned, not thumbnail-sized).

### 2.4 `Adrenaline.module.css` (homepage horizontal drag scroll)

- Card flex-basis: `clamp(200px, 32vw, 320px)` becomes `clamp(240px, 78vw, 300px)` at ≤768px.
- Result: on 375px screens, ~1.2 cards visible per screen (293px card + peek of next). Feels touch-native, encourages horizontal exploration.
- Add `scroll-snap-type: x mandatory` and `scroll-snap-align: start` on cards for release-snap.
- Increase gap between cards at mobile (`gap: 1.25rem`) for touch breathing room.

### 2.5 `Projects.tsx` + `Projects.module.css` (homepage list)

**Desktop:** unchanged.

**Mobile (≤640px):**
- Row layout: `grid-template-columns: 2rem 1fr`, `grid-template-rows: auto auto auto`.
- Row structure: num on top-left, name+desc filling right side of top row, description wraps, chips flow to second row (spans both columns), meta (year/tag) to third row.
- Chip font-size: `clamp(0.65rem, 2.5vw, 0.75rem)` (was fixed 0.55rem — unreadable).
- Live-dot indicator moves inline next to name.
- Full row becomes tap target (existing behavior, verify padding hits 44px min).

### 2.6 `About.tsx` + `PhotoTrail.tsx`

**Desktop:** PhotoTrail cursor trail unchanged.

**Mobile (≤900px):**
- PhotoTrail component early-returns on `!('mousemove' in window)` OR `matchMedia('(pointer: coarse)').matches`.
- Replace with a single static hero image slot in the About text panel: pick the first photo from PhotoTrail's photo array, render at 100% width with aspect-ratio 4/3, `object-fit: cover`.
- Text panel and copy stay identical.

---

## Phase 3 — Sub-pages + polish (single commit)

### 3.1 `/map` (D3 globe)

**Globe scale-up on mobile — user-flagged priority.**

- Radius calculation becomes viewport-aware:
  ```ts
  const isMobile = W < 768;
  let radius = Math.min(W, H) / 2 - (isMobile ? 8 : 32);
  ```
  On 375px width, globe grows from ~311px diameter to ~359px (+15%). The tighter padding lets the globe visually dominate.
- Globe container: `min-height: calc(100dvh - var(--nav-h) - 8rem)` on mobile so it takes the majority of the fold.
- City legend / info panel: on mobile, collapses to a bottom sheet (fixed to viewport bottom, `max-height: 40dvh`, drag-to-expand affordance). Above 768px, keeps current inline position.
- Polaroid hover cards → tap-to-open on touch:
  - Detect touch via `pointer: coarse` media query.
  - On tap of city marker, polaroid opens centered above the marker; tap outside dismisses.
  - Globe freeze behavior remains identical (3s auto-resume after dismiss).
- Moon orbit stays.

### 3.2 `/adrenaline/[slug]` + `ActivityContent.module.css`

**Desktop:** unchanged. Scramble, glitch, wave, tag rotator, tabs, film grain — all intact.

**Mobile (≤900px):**
- **Tab strip:** switches from centered row to horizontal-scroll strip (`overflow-x: auto`, `scroll-snap-type: x proximity`, active tab scrolls itself into view via `scrollIntoView({ inline: "center", block: "nearest" })` on mount).
- **Tab button min-width:** removed on mobile (currently 110px). Buttons size to content with generous horizontal padding.
- **Big activity name:** existing clamp works. Add `word-break: break-word` guard for narrow screens.
- **Decorative big number (right column):** hidden on ≤900px (currently only hidden ≤900, verify).
- **Wave canvas:** height reduces to 100px on mobile (was ~140px), full viewport width.
- **Stats grid:** switches to `grid-template-columns: repeat(2, 1fr)` on mobile with `gap: 1rem`.
- **Photo gallery:** single column stack ≤480px, 2-col at 481–768px.
- **Idle glitch + scramble + tag rotator + film grain:** all stay, all render fine at mobile size.

### 3.3 `/projects` page

**Desktop:** unchanged.

**Mobile (≤768px):**
- **Wide featured cards** (Sculptura, Portfolio): vertical stack — screenshot full-bleed on top with aspect-ratio locked to 16/10, text panel below with padding, meta row below that.
- **Phone card** (Atlas): already vertically-oriented. Minor spacing tweak: reduce outer padding on ≤480px so the phone frame gets breathing room without card overflow.
- **List-only project** (Psychology Traits): same layout as homepage projects list on mobile (see 2.5).
- **Live-dot + status pill:** wrap onto own row if row width overflows.

### 3.4 `/travels` + `/travels/[slug]`

**Current state:** `app/travels/travels.module.css` has one MQ at 768px, `.cityGrid` collapses to 2-col below that. `/travels/[slug]` uses `app/travels/[slug]/destination.module.css` + `components/DestinationContent.tsx`.

**Mobile changes:**
- **`.cityGrid`:** add `≤480px` rule → `grid-template-columns: 1fr` (single column, cards get full width for readable photos).
- **`.tripRow`:** current mobile columns `120px 1fr` at ≤768px. Add `≤480px` rule: `grid-template-columns: 1fr` (date stacks above content instead of side-by-side, full-width trip photo).
- **`.tripRight`:** same treatment as `.tripRow` at ≤480px.
- **Section titles:** existing `clamp(3rem, 7vw, 6rem)` already scales — leave alone.
- **`/travels/[slug]` destination.module.css + DestinationContent:** apply the same breakpoint tokens. Any grid that currently jumps from desktop straight to 768px gets an intermediate ≤480px stack rule (photo grids to 1-col, meta rows to vertical stack). Concrete rules TBD during implementation by inspecting each grid in the file — but the pattern is uniform: whatever collapses at 768px collapses further to single-column at 480px.

### 3.5 QA pass

Manually verify on 320px, 375px, 414px, 768px, 1024px, 1440px widths using the dev tools device toolbar. Check:
- No horizontal scroll anywhere except intentional (adrenaline scroll, tabs, marquee).
- All tap targets ≥ 44×44px.
- Hero image loads without CLS.
- Nav drawer opens and links are all tappable.
- Globe rotates on touch drag on /map.
- Polaroid opens on tap.
- Adrenaline sport-page tabs scroll smoothly.

---

## Files touched

**Phase 1:**
- `app/layout.tsx` (viewport export)
- `app/globals.css` (breakpoint tokens, base rules)
- `tailwind.config.ts` (screens config)
- `components/Footer.module.css`
- `components/Nav.module.css`

**Phase 2:**
- `components/Hero.tsx` (touch detection for MagneticBtn)
- `components/Hero.module.css`
- `components/Marquee.module.css`
- `components/PlacesGrid.module.css`
- `components/Adrenaline.module.css`
- `components/Projects.tsx` (verify tap target)
- `components/Projects.module.css`
- `components/About.tsx` (fallback image slot)
- `components/PhotoTrail.tsx` (early return on coarse pointer)

**Phase 3:**
- `app/map/page.tsx` (radius calc, layout, tap-to-open polaroid, globe container sizing)
- `components/ActivityContent.tsx` (scrollIntoView for active tab)
- `components/ActivityContent.module.css`
- `app/projects/page.tsx` + `app/projects/projects.module.css` (wide/phone featured card mobile layouts)
- `app/travels/travels.module.css`
- `app/travels/[slug]/destination.module.css`
- `components/DestinationContent.tsx` (touch-detection guards if any hover effects exist)

---

## Commit plan

- **Commit A (Phase 1):** `Mobile: foundation — viewport, breakpoint tokens, footer, nav drawer`
- **Commit B (Phase 2):** `Mobile: homepage — hero, places, adrenaline, projects, about`
- **Commit C (Phase 3):** `Mobile: sub-pages — map globe, adrenaline sport, projects, travels`

Each pushed with `GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main` (per project convention). GitHub Pages redeploys after each push.

---

## Session log

After all three commits, append 2026-07-04 entry to `CONTEXT.md` covering the mobile pass, including the breakpoint tokens introduced and the touch-detection pattern used for MagneticBtn / PhotoTrail (for future components to reference).

---

## What this spec does NOT include

- No new features. Mobile pass only.
- No copy changes.
- No color / palette changes.
- No new components. Everything is CSS + minor JS touch-detection additions.
- No changes to `/adrenaline/[slug]` content data or effect logic — only layout / sizing.
- No design-directions HTML mockups (project uses these for exploratory work, but the mobile treatments here are direct fixes/adaptations, not new design language).
