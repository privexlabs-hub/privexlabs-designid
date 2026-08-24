# PrivexLabs Brand Kit

The PrivexLabs brand identity playbook and template editor, built from the
[PrivexLabs Design System](https://claude.ai/design/p/4b47b58b-8af4-4ddf-8a71-c0d8c30c1d62)
Claude Design project.

Next.js 16 (App Router), React 19, TypeScript. Frontend only — no backend, no API routes,
no database. `next build` emits a fully static site to `out/`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run assets   # regenerate derived brand assets in public/brand
npm run typecheck
```

## What is here

| Route | Contents |
|---|---|
| `/` | Overview — six pillars, playbook index, editor index |
| `/playbook/logo` | Mark construction, eight variations, clear space, minimums, prohibitions |
| `/playbook/color` | Mineral & Signal — viridian, green-cast neutrals, brass, semantics, dark theme, pairing rules |
| `/playbook/type` | Archivo / Newsreader / IBM Plex Mono, the 13-step scale, casing rules |
| `/playbook/layout` | Spacing, radius, containers, grid, surfaces, motifs, diagram spec, responsive rules |
| `/playbook/motion` | Durations, curves, interaction states, reduced motion |
| `/playbook/voice` | Tone, the six-part structure, worked good/bad examples, banned list |
| `/playbook/social` | The social grammar, category treatments, content lifecycle, metadata, repurposing map |
| `/playbook/governance` | Rules, accessibility floor, how the system is changed, the shipping test |
| `/playbook/components` | The live component library — 21 components |
| `/assets` | Every identity file, individually or as one zip |
| `/editor` | The template editor |

## The editor

130 templates across 11 format groups, every one produced from the same tokens:

| Group | Count | Canvas |
|---|---|---|
| Square | 20 | 1080×1080 |
| Engagement | 20 | 1080×1080 |
| Carousel | 10 | 1080×1080 |
| Vertical | 14 | 1080×1920 |
| Portrait | 8 | 1080×1350 |
| YouTube | 12 | 1280×720 |
| Cover · Banners | 10 | X, LinkedIn, Facebook, YouTube art, Twitch, podcast, newsletter, OG, event, community |
| Avatar | 8 | 400×400 |
| Ads | 10 | 1200×628, 1080×1080 |
| Email | 8 | 1200×400 / ×500 / ×800 |
| Web | 10 | 1600×900, 1200×800, 1600×400, 1200×630 |

Each template is a preset over one of 25 shared layouts, so a copy or token change
propagates everywhere rather than being re-drawn per format.

**Editable per artboard:** every text field the layout uses, list items, canvas size
(22 presets), surface (paper / elevated / muted / foundation dark / viridian), accent
(brass or viridian), alignment, lockup variant (lockup / wordmark / mark / none), footer
rule, top viridian band, and registration marks. The controls only expose choices the
system permits — there is no free colour picker and no font menu.

**Export:**

- one artboard as PNG, JPEG, WebP, SVG or PDF, at 1×, 2× or 3×
- one artboard in **every** format as a zip
- **every template in the current group** as a zip
- **all 130 templates** as a zip

Rasterisation runs entirely in the browser. Typefaces are self-hosted under `/fonts` and
inlined into each export, so exported images carry the real Archivo, Newsreader and
IBM Plex Mono rather than a fallback. Batch runs render one artboard at a time off-screen,
so a 130-item export never holds more than one artboard in the DOM.

## Assets

`public/brand` holds the whole identity library — 21 SVGs, 30 PNGs and `favicon.ico`.
The eight files imported from the design system are the originals; the rest are generated
by `npm run assets` (see `scripts/generate-assets.mjs`).

Two notes on the requested avatar set: the brief asked for an *indigo* default and a
*radial* campaign variant. The brand's owned hue is viridian, and governance prohibits
gradients — so the default avatar is viridian, and the campaign variant uses concentric
registration rings, which is the system's own motif language. Both are documented on
`/assets`.

## Layout

```
public/
  brand/            identity library — SVG originals, generated variants, png/ rasters
  fonts/            self-hosted woff2 (latin + latin-ext) for the three families
src/
  app/              routes
  components/
    canvas/         Artboard — the 25 layouts every template renders through
    ds/             the design system component library, ported to typed React
    editor/         stage, inspector, export panel and batch runner
    site/           playbook chrome and page furniture
  lib/
    brand.ts        playbook data — mirrors tokens.css
    palette.ts      literal token values used by artboards
    export.ts       PNG / JPEG / WebP / SVG / PDF and zip packaging
    assets.ts       generated manifest of public/brand
    templates/      the type model, layout field schemas, and the 130 presets
  styles/
    tokens.css      colors, typography, spacing and motion — imported verbatim
    ds.css          ported component styles
    fonts.css       generated @font-face for the self-hosted files
    globals.css     base layer plus this site's own chrome
```

## Where the imported files went

| Source | Here |
|---|---|
| `tokens/colors.css`, `typography.css`, `spacing.css`, `motion.css` | `src/styles/tokens.css`, verbatim |
| `tokens/fonts.css` (Google Fonts import) | `src/styles/fonts.css` — self-hosted woff2, required for export font embedding |
| `tokens/base.css`, `styles.css` | folded into `src/styles/globals.css` |
| `assets/*.svg` | `public/brand/`, unchanged, plus generated variants and rasters |
| `components/**/*.jsx` | `src/components/ds/index.tsx`, typed; `px-*` classes renamed `pxds-*` to avoid collision with this site's chrome |
| `readme.md`, `guidelines/*.html` | the playbook pages and `src/lib/brand.ts` |
| `social/*.html` | the social grammar in `/playbook/social` and the template registry |

The four `ui_kits/` reference screens were not ported. They are starting points for
product surfaces rather than brand-kit material, and the component library plus the
playbook cover the same ground for this app's purpose.

## Conventions

- Tokens only. Artboards use literal values from `src/lib/palette.ts` — copied verbatim
  from `tokens.css` — because export clones the node into an off-document tree where
  inherited custom properties are not guaranteed. Move a token, move it there too.
- Sentence case everywhere. ALL-CAPS only in mono annotations.
- No gradients, no glassmorphism, no shadow at rest, no emoji.
