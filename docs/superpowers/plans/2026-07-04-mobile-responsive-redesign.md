# Mobile Responsive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a mobile-considered responsive experience across the whole site without breaking any existing desktop behavior.

**Architecture:** Additive CSS media queries layered inside existing rules. Two React components (`MagneticBtn`, `PhotoTrail`) gain capability-based touch guards (`matchMedia('(pointer: coarse)').matches`). Global breakpoint tokens introduced in `globals.css` and mirrored in `tailwind.config.ts`. Three commits, each shipped and verified independently.

**Tech Stack:** Next.js 15 (App Router, `output: "export"`), TypeScript, Tailwind 3 + CSS Modules, D3 orthographic globe on `/map`.

**Spec:** `docs/superpowers/specs/2026-07-04-mobile-responsive-redesign-design.md`

---

## File Structure

Files created:
- `docs/superpowers/plans/2026-07-04-mobile-responsive-redesign.md` (this file)

Files modified — Phase 1 (Foundation):
- `app/layout.tsx` — add `viewport` export
- `app/globals.css` — breakpoint tokens, hero-text floor, mobile page padding, safe-area guards, body overflow guard
- `tailwind.config.ts` — screens config (additive, currently no responsive classes used)
- `components/Footer.module.css` — first-ever mobile MQ, tap targets, vertical stack
- `components/Nav.module.css` — dvh-based drawer height, drawer padding, compass shrink

Files modified — Phase 2 (Homepage):
- `components/Hero.tsx` — verify markup renders for the new stacked layout (no logic change)
- `components/Hero.module.css` — stacked composition ≤900px, border direction swap, stat counter strip
- `components/MagneticBtn.tsx` — early-return on coarse pointer
- `components/Marquee.module.css` — slower scroll on ≤768px
- `components/PlacesGrid.module.css` — 2-col at ≤899px, 1-col at ≤480px, card min-heights
- `components/Adrenaline.module.css` — card size + scroll-snap at ≤768px
- `components/Projects.module.css` — stacked row at ≤640px, readable chip sizes
- `components/PhotoTrail.tsx` — early-return on coarse pointer
- `components/About.tsx` — static hero image fallback when PhotoTrail silent
- `components/About.module.css` — style the static hero image slot

Files modified — Phase 3 (Sub-pages):
- `app/map/page.tsx` — mobile radius calc, tap-to-open polaroid, container sizing
- `app/map/[css if exists]` — bottom-sheet legend styling (add if needed)
- `components/ActivityContent.tsx` — active-tab scrollIntoView on mount
- `components/ActivityContent.module.css` — tab horizontal-scroll strip, stats 2-col, wave height, gallery grid
- `app/projects/projects.module.css` — wide-card vertical stack ≤768px
- `app/travels/travels.module.css` — 1-col cityGrid + stacked tripRow at ≤480px
- `app/travels/[slug]/destination.module.css` — apply ≤480px stack rules to any grid currently jumping straight from desktop
- `components/DestinationContent.tsx` — touch-guard any hover-only interactions (audit first)
- `CONTEXT.md` — session log entry after all three commits merged

---

## Verification Protocol (used in every task)

Every task ends with running the dev server and checking specific viewport widths. Commands to know:

```bash
# From project root
NODE_OPTIONS='' npx next dev
# Then open http://localhost:3000 in the browser
# Use Chrome DevTools → Toggle device toolbar (Cmd+Shift+M) to resize
```

**Widths to test (in order): 1440, 1024, 900, 768, 480, 375, 320**

At each width check:
- No horizontal scroll (except intentional: adrenaline card scroll, adrenaline tabs, marquee)
- No overlapping elements
- No text overflow past card boundaries
- All CTAs remain clickable
- Console has no new errors

**Push command** (used at end of each phase):
```bash
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main
```

---

## Phase 1 — Foundation (Commit A)

### Task 1: Add viewport metadata export

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add `Viewport` import and export**

Edit `app/layout.tsx`, change the import line and add a `viewport` export directly below the `metadata` export:

```ts
import type { Metadata, Viewport } from "next";
```

Add after the closing `};` of `metadata`:

```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
```

- [ ] **Step 2: Verify build compiles**

Run: `NODE_OPTIONS='' npx next build`
Expected: build succeeds without type errors.

