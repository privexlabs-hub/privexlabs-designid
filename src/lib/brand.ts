/**
 * Brand data for the PrivexLabs identity playbook.
 * Values mirror `src/styles/tokens.css` exactly — the CSS is the source of truth,
 * this file is the human-readable index the playbook renders from.
 */

import {
  AREA_AI_ENGINEERING, AREA_INFRASTRUCTURE, AREA_MODELS, AREA_PRIVATE_AI, AREA_SOFTWARE,
  AREA_TRAINING, DEFINITION, OVERVIEW, type AreaText,
} from "./company-document";
import { PRIVEXBOT } from "./examples";

// The company document is part of the brand data: pages import it from here.
export * from "./company-document";

export type Swatch = { name: string; token: string; value: string; note?: string };

export const viridianRamp: Swatch[] = [
  { name: "Viridian 100", token: "--viridian-100", value: "#DDEDE7" },
  { name: "Viridian 200", token: "--viridian-200", value: "#AFD6C9" },
  { name: "Viridian 300", token: "--viridian-300", value: "#6DB4A0" },
  { name: "Viridian 400", token: "--viridian-400", value: "#2F8A72" },
  { name: "Viridian 500", token: "--viridian-500", value: "#166553", note: "Focus ring" },
  { name: "Viridian 600", token: "--viridian-600", value: "#0E5A4A", note: "Brand primary" },
  { name: "Viridian 700", token: "--viridian-700", value: "#0B4A3D", note: "Primary hover" },
  { name: "Viridian 800", token: "--viridian-800", value: "#0A3B31" },
  { name: "Viridian 900", token: "--viridian-900", value: "#0A2B25" },
];

export const neutralRamp: Swatch[] = [
  { name: "Neutral 0", token: "--neutral-0", value: "#FCFDFB", note: "Elevated surface" },
  { name: "Neutral 50", token: "--neutral-50", value: "#F6F8F4" },
  { name: "Neutral 100", token: "--neutral-100", value: "#EFF2EC", note: "Surface" },
  { name: "Neutral 200", token: "--neutral-200", value: "#E3E8E1", note: "Muted surface" },
  { name: "Neutral 300", token: "--neutral-300", value: "#CBD4CC", note: "Border" },
  { name: "Neutral 400", token: "--neutral-400", value: "#9EAAA3", note: "Strong border" },
  { name: "Neutral 500", token: "--neutral-500", value: "#6E7B75", note: "Muted text" },
  { name: "Neutral 600", token: "--neutral-600", value: "#45524C", note: "Secondary text" },
  { name: "Neutral 700", token: "--neutral-700", value: "#2A3530" },
  { name: "Neutral 800", token: "--neutral-800", value: "#19221E" },
  { name: "Neutral 900", token: "--neutral-900", value: "#0C110F", note: "Foundation" },
];

export const brassRamp: Swatch[] = [
  { name: "Brass 300", token: "--brass-300", value: "#E4C87E", note: "Selection, dark-surface signal" },
  { name: "Brass 500", token: "--brass-500", value: "#C0912F", note: "Accent" },
  { name: "Brass 700", token: "--brass-700", value: "#8A6414", note: "Accent ink on paper" },
];

export const semanticColors: Swatch[] = [
  { name: "Success", token: "--color-success", value: "#23744F" },
  { name: "Success surface", token: "--color-success-surface", value: "#E1EFE6" },
  { name: "Warning", token: "--color-warning", value: "#9A6A12" },
  { name: "Warning surface", token: "--color-warning-surface", value: "#F4EBD6" },
  { name: "Danger", token: "--color-danger", value: "#A63A2B" },
  { name: "Danger surface", token: "--color-danger-surface", value: "#F4E2DE" },
  { name: "Info", token: "--color-info", value: "#2B647F" },
  { name: "Info surface", token: "--color-info-surface", value: "#E0EBF0" },
];

