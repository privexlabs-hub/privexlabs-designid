import type { TemplateDef } from "../types";

const base = { category: "web" } as const;

/** Heroes, sections, banners and share cards for privexlabs.com. */
export const webTemplates: TemplateDef[] = [
  {
    ...base, id: "wb-hero", name: "Website · Hero", layout: "web", sizeId: "web-hero",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "AFRICAN AI LABORATORY",
      headline: "Private AI, built on your data, in your languages, under your control.",
      subhead: "We build, adapt and privately operate AI for African organizations — inside their own boundary.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
    items: ["14 — production deployments", "6 — languages in evaluation", "0 — cross-border transfers"],
  },
  {
    ...base, id: "wb-feature", name: "Website · Feature", layout: "feature", sizeId: "web-section",
    surface: "paper",
    text: {
      eyebrow: "05 / PRODUCT", index: "PRIVEXBOT DOCS",
      headline: "Every answer shows its work",
      subhead: "The citation is not a footnote. It is the interface.",
      cta: "See it", url: "privexlabs.com/privexbot",
    },
    items: [
      "Inline citations — hover to open the source paragraph",
      "Refusal by default — no source, no answer",
      "Directory-inherited access control per collection",
    ],
  },
  {
    ...base, id: "wb-product", name: "Website · Product", layout: "diagram", sizeId: "web-section",
    surface: "foundation",
    text: {
      eyebrow: "04 / INFRASTRUCTURE", index: "REFERENCE DEPLOYMENT",
      headline: "What runs where",
      subhead: "Nothing in this diagram crosses your network boundary.",
      source: "Reference deployment · single region",
      cta: "Technical overview", url: "privexlabs.com/infrastructure",
    },
    items: [
      "Your documents — indexed in place",
      "Adaptation — fine-tuning on your data",
      "Inference — your hardware or in-region cluster",
      "Observability — full request and citation log",
    ],
  },
  {
    ...base, id: "wb-testimonial", name: "Website · Testimonial", layout: "testimonial", sizeId: "web-section",
    surface: "elevated",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      quote: "We stopped sending customer documents to a third country. Accuracy went up, not down.",
      author: "Grace Achieng", role: "CTO · Regional bank, Nairobi",
      value: "94%", unit: "of queries resolved without escalation",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "wb-case-study", name: "Website · Case study", layout: "caseStudy", sizeId: "web-section",
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      client: "REGIONAL BANK · NAIROBI",
      headline: "Document review moved in-house in nine weeks",
      leftTitle: "Challenge", leftBody: "Loan files in three languages, reviewed manually, two-day turnaround, no audit trail.",
      rightTitle: "Result", rightBody: "An adapted 8B model on the bank's own hardware, audited internally, every decision cited.",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
    items: ["9 wks — pilot to production", "40 min — median review time", "0 — documents leaving the boundary"],
  },
  {
    ...base, id: "wb-cta", name: "Website · CTA", layout: "cta", sizeId: "web-banner",
    surface: "brand", align: "center",
    text: {
      eyebrow: "", index: "",
      headline: "Run the pilot on your own data.",
      subhead: "Four weeks. A written evaluation either way.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "wb-blog-hero", name: "Website · Blog hero", layout: "statement", sizeId: "web-hero",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "01 / RESEARCH", index: "PXR-2026-07 · 8 MIN READ",
      headline: "Six open models on Swahili financial documents",
      subhead: "We tested six. Two were usable. Here is where the others fail, and why the tokenizer explains most of it.",
      body: "Amina Mwangi · 14 April 2026",
      cta: "", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "wb-og", name: "Website · Open Graph", layout: "statement", sizeId: "og",
    surface: "foundation",
    text: {
      eyebrow: "01 / RESEARCH", index: "PXR-2026-07",
      headline: "Six open models on Swahili financial documents",
      subhead: "Two were usable. Here is where the others fail.",
      body: "",
      cta: "", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "wb-social-share", name: "Website · Social share", layout: "stat", sizeId: "og",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "01 / RESEARCH", index: "PXR-2026-07",
      value: "2", unit: "/6",
      headline: "open models were usable.",
      subhead: "Swahili financial-document extraction, 1,240 documents.",
      source: "",
      cta: "Full evaluation", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "wb-banner", name: "Website · Banner", layout: "banner", sizeId: "web-banner",
    surface: "elevated",
    text: { eyebrow: "NEW", headline: "Cluster LG-1 is operational in Lagos.", subhead: "", url: "PRIVEXLABS.COM/INFRASTRUCTURE" },
  },
];