- [ ] **Step 3: Verify dev server renders viewport meta**

Run: `NODE_OPTIONS='' npx next dev`
Load `http://localhost:3000`, view page source, confirm `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` (or equivalent Next.js output) is present.

### Task 2: Add breakpoint tokens and mobile base rules to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add breakpoint custom properties**

At the top of `:root { ... }` in `app/globals.css`, add:

```css
--bp-sm: 480px;
--bp-md: 768px;
--bp-lg: 900px;
--bp-xl: 1200px;
```

- [ ] **Step 2: Lower the hero text clamp floor**

Find the existing `--text-hero: clamp(5rem, 10vw, 9rem);` declaration and change to:

```css
--text-hero: clamp(3.25rem, 10vw, 9rem);
```

- [ ] **Step 3: Add mobile page padding at 480px**

Find the existing `@media (max-width: 768px) { :root { --page-px: 1.5rem; } }` block and add below it:

```css
@media (max-width: 480px) {
  :root { --page-px: 1rem; }
}
```

- [ ] **Step 4: Add body overflow + text-size-adjust guard**

Find the existing `body { ... }` rule in `globals.css` and add these two properties:

```css
overflow-x: hidden;
-webkit-text-size-adjust: 100%;
```

- [ ] **Step 5: Verify dev server still renders**

If dev server is not running: `NODE_OPTIONS='' npx next dev`. Load `http://localhost:3000` at 1440px width. Confirm nothing looks different on desktop (hero text still huge, page padding unchanged).

Resize to 375px. Confirm hero title text is now more reasonable (not clamped at 5rem = 80px). No horizontal scroll.

### Task 3: Add tailwind screens config

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add `screens` under `theme`**

Replace the current `theme` block:

```ts
theme: {
  extend: {
    fontFamily: {
      display: ["var(--font-display)", "sans-serif"],
      body: ["var(--font-body)", "sans-serif"],
    },
  },
},
```

with:

```ts
theme: {
  screens: {
    sm: "480px",
    md: "768px",
    lg: "900px",
    xl: "1200px",
  },
  extend: {
    fontFamily: {
      display: ["var(--font-display)", "sans-serif"],
      body: ["var(--font-body)", "sans-serif"],
    },
  },
},
```

- [ ] **Step 2: Verify build still succeeds**

Run: `NODE_OPTIONS='' npx next build`
Expected: build succeeds. Since no Tailwind responsive classes exist in the codebase today (per audit), nothing visual changes.

### Task 4: Fix Footer for mobile

**Files:**
- Modify: `components/Footer.module.css`

- [ ] **Step 1: Read the current file**

Read `components/Footer.module.css` to identify the `.footer`, `.links`, and any related class names in use.

- [ ] **Step 2: Add mobile media query at 640px**

Append at the end of the file:

```css
@media (max-width: 640px) {
  .footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding-block: 2rem;
  }

  .links {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
  }

  .links a {
    padding-block: 0.75rem;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
}
```

**Note:** Class names above (`.footer`, `.links`, `.links a`) must match the actual class names used in `components/Footer.tsx`. If Footer uses different class names (e.g., `.brand`, `.social`), adapt the selectors accordingly while keeping the same intent: vertical stack, 44px+ tap targets, generous gap.

- [ ] **Step 3: Verify footer at mobile widths**

Load homepage, scroll to footer. Resize to 375px. Confirm:
- Footer content is vertically stacked
- Links are clearly tappable (finger-sized targets)
- No horizontal overflow

Resize back to 1440px. Confirm footer looks identical to before (horizontal layout).

### Task 5: Fix Nav mobile drawer

**Files:**
- Modify: `components/Nav.module.css`

- [ ] **Step 1: Read the current mobile drawer rule**

Read `components/Nav.module.css` and find the drawer rule with `max-height: 420px`.

- [ ] **Step 2: Replace hardcoded height with dvh-based**

Replace `max-height: 420px;` with the two-line fallback pattern:

```css
max-height: calc(100vh - 60px);
max-height: calc(100dvh - 60px);
overflow-y: auto;
```

- [ ] **Step 3: Reduce padding on ultra-narrow screens**

Below the existing mobile drawer rule, append:

