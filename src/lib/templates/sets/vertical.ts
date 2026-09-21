import { eyebrow } from "@/lib/brand";
import { CASES, EVENT, PARTNERSHIP, PRIVEXBOT, RD, TRAINING } from "@/lib/examples";
import type { TemplateDef } from "../types";

const base = { category: "vertical", sizeId: "vertical" } as const;
const { docReview } = CASES;

/** 1080×1920. One idea per frame, readable at thumb size, safe of platform chrome. */
export const verticalTemplates: TemplateDef[] = [
  {
    ...base, id: "vt-launch", name: "Story / Reel · Launch", layout: "statement",
    surface: "brand", align: "left",
    text: {
      eyebrow: eyebrow("training"), index: TRAINING.id,
      headline: "AI training for business teams, technical teams and leadership.",
      subhead: "Taught on your own workflows and data.",
      body: `Three tracks. ${TRAINING.weeks}.`,
      cta: "Programme details", url: "privexlabs.com/training",
    },
  },
  {
    ...base, id: "vt-feature", name: "Story / Reel · Feature", layout: "feature",
    surface: "foundation",
    text: {
      eyebrow: eyebrow("products"), index: "PRIVEXBOT",
      headline: "Chatbots on your own knowledge base",
      subhead: `${PRIVEXBOT.name}, one of the products from PrivexLabs.`,
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
    items: [
      "Add documents, then reindex",
      "Build chatbots and chatflows",
      "Workspaces with members and roles",
    ],
  },
  {
    ...base, id: "vt-demo", name: "Story / Reel · Product demo", layout: "steps",
    surface: "elevated",
    text: {
      eyebrow: eyebrow("products"), index: "DEMO",
      headline: "Knowledge base to chatbot in three steps.",
      subhead: "How a PrivexBot chatbot comes together.",
      cta: "Watch the demo", url: PRIVEXBOT.url,
    },
    items: [
      "Add documents to a knowledge base",
      "Build a chatbot or chatflow on it",
      "See how it is used in analytics",
    ],
  },
  {
    ...base, id: "vt-stat", name: "Story / Reel · Big stat", layout: "stat",
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.evaluation.id,
      value: RD.evaluation.value, unit: RD.evaluation.unit,
      headline: "open models were usable for document extraction without customization.",
      subhead: "We tested six.",
      source: RD.evaluation.sample,
      cta: "Full evaluation", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "vt-quote", name: "Story / Reel · Quote", layout: "quote",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.followUp.quoteId,
      quote: RD.followUp.quote,
      author: RD.followUp.by.name, role: RD.followUp.by.role,
      cta: "", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "vt-testimonial", name: "Story / Reel · Testimonial", layout: "testimonial",
    surface: "paper",
    text: {
      eyebrow: eyebrow("private", "case study"), index: docReview.id,
      quote: docReview.quote,
      author: docReview.by.name, role: docReview.by.role,
      value: docReview.metrics[2].value, unit: docReview.metrics[2].label,
      cta: "Case study", url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "vt-info", name: "Story / Reel · Info", layout: "list",
    surface: "paper",
    text: {
      eyebrow: eyebrow("private"), index: "",
      headline: "What a private deployment includes",
      subhead: "",
      cta: "Overview", url: "privexlabs.com/private-ai",
    },
    items: ["Your data, indexed where it lives", "A model customized on your data", "Inference in your own environment", "A full log of every request and answer"],
  },
  {
    ...base, id: "vt-educational", name: "Story / Reel · Educational", layout: "stat",
    surface: "elevated",
    text: {
      eyebrow: eyebrow("training"), index: RD.retrieval.id,
      value: RD.retrieval.value, unit: RD.retrieval.unit,
      headline: RD.retrieval.claim,
      subhead: RD.retrieval.subhead,
      source: RD.retrieval.sample,
      cta: "AI training", url: "privexlabs.com/training",
    },
  },
  {
    ...base, id: "vt-bts", name: "Story / Reel · Behind the scenes", layout: "profile",
    surface: "foundation",
    text: {
      eyebrow: eyebrow("models", "behind the scenes"), index: "",
      author: "Evaluation week", role: "April 2026",
      headline: "1,240 documents, scored by hand first",
      body: "Before any model saw the set, four reviewers scored a sample blind. That baseline is what every model is measured against.",
      cta: "How we evaluate", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "vt-announcement", name: "Story / Reel · Announcement", layout: "statement",
    surface: "brand",
    text: {
      eyebrow: eyebrow("news"), index: PARTNERSHIP.id,
      headline: PARTNERSHIP.statement,
      subhead: PARTNERSHIP.subhead,
      body: PARTNERSHIP.body,
      cta: "Details", url: "privexlabs.com/news",
    },
  },
  {
    ...base, id: "vt-countdown", name: "Story / Reel · Countdown", layout: "stat",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: eyebrow("events"), index: EVENT.id,
      value: "3", unit: " days",
      headline: "until the working session on evaluating AI on your own documents.",
      subhead: "Method, not marketing. Open to anyone building with AI.",
      source: EVENT.date,
      cta: "Register", url: "privexlabs.com/events",
    },
  },
  {
    ...base, id: "vt-poll", name: "Story / Reel · Poll / question", layout: "poll",
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("community"), index: "POLL",
      headline: "What blocks your AI project first?",
      subhead: "Tap one.",
      cta: "", url: "privexlabs.com/community",
    },
    items: ["Data that cannot leave your systems — 42%", "No way to measure success — 27%", "Cost per request — 19%", "Skills in the team — 12%"],
  },
  {
    ...base, id: "vt-cta", name: "Story / Reel · CTA", layout: "cta",
    surface: "brand", align: "center",
    text: {
      eyebrow: "PRIVEXLABS", index: "",
      headline: "Start with one problem and your own data.",
      subhead: "Four weeks. You keep the evaluation set and the findings.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "vt-event", name: "Story / Reel · Event", layout: "event",
    surface: "paper",
    text: {
      eyebrow: eyebrow("events"), index: EVENT.id,
      headline: EVENT.headline,
      subhead: "An open working session.",
      date: "14 May · 15:00 UTC", venue: EVENT.venue,
      cta: "Register", url: "privexlabs.com/events",
    },
    items: [...EVENT.speakers],
  },
];