export const darkThemeColors: Swatch[] = [
  { name: "Brand primary", token: "--color-brand-primary", value: "#3FA98D" },
  { name: "Brand primary hover", token: "--color-brand-primary-hover", value: "#5CBFA5" },
  { name: "Brand accent", token: "--color-brand-accent", value: "#D8A945" },
  { name: "Foundation", token: "--color-foundation", value: "#070B09" },
  { name: "Surface", token: "--color-surface", value: "#0C110F" },
  { name: "Surface elevated", token: "--color-surface-elevated", value: "#141B17" },
  { name: "Surface muted", token: "--color-surface-muted", value: "#19221E" },
  { name: "Text primary", token: "--color-text-primary", value: "#E9EDE8" },
  { name: "Text secondary", token: "--color-text-secondary", value: "#A9B4AD" },
  { name: "Border", token: "--color-border", value: "#263029" },
];

export type TypeStep = {
  name: string; token: string; size: string; line: string; tracking?: string;
  weight?: string; family: "sans" | "serif" | "mono"; use: string;
};

export const typeScale: TypeStep[] = [
  { name: "Display", token: "--text-display-*", size: "3.5rem / 56px", line: "1.05", tracking: "−0.02em", weight: "700", family: "sans", use: "Hero statements. One per screen, never longer than two lines." },
  { name: "Editorial", token: "--text-editorial-*", size: "2.75rem / 44px", line: "1.12", weight: "500", family: "serif", use: "Long-form titles and quotations — research, tutorials, opinion. Never product UI, figures or infrastructure." },
  { name: "H1", token: "--text-h1-*", size: "2.5rem / 40px", line: "1.1", tracking: "−0.015em", weight: "700", family: "sans", use: "Page title." },
  { name: "H2", token: "--text-h2-*", size: "1.875rem / 30px", line: "1.15", tracking: "−0.01em", weight: "600", family: "sans", use: "Section heading." },
  { name: "H3", token: "--text-h3-*", size: "1.4375rem / 23px", line: "1.25", tracking: "−0.005em", weight: "600", family: "sans", use: "Subsection, card title." },
  { name: "H4", token: "--text-h4-*", size: "1.125rem / 18px", line: "1.35", weight: "600", family: "sans", use: "Dense card and table headings." },
  { name: "Body large", token: "--text-body-lg-*", size: "1.125rem / 18px", line: "1.6", family: "sans", use: "Lead paragraph under a headline." },
  { name: "Body", token: "--text-body-*", size: "1rem / 16px", line: "1.6", family: "sans", use: "Default running text." },
  { name: "Body small", token: "--text-body-sm-*", size: "0.875rem / 14px", line: "1.55", family: "sans", use: "Secondary text, UI controls." },
  { name: "Caption", token: "--text-caption-*", size: "0.78125rem / 12.5px", line: "1.45", family: "sans", use: "Figure captions, table footnotes." },
  { name: "Label", token: "--text-label-*", size: "0.71875rem / 11.5px", line: "1.2", tracking: "0.08em", weight: "500", family: "mono", use: "Uppercase mono annotation — \"01 / AI ENGINEERING\". The only ALL-CAPS in the system." },
  { name: "Code", token: "--text-code-*", size: "0.84375rem / 13.5px", line: "1.6", family: "mono", use: "Inline and block code." },
  { name: "Data", token: "--text-data-*", size: "1.75rem / 28px", line: "1.1", family: "mono", use: "Tabular figures, metrics, dashboard numbers." },
];

export const spacingScale = [
  { token: "--space-1", value: "4px" }, { token: "--space-2", value: "8px" },
  { token: "--space-3", value: "12px" }, { token: "--space-4", value: "16px" },
  { token: "--space-5", value: "24px" }, { token: "--space-6", value: "32px" },
  { token: "--space-7", value: "48px" }, { token: "--space-8", value: "64px" },
  { token: "--space-9", value: "96px" }, { token: "--space-10", value: "128px" },
];

export const radiusScale = [
  { token: "--radius-1", value: "2px", use: "Default — inputs, buttons, chips" },
  { token: "--radius-2", value: "4px", use: "Cards, panels" },
  { token: "--radius-3", value: "8px", use: "Modals, sheets" },
  { token: "--radius-round", value: "999px", use: "Badges only — nothing else is a pill" },
];