```css
@media (max-width: 480px) {
  .drawerLinks a {
    padding: 1rem var(--page-px);
  }
}
```

Adapt selector `.drawerLinks a` if the actual class name in Nav.tsx differs.

- [ ] **Step 4: Verify drawer at mobile widths**

Load homepage at 375px. Open hamburger. Confirm:
- Drawer opens without covering the entire viewport
- All links are visible and scrollable if list is long
- Tapping outside dismisses (existing behavior, verify unchanged)

Rotate to landscape (or resize to a short viewport). Confirm drawer doesn't overflow the screen.

### Task 6: Commit Phase 1

- [ ] **Step 1: Stage the phase 1 files**

```bash
cd "/Users/babraham/Bijin Beyond Borders"
git add app/layout.tsx app/globals.css tailwind.config.ts components/Footer.module.css components/Nav.module.css
```

- [ ] **Step 2: Verify staged changes**

Run: `git status && git diff --cached --stat`
Expected: exactly the 5 files above staged, no other changes.

- [ ] **Step 3: Full-width verification pass**

Load `http://localhost:3000` and cycle through widths **1440, 1024, 900, 768, 480, 375, 320**. On each width verify:
- Homepage renders without console errors
- No horizontal scroll (except intentional)
- Footer + Nav look correct
- All existing desktop visuals unchanged at 1440/1024

If any regression → fix before committing.

- [ ] **Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
Mobile: foundation - viewport, breakpoint tokens, footer, nav drawer

- Add explicit viewport export for reliable meta injection under static export
- Introduce --bp-sm/md/lg/xl tokens (480/768/900/1200) mirrored in tailwind config
- Lower --text-hero floor to 3.25rem so 320px viewports don't get 80px title
- Add --page-px 1rem override at 480px
- body: overflow-x hidden + text-size-adjust guard
- Footer: first mobile MQ, 44px tap targets, vertical stack at 640px
- Nav drawer: replace hardcoded 420px with dvh (vh fallback), reduce padding at 480px

Additive-only. No desktop changes. Phase 1 of 3.

Co-Authored-By: Claude Sonnet 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Push**

```bash
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main
```

Expected: `main -> main` push confirmation. GitHub Pages workflow will redeploy.

---

## Phase 2 — Homepage (Commit B)

### Task 7: Touch-guard MagneticBtn

**Files:**
- Modify: `components/MagneticBtn.tsx`

- [ ] **Step 1: Add early-return in useEffect**

In `MagneticBtn.tsx`, find the `useEffect(() => {` line. Insert directly after the opening brace, before `const wrap = wrapRef.current;`:

```ts
if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
  return;
}
```

- [ ] **Step 2: Verify desktop still magnetic**

Load homepage at 1440px. Hover over the Hero CTA. Confirm it still magnetizes toward cursor.

- [ ] **Step 3: Verify mobile is silent**

Open DevTools → toggle device toolbar → select iPhone SE (375px). Reload page. Confirm no console errors, button renders normally, no attempted magnetism on tap.

### Task 8: Touch-guard PhotoTrail

**Files:**
- Modify: `components/PhotoTrail.tsx`

- [ ] **Step 1: Add early-return in useEffect**

In `PhotoTrail.tsx`, find `useEffect(() => {`. Insert directly after the opening brace, before `const container = containerRef.current;`:

```ts
if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
  return;
}
```

- [ ] **Step 2: Verify desktop still trails**

Load `/about` at 1440px. Move mouse over the text panel. Confirm photos still trail the cursor.

- [ ] **Step 3: Verify mobile is silent**

Resize to 375px, reload. Confirm no photos flying around, no console errors. About page renders text only.

### Task 9: About static fallback image

**Files:**
- Modify: `components/About.tsx`
- Modify: `components/About.module.css`

- [ ] **Step 1: Read About.tsx to understand current structure**

Read `components/About.tsx`. Identify where `PhotoTrail` is rendered, and where a static fallback image should slot in the mobile layout.

- [ ] **Step 2: Add static image element with CSS-only visibility switch**

Instead of JS-detecting the device, use CSS: render both, hide one via media query. This avoids hydration mismatch. Add to About.tsx (inside the text panel or above it, matching existing structure):

```tsx
<div className={styles.mobileHeroImage} aria-hidden="true">
  <img src={photo("/photos/tokyo-2025/hero.jpeg")} alt="" loading="lazy" />
</div>
```

