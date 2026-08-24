import type { TemplateDef } from "../types";

const base = { category: "ads" } as const;

/** Paid placements: one claim, one proof, one action. Never more. */
export const adsTemplates: TemplateDef[] = [
  {
    ...base, id: "ad-launch", name: "Ad · Product launch", layout: "cta", sizeId: "ad-landscape",
    surface: "brand",
    text: {
      eyebrow: "05 / PRODUCT", index: "",
      headline: "PrivexBot Docs is available now.",
      subhead: "Answers from your documents only, with a citation on every sentence.",
      cta: "See it", url: "privexlabs.com/privexbot",
    },
  },
  {
    ...base, id: "ad-feature", name: "Ad · Feature announcement", layout: "feature", sizeId: "ad-landscape",
    surface: "foundation",
    text: {
      eyebrow: "05 / PRODUCT", index: "v2.3",
      headline: "Source-locked answers",
      subhead: "No source in your corpus, no answer. That behaviour is not configurable.",
      cta: "Release notes", url: "privexlabs.com/changelog",
    },
    items: ["Inline citations", "Refusal by default", "Directory-inherited access control"],
  },
  {
    ...base, id: "ad-leadgen", name: "Ad · Lead generation", layout: "cta", sizeId: "ad-landscape",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "06 / SOLUTIONS", index: "",
      headline: "Get the evaluation method we use before recommending any model.",
      subhead: "Nine checks and the data behind them. No email gate on the method itself.",
      cta: "Get the method", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "ad-awareness", name: "Ad · Brand awareness", layout: "statement", sizeId: "ad-landscape",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "PRIVEXLABS", index: "",
      headline: "Private AI, built on your data, in your languages, under your control.",
      subhead: "An African AI laboratory and engineering company.",
      body: "",
      cta: "", url: "privexlabs.com",
    },
  },
  {
    ...base, id: "ad-retargeting", name: "Ad · Retargeting", layout: "cta", sizeId: "square",
    surface: "elevated", align: "left",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "",
      headline: "You read the evaluation. The next step is your own documents.",
      subhead: "Four weeks. Your hardware or ours. A written result either way.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "ad-proof", name: "Ad · Customer proof", layout: "testimonial", sizeId: "ad-landscape",
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      quote: "Our regulator asked where the data goes. The answer fits in one sentence now.",
      author: "Grace Achieng", role: "CTO · Regional bank, Nairobi",
      value: "0", unit: "cross-border transfers in 12 months",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "ad-stat", name: "Ad · Big stat", layout: "stat", sizeId: "square",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "01 / RESEARCH", index: "PXR-2026-07",
      value: "6.4", unit: "×",
      headline: "lower p95 latency than the prompted 70B baseline.",
      subhead: "Same documents, same hardware, an eighth of the parameters.",
      source: "Single A100, batch size 1",
      cta: "Method and data", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "ad-offer", name: "Ad · Offer / promotion", layout: "offer", sizeId: "ad-landscape",
    surface: "brand",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "",
      value: "4", unit: " weeks",
      headline: "A fixed-scope pilot on your own data",
      subhead: "Evaluation set, adapted model, written findings. Fixed fee, no renewal clause.",
      source: "Limited to four engagements per quarter.",
      cta: "Book the pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "ad-event", name: "Ad · Event", layout: "event", sizeId: "ad-landscape",
    surface: "paper",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "PXE-2026-03",
      headline: "Evaluating AI in low-resource languages",
      subhead: "An open working session on method, not marketing.",
      date: "14 May 2026 · 15:00 EAT", venue: "Online",
      cta: "Register", url: "privexlabs.com/events",
    },
    items: [],
  },
  {
    ...base, id: "ad-download", name: "Ad · App / product download", layout: "cta", sizeId: "square",
    surface: "foundation", align: "center",
    text: {
      eyebrow: "05 / PRODUCT", index: "",
      headline: "Run PrivexBot on your own machine.",
      subhead: "One binary, one config file, no outbound network calls.",
      cta: "Download", url: "privexlabs.com/download",
    },
  },
];
