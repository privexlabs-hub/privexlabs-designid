import { eyebrow } from "@/lib/brand";
import { CASES, PARTNERSHIP, PRIVEXBOT, RD, metric } from "@/lib/examples";
import type { TemplateDef } from "../types";

const base = { category: "portrait", sizeId: "portrait" } as const;
const { docReview, support } = CASES;

/** 1080×1350. The densest feed unit — room for the evidence under the claim. */
export const portraitTemplates: TemplateDef[] = [
  {
    ...base, id: "pt-announcement", name: "Feed post · Announcement", layout: "statement",
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
    ...base, id: "pt-product", name: "Feed post · Product", layout: "feature",
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("products"), index: "PRIVEXBOT",
      headline: "PrivexBot builds chatbots on your own knowledge bases",
      subhead: "One of the products from PrivexLabs. Add documents, build a chatbot, see how it is used.",
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
    items: [
      "Knowledge bases — add documents and reindex them",
      "Chatbots and chatflows — built on your knowledge bases",
      "Templates — start from one instead of a blank page",
      "Workspaces — members and roles for each team",
    ],
  },
  {
    ...base, id: "pt-quote", name: "Feed post · Quote", layout: "quote",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.followUp.quoteId,
      quote: RD.followUp.quote,
      author: RD.followUp.by.name, role: RD.followUp.by.role,
      cta: "Method and data", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "pt-stat", name: "Feed post · Big stat", layout: "stat",
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.evaluation.id,
      value: RD.evaluation.value, unit: RD.evaluation.unit,
      headline: RD.evaluation.claim,
      subhead: "We tested six. Here is where the others failed.",
      source: `Evaluation set: ${RD.evaluation.sample}`,
      cta: "Full evaluation", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "pt-educational", name: "Feed post · Educational", layout: "list",
    surface: "elevated",
    text: {
      eyebrow: eyebrow("training"), index: "",
      headline: "Five checks before you pick a model",
      subhead: "In this order. Three of them eliminate most candidates.",
      cta: "Full checklist", url: "privexlabs.com/writing",
    },
    items: [
      "Whether an existing model or API already solves it",
      "Licence terms for commercial and derivative use",
      "Measured accuracy on your documents, not a public benchmark",
      "p95 latency at your real batch size",
      "Behaviour when the answer is not in your data",
    ],
  },
  {
    ...base, id: "pt-testimonial", name: "Feed post · Testimonial", layout: "testimonial",
    surface: "paper",
    text: {
      eyebrow: eyebrow("engineering", "case study"), index: support.id,
      quote: support.quote,
      author: support.by.name, role: support.by.role,
      value: support.metrics[0].value, unit: support.metrics[0].label,
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "pt-case-study", name: "Feed post · Case study", layout: "caseStudy",
    surface: "foundation",
    text: {
      eyebrow: eyebrow("private", "case study"), index: docReview.id,
      client: docReview.client,
      headline: docReview.headline,
      leftTitle: "Challenge", leftBody: docReview.challenge,
      rightTitle: "Result", rightBody: docReview.result,
      cta: "Read the case study", url: "privexlabs.com/work",
    },
    items: docReview.metrics.map(metric),
  },
  {
    ...base, id: "pt-cta", name: "Feed post · CTA", layout: "cta",
    surface: "brand", align: "center",
    text: {
      eyebrow: "PRIVEXLABS", index: "",
      headline: "Start with one problem and your own data.",
      subhead: "Four weeks in your own environment, and a written evaluation at the end — whatever we conclude.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
];
