/**
 * Brand data for the PrivexLabs identity playbook.
 * Values mirror `src/styles/tokens.css` exactly — the CSS is the source of truth,
 * this file is the human-readable index the playbook renders from.
 */

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
  { name: "Editorial", token: "--text-editorial-*", size: "2.75rem / 44px", line: "1.12", weight: "500", family: "serif", use: "Research titles and pull quotes. Knowledge pillar only." },
  { name: "H1", token: "--text-h1-*", size: "2.5rem / 40px", line: "1.1", tracking: "−0.015em", weight: "700", family: "sans", use: "Page title." },
  { name: "H2", token: "--text-h2-*", size: "1.875rem / 30px", line: "1.15", tracking: "−0.01em", weight: "600", family: "sans", use: "Section heading." },
  { name: "H3", token: "--text-h3-*", size: "1.4375rem / 23px", line: "1.25", tracking: "−0.005em", weight: "600", family: "sans", use: "Subsection, card title." },
  { name: "H4", token: "--text-h4-*", size: "1.125rem / 18px", line: "1.35", weight: "600", family: "sans", use: "Dense card and table headings." },
  { name: "Body large", token: "--text-body-lg-*", size: "1.125rem / 18px", line: "1.6", family: "sans", use: "Lead paragraph under a headline." },
  { name: "Body", token: "--text-body-*", size: "1rem / 16px", line: "1.6", family: "sans", use: "Default running text." },
  { name: "Body small", token: "--text-body-sm-*", size: "0.875rem / 14px", line: "1.55", family: "sans", use: "Secondary text, UI controls." },
  { name: "Caption", token: "--text-caption-*", size: "0.78125rem / 12.5px", line: "1.45", family: "sans", use: "Figure captions, table footnotes." },
  { name: "Label", token: "--text-label-*", size: "0.71875rem / 11.5px", line: "1.2", tracking: "0.08em", weight: "500", family: "mono", use: "Uppercase mono annotation — \"01 / RESEARCH\". The only ALL-CAPS in the system." },
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

export const pillars = [
  { id: "core", name: "PrivexLabs Core", index: "01", role: "The institution", treatment: "Archivo, paper surface, hairline structure." },
  { id: "knowledge", name: "Privex Knowledge", index: "02", role: "Research, intelligence, evaluation, academy, publishing", treatment: "Leads with Newsreader. Editorial column, 680px, generous leading." },
  { id: "engine", name: "Privex AI Engine", index: "03", role: "Models, adaptation, fine-tuning, agents, AI engineering", treatment: "Archivo + Plex Mono. Model cards, evaluation tables." },
  { id: "infrastructure", name: "Privex Infrastructure", index: "04", role: "Private AI, compute, inference, deployment, observability", treatment: "Foundation-dark bands, schematic diagrams, mono telemetry." },
  { id: "privexbot", name: "PrivexBot", index: "05", role: "Owned products, pilots, experiments", treatment: "UI-forward on paper. Product chrome, real interface fragments." },
  { id: "solutions", name: "Privex Solutions", index: "06", role: "Enterprise AI, automation, industry solutions", treatment: "Outcome metrics, customer quotes, case-study structure." },
];

export const voiceRules = {
  tone: ["Clear", "Precise", "Calm", "Evidence-based", "Confident", "Practical", "Direct"],
  structure: ["Problem", "What we tested", "What we learned", "What works", "Where it fails", "What we built"],
  banned: [
    "Hype words — revolutionary, game-changing, cutting-edge, unleash",
    "Exclamation marks",
    "Emoji, in copy and as icons",
    "Empty futurism — \"the future of everything\"",
    "Exaggerated or unverifiable claims",
    "Title Case in headlines, buttons or navigation",
  ],
  person: ["\"We\" for PrivexLabs work.", "\"You / your organization\" for the customer.", "Never \"users\" when \"your team\" is truer."],
  examples: [
    { label: "Hero", good: "Private AI, built on your data, in your languages, under your control.", bad: "Revolutionizing AI for Africa!" },
    { label: "Research", good: "We evaluated 6 open models on Swahili financial-document extraction. Two were usable. Here is where the others fail.", bad: "Our cutting-edge research unlocks game-changing insights." },
    { label: "Product", good: "PrivexBot Docs answers from your documents only. Every answer cites its source.", bad: "PrivexBot: the smartest AI assistant you'll ever meet." },
    { label: "Status", good: "Inference cluster LG-1 — operational. 99.97% uptime, 30 days.", bad: "Our systems are running amazingly well!" },
  ],
};

export const motifRules = {
  use: [
    "Registration and crop marks at section corners",
    "Hairline grids and 1px rules carrying structure",
    "Orthogonal signal lines terminating in square nodes",
    "Mono index annotations — \"01 / RESEARCH\", \"MODEL v2.3\"",
    "Layered system diagrams with labelled boundaries",
  ],
  avoid: [
    "Blobs, waves, organic gradients",
    "Circuit boards, neural nets, brains, robots",
    "African maps, kente or mudcloth patterning as decoration",
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
    "Build a separate logo per pillar — pillar lockups are wordmark + mono pillar label",
  ],
};

export const governance = [
  "Tokens only. Never hardcode a colour or size; a new colour needs a token proposal.",
  "One accent — brass — used sparingly. Never a large brass fill.",
  "One diagram language. 1.5px lines, square 4px nodes, orthogonal connectors, Plex Mono labels.",
  "Pillar lockups are typed, never separate logos.",
  "WCAG AA contrast, visible 2px viridian focus, 44px touch targets, semantic HTML, reduced motion respected.",
  "Mobile-first reflow — pillar grids stack, tables scroll, the editorial column stays 680px. Never merely shrink desktop.",
  "The shipping test: remove the logo. Is it still recognisably Privex? If not, strengthen the system — do not decorate the screen.",
];

export const lifecycle = [
  "IDEA", "RESEARCH", "DRAFT", "EDITORIAL REVIEW", "TECHNICAL REVIEW", "BRAND REVIEW",
  "DESIGN", "APPROVAL", "SCHEDULE", "PUBLISH", "MEASURE", "LEARN", "REUSE",
];

export const contentStatuses = ["IDEA", "DRAFT", "REVIEW", "DESIGN", "APPROVED", "SCHEDULED", "PUBLISHED", "REPURPOSE", "ARCHIVED"];
