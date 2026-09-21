# PrivexLabs Brand Kit

The PrivexLabs brand identity playbook and template editor, built from the
[PrivexLabs Design System](https://claude.ai/design/p/4b47b58b-8af4-4ddf-8a71-c0d8c30c1d62)
Claude Design project.

Next.js 16 (App Router), React 19, TypeScript. Frontend only — no backend, no API routes,
no database. `next build` emits a fully static site to `out/`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out — public edition, no internal strategy
npm run build:internal  # the same, including the company document's internal strategy
npm run assets   # regenerate derived brand assets in public/brand
npm run typecheck
```

## What is here

| Route | Contents |
|---|---|
| `/` | Overview — the company in one line, the six areas of work, playbook index, editor index |
| `/playbook/company` | Who PrivexLabs is: overview, vision, mission, six areas of work, approach, principles, value, customers, positioning, products |
| `/playbook/logo` | Mark construction, eight variations, clear space, minimums, prohibitions |
| `/playbook/color` | Mineral & Signal — viridian, green-cast neutrals, brass, semantics, dark theme, pairing rules |
| `/playbook/type` | Archivo / Newsreader / IBM Plex Mono, the 13-step scale, casing rules |
| `/playbook/layout` | Spacing, radius, containers, grid, surfaces, motifs, diagram spec, responsive rules |
| `/playbook/motion` | Durations, curves, interaction states, reduced motion |
| `/playbook/voice` | Tone, the six-step writing structure mapped to the approach, worked good/bad examples, banned list |
| `/playbook/social` | The social grammar, category treatments, content lifecycle, metadata, repurposing map |
| `/playbook/governance` | Rules, accessibility floor, how the system is changed, the shipping test |
| `/playbook/components` | The live component library — 21 components |
| `/brand-brief` | The whole brand as one copy-pasteable Markdown pack, plus `/brand-brief.md` |
| `/assets` | Every identity file, individually or as one zip |
| `/editor` | The template editor |

## The editor

151 templates across 12 format groups, every one produced from the same tokens:

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
| Articles | 21 | Medium, LinkedIn article, X/LinkedIn link card, X article 5:2, Substack/OG, DEV, Hashnode, newsletter, square, portrait, story |

Each template is a preset over one of 25 shared layouts, so a copy or token change
propagates everywhere rather than being re-drawn per format.

**Editable per artboard:** every text field the layout uses, list items, canvas size
(28 presets), surface (paper / elevated / muted / foundation dark / viridian), accent
(brass or viridian), alignment, lockup variant (lockup / wordmark / mark / none), footer
rule, top viridian band, and registration marks. The controls only expose choices the
system permits — there is no free colour picker and no font menu.

**Export:**

- one artboard as PNG, JPEG, WebP, SVG or PDF, at 1×, 2× or 3×
- one artboard in **every** format as a zip
- **an article design at every platform size** as a zip — Articles only, 11 sizes in one click
- **every template in the current group** as a zip
- **all 151 templates** as a zip

Rasterisation runs entirely in the browser. Typefaces are self-hosted under `/fonts` and
inlined into each export, so exported images carry the real Archivo, Newsreader and
IBM Plex Mono rather than a fallback. Batch runs render one artboard at a time off-screen,
so an export of the whole catalogue never holds more than one artboard in the DOM.

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
    canvas/         Artboard — the 28 layouts every template renders through; ArticleFrame and fit.ts size article text to each canvas
    ds/             the design system component library, ported to typed React
    editor/         stage, inspector, export panel and batch runner
    site/           playbook chrome and page furniture
  lib/
    brand.ts        the brand's single source of truth — every documented rule
    brand-brief.ts  builds the copy-pasteable Markdown pack from brand.ts + templates
    download.ts     downloadBlob / slugify, kept clear of the rasteriser
    palette.ts      literal token values used by artboards
    export.ts       PNG / JPEG / WebP / SVG / PDF and zip packaging
    assets.ts       generated manifest of public/brand
    templates/      the type model, layout field schemas, and the 151 presets
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

## Articles

Covers and share cards for anything we publish. Open any **Articles** template, type the
title, subtitle and byline once, and export.

- **Type it once.** The article's copy and author photo carry to every other Articles
  template you open — including fields a layout doesn't show, so a subtitle survives a visit
  to the key-figure template. The group export uses it too. Reset copy restores a template's
  own example.
- **Export for every platform.** One button renders the design you're looking at at all 11
  sizes below and zips them.
- **Text fits itself.** Title and subtitle sizes are measured against the real typeface and
  fitted to the space each canvas actually has, from a 1000×420 DEV cover to a 1080×1920
  story. Nothing overflows; long titles step down in size instead.
- **Brand on every file.** Mono category label and content ID, the lockup, a byline with the
  author's photo or initials, and optionally registration marks and the signal-trace motif.
- **Treatments follow the social system.** Newsreader for long-form writing and quotation —
  research, tutorials, opinion; Archivo for engineering, product, announcements and case studies. The title typeface is a
  switch in the inspector.

Three layouts: **cover**, **pull quote** (a line from the article, attributed back to it) and
**key figure** (one number with its sample, attributed back to the article). Eleven platform
templates plus ten treatments: research, engineering note, opinion, release notes,
announcement, tutorial, case study, series part, pull quote, key figure.

| Platform | Size | Basis |
|---|---|---|
| LinkedIn article / newsletter cover | 1920×1080 | [LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/a517940) — also advises keeping headline text central, so that template is centred |
| X / LinkedIn link card | 1200×628 | The 1.91:1 large-image card both platforms use |
| X article cover | 1500×600 | X recommends a 5:2 aspect ratio for article images; 1500px wide matches the X header, and a 2× export gives 3000×1200 |
| Substack / blog share | 1200×630 | [Substack support](https://support.substack.com/hc/en-us/articles/4408381685268-What-are-the-optimal-image-dimensions-for-my-Substack-publication): at least 1200×630 |
| Medium story cover | 1200×680 | Medium publishes no pixel spec, only "a wide horizontal rectangle" ([Medium Help](https://help.medium.com/hc/en-us/articles/215680047-Setting-a-featured-image-on-your-post)); 1200×680 is the commonly recommended size |
| DEV cover | 1000×420 | DEV's cover ratio |
| Hashnode cover | 1600×840 | Hashnode's 1.9:1 ratio ([Hashnode](https://townhall.hashnode.com/how-to-create-cover-images-for-your-devblog-posts)) |
| Newsletter header | 1200×400 | Existing email size |
| Square · portrait · story promo | 1080×1080 · 1080×1350 · 1080×1920 | Existing feed sizes; the story keeps content out of the top and bottom 11% platform chrome |

Platform specs change. They are defined once, in `ARTICLE_PACK` and `SIZES` in
`src/lib/templates/types.ts`.

## Brand brief

`/brand-brief` assembles the company document and every brand rule into one Markdown pack,
for briefing a writer, an agency, or an external AI tool asked to write content, build a
strategy, or plan a calendar. Each section is independently copyable:

the company · the six areas of work and products · how we work · why PrivexLabs · customers ·
positioning and lead line · voice · dos and don'ts · worked examples · vocabulary · content
operating system · social grammar · the full template catalogue · visual foundations ·
governance · prompt scaffolds — and, in the internal build only, strategy.

The last section matters most in practice: four ready prompts (write an asset, build a
calendar, repurpose one source, review a draft) that name the exact fields a template expects
and the rules the output must satisfy.

Copy per section, copy everything, download `.md`, or fetch it at a stable URL —
`/brand-brief.md`, emitted by a static route handler at `src/app/brand-brief.md/route.ts`.
Every one of those paths serves the same `FULL_BRIEF` string, so they cannot diverge; the
page shows the raw Markdown it copies rather than a second rendered view of it.

Two lists are marked as **derived** — roles reached and vocabulary-in-use are observed from
the templates rather than stated in the company document, and say so in their own text.

## The company document

`src/lib/company-document.ts` holds the company's own description of itself, **verbatim** —
overview, vision, mission, the six areas of work, approach, value proposition, customers,
positioning, differentiation, principles, taglines and strategy. The Company page and the brand
brief render it; nothing paraphrases it. One deliberate edit fixes the grammar of §20
("PrivexLabs should begin broadly…").

- **Brand architecture.** The document's six areas of work are the brand's architecture. Each
  has a category label (`01 / AI ENGINEERING` … `06 / TRAINING`); the company itself uses
  `00` (`00 / NEWS`, `00 / R&D`, …). Templates build labels with `eyebrow()`, never by typing
  them. The lead line is **Build. Deploy. Own AI.**
- **Internal strategy.** Business model, product strategy, long-term advantage, R&D, the
  strategic direction and the unchosen tagline candidates are internal. `npm run build`
  leaves them out of `out/` entirely; `npm run build:internal` (`INCLUDE_INTERNAL=1`)
  includes them, marked "Internal — do not quote in published copy".
- **Example copy.** Templates draw people, figures and content IDs from `src/lib/examples.ts`.
  PrivexLabs' own people appear by role only until real names are supplied; customers are
  fictional, with names and roles. No example is tied to a city, country, region or language.
  PrivexBot, one of PrivexLabs' products, is described only by what it does.

**`src/lib/brand.ts` is the single source of truth.** Rules that used to sit as literals
inside the playbook page components now live there, and the pages and the brief both read
from it — so a rule cannot be true on one page and stale in the pack. Presentational values
(backgrounds, widths, font constants) stay in the pages.

## Conventions

- Tokens only. Artboards use literal values from `src/lib/palette.ts` — copied verbatim
  from `tokens.css` — because export clones the node into an off-document tree where
  inherited custom properties are not guaranteed. Move a token, move it there too.
- Sentence case everywhere. ALL-CAPS only in mono annotations.
- Brand rules belong in `src/lib/brand.ts`, never inline in a page. Both the playbook and
  the brand brief render from it, so an inline literal is a future contradiction.
- No gradients, no glassmorphism, no shadow at rest, no emoji.