Ensure `photo` is imported at top: `import { photo } from "@/lib/basePath";` (if not already).

- [ ] **Step 3: Style the fallback image**

Append to `components/About.module.css`:

```css
.mobileHeroImage {
  display: none;
}

@media (max-width: 900px) {
  .mobileHeroImage {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    margin-block-end: 2rem;
  }

  .mobileHeroImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
```

- [ ] **Step 4: Verify**

Load `/about` at 1440px. Confirm no image above text panel; PhotoTrail works as before.
Resize to 375px. Confirm the Tokyo hero image renders above the text panel at 4:3 aspect, PhotoTrail is inert.

### Task 10: Hero stacked composition on mobile

**Files:**
- Modify: `components/Hero.module.css`

- [ ] **Step 1: Read the full current Hero.module.css to identify all class names in play**

Read the full file. Note the class names for: root grid, text panel, image container, stat counters section.

- [ ] **Step 2: Append mobile rules**

At the end of `Hero.module.css`, append (adapt class names to match the actual file):

```css
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    min-height: auto;
  }

  .textPanel {
    padding: 2rem var(--page-px) 3rem;
    border-inline-end: none;
    border-block-start: 1px solid var(--rule);
    order: 2;
  }

  .imagePanel,
  .heroImage {
    /* adapt to actual image wrapper class name */
    order: 1;
    aspect-ratio: 4 / 5;
    width: 100%;
    max-height: 70vh;
  }

  .index {
    padding-block-start: 0;
  }

  .stats {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
    margin-block-start: 2rem;
  }

  .stats > * {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .textPanel {
    padding: 1.5rem var(--page-px) 2.5rem;
  }

  .stats {
    gap: 0.5rem;
  }
}
```

**Note:** Class names `.hero`, `.textPanel`, `.imagePanel`, `.heroImage`, `.index`, `.stats` must be verified against the actual module CSS. If names differ, substitute — do NOT invent selectors.

- [ ] **Step 3: Verify Hero on desktop**

Load homepage at 1440px. Confirm hero looks pixel-identical to before (3fr/2fr grid, image on right, text panel on left with vertical rule).

- [ ] **Step 4: Verify Hero on mobile**

Resize to 375px. Confirm:
- Image is on top, full-width, 4:5 aspect
- Text panel below image, tighter padding
- Stat counters render as a horizontal strip below title
- CTA button visible and tappable
- No horizontal scroll
- Title text scaled reasonably (not 80px)

Test 320, 480, 768, 900 widths — each should look intentional, no broken transitions.

### Task 11: Marquee slower on mobile

**Files:**
- Modify: `components/Marquee.module.css`

- [ ] **Step 1: Find the animation duration declaration**

Read `components/Marquee.module.css`. Find the current animation or CSS variable that sets scroll duration (likely `animation: ... 30s linear infinite;` or `--marquee-duration: 30s;`).

- [ ] **Step 2: Override at ≤768px**

Append:

```css
@media (max-width: 768px) {
  .track {
    /* adapt selector to actual animated element class */
    animation-duration: 45s;
  }
}
```

If the file uses a CSS variable pattern instead, override the variable inside the media query.

- [ ] **Step 3: Verify**

Load homepage at 1440px. Confirm marquee scrolls at the same speed as before.
Resize to 375px. Confirm marquee is noticeably slower and text is readable as it passes.

### Task 12: PlacesGrid responsive collapse

**Files:**
- Modify: `components/PlacesGrid.module.css`

- [ ] **Step 1: Read current grid rules and existing 900px MQ**

Read `components/PlacesGrid.module.css`. Note the current 5-card grid structure and any existing media query rules.

- [ ] **Step 2: Add layered mobile rules**

Ensure the existing `@media (max-width: 900px)` block collapses to 2-col (`grid-template-columns: 1fr 1fr`) — if already 2-col, leave it. Then append:

```css
@media (max-width: 480px) {
  .grid {
    /* adapt selector */
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card {
    /* adapt selector — every card class used */
    min-height: 260px;
  }
}
```

For the 481–899 range, if not already 2-col, add:

```css
@media (min-width: 481px) and (max-width: 899px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .card {
    min-height: 220px;
    grid-column: auto;
    grid-row: auto;
  }
}
```