export const containers = [
  { token: "--container-editorial", value: "680px", use: "Long-form reading column" },
  { token: "--container-content", value: "1080px", use: "Standard page content" },
  { token: "--container-wide", value: "1320px", use: "Marketing and index pages" },
  { token: "--container-dashboard", value: "1600px", use: "Operational dashboards" },
];

export const motionScale = [
  { token: "--duration-1", value: "120ms", use: "State change — hover, press" },
  { token: "--duration-2", value: "200ms", use: "Reveal — dropdown, tab, tooltip" },
  { token: "--duration-3", value: "320ms", use: "Structural — modal, page transition" },
  { token: "--ease-standard", value: "cubic-bezier(.2,0,0,1)", use: "Everything entering or settling" },
  { token: "--ease-exit", value: "cubic-bezier(.4,0,1,1)", use: "Everything leaving" },
  { token: "--ease-flow", value: "cubic-bezier(.4,0,.2,1)", use: "Data-flow lines in diagrams" },
];

/* ------------------------------------------------------------------------- *
 * Areas of work — the brand architecture. The six areas are the company document's
 * own (§4–§7); each area's treatment is the brand's.
 * ------------------------------------------------------------------------- */

export type AreaId = "engineering" | "private" | "models" | "software" | "infrastructure" | "training";

export type Area = {
  id: AreaId;
  index: string;
  /** Verbatim from the company document. */
  name: string;
  /** Short mono label for category eyebrows. */
  label: string;
  eyebrow: string;
  intro: string;
  capabilities: readonly string[];
  closing: readonly string[];
  treatment: string;
};

const area = (id: AreaId, index: string, text: AreaText, label: string, treatment: string): Area => ({
  id, index, name: text.name, label, eyebrow: `${index} / ${label}`,
  intro: text.intro, capabilities: text.capabilities, closing: text.closing ?? [], treatment,
});

export const areas: Area[] = [
  area("engineering", "01", AREA_AI_ENGINEERING, "AI ENGINEERING", "Archivo and Plex Mono; system diagrams and evaluation tables."),
  area("private", "02", AREA_PRIVATE_AI, "PRIVATE AI", "Boundary diagrams on foundation dark; mono labels saying where the data sits."),
  area("models", "03", AREA_MODELS, "AI MODELS", "Model cards and mono figures; Newsreader for research write-ups."),
  area("software", "04", AREA_SOFTWARE, "SOFTWARE", "UI-forward on paper; real interface fragments."),
  area("infrastructure", "05", AREA_INFRASTRUCTURE, "INFRASTRUCTURE", "Foundation-dark bands, schematics, mono telemetry."),
  area("training", "06", AREA_TRAINING, "TRAINING", "Lighter density and numbered steps; Newsreader for long-form lessons."),
];

/** Company-wide category labels. 00 is the company itself. */
export const COMPANY_LABELS = {
  news: "NEWS", products: "PRODUCTS", rd: "R&D", opinion: "OPINION",
  community: "COMMUNITY", events: "EVENTS", careers: "CAREERS", aside: "ASIDE",
} as const;

export type LabelKey = AreaId | keyof typeof COMPANY_LABELS;

/**
 * The category label for a piece of content: "01 / AI ENGINEERING" for area work, "00 / NEWS"
 * for the company itself, with an optional format after a middle dot. Templates use this
 * rather than typing labels, so a label cannot drift from the architecture.
 */
export function eyebrow(key: LabelKey, format?: string): string {
  const a = areas.find((x) => x.id === key);
  const base = a ? a.eyebrow : `00 / ${COMPANY_LABELS[key as keyof typeof COMPANY_LABELS]}`;
  return format ? `${base} · ${format.toUpperCase()}` : base;
}

