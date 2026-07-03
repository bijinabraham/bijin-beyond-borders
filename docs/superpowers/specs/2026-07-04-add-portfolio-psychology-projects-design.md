# Add Portfolio and Psychology Traits to /projects

**Date:** 2026-07-04
**Scope:** Data-file edit to `lib/projectsData.ts` + one screenshot asset. No component or style changes.

## What changes

1. Remove the "Project Three" placeholder entry.
2. Add two new project entries in this order:
   - `03` Portfolio (`wide` featured card, screenshot supplied by user)
   - `04` Psychology Traits (list-only, no URL, no screenshot)
3. Add `public/projects/portfolio.png` (already saved).

## New entries

### 03 Portfolio
- **name:** "Portfolio"
- **desc:** "Personal portfolio with dual positioning modes (elevation vs section), editorial + technical drawing aesthetic. Every diagram drawn as inline SVG."
- **longDesc:** "Career site for Bijin Abraham built as a technical drawing. Holds two positioning modes behind a nav toggle: Elevation (outside view, manager scope and pipeline) and Section (inside view, IC craft and streaming architecture). Every diagram, from the hero portrait to project architectures, is inline SVG in the site's own visual language."
- **tag:** "Website"
- **year:** "2026"
- **url:** `https://bijinabraham.github.io`
- **screenshot:** `/projects/portfolio.png`
- **layout:** `wide`
- **stack:** `["Next.js 16", "React 19", "Framer Motion", "TypeScript"]`
- **role:** "Design + Development"
- **live:** `true`
- **statusNote:** `null`

### 04 Psychology Traits
- **name:** "Psychology Traits"
- **desc:** "Autonomous YouTube Shorts pipeline. Two educational Shorts per week on cognitive biases. Runs on GitHub Actions. Zero infra cost."
- **longDesc:** `null`
- **tag:** "Automation"
- **year:** "2026"
- **url:** `null` (channel not yet launched)
- **screenshot:** `null`
- **layout:** `wide` (unused since no screenshot; will render in the list)
- **stack:** `["Remotion", "ElevenLabs", "Pexels API", "YouTube API", "GitHub Actions", "TypeScript"]`
- **role:** "Design + Development"
- **live:** `false`
- **statusNote:** `"Pipeline built, awaiting channel launch"`

## Featured-vs-list behavior

Per existing selection logic (`projects.filter(p => p.screenshot)` for featured, rest fall to list):
- Featured (with big cards): Sculptura, Atlas, Portfolio
- List: Psychology Traits

## Deploy

Commit + push to `main` with the GIT_CONFIG bypass. GitHub Pages workflow publishes automatically.

## Session log update

Append a 2026-07-04 entry to `CONTEXT.md` covering the two new projects.