The `grid-column: auto; grid-row: auto;` resets any explicit placement from the desktop 5-card bento.

- [ ] **Step 3: Verify**

Test at 1440 (5-card bento intact), 900 (transition), 800 (2-col), 480 (1-col), 375 (1-col with generous card height). No overlap, no cropped images.

### Task 13: Adrenaline horizontal cards resize + snap

**Files:**
- Modify: `components/Adrenaline.module.css`

- [ ] **Step 1: Read current card sizing rule**

Read `components/Adrenaline.module.css`. Find the card wrapper class using `clamp(200px, 32vw, 320px)` for `flex-basis` or `width`.

- [ ] **Step 2: Append mobile size + snap**

```css
@media (max-width: 768px) {
  .card {
    /* adapt selector to match the actual card class */
    flex: 0 0 clamp(240px, 78vw, 300px);
    scroll-snap-align: start;
  }

  .track {
    /* adapt selector to match the scrollable container */
    scroll-snap-type: x mandatory;
    gap: 1.25rem;
  }
}
```

- [ ] **Step 3: Verify**

At 1440px, confirm the strip looks identical.
At 375px, confirm cards are ~293px wide (roughly 78vw), with ~1.2 cards visible per screen, and dragging snaps to the next card on release.

### Task 14: Projects homepage list stacked at 640px

**Files:**
- Modify: `components/Projects.module.css`

- [ ] **Step 1: Read the current row grid**

Read the file, note the row grid structure (currently `grid-template-columns: 3.5rem 1fr auto 2rem` per audit).

- [ ] **Step 2: Append mobile row layout**

```css
@media (max-width: 640px) {
  .row {
    grid-template-columns: 2rem 1fr;
    grid-template-rows: auto auto auto;
    row-gap: 0.5rem;
    padding-block: 1.25rem;
    min-height: 44px;
  }

  .num {
    grid-column: 1;
    grid-row: 1;
  }

  .info {
    grid-column: 2;
    grid-row: 1;
  }

  .chips {
    grid-column: 1 / -1;
    grid-row: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .meta {
    grid-column: 1 / -1;
    grid-row: 3;
    justify-content: flex-start;
  }

  .chip {
    font-size: clamp(0.65rem, 2.5vw, 0.75rem);
    padding-inline: 0.5rem;
  }
}
```

**Note:** Selectors `.row`, `.num`, `.info`, `.chips`, `.meta`, `.chip` must be verified against the actual module. If different, adapt while keeping the layout intent (3-row stack, chip readability, generous vertical padding).

- [ ] **Step 3: Verify**

At 1440px, projects list identical to before.
At 375px, confirm rows stack readably: num in corner, name+desc filling right, chips wrap below, meta at bottom. Chip text is readable (not 0.55rem).

### Task 15: Commit Phase 2

- [ ] **Step 1: Stage the phase 2 files**

```bash
git add components/Hero.module.css components/MagneticBtn.tsx components/Marquee.module.css components/PlacesGrid.module.css components/Adrenaline.module.css components/Projects.module.css components/PhotoTrail.tsx components/About.tsx components/About.module.css
```

Only include files actually modified. If Hero.tsx was not touched, omit it.

- [ ] **Step 2: Full-width verification pass**

Load `http://localhost:3000` and cycle through **1440, 1024, 900, 768, 480, 375, 320**. Check homepage sections and /about page. Confirm:
- Desktop pixel-identical at 1440
- Hero stacks correctly at ≤900
- MagneticBtn silent on mobile
- PhotoTrail silent on /about mobile, static image shown instead
- PlacesGrid collapses cleanly through breakpoints
- Adrenaline cards resize with snap
- Projects rows stack readably

- [ ] **Step 3: Commit**