export const voiceRules = {
  tone: ["Clear", "Precise", "Calm", "Evidence-based", "Confident", "Practical", "Direct"],
  /**
   * The writing structure. It balances evidence-led writing with the company's six-step
   * approach: each step of a piece answers one step of how the work was done.
   */
  structure: [
    { step: "Problem", approach: "Understand" },
    { step: "Where AI helps, and where it does not", approach: "Identify" },
    { step: "What we tested", approach: "Design" },
    { step: "What we built", approach: "Build" },
    { step: "What works, and where it fails", approach: "Deploy" },
    { step: "What we measured, and what we learned", approach: "Measure" },
  ],
  banned: [
    "Hype words — revolutionary, game-changing, cutting-edge, unleash",
    "Exclamation marks",
    "Emoji, in copy and as icons",
    "Empty futurism — \"the future of everything\"",
    "Exaggerated or unverifiable claims",
    "Title Case in headlines, buttons or navigation",
    "Tying company claims or example copy to a city, country, region or language",
  ],
  person: ["\"We\" for PrivexLabs work.", "\"You / your organization\" for the customer.", "Never \"users\" when \"your team\" is truer."],
  examples: [
    { label: "Hero", good: "Build. Deploy. Own AI.", bad: "Revolutionizing AI for everyone!" },
    { label: "Research", good: "We evaluated 6 open models on one document-extraction task. Two were usable without customization. Here is where the others failed.", bad: "Our cutting-edge research unlocks game-changing insights." },
    { label: "Product", good: "PrivexBot builds chatbots on your organization's own knowledge bases. Add documents, reindex, and see what people ask in analytics.", bad: "PrivexBot: the smartest AI assistant you'll ever meet." },
    { label: "Outcome", good: "Median loan-file review time fell from two days to 40 minutes in nine weeks.", bad: "Our AI transformed their business!" },
  ],
};

export const motifRules = {
  use: [
    "Registration and crop marks at section corners",
    "Hairline grids and 1px rules carrying structure",
    "Orthogonal signal lines terminating in square nodes",
    "Mono index annotations — \"01 / AI ENGINEERING\", \"PXR-2026-07\"",
    "Layered system diagrams with labelled boundaries",
  ],
  avoid: [
    "Blobs, waves, organic gradients",
    "Circuit boards, neural nets, brains, robots",
    "Maps, flags, globes or cultural patterning as decoration",
    "Glassmorphism, blur (except modal scrims), drop shadows at rest",
    "Stock photography clichés and generated \"AI art\"",
  ],
};

export const logoRules = {
  clearSpace: "The brass node's width — one eighth of the mark height — on all four sides.",
  minimums: ["Mark: 20px", "Horizontal lockup: 96px wide", "Below 20px: use the filled favicon tile"],
  never: [
    "Recolour outside token colours",
    "Rotate, skew or stretch",
    "Add shadows, gradients or outlines",
    "Detach the brass node from the trace",
    "Redraw or re-trace the mark",
    "Build a separate logo per area — area lockups are wordmark + mono area label",
  ],
};

export const governance = [
  "Tokens only. Never hardcode a colour or size; a new colour needs a token proposal.",
  "One accent — brass — used sparingly. Never a large brass fill.",
  "One diagram language. 1.5px lines, square 4px nodes, orthogonal connectors, Plex Mono labels.",
  "Area lockups are typed, never separate logos.",
  "WCAG AA contrast, visible 2px viridian focus, 44px touch targets, semantic HTML, reduced motion respected.",
  "Mobile-first reflow — area grids stack, tables scroll, the editorial column stays 680px. Never merely shrink desktop.",
  "The shipping test: remove the logo. Is it still recognisably Privex? If not, strengthen the system — do not decorate the screen.",
];

export const lifecycle = [
  "IDEA", "RESEARCH", "DRAFT", "EDITORIAL REVIEW", "TECHNICAL REVIEW", "BRAND REVIEW",
  "DESIGN", "APPROVAL", "SCHEDULE", "PUBLISH", "MEASURE", "LEARN", "REUSE",
];

export const contentStatuses = ["IDEA", "DRAFT", "REVIEW", "DESIGN", "APPROVED", "SCHEDULED", "PUBLISHED", "REPURPOSE", "ARCHIVED"];

/* ------------------------------------------------------------------------- *
 * Content below this line was moved out of the playbook page components so
 * that the pages and the brand brief (src/lib/brand-brief.ts) render from one
 * source. Editing a rule here changes it everywhere it appears.
 * ------------------------------------------------------------------------- */

