/**
 * The brand brief: the company document and every brand rule, assembled as Markdown for
 * pasting into an external tool.
 *
 * This module owns no content of its own beyond connective prose and the prompt
 * scaffolds. The company's words come from `company-document.ts`, the rules from
 * `brand.ts` and the catalogue from `@/lib/templates`, so the brief cannot contradict the
 * pages that render the same data.
 *
 * Internal strategy appears only in the internal build (INCLUDE_INTERNAL=1). It is the
 * last section, so section numbers — and the prompts that cite them — are the same in both
 * editions.
 */

import {
  accessibilityFloor, areas, assetUsage, brassRamp, casingRules, categoryTreatments,
  changePaths, colorPairings, company, containers, contentMetadata, contentStatuses,
  darkThemeColors, diagramSpec, discipline, governance, gridSpec, iconographyRules,
  imageryRules, includeInternal, interactionStates, lifecycle, logoRules, logoSpecs,
  logoVariants, motifRules, motionScale, neutralRamp, philosophy, products, radiusScale,
  repurposingMap, rolesReached, sectionById, semanticColors, socialGrammar, sourceRule,
  spacingScale, taglines, typeScale, typefaces, viridianRamp, vocabularyInUse, voiceRules,
  COMPANY_LABELS, type DocBlock, type DocSection, type Swatch,
} from "./brand";
import { CATEGORIES, SIZE_BY_ID, TEMPLATES, TEMPLATES_BY_CATEGORY } from "./templates";
import { LAYOUT_LABELS } from "./templates/layouts";

export type BriefSection = {
  id: string;
  index: string;
  title: string;
  /** One line on the page saying what this section is for. */
  purpose: string;
  /** public: the company's own claims · internal: strategy, internal build only · system: brand rules. */
  visibility: "public" | "internal" | "system";
  markdown: string;
};

/* ------------------------------------------------------------- formatting */

const cell = (v: string) => v.replace(/\|/g, "\\|").replace(/\n/g, " ");

function table(head: string[], rows: readonly (readonly string[])[]): string {
  return [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
  ].join("\n");
}

const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");
const numbered = (items: readonly string[]) => items.map((i, n) => `${n + 1}. ${i}`).join("\n");
const swatches = (rows: Swatch[]) =>
  table(["Name", "Token", "Value", "Role"], rows.map((s) => [s.name, s.token, s.value, s.note ?? ""]));

const INTERNAL_NOTE = "> Internal — do not quote in published copy.";
const DERIVED =
  `> Observed from the ${TEMPLATES.length} templates in the design system, not stated in the company document.`;

/** Render the company document's own blocks, verbatim. */
function blocks(bs: readonly DocBlock[], depth = 3): string {
  return bs.map((b) => {
    const note = b.internal ? `${INTERNAL_NOTE}\n\n` : "";
    switch (b.kind) {
      case "p": return note + b.text;
      case "list": return note + list(b.items);
      case "numbered": return note + numbered(b.items);
      case "flow": return note + b.steps.join(` ${b.arrow} `);
      case "sub": return `${note}${"#".repeat(Math.min(depth, 5))} ${b.title}\n\n${blocks(b.blocks, depth + 1)}`;
    }
  }).join("\n\n");
}

/** One section of the company document, if this build may show it. */
function docSection(id: string): string {
  const s: DocSection | undefined = sectionById(id);
  if (!s) return "";
  return `### ${s.n ? `${s.n}. ` : ""}${s.title}\n\n${blocks(s.blocks, 4)}`;
}

const docSections = (...ids: string[]) => ids.map(docSection).filter(Boolean).join("\n\n");

const dosAndDonts = (label: string, d: { dos: string[]; donts: string[] }) =>
  `### ${label}\n\n**Do**\n\n${list(d.dos)}\n\n**Never**\n\n${list(d.donts)}`;

const companyLabels = Object.values(COMPANY_LABELS).map((l) => `00 / ${l}`).join(" · ");