```bash
git commit -m "$(cat <<'EOF'
Mobile: homepage - hero, places, adrenaline, projects, about

- Hero: stacked composition at <=900px, image on top, stats strip, tighter padding
- MagneticBtn: early-return on coarse pointer (touch devices), desktop unchanged
- Marquee: 45s scroll duration at <=768px for readability
- PlacesGrid: 2-col at 481-899px, 1-col at <=480px with min-height guard
- Adrenaline drag scroll: cards clamp(240px, 78vw, 300px) at <=768px with scroll-snap
- Projects list: 3-row stack at <=640px, chip font clamp(0.65rem, 2.5vw, 0.75rem)
- PhotoTrail: early-return on coarse pointer
- About: static hero image slot renders on mobile via CSS-only visibility switch

All additive. Desktop layouts unchanged. Phase 2 of 3.

Co-Authored-By: Claude Sonnet 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 4: Push**

```bash
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main
```

---

## Phase 3 — Sub-pages + Polish (Commit C)

### Task 16: Map globe scale-up + mobile layout

**Files:**
- Modify: `app/map/page.tsx`

- [ ] **Step 1: Read the current radius calc and resize handler**

Read lines 210-260 and 590-620 of `app/map/page.tsx` (initial calc + resize handler). Note the two spots where `radius = Math.min(W, H) / 2 - 32` appears.

- [ ] **Step 2: Update both radius calcs to mobile-aware version**

Both instances of `Math.min(W, H) / 2 - 32` become:

```ts
Math.min(W, H) / 2 - (W < 768 ? 8 : 32)
```

- [ ] **Step 3: Add tap-to-open behavior for polaroids**

Find where the polaroid mouseenter/mouseleave listeners are attached to city markers. Add a `pointerdown` fallback for touch. For each city marker with a photo, attach:

```ts
marker.on("click", function(event) {
  event.stopPropagation();
  if (window.matchMedia("(pointer: coarse)").matches) {
    // trigger the same open logic as mouseenter
    showPolaroid(cityData);
  }
});
```

Also add a global tap-away dismiss on the svg background:

```ts
svg.on("click", (event) => {
  if (event.target === svg.node()) {
    hidePolaroid();
  }
});
```

Exact function names `showPolaroid` / `hidePolaroid` depend on the current implementation — adapt to the actual variable names.

- [ ] **Step 4: Add globe container mobile sizing**

If the map page uses a wrapping div for the globe (`wrapRef`), find its CSS (either in a module file or inline). Add:

```css
@media (max-width: 768px) {
  /* Adapt selector to actual class */
  .globeWrap {
    min-height: calc(100vh - 60px - 8rem);
    min-height: calc(100dvh - 60px - 8rem);
  }
}
```

If no CSS module exists for the map page, add the rule to `globals.css` under a `#map-page` or similar selector, OR create a new `app/map/map.module.css`.

- [ ] **Step 5: Verify**

Load `/map` at 1440px. Confirm globe rotates, moon orbits, polaroids appear on hover — all identical to before.

At 375px:
- Globe is visibly larger (radius padding is 8 instead of 32)
- Rotates on touch drag
- Tapping a city marker opens the polaroid
- Tapping outside dismisses
- Layout does not overflow

### Task 17: ActivityContent (adrenaline sport page) mobile layout

**Files:**
- Modify: `components/ActivityContent.tsx`
- Modify: `components/ActivityContent.module.css`

- [ ] **Step 1: Add scrollIntoView for active tab on mount**

In `ActivityContent.tsx`, find the tabs render block. Add a `ref` to the tab strip container and to each tab button. In a `useEffect` that runs on mount, scroll the active tab into view:

```ts
const activeTabRef = useRef<HTMLAnchorElement>(null);

useEffect(() => {
  activeTabRef.current?.scrollIntoView({
    inline: "center",
    block: "nearest",
    behavior: "auto",
  });
}, []);
```

Attach `ref={activeTabRef}` to the tab element whose slug matches the current active slug.

- [ ] **Step 2: Add mobile tab strip styles**

Append to `ActivityContent.module.css`:

```css
@media (max-width: 900px) {
  .tabs {
    /* adapt selector — the tab strip container */
    overflow-x: auto;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-inline: var(--page-px);
    justify-content: flex-start;
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  .switchBtn {
    /* adapt selector */
    min-width: auto;
    padding-inline: 1rem;
    scroll-snap-align: center;
    flex: 0 0 auto;
  }
}
```

- [ ] **Step 3: Add mobile stats grid + wave + gallery rules**

Append:

```css
@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .name {
    word-break: break-word;
  }

  .bigNum {
    display: none;
  }
}

@media (max-width: 768px) {
  .wave {
    height: 100px;
  }

  .gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
  }
}
```