export const company = {
  name: "PrivexLabs",
  /** The company document's one-sentence definition. */
  definition: DEFINITION,
  /** The company document's opening sentence. */
  overview: OVERVIEW,
  /** The chosen lead line. */
  lead: "Build. Deploy. Own AI.",
  philosophy: [
    "Precision without coldness.",
    "Technology without cliché.",
    "Intelligence without arrogance.",
    "Real-world relevance without stereotypes.",
    "Enterprise credibility without corporate blandness.",
  ],
  sitsBetween:
    "The brand sits between a software engineering firm, an applied AI company and a trusted technical advisor: practical first, evidence always.",
};

/**
 * The lead line, and the document's other candidate taglines in the brand's sentence case.
 * Candidates are internal: they appear only in the internal build, never in templates.
 */
export const taglines = {
  lead: company.lead,
  // Compiled out of the public build (see company-document.ts).
  candidates: !(process.env.INCLUDE_INTERNAL === "1") ? [] : [
    "AI built for your business.",
    "Turning business problems into intelligent systems.",
    "Practical AI. Private data. Real results.",
    "Build intelligence into your business.",
    "Your data. Your AI. Your infrastructure.",
    "Engineering intelligence for business.",
  ],
};

/** PrivexLabs' products. PrivexBot is one of them, described only by what it does. */
export const products = [PRIVEXBOT];

/** The doctrine paragraph at the head of each playbook chapter. */
export const philosophy = {
  logo:
    "A rounded boundary square holds an orthogonal trace that terminates in a brass node — the private boundary, the signal path, the signal terminal. It is drawn in the system's own diagram language, so it belongs to the same grammar as every chart and schematic we publish.",
  color:
    "Deep viridian is the owned hue — a mineral green-teal used in an institutional way rather than a technological one. The foundation is a graphite-green near-black, never pure black and never navy. Neutrals carry a green cast, so paper reads as engineered rather than beige. Brass is the only accent, and it is used as a signal, never as a fill.",
  type:
    "Archivo carries the interface and the headlines. Newsreader is the editorial voice — long-form writing and quotation — and nothing else. IBM Plex Mono handles code, data and every annotation. The recurring rhythm is a mono uppercase label, an Archivo headline, and generous space beneath.",
  layout:
    "The system is architectural. A 1px divider does the work a drop shadow would do elsewhere. Corners are barely rounded, cards sit flat at rest, and the grid is visible in the alignment rather than in decoration.",
  motion:
    "Movement in this system reports what the software is doing — a state changed, a panel revealed, data moved along a path. It is never atmosphere. Three durations, three curves, and nothing that loops.",
  voice:
    "The voice is calm, precise and evidence-led. It states the problem, what was built, and what it measured — including where it failed. Confidence comes from the measurement, never from the adjective.",
  social:
    "One visual grammar runs across every platform: a mono category label, token colours, evidence-led copy, and a hairline footer carrying the wordmark. The test is the same as everywhere else — cover the logo, and it should still be obviously ours.",
  governance:
    "A design system fails at the edges — the one-off colour, the exception made under deadline, the second icon set. These are the rules that do not bend, and the check that decides whether a screen ships.",
  assets:
    "Logos, marks, wordmarks, favicons and avatars — as vector originals and pre-rendered rasters. Download one file, or take the whole library as a zip.",
};

export const typefaces = [
  { name: "Archivo", role: "UI and headings", detail: "Grotesque, technical, wide Latin coverage. Weights 400–800." },
  { name: "Newsreader", role: "Editorial — long-form and quotation", detail: "Research titles, tutorials, opinion, pull quotes and attributed quotes. Weights 400–600 plus italics." },
  { name: "IBM Plex Mono", role: "Code, data, labels", detail: "Annotations, tabular figures, code. Weights 400–600." },
];

export const casingRules: [string, string][] = [
  ["Headlines, subheads, body", "Sentence case"],
  ["Buttons and navigation", "Sentence case"],
  ["Mono annotations and index labels", "ALL-CAPS — the only place it is permitted"],
  ["Product and model names", "As registered — PrivexLabs, PrivexBot, MODEL v1.2"],
];

