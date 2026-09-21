import { BRAND_DESCRIPTIONS, company, eyebrow } from "@/lib/brand";
import { CASES, EVENT, PRIVEXBOT, RD } from "@/lib/examples";
import type { TemplateDef } from "../types";

const base = { category: "ads" } as const;
const { docReview } = CASES;

/** Paid placements: one claim, one proof, one action. Never more. */
export const adsTemplates: TemplateDef[] = [
  {
    ...base, id: "ad-launch", name: "Ad · Product launch", layout: "cta", sizeId: "ad-landscape",
    surface: "brand",
    text: {
      eyebrow: eyebrow("products"), index: "",
      headline: "PrivexBot: chatbots on your own knowledge bases.",
      subhead: "One of the products from PrivexLabs. Add documents, build a chatbot, see how it is used.",
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
  },
  {
    ...base, id: "ad-feature", name: "Ad · Feature announcement", layout: "feature", sizeId: "ad-landscape",
    surface: "foundation",
    text: {
      eyebrow: eyebrow("products"), index: "PRIVEXBOT",
      headline: "Workspaces for every team",
      subhead: "Members and roles in each workspace, so each team manages its own chatbots.",
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
    items: ["Workspaces", "Members and roles", "Chatbot analytics"],
  },
  {
    ...base, id: "ad-leadgen", name: "Ad · Lead generation", layout: "cta", sizeId: "ad-landscape",
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("models"), index: "",
      headline: "Get the evaluation method we use before recommending any model.",
      subhead: "Nine checks and the data behind them. No email gate on the method itself.",
      cta: "Get the method", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "ad-awareness", name: "Ad · Brand awareness", layout: "statement", sizeId: "ad-landscape",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "PRIVEXLABS", index: "",
      headline: company.lead,
      subhead: BRAND_DESCRIPTIONS.short,
      body: "",
      cta: "", url: "privexlabs.com",
    },
  },
  {
    ...base, id: "ad-retargeting", name: "Ad · Retargeting", layout: "cta", sizeId: "square",
    surface: "elevated", align: "left",
    text: {
      eyebrow: eyebrow("engineering"), index: "",
      headline: "You read the evaluation. The next step is your own documents.",
      subhead: "Four weeks in your own environment. A written result either way.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "ad-proof", name: "Ad · Customer proof", layout: "testimonial", sizeId: "ad-landscape",
    surface: "paper",
    text: {
      eyebrow: eyebrow("private", "case study"), index: docReview.id,
      quote: docReview.quote,
      author: docReview.by.name, role: docReview.by.role,
      value: docReview.metrics[2].value, unit: docReview.metrics[2].label,
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "ad-stat", name: "Ad · Big stat", layout: "stat", sizeId: "square",
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.followUp.id,
      value: "6.4", unit: "×",
      headline: "lower p95 latency than the prompted 70B baseline.",
      subhead: "Same documents, same hardware, an eighth of the parameters.",
      source: RD.followUp.note,
      cta: "Method and data", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "ad-offer", name: "Ad · Offer / promotion", layout: "offer", sizeId: "ad-landscape",
    surface: "brand",
    text: {
      eyebrow: eyebrow("engineering"), index: "",
      value: "4", unit: " weeks",
      headline: "A fixed-scope pilot on one real problem",
      subhead: "Evaluation set, working pilot, written findings. Fixed fee, no renewal clause.",
      source: "Limited to four engagements per quarter.",
      cta: "Book the pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "ad-event", name: "Ad · Event", layout: "event", sizeId: "ad-landscape",
    surface: "paper",
    text: {
      eyebrow: eyebrow("events"), index: EVENT.id,
      headline: EVENT.headline,
      subhead: EVENT.subhead,
      date: EVENT.date, venue: EVENT.venue,
      cta: "Register", url: "privexlabs.com/events",
    },
    items: [],
  },
  {
    ...base, id: "ad-download", name: "Ad · App / product download", layout: "cta", sizeId: "square",
    surface: "foundation", align: "center",
    text: {
      eyebrow: eyebrow("products"), index: "",
      headline: "Start with a PrivexBot template.",
      subhead: "Pick a template, add your documents to a knowledge base, and your first chatbot is ready to test.",
      cta: "Try PrivexBot", url: PRIVEXBOT.url,
    },
  },
];
