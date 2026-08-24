import type { FieldDef, LayoutId } from "./types";

const eyebrow: FieldDef = { key: "eyebrow", label: "Category label", kind: "text", help: "Mono, uppercase. \"01 / RESEARCH\"." };
const index: FieldDef = { key: "index", label: "Index / ID", kind: "text", help: "Content ID or slide index. \"PXC-2026-041\"." };
const headline: FieldDef = { key: "headline", label: "Headline", kind: "textarea" };
const subhead: FieldDef = { key: "subhead", label: "Subhead", kind: "textarea" };
const body: FieldDef = { key: "body", label: "Body", kind: "textarea" };
const cta: FieldDef = { key: "cta", label: "Footer note / CTA", kind: "text" };
const url: FieldDef = { key: "url", label: "URL", kind: "text" };
const items: FieldDef = { key: "items", label: "Items", kind: "list" };

export const LAYOUT_LABELS: Record<LayoutId, string> = {
  statement: "Statement", stat: "Statistic", quote: "Quote", testimonial: "Testimonial",
  split: "Split panel", list: "List", steps: "Steps", metrics: "Metric grid",
  diagram: "System diagram", feature: "Feature / product", profile: "Profile",
  faq: "FAQ", poll: "Poll", thumbnail: "Video thumbnail", banner: "Banner",
  avatar: "Avatar", carousel: "Carousel slide", email: "Email block", web: "Web section",
  cta: "Call to action", event: "Event", offer: "Offer", caseStudy: "Case study",
  meme: "Lighthearted", hiring: "Hiring",
};

/** Which editable fields each layout consumes, in inspector order. */
export const LAYOUT_FIELDS: Record<LayoutId, FieldDef[]> = {
  statement: [eyebrow, index, headline, subhead, body, cta, url],
  stat: [eyebrow, index, { key: "value", label: "Figure", kind: "text" }, { key: "unit", label: "Figure suffix", kind: "text", help: "Rendered muted beside the figure — \"/6\", \"%\", \"×\"." }, headline, subhead, { key: "source", label: "Source line", kind: "text" }, cta, url],
  quote: [eyebrow, index, { key: "quote", label: "Quote", kind: "textarea" }, { key: "author", label: "Author", kind: "text" }, { key: "role", label: "Role", kind: "text" }, cta, url],
  testimonial: [eyebrow, index, { key: "quote", label: "Quote", kind: "textarea" }, { key: "author", label: "Author", kind: "text" }, { key: "role", label: "Role · company", kind: "text" }, { key: "value", label: "Proof figure", kind: "text" }, { key: "unit", label: "Proof label", kind: "text" }, cta, url],
  split: [eyebrow, index, headline, { key: "leftTitle", label: "Left title", kind: "text" }, { key: "leftBody", label: "Left body", kind: "textarea" }, { key: "rightTitle", label: "Right title", kind: "text" }, { key: "rightBody", label: "Right body", kind: "textarea" }, cta, url],
  list: [eyebrow, index, headline, subhead, items, cta, url],
  steps: [eyebrow, index, headline, subhead, items, cta, url],
  metrics: [eyebrow, index, headline, subhead, { ...items, label: "Metrics", help: "One per line as \"figure — label\"." }, { key: "source", label: "Source line", kind: "text" }, cta, url],
  diagram: [eyebrow, index, headline, subhead, { ...items, label: "Layers", help: "One node label per line, top to bottom." }, { key: "source", label: "Annotation", kind: "text" }, cta, url],
  feature: [eyebrow, index, headline, subhead, { ...items, label: "Feature rows", help: "One per line as \"title — detail\"." }, cta, url],
  profile: [eyebrow, index, { key: "author", label: "Name", kind: "text" }, { key: "role", label: "Role", kind: "text" }, headline, body, cta, url],
  faq: [eyebrow, index, headline, { ...items, label: "Q&A pairs", help: "One per line as \"question — answer\"." }, cta, url],
  poll: [eyebrow, index, headline, subhead, { ...items, label: "Options", help: "One per line as \"option — 42%\"." }, cta, url],
  thumbnail: [eyebrow, headline, subhead, { key: "value", label: "Corner figure", kind: "text" }, cta],
  banner: [eyebrow, headline, subhead, url],
  avatar: [{ key: "headline", label: "Initials / short text", kind: "text", help: "Used only by the photo / founder variant." }],
  carousel: [eyebrow, index, headline, subhead, body, items, cta, url],
  email: [eyebrow, headline, subhead, body, { key: "cta", label: "Button label", kind: "text" }, url],
  web: [eyebrow, headline, subhead, { ...items, label: "Support points", help: "One per line as \"title — detail\"." }, { key: "cta", label: "Button label", kind: "text" }, url],
  cta: [eyebrow, headline, subhead, { key: "cta", label: "Button label", kind: "text" }, url],
  event: [eyebrow, index, headline, subhead, { key: "date", label: "Date · time", kind: "text" }, { key: "venue", label: "Venue / platform", kind: "text" }, { ...items, label: "Speakers", help: "One per line as \"name — role\"." }, cta, url],
  offer: [eyebrow, index, { key: "value", label: "Offer figure", kind: "text" }, { key: "unit", label: "Offer suffix", kind: "text" }, headline, subhead, { key: "source", label: "Terms", kind: "text" }, { key: "cta", label: "Button label", kind: "text" }, url],
  caseStudy: [eyebrow, index, { key: "client", label: "Client", kind: "text" }, headline, { key: "leftTitle", label: "Challenge title", kind: "text" }, { key: "leftBody", label: "Challenge", kind: "textarea" }, { key: "rightTitle", label: "Result title", kind: "text" }, { key: "rightBody", label: "Result", kind: "textarea" }, { ...items, label: "Outcome metrics", help: "One per line as \"figure — label\"." }, cta, url],
  meme: [eyebrow, headline, subhead, body, cta],
  hiring: [eyebrow, index, { key: "role", label: "Role", kind: "text" }, headline, subhead, { ...items, label: "Details", help: "One per line as \"label — value\"." }, { key: "cta", label: "Button label", kind: "text" }, url],
};

/** Split "left — right" list entries into a labelled pair. */
export function splitItem(raw: string): { a: string; b: string } {
  const m = raw.split(/\s+[—–-]{1,2}\s+/);
  return { a: (m[0] ?? raw).trim(), b: m.slice(1).join(" — ").trim() };
}