export const colorPairings = [
  { surface: "Neutral 100 — paper", text: "#141B18", accent: "Brass 700", use: "Default light content" },
  { surface: "Neutral 0 — elevated", text: "#141B18", accent: "Brass 700", use: "Cards, panels, product UI" },
  { surface: "Neutral 900 — foundation", text: "#E9EDE8", accent: "Brass 300", use: "Infrastructure, engineering, opinion and quotes" },
  { surface: "Viridian 700 — brand", text: "#F2F7F4", accent: "Brass 300", use: "Launches, manifestos, single high-emphasis moments" },
];

export const gridSpec: [string, string][] = [
  ["Columns", "12"],
  ["Gutter", "24px — var(--grid-gutter)"],
  ["Margin", "32px — var(--grid-margin)"],
  ["Breakpoints", "480 / 768 / 1080 / 1440"],
];

export const diagramSpec: [string, string][] = [
  ["Line weight", "1.5px"],
  ["Nodes", "Squares with a 4px radius"],
  ["Connectors", "Orthogonal only — no curves, no diagonals"],
  ["Labels", "IBM Plex Mono, uppercase, muted"],
  ["Active path", "Viridian"],
  ["Signals and annotations", "Brass"],
];

export const interactionStates: [string, string][] = [
  ["Hover", "Darker fill — primary moves to viridian 700; surfaces move to muted. Links underline."],
  ["Press", "Darker still. No scale, no lift."],
  ["Focus", "2px viridian outline at 2px offset. Always visible, never removed."],
  ["Reveal", "Fade with a 4–8px translate over 200ms."],
  ["Structural", "Fade with an 8px translate over 320ms."],
];

/** The eight supplied identity files. Presentational values live in the logo page. */
export const logoVariants = [
  { name: "logo.svg", use: "Horizontal lockup, light backgrounds" },
  { name: "logo-dark.svg", use: "Horizontal lockup, dark backgrounds" },
  { name: "logo-mono.svg", use: "Single colour — print, engraving, watermark" },
  { name: "mark.svg", use: "Icon only, light backgrounds" },
  { name: "mark-dark.svg", use: "Icon only, dark backgrounds" },
  { name: "mark-mono.svg", use: "Single-colour icon — currentColor" },
  { name: "favicon.svg", use: "Filled tile at 24px and below" },
  { name: "avatar.svg", use: "Social avatar on foundation dark" },
];

export const logoSpecs: [string, string][] = [
  ["Clear space", logoRules.clearSpace],
  ["Minimum mark", "20px — below this, use the filled favicon tile"],
  ["Minimum lockup", "96px wide"],
  ["Lockup text", "Live SVG text in Archivo. Outline the text for contexts where Archivo is not loaded."],
  ["Area lockups", "Wordmark plus a mono area label. Never a separate symbol."],
];

export const assetUsage: [string, string][] = [
  ["Website header, light", "logo.svg"],
  ["Website header, dark", "logo-dark.svg"],
  ["Print, engraving, watermark", "logo-mono.svg — set colour via currentColor"],
  ["App icon, favicon at 24px and below", "favicon.svg, or the 32 / 180 / 192 / 512 PNGs"],
  ["Social profile picture", "avatar-brand.svg — or the ink, white, campaign, mono and inverted variants"],
  ["Slide corner, dense UI", "mark.svg at 20px minimum"],
  ["Area lockup", "wordmark.svg plus a mono area label — never a separate symbol"],
];

export const socialGrammar: [string, string][] = [
  ["Category label", "Mono, uppercase, brass. \"01 / AI ENGINEERING\" — 01–06 is the area of work; 00 is the company itself (news, products, R&D, opinion, community, events, careers). A format may follow a middle dot: \"03 / AI MODELS · RESEARCH\"."],
  ["Content ID", "Mono, muted, top right. \"PXC-2026-041\" — traceable back to the content system."],
  ["Claim", "One idea. A figure, a finding or a statement — never all three."],
  ["Footer", "1px rule, wordmark on the left, destination in mono on the right."],
];

