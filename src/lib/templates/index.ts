import { adsTemplates } from "./sets/ads";
import { articleTemplates } from "./sets/articles";
import { avatarTemplates } from "./sets/avatar";
import { carouselTemplates } from "./sets/carousel";
import { coverTemplates } from "./sets/cover";
import { emailTemplates } from "./sets/email";
import { engagementTemplates } from "./sets/engagement";
import { portraitTemplates } from "./sets/portrait";
import { squareTemplates } from "./sets/square";
import { verticalTemplates } from "./sets/vertical";
import { webTemplates } from "./sets/web";
import { youtubeTemplates } from "./sets/youtube";
import { LAYOUT_FIELDS } from "./layouts";
import { CATEGORIES, SIZE_BY_ID, isArticleLayout, type Doc, type TemplateDef } from "./types";

export const TEMPLATES: TemplateDef[] = [
  ...squareTemplates,
  ...engagementTemplates,
  ...carouselTemplates,
  ...verticalTemplates,
  ...portraitTemplates,
  ...youtubeTemplates,
  ...coverTemplates,
  ...avatarTemplates,
  ...adsTemplates,
  ...emailTemplates,
  ...webTemplates,
  ...articleTemplates,
];

export const TEMPLATE_BY_ID: Record<string, TemplateDef> = Object.fromEntries(TEMPLATES.map((t) => [t.id, t]));

export const TEMPLATES_BY_CATEGORY = CATEGORIES.map((c) => ({
  category: c,
  templates: TEMPLATES.filter((t) => t.category === c.id),
}));

/** Build the editable document for a template. Defaults are explicit — no hidden state. */
export function docFromTemplate(t: TemplateDef): Doc {
  const fields = LAYOUT_FIELDS[t.layout];
  const text: Record<string, string> = {};
  for (const f of fields) {
    if (f.kind === "list") continue;
    text[f.key] = t.text[f.key] ?? "";
  }
  return {
    templateId: t.id,
    layout: t.layout,
    sizeId: t.sizeId,
    surface: t.surface,
    accent: t.accent ?? "brass",
    align: t.align ?? "left",
    logo: t.logo ?? "lockup",
    showMarks: t.showMarks ?? false,
    showFooter: t.showFooter ?? true,
    showRule: t.showRule ?? false,
    titleFont: t.titleFont,
    showMotif: t.showMotif,
    text,
    items: [...(t.items ?? [])],
  };
}

/** Text shared by every article template — the article itself, not its treatment. */
const ARTICLE_COPY_KEYS = new Set([
  "eyebrow", "index", "series", "headline", "subhead", "author", "role", "date", "readTime",
  "url", "quote", "value", "unit", "claim", "source",
]);

/** The article being written: every article field typed so far, plus the author photo. */
export type ArticleCopy = { text: Record<string, string>; photo?: string };

/**
 * Fold an article design's copy into the running article copy. The copy is a union across
 * layouts, so a subtitle typed on a cover survives a visit to the key-figure template, which
 * has no subtitle field. Non-article designs leave it unchanged.
 */
export function collectArticleCopy(prev: ArticleCopy | null, doc: Doc): ArticleCopy | null {
  if (!isArticleLayout(doc.layout)) return prev;
  const text = { ...(prev?.text ?? {}) };
  for (const [key, value] of Object.entries(doc.text)) {
    if (ARTICLE_COPY_KEYS.has(key)) text[key] = value;
  }
  return { text, photo: doc.photo };
}

/**
 * Apply the running article copy to an article design, keeping that design's own treatment
 * and size. Type the title once; every article template, the group export and the platform
 * pack all use it. Non-article designs pass through untouched.
 */
export function carryArticleCopy(copy: ArticleCopy | null, to: Doc): Doc {
  if (!copy || !isArticleLayout(to.layout)) return to;
  const text = { ...to.text };
  for (const key of Object.keys(text)) {
    if (ARTICLE_COPY_KEYS.has(key) && key in copy.text) text[key] = copy.text[key];
  }
  return { ...to, text, photo: copy.photo };
}

export function sizeOf(doc: Doc) {
  return SIZE_BY_ID[doc.sizeId] ?? SIZE_BY_ID.square;
}

export { CATEGORIES, LAYOUT_FIELDS };
export * from "./types";
