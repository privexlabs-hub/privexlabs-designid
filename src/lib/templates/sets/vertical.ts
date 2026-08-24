import type { TemplateDef } from "../types";

const base = { category: "vertical", sizeId: "vertical" } as const;

/** 1080×1920. One idea per frame, readable at thumb size, safe of platform chrome. */
export const verticalTemplates: TemplateDef[] = [
  {
    ...base, id: "vt-launch", name: "Story / Reel · Launch", layout: "statement",
    surface: "brand", align: "left",
    text: {
      eyebrow: "04 / INFRASTRUCTURE", index: "LG-1",
      headline: "Inference cluster LG-1 is live in Lagos.",
      subhead: "Private inference, in-region, on hardware we operate.",
      body: "99.97% uptime, first 30 days.",
      cta: "Capacity", url: "privexlabs.com/infrastructure",
    },
  },
  {
    ...base, id: "vt-feature", name: "Story / Reel · Feature", layout: "feature",
    surface: "foundation",
    text: {
      eyebrow: "05 / PRODUCT", index: "PRIVEXBOT v2.3",
      headline: "Source-locked answers",
      subhead: "Answers come from your documents only.",
      cta: "See it", url: "privexlabs.com/privexbot",
    },
    items: [
      "Citation on every sentence",
      "Refusal when the corpus has no answer",
      "Access control inherited from your directory",
    ],
  },
  {
    ...base, id: "vt-demo", name: "Story / Reel · Product demo", layout: "steps",
    surface: "elevated",
    text: {
      eyebrow: "05 / PRODUCT", index: "DEMO",
      headline: "Ask. Check the source. Ship.",
      subhead: "Three taps from question to verified answer.",
      cta: "Watch the demo", url: "privexlabs.com/privexbot",
    },
    items: [
      "Ask in Swahili or English",
      "Open the cited paragraph in place",
      "Export the answer with its trail",
    ],
  },
  {
    ...base, id: "vt-stat", name: "Story / Reel · Big stat", layout: "stat",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "01 / RESEARCH", index: "PXR-2026-07",
      value: "2", unit: "/6",
      headline: "open models were usable for Swahili document extraction.",
      subhead: "We tested six.",
      source: "1,240 documents, 4 institutions",
      cta: "Full evaluation", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "vt-quote", name: "Story / Reel · Quote", layout: "quote",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "09 / LEADERSHIP", index: "",
      quote: "Fine-tuning a small model on local data beat prompting a model ten times its size.",
      author: "Amina Mwangi", role: "Head of research · PrivexLabs",
      cta: "", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "vt-testimonial", name: "Story / Reel · Testimonial", layout: "testimonial",
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      quote: "Our regulator asked where the data goes. The answer fits in one sentence now.",
      author: "Grace Achieng", role: "CTO · Regional bank, Nairobi",
      value: "0", unit: "cross-border transfers in 12 months",
      cta: "Case study", url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "vt-info", name: "Story / Reel · Info", layout: "list",
    surface: "paper",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "",
      headline: "What a private deployment includes",
      subhead: "",
      cta: "Overview", url: "privexlabs.com/infrastructure",
    },
    items: ["In-place document indexing", "Adaptation on your data", "In-region inference", "Full request audit log"],
  },
  {
    ...base, id: "vt-educational", name: "Story / Reel · Educational", layout: "stat",
    surface: "elevated",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "PXA-2026-14",
      value: "4", unit: "×",
      headline: "more tokens to say the same sentence in Amharic than in English.",
      subhead: "Tokenizer coverage, not model quality, drives most of that gap.",
      source: "5 open tokenizers, 2026",
      cta: "Academy", url: "privexlabs.com/academy",
    },
  },
  {
    ...base, id: "vt-bts", name: "Story / Reel · Behind the scenes", layout: "profile",
    surface: "foundation",
    text: {
      eyebrow: "01 / COMPANY", index: "",
      author: "Evaluation week", role: "Nairobi · April 2026",
      headline: "1,240 documents, scored by hand first",
      body: "Before any model saw the set, four reviewers scored a sample blind. That baseline is what every model is measured against.",
      cta: "How we evaluate", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "vt-announcement", name: "Story / Reel · Announcement", layout: "statement",
    surface: "brand",
    text: {
      eyebrow: "01 / COMPANY", index: "PXP-2026-02",
      headline: "An open Amharic evaluation set, with Addis Ababa University.",
      subhead: "6,000 annotated documents, four domains, open licence.",
      body: "First release: September 2026.",
      cta: "Details", url: "privexlabs.com/news",
    },
  },
  {
    ...base, id: "vt-countdown", name: "Story / Reel · Countdown", layout: "stat",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "PXE-2026-03",
      value: "3", unit: " days",
      headline: "until the evaluation working session.",
      subhead: "Method, not marketing. Open to anyone building in a low-resource language.",
      source: "14 May 2026 · 15:00 EAT",
      cta: "Register", url: "privexlabs.com/events",
    },
  },
  {
    ...base, id: "vt-poll", name: "Story / Reel · Poll / question", layout: "poll",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "08 / COMMUNITY", index: "POLL",
      headline: "What blocks your deployment first?",
      subhead: "Tap one.",
      cta: "", url: "privexlabs.com/community",
    },
    items: ["Data residency rules — 42%", "No evaluation set — 27%", "Cost per request — 19%", "Language coverage — 12%"],
  },
  {
    ...base, id: "vt-cta", name: "Story / Reel · CTA", layout: "cta",
    surface: "brand", align: "center",
    text: {
      eyebrow: "01 / COMPANY", index: "",
      headline: "Run a pilot on your own data.",
      subhead: "Four weeks. You keep the evaluation set and the findings.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "vt-event", name: "Story / Reel · Event", layout: "event",
    surface: "paper",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "PXE-2026-03",
      headline: "Evaluating AI in low-resource languages",
      subhead: "An open working session.",
      date: "14 May · 15:00 EAT", venue: "Online",
      cta: "Register", url: "privexlabs.com/events",
    },
    items: ["Amina Mwangi — Head of research, PrivexLabs", "Dr. Yohannes Bekele — Addis Ababa University"],
  },
];