export const categoryTreatments: [string, string][] = [
  ["Research and R&D", "Editorial serif on paper or foundation dark. One number or one finding, with its sample size."],
  ["Engineering / Infrastructure", "Schematic diagram on foundation dark. Orthogonal connectors, mono telemetry."],
  ["Product", "UI-forward on paper. Real interface fragments, never a mocked-up dashboard."],
  ["Training", "Educational and lighter in density. More whitespace, shorter lines, numbered steps."],
  ["Case study", "An outcome metric and a customer quote. The client is named or described by sector — never by place."],
  ["Opinion", "Serif quote on foundation dark, registration marks, attribution in mono."],
];

/** Every field recorded against a piece of content. */
export const contentMetadata: [string, string][] = [
  ["Content ID", "PXC-2026-041"],
  ["Title", "Six open models on one document-extraction task"],
  ["Category / area", "03 / AI Models · Research"],
  ["Audience", "Financial institutions — operations and data leads"],
  ["Author", "Head of R&D, PrivexLabs"],
  ["Source", "Research · product · engineering · customer · experiment · training · community"],
  ["Status", "APPROVED"],
  ["Platforms", "LinkedIn, X"],
  ["Publish date", "14 April 2026"],
  ["Campaign", "Q2 evaluation series"],
  ["Related product", "PrivexBot"],
  ["Related research", "PXR-2026-07"],
  ["CTA", "privexlabs.com/research"],
  ["Performance", "Impressions, saves, qualified replies"],
];

export const sourceRule =
  "Source is never “fill the calendar”. If a piece has no source, it does not enter the lifecycle.";

export const repurposingMap = [
  { step: "01", artefact: "Executive summary", template: "Square · Data / insight" },
  { step: "02", artefact: "Article", template: "Articles · any cover, exported for every platform; Web · Blog hero" },
  { step: "03", artefact: "LinkedIn carousel", template: "Carousel · slides 1–10" },
  { step: "04", artefact: "X thread", template: "Square · Big stat, Engagement · Tips" },
  { step: "05", artefact: "Short video", template: "Vertical · Big stat, YouTube · Review" },
  { step: "06", artefact: "Training module", template: "Engagement · How it works" },
  { step: "07", artefact: "Newsletter", template: "Email · Newsletter" },
  { step: "08", artefact: "Quote card", template: "Square · Customer quote" },
  { step: "09", artefact: "Case study", template: "Portrait · Case study" },
];

export const accessibilityFloor: [string, string][] = [
  ["Contrast", "WCAG AA for every text-on-surface pair, in both themes"],
  ["Focus", "2px viridian outline at 2px offset, never removed"],
  ["Touch targets", "44px minimum"],
  ["Markup", "Semantic HTML — headings in order, real buttons, labelled inputs"],
  ["Motion", "prefers-reduced-motion honoured globally"],
  ["Language", "lang set correctly for multilingual content"],
];

export const changePaths: [string, string][] = [
  ["New colour", "Token proposal. It must be justified against the existing ramps and pass AA in both themes."],
  ["New component", "Built from existing tokens, documented with usage and states, added to the component index."],
  ["New template", "Added to the editor's registry as a preset over an existing layout — not as a bespoke design."],
  ["Typeface change", "Swap the self-hosted files and the three family tokens. Nothing else should need to move."],
  ["Exception", "Time-boxed and recorded. An exception that outlives its campaign becomes a token proposal or is removed."],
];

export const imageryRules = {
  use: [
    "Documentary, contemporary, technology-oriented",
    "People and places shown as they are when they are the subject, never as decoration",
    "Real work, real environments, real equipment",
    "A slight cool grade, consistent across a set",
    "The diagram language instead, when there is no photography",
  ],
  avoid: [
    "Staged or stereotyped depictions of any place, culture or workplace",
    "Stock photography clichés — handshakes, glowing brains, server-room lens flare",
    "Generated \"AI art\"",
    "Warm or heavily saturated grading",
  ],
};

