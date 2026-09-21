import type { TemplateDef } from "../types";

const base = { category: "avatar", layout: "avatar", sizeId: "avatar", logo: "none", showFooter: false } as const;

/**
 * 400×400. Eight treatments of the same mark — never a redrawn or per-area symbol.
 * The brief asked for an "indigo" default and a "radial" campaign variant; the brand's
 * owned hue is viridian and gradients are prohibited by governance, so the default is
 * viridian and the campaign variant uses concentric registration rings instead.
 *
 * The photo / founder variant shows the mark until a photo is uploaded: PrivexLabs'
 * own people are not given invented names or initials.
 */
export const avatarTemplates: TemplateDef[] = [
  { ...base, id: "av-viridian", name: "Avatar · Viridian (default)", surface: "brand", accent: "brass", text: { headline: "" } },
  { ...base, id: "av-ink", name: "Avatar · Ink (stealth)", surface: "foundation", accent: "brass", text: { headline: "" } },
  { ...base, id: "av-white", name: "Avatar · White (light surface)", surface: "elevated", accent: "brass", text: { headline: "" } },
  { ...base, id: "av-campaign", name: "Avatar · Registration rings (campaign)", surface: "foundation", accent: "brass", showMarks: true, text: { headline: "" } },
  { ...base, id: "av-mono", name: "Avatar · Monochrome", surface: "muted", accent: "viridian", text: { headline: "" } },
  { ...base, id: "av-inverted", name: "Avatar · Inverted", surface: "brand", accent: "viridian", text: { headline: "" } },
  { ...base, id: "av-symbol", name: "Avatar · Symbol / mark", surface: "paper", accent: "brass", text: { headline: "" } },
  { ...base, id: "av-founder", name: "Avatar · Photo / founder", surface: "foundation", accent: "brass", text: { headline: "" } },
];
