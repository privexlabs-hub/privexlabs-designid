import { adsTemplates } from "./sets/ads";
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
import { CATEGORIES, SIZE_BY_ID, type Doc, type TemplateDef } from "./types";

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
    text,
    items: [...(t.items ?? [])],
  };
}

export function sizeOf(doc: Doc) {
  return SIZE_BY_ID[doc.sizeId] ?? SIZE_BY_ID.square;
}

export { CATEGORIES, LAYOUT_FIELDS };
export * from "./types";