export const iconographyRules = [
  "Lucide, geometric, 1.5px stroke — the same line weight as the diagram language.",
  "Sizes 16 / 20 / 24 only, via the --icon-* tokens.",
  "One set. Never mix icon families.",
  "Never emoji as an icon.",
  "Unicode arrows (→ ↓) are permitted inside mono annotations only.",
  "Flagged as a substitution — replace with a proprietary set when one exists.",
];

export const discipline = {
  logo: {
    dos: [
      "Use the supplied file for the surface you are on",
      "Give the mark its full clear space, even in tight headers",
      "Switch to the favicon tile below 20px",
      "Set colour on mono variants through currentColor",
    ],
    donts: logoRules.never,
  },
  color: {
    dos: [
      "Reference tokens — var(--color-brand-primary), never #0E5A4A",
      "Let 1px dividers carry structure instead of tinted fills",
      "Keep brass to rules, nodes, index numbers and active states",
      "Check AA contrast on every text-on-surface pair",
    ],
    donts: [
      "Introduce a colour outside the ramps without a token proposal",
      "Use pure black, navy, or a warm grey",
      "Fill a large area with brass",
      "Use gradients, glassmorphism or background blur outside modal scrims",
      "Signal an area with its own palette",
    ],
  },
  type: {
    dos: [
      "Set long-form titles and quotations in Newsreader; keep product, software and infrastructure to Archivo and Plex Mono",
      "Use tabular figures for anything in a column",
      "Keep the editorial column at 680px regardless of viewport",
      "Set headlines at two lines or fewer",
    ],
    donts: [
      "Title Case anything",
      "Use Newsreader for interface, figures, buttons or product announcements",
      "Exceed 56px display type",
      "Mix a fourth family in, including icon fonts",
      "Use emoji as typographic ornament",
    ],
  },
  layout: {
    dos: [
      "Stack area grids to a single column below 768px",
      "Let dashboard tables scroll horizontally inside their own container",
      "Hold the editorial column at 680px on every viewport",
      "Keep touch targets at 44px",
    ],
    donts: [
      "Scale a desktop layout down and call it mobile",
      "Hide structural dividers to save vertical space",
      "Let the page body scroll horizontally",
    ],
  },
  motion: {
    dos: [
      "Animate the property that changed, and nothing else",
      "Use ease-flow only for data moving along a diagram path",
      "Keep entrances under 320ms",
      "Test every screen with reduced motion enabled",
    ],
    donts: [
      "Parallax, particles, floating or looping ambient motion",
      "Scale or lift on press",
      "Animate a page on every scroll position",
      "Use motion to hide a slow response",
    ],
  },
  voice: {
    dos: [
      "Name the number, the sample size and the method",
      "Say where the approach fails as plainly as where it works",
      "Use sentence case in every headline, button and nav item",
      "Cut any sentence that would survive unchanged on a competitor's site",
    ],
    donts: voiceRules.banned,
  },
};

/* --- Derived, not stated ------------------------------------------------- *
 * The company document states who PrivexLabs serves (TARGET_INDUSTRIES). The two
 * lists below are observed from the templates in the editor rather than stated in
 * the document, and are labelled as such wherever they appear.
 * ------------------------------------------------------------------------- */

export const rolesReached = [
  "CTOs and technology leads",
  "Heads of operations",
  "Heads of data",
  "Product leads",
  "Compliance and risk leads",
  "Heads of learning and development",
  "Executives making build-vs-buy decisions",
];

export const vocabularyInUse = {
  use: [
    "evaluated, measured, scored, tested",
    "customized, fine-tuned, adapted, in-domain",
    "private, on-premise, private cloud, hybrid, owned",
    "knowledge base, workspace, chatflow, reindex",
    "pilot, evaluation set, rubric, baseline",
    "p95 latency, accuracy, cost per 1k documents, measured outcome",
    "practical, integrated, deployed, operated",
  ],
  avoid: [
    "revolutionary, game-changing, cutting-edge, unleash, transform",
    "seamless, effortless, magical, powerful",
    "leverage, synergy, best-in-class, world-class",
    "AI-powered as a claim on its own",
    "users, when \"your team\" is truer",
  ],
};