/* --------------------------------------------------------------- sections */

const sections: BriefSection[] = [
  {
    id: "about", index: "00", title: "About this pack", visibility: "system",
    purpose: "What this document is and how to use it.",
    markdown: `## 00 · About this pack

This is the complete brand system for **${company.name}**: the company document — who
PrivexLabs is, what it does and how it works — followed by the voice, content operating
system, social grammar, visual foundations, governance and the full template catalogue.

${includeInternal
  ? "**This is the internal edition.** It includes internal strategy (section 17) and other content marked Internal. Internal content is context for planning; it is never quoted or paraphrased in published copy."
  : "**This is the public edition.** Internal strategy is not included."}

**How to use it.** Paste the whole thing into an AI tool as context, then ask for what you
need — a post, a month of calendar, a repurposing plan, a review of a draft. Ready-made
prompts are in section 16. Every rule is binding: the banned list in section 08 is not a
style preference, it is a hard constraint.

${company.name} works across ${areas.length} areas of work. The kit holds ${TEMPLATES.length} templates in
${CATEGORIES.length} format groups, a ${lifecycle.length}-stage content lifecycle and
${contentStatuses.length} content statuses.`,
  },

  {
    id: "company", index: "01", title: "The company", visibility: "public",
    purpose: "Who PrivexLabs is — overview, vision, mission and the one-sentence definition.",
    markdown: `## 01 · The company

**Lead line:** ${company.lead}

${docSections("overview", "vision", "mission", "definition")}

### Design philosophy

${list(company.philosophy)}

${company.sitsBetween}`,
  },

  {
    id: "areas", index: "02", title: "What we do — six areas of work", visibility: "public",
    purpose: "The six areas of work, their capabilities, how each is labelled and treated, and the products.",
    markdown: `## 02 · What we do — ${areas.length} areas of work

${docSections("what-we-do", "software", "infrastructure", "training")}

### Brand architecture

The areas share one system. They are told apart by treatment — surface, typographic
emphasis, density — never by a separate palette or a separate logo. Every piece of
content carries the label of the area it belongs to, or a company-wide label.

${table(["#", "Area", "Label", "Treatment"], areas.map((a) => [a.index, a.name, a.eyebrow, a.treatment]))}

Company-wide labels: ${companyLabels}. A format may follow a middle dot:
\`03 / AI MODELS · RESEARCH\`.

### Products

${products.map((pr) => `**${pr.name}** — ${pr.relation} ${pr.summary}\n\nWhat it does:\n\n${list(pr.capabilities)}\n\nDescribe ${pr.name} only by these capabilities. No versions, releases or features beyond this list.`).join("\n\n")}`,
  },

  {
    id: "approach", index: "03", title: "How we work", visibility: "public",
    purpose: "The problem-first approach and the principles behind it.",
    markdown: `## 03 · How we work

${docSections("approach", "principles")}`,
  },

  {
    id: "value", index: "04", title: "Why PrivexLabs", visibility: "public",
    purpose: "The value proposition, competitive positioning and differentiation.",
    markdown: `## 04 · Why PrivexLabs

${docSections("value", "positioning", "differentiation")}`,
  },

  {
    id: "customers", index: "05", title: "Customers and audience", visibility: "public",
    purpose: "Who PrivexLabs serves, and the roles the writing reaches.",
    markdown: `## 05 · Customers and audience

${docSections("customers")}

### Roles reached

${DERIVED}

${list(rolesReached)}

Example copy never ties a client to a city, country, region or language. Clients are
described by sector and outcome.`,
  },

  {
    id: "positioning", index: "06", title: "Positioning and lead line", visibility: "public",
    purpose: "How PrivexLabs describes itself, and the line that leads.",
    markdown: `## 06 · Positioning and lead line

**Lead line:** ${taglines.lead}

${docSections("brand-positioning")}${includeInternal
  ? `\n\n### Candidate taglines\n\n${INTERNAL_NOTE}\n\nThe company document's other candidates, in the brand's sentence case. Not in use.\n\n${list(taglines.candidates)}\n\n${docSection("taglines")}`
  : ""}`,
  },

  {
    id: "voice", index: "07", title: "Voice", visibility: "system",
    purpose: "Tone, person, casing, and the structure every piece follows.",
    markdown: `## 07 · Voice

${philosophy.voice}

**Tone**

${voiceRules.tone.join(" · ")}

**Person**

${list(voiceRules.person)}

**Structure** — long-form and short-form both follow this order. Each step answers one
step of the approach in section 03. If a piece cannot fill all ${voiceRules.structure.length}, it is not
ready to publish.

${table(["#", "Step", "Approach step"], voiceRules.structure.map((s, i) => [String(i + 1).padStart(2, "0"), s.step, s.approach]))}

**Casing**

${table(["Context", "Casing"], casingRules)}`,
  },

  {
    id: "rules", index: "08", title: "Dos and don'ts", visibility: "system",
    purpose: "The binding constraints, per discipline. The banned list is hard.",
    markdown: `## 08 · Dos and don'ts

${dosAndDonts("Voice and copy", discipline.voice)}

${dosAndDonts("Colour", discipline.color)}

${dosAndDonts("Typography", discipline.type)}

${dosAndDonts("Layout and responsive", discipline.layout)}

${dosAndDonts("Motion", discipline.motion)}

${dosAndDonts("Logo", discipline.logo)}

### Motifs

**Use**

${list(motifRules.use)}

**Never**

${list(motifRules.avoid)}

### Imagery

**Use**

${list(imageryRules.use)}

**Never**

${list(imageryRules.avoid)}

### Iconography

${list(iconographyRules)}`,
  },

  {
    id: "examples", index: "09", title: "Worked examples", visibility: "system",
    purpose: "The same idea written well and written badly.",
    markdown: `## 09 · Worked examples

The difference is not politeness. It is whether the sentence contains a fact.

${voiceRules.examples.map((e) => `**${e.label}**\n\n- Write: ${e.good}\n- Never: ${e.bad}`).join("\n\n")}`,
  },

  {
    id: "vocabulary", index: "10", title: "Vocabulary in use", visibility: "system",
    purpose: "The words this brand uses, and the ones it never does.",
    markdown: `## 10 · Vocabulary in use

${DERIVED}

**In use**

${list(vocabularyInUse.use)}

**Never**

${list(vocabularyInUse.avoid)}`,
  },

  {
    id: "content-os", index: "11", title: "Content operating system", visibility: "system",
    purpose: "Sources, lifecycle, statuses, the metadata on every piece, and repurposing.",
    markdown: `## 11 · Content operating system

**Areas.** Every piece belongs to one of the ${areas.length} areas of work in section 02, or carries a
company-wide label (${companyLabels}).

**Sources.** Every piece originates in one of: research · product · engineering · customer ·
experiment · training · community. ${sourceRule}

**Lifecycle.** Brand review sits before design, so nothing is styled that has not been
approved on substance.

${numbered(lifecycle)}

**Statuses**

${contentStatuses.map((s) => `\`${s}\``).join(" · ")}

**Metadata recorded per piece**

${table(["Field", "Example"], contentMetadata)}

**Repurposing.** One serious source becomes ${repurposingMap.length} artefacts.

${table(["Step", "Artefact", "Template"], repurposingMap.map((r) => [r.step, r.artefact, r.template]))}`,
  },

  {
    id: "social", index: "12", title: "Social publishing system", visibility: "system",
    purpose: "The grammar on every published asset, and the treatment per category.",
    markdown: `## 12 · Social publishing system

${philosophy.social}

**The grammar** — four elements, in this order, on every published asset.

${table(["Element", "Rule"], socialGrammar)}

**Category treatments** — categories are differentiated by surface and typographic emphasis,
never by a new colour.

${table(["Category", "Treatment"], categoryTreatments)}`,
  },

  {
    id: "templates", index: "13", title: "Template catalogue", visibility: "system",
    purpose: "Every template by name, canvas and layout — so a calendar can name exact assets.",
    markdown: `## 13 · Template catalogue

${TEMPLATES.length} templates in ${CATEGORIES.length} groups. When planning content, name the
template you want by its group and name, exactly as written here.

${TEMPLATES_BY_CATEGORY.map(({ category, templates }) => {
  const rows = templates.map((t) => {
    const size = SIZE_BY_ID[t.sizeId];
    return [t.name, size ? `${size.w}×${size.h}` : t.sizeId, LAYOUT_LABELS[t.layout]];
  });
  return `### ${category.name} — ${templates.length}\n\n${category.blurb}\n\n${table(["Template", "Canvas", "Layout"], rows)}`;
}).join("\n\n")}`,
  },

  {
    id: "visual", index: "14", title: "Visual foundations", visibility: "system",
    purpose: "Colour, type, layout, motion and logo — so copy is written to fit the design.",
    markdown: `## 14 · Visual foundations

### Colour

${philosophy.color}

**Viridian — the brand hue**

${swatches(viridianRamp)}

**Neutrals — engineered paper**

${swatches(neutralRamp)}

**Brass — the single signal**

${swatches(brassRamp)}

**Functional colours**

${swatches(semanticColors)}

**Dark theme** — applied with \`[data-theme="dark"]\`. No token is invented in dark; every
value is a redefinition of an existing one.

${swatches(darkThemeColors)}

**Pairings**

${table(["Surface", "Text", "Accent", "Used for"], colorPairings.map((p) => [p.surface, p.text, p.accent, p.use]))}

### Typography

${philosophy.type}

${table(["Family", "Role", "Detail"], typefaces.map((t) => [t.name, t.role, t.detail]))}

**Scale** — ${typeScale.length} steps. Display is capped at 56px; restraint is part of the voice.

${table(["Step", "Size", "Line", "Tracking", "Weight", "Family", "Use"],
  typeScale.map((t) => [t.name, t.size, t.line, t.tracking ?? "—", t.weight ?? "—", t.family, t.use]))}

### Layout and structure

${philosophy.layout}

**Spacing** — 4px base

${table(["Token", "Value"], spacingScale.map((s) => [s.token, s.value]))}

**Radius**

${table(["Token", "Value", "Applied to"], radiusScale.map((r) => [r.token, r.value, r.use]))}

**Containers**

${table(["Token", "Width", "Used for"], containers.map((c) => [c.token, c.value, c.use]))}

**Grid**

${table(["Property", "Value"], gridSpec)}

**Diagrams** — part of the identity, not illustrations dropped into it.

${table(["Property", "Specification"], diagramSpec)}

### Motion

${philosophy.motion}

${table(["Token", "Value", "Used for"], motionScale.map((m) => [m.token, m.value, m.use]))}

**Interaction states**

${table(["State", "Behaviour"], interactionStates)}

### Logo and assets

${philosophy.logo}

**Clear space:** ${logoRules.clearSpace}

**Minimums**

${list(logoRules.minimums)}

**Specifications**

${table(["Rule", "Value"], logoSpecs)}

**The ${logoVariants.length} supplied files**

${table(["File", "Use"], logoVariants.map((v) => [v.name, v.use]))}

**Which file to use**

${table(["Context", "File"], assetUsage)}

**Never**

${list(logoRules.never)}`,
  },

  {
    id: "governance", index: "15", title: "Governance", visibility: "system",
    purpose: "The rules that do not bend, and the check that decides whether work ships.",
    markdown: `## 15 · Governance

${philosophy.governance}

${numbered(governance)}

**Accessibility floor** — not a target. A floor; below this the work is not finished.

${table(["Requirement", "Standard"], accessibilityFloor)}

**Changing the system** — the system is meant to change. It is not meant to drift.

${table(["Change", "Path"], changePaths)}

**The shipping test.** Remove the logo. Is it still recognisably Privex? If not, strengthen
the system — the structure, the type rhythm, the annotation, the diagram. Do not decorate
the screen.`,
  },

  {
    id: "prompts", index: "16", title: "Prompt scaffolds", visibility: "system",
    purpose: "Four prompts to run against everything above.",
    markdown: `## 16 · Prompt scaffolds

Paste this whole document first, then one of these. Every prompt starts with the same
ground rules:

\`\`\`
Ground rules: make claims about PrivexLabs only from sections 01–06. Anything marked
Internal, and section 17 if present, is context — never quote or paraphrase it in
published copy. Never invent clients, figures, places, languages or product features;
describe PrivexBot only by the capabilities listed in section 02. Never tie copy to a
city, country, region or language.
\`\`\`

### Write a single asset

\`\`\`
Using the PrivexLabs brand system above, write the copy for a
"<group> · <template name>" asset about <topic>.

Return only these fields, one per line:
eyebrow ("NN / AREA" from section 02, or a 00 company label, optionally
" · FORMAT"), index (a content ID), headline, subhead, body, cta, url.

Rules: sentence case everywhere except the eyebrow. Nothing from the banned
list in section 08. Every claim carries a number and its sample size, or it
is cut. Headline is two lines or fewer.
\`\`\`

### Build a content calendar

\`\`\`
Using the PrivexLabs brand system above, build a <N>-week content calendar.

One row per piece, with: content ID (PXC-YYYY-NNN), title, category (one of the
${areas.length} areas in section 02, or a 00 company label), source (one of research ·
product · engineering · customer · experiment · training · community), template
(named exactly as in section 13), platform, publish date, status (from the
${contentStatuses.length} in section 11), and CTA.

Constraints: cover all ${areas.length} areas of work — do not let one dominate. No row may
exist without a real source; "fill the calendar" is not a source. Every template
you name must appear in section 13.
\`\`\`

### Repurpose one source

\`\`\`
Here is one piece of PrivexLabs source material: <paste research, release
notes, or a customer outcome>.

Using the repurposing map in section 11, produce all ${repurposingMap.length} artefacts. For each,
give the step number, the artefact, the exact template from section 13, and
the finished copy for that template's fields.

Keep every figure identical across artefacts. If a figure is missing its
sample size, flag it rather than inventing one.
\`\`\`

### Review a draft

\`\`\`
Review the draft below against the PrivexLabs brand system above.

Return a table: line quoted | rule broken (cite the section) | corrected line.

Check at minimum: the banned list, casing, person ("we" vs "you"), whether
each claim carries a number and method, whether the structure in section 07
is followed, whether any place, region or language is implied, whether any
Internal content is quoted, and whether PrivexBot is described beyond its
listed capabilities. If the draft passes, say so and do not invent faults.

Draft:
<paste>
\`\`\``,
  },

  ...(includeInternal
    ? [{
        id: "strategy", index: "17", title: "Strategy", visibility: "internal" as const,
        purpose: "Business model, product strategy, long-term advantage, R&D and direction. Internal.",
        markdown: `## 17 · Strategy

${INTERNAL_NOTE}

${docSections("business-model", "product-strategy", "advantage", "rd", "direction")}`,
      }]
    : []),
];

export const BRIEF_SECTIONS: BriefSection[] = sections;

export const FULL_BRIEF: string = [
  `# ${company.name} — brand system`,
  "",
  `Generated from the PrivexLabs Design System. ${sections.length} sections${includeInternal ? " · internal edition" : ""}.`,
  "",
  "---",
  "",
  sections.map((s) => s.markdown).join("\n\n---\n\n"),
  "",
].join("\n");

export const BRIEF_FILENAME = includeInternal ? "privexlabs-brand-brief-internal.md" : "privexlabs-brand-brief.md";

/** Rough word count, shown on the page so you can see what you are about to paste. */
export const BRIEF_WORDS: number = FULL_BRIEF.split(/\s+/).filter(Boolean).length;