Adapt selectors `.stats`, `.name`, `.bigNum`, `.wave`, `.gallery` to match actual class names.

- [ ] **Step 4: Verify**

Load `/adrenaline/mma` at 1440. Confirm everything intact (scramble, glitch, wave, tags, tabs).
At 375px:
- Tabs are horizontally scrollable, active tab centered on mount
- Big activity name doesn't clip
- Stats grid is 2×N
- Wave canvas shorter but still animating
- Photo gallery single column
- All effects (scramble, glitch, wave, tag rotator, film grain) still fire

Repeat quick check at `/adrenaline/ski` and `/adrenaline/surf` to catch any per-sport-specific breakage.

### Task 18: Projects page wide-card vertical stack

**Files:**
- Modify: `app/projects/projects.module.css`

- [ ] **Step 1: Read the wide-card CSS**

Read `app/projects/projects.module.css`. Identify the wide-card selectors (Sculptura + Portfolio use `layout: "wide"`, Atlas uses `layout: "phone"`).

- [ ] **Step 2: Append mobile stack rule**

```css
@media (max-width: 768px) {
  .wideCard {
    /* adapt selector to actual wide-layout card class */
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .wideCardImage {
    /* adapt selector to actual image wrapper */
    aspect-ratio: 16 / 10;
    width: 100%;
    order: 1;
  }

  .wideCardText {
    /* adapt selector to actual text panel */
    order: 2;
    padding: 1.5rem var(--page-px);
  }

  .phoneCard {
    /* adapt selector — if any padding is too tight */
    padding-inline: var(--page-px);
  }
}

@media (max-width: 480px) {
  .phoneCard {
    padding-block: 1.5rem;
  }
}
```

- [ ] **Step 3: Verify**

Load `/projects` at 1440. Sculptura, Atlas, Portfolio all render as before.
At 375px:
- Sculptura and Portfolio wide cards stack vertically (screenshot on top, text below)
- Atlas phone card retains its shape but with mobile padding
- Psychology Traits list entry stacks per the homepage projects rule

### Task 19: Travels responsive stacks

**Files:**
- Modify: `app/travels/travels.module.css`
- Modify: `app/travels/[slug]/destination.module.css`
- Modify: `components/DestinationContent.tsx` (only if hover interactions exist that need touch guards — check first)

- [ ] **Step 1: Read travels.module.css**

Read the existing file. Note `.cityGrid`, `.tripRow`, `.tripRight` and their current 768px rule.

- [ ] **Step 2: Add ≤480px rule to travels.module.css**

Append:

```css
@media (max-width: 480px) {
  .cityGrid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .tripRow,
  .tripRight {
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
  }
}
```

- [ ] **Step 3: Read destination.module.css**

Read `app/travels/[slug]/destination.module.css`. Find any `grid-template-columns` rule that goes from a multi-column desktop layout directly to a single 768px MQ (skipping intermediate).

- [ ] **Step 4: Add ≤480px stack rules**

`destination.module.css` currently has one MQ at `max-width: 900px` collapsing `.body` to single column and `.gallery` to 2-col at 200px row height. At 480px, the 2-col gallery becomes crushed thumbnails. Append:

```css
@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
    grid-auto-rows: 240px;
  }
}
```

If any other grid rules exist that skip mobile treatment (verify by re-reading the file), add matching `≤480px` stack rules with `grid-template-columns: 1fr`.

- [ ] **Step 5: Check DestinationContent.tsx for hover interactions**

Read `components/DestinationContent.tsx`. Search for `onMouseEnter`, `onMouseLeave`, or any hover-only interactive logic. If found, wrap the useEffect setup with the same `pointer: coarse` guard used in MagneticBtn and PhotoTrail. If no hover logic exists, no change to this file.

- [ ] **Step 6: Verify**

Load `/travels` at 1440 → 768 → 480 → 375. Cards flow cleanly through each width.
Load `/travels/tokyo-2025` (or any destination slug) at same widths. Photo grids and meta rows don't crush.

### Task 20: Final QA sweep

**Files:** none modified.

- [ ] **Step 1: Full site walkthrough at each width**

For each width in **1440, 1024, 900, 768, 480, 375, 320**, visit every page:
- `/`
- `/about`
- `/travels`
- `/travels/tokyo-2025` (any slug)
- `/map`
- `/projects`
- `/adrenaline/mma`
- `/adrenaline/ski`
- `/adrenaline/surf`
- `/adrenaline/snorkel`
- `/adrenaline/skydive`
- `/adrenaline/scuba`

At each page + width, verify:
- No horizontal scroll (except intentional)
- No console errors
- All CTAs and navigation work
- Effects still fire (scramble, glitch, wave, tag rotator, film grain, marquee)
- Desktop pixel-identical at 1440

- [ ] **Step 2: Update CONTEXT.md session log**

Prepend a `2026-07-04 (mobile pass)` entry to the Active session log in `CONTEXT.md`:

```markdown
- **2026-07-04 (mobile pass):**
  - Full mobile-responsive redesign across the site. All desktop quirks preserved.
  - Introduced breakpoint tokens `--bp-sm/md/lg/xl` (480/768/900/1200) in `globals.css`, mirrored in `tailwind.config.ts`.
  - Touch-detection pattern for cursor-dependent components: `window.matchMedia("(pointer: coarse)").matches` early-returns in the useEffect. Applied to `MagneticBtn.tsx` and `PhotoTrail.tsx`. Use this same pattern for future cursor-driven components.
  - Homepage: Hero stacks image-over-text at ≤900px, PlacesGrid collapses 5→2→1, Adrenaline drag cards enlarge to ~1.2 cards per viewport with scroll-snap, Projects rows stack readably at ≤640px, About shows a static hero image on mobile in place of PhotoTrail.
  - Sub-pages: /map globe scaled up on mobile (radius padding 32→8), polaroid tap-to-open. Adrenaline sport pages: tab strip becomes horizontal scroll with active-tab centered on mount, stats 2-col, wave shorter. /projects wide cards stack vertically. /travels grids collapse to single column at 480px.
  - Nav drawer uses `dvh` (vh fallback) instead of hardcoded 420px. Footer has its first mobile MQ (vertical stack, 44px tap targets).
  - Explicit `viewport` metadata export in `app/layout.tsx` to guarantee meta injection under static export.
  - Spec: `docs/superpowers/specs/2026-07-04-mobile-responsive-redesign-design.md`.
  - Plan: `docs/superpowers/plans/2026-07-04-mobile-responsive-redesign.md`.
```

- [ ] **Step 3: Stage Phase 3 files**

```bash
git add app/map/page.tsx components/ActivityContent.tsx components/ActivityContent.module.css app/projects/projects.module.css app/travels/travels.module.css "app/travels/[slug]/destination.module.css" CONTEXT.md
```

Add `components/DestinationContent.tsx` if it was modified. Add any map module CSS if created.

- [ ] **Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
Mobile: sub-pages - map globe, adrenaline sport, projects, travels

- /map: globe radius padding drops from 32 to 8 on mobile (~15% larger)
- /map: polaroid tap-to-open on coarse pointer, tap-away to dismiss
- /adrenaline/[slug]: tabs become horizontal-scroll strip with active tab centered on mount
- /adrenaline/[slug]: stats to 2-col, wave height 100px, gallery 2-col then 1-col
- /projects: wide featured cards (Sculptura, Portfolio) stack vertically at <=768px
- /travels: cityGrid 1-col + tripRow stacked at <=480px
- /travels/[slug]: destination grids stack at <=480px where they previously crushed
- CONTEXT.md: session log updated with breakpoint tokens and touch-detection pattern

All desktop layouts unchanged. Phase 3 of 3. Mobile redesign complete.

Co-Authored-By: Claude Sonnet 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Push**

```bash
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main
```

- [ ] **Step 6: Confirm deploy**

Wait ~90 seconds for GitHub Pages workflow to redeploy. Open `https://bijinabraham.github.io/bijin-beyond-borders/` (or wherever the live URL resolves) on a real phone if possible. Verify:
- Site loads
- Hero stacks correctly
- Map globe is visibly scaled
- No obvious layout break on any page

---

## Rollback (if any regression discovered post-push)

For a single-phase regression:

```bash
cd "/Users/babraham/Bijin Beyond Borders"
git revert <sha-of-offending-commit>
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null git push origin main
```

Diagnose in a new branch. Re-apply with fix.
