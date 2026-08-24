import type { TemplateDef } from "../types";

const base = { category: "portrait", sizeId: "portrait" } as const;

/** 1080×1350. The densest feed unit — room for the evidence under the claim. */
export const portraitTemplates: TemplateDef[] = [
  {
    ...base, id: "pt-announcement", name: "Feed post · Announcement", layout: "statement",
    surface: "brand",
    text: {
      eyebrow: "01 / COMPANY", index: "PXP-2026-02",
      headline: "PrivexLabs and Addis Ababa University are building an open Amharic evaluation set.",
      subhead: "6,000 annotated documents across four domains, published under an open licence.",
      body: "First release: September 2026.",
      cta: "Details", url: "privexlabs.com/news",
    },
  },
  {
    ...base, id: "pt-product", name: "Feed post · Product", layout: "feature",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "05 / PRODUCT", index: "PRIVEXBOT v2.3",
      headline: "PrivexBot Docs answers from your documents only",
      subhead: "Every answer cites its source. When the corpus has no answer, it says so.",
      cta: "See it", url: "privexlabs.com/privexbot",
    },
    items: [
      "Inline citations — hover to open the source paragraph",
      "Refusal by default — no source, no answer",
      "Per-collection access control, inherited from your directory",
      "Full request log for audit",
    ],
  },
  {
    ...base, id: "pt-quote", name: "Feed post · Quote", layout: "quote",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "09 / LEADERSHIP", index: "PXQ-2026-12",
      quote: "Fine-tuning a small model on local data beat prompting a model ten times its size — on accuracy, latency and cost.",
      author: "Amina Mwangi", role: "Head of research · PrivexLabs",
      cta: "Method and data", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "pt-stat", name: "Feed post · Big stat", layout: "stat",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "01 / RESEARCH", index: "PXR-2026-07",
      value: "2", unit: "/6",
      headline: "open models were usable for Swahili financial-document extraction.",
      subhead: "We tested six. Here is where the others fail.",
      source: "Evaluation set: 1,240 documents, 4 institutions",
      cta: "Full evaluation", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "pt-educational", name: "Feed post · Educational", layout: "list",
    surface: "elevated",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "",
      headline: "Five checks before you pick a model",
      subhead: "In this order. Three of them eliminate most candidates.",
      cta: "Full checklist", url: "privexlabs.com/writing",
    },
    items: [
      "Tokenizer coverage for your language",
      "Licence terms for commercial and derivative use",
      "Measured accuracy on your documents, not a public benchmark",
      "p95 latency at your real batch size",
      "Behaviour when the answer is not in the corpus",
    ],
  },
  {
    ...base, id: "pt-testimonial", name: "Feed post · Testimonial", layout: "testimonial",
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      quote: "The pilot answered questions our support team took two days to answer. It ran entirely on our own hardware.",
      author: "Samuel Okonkwo", role: "Head of operations · Logistics group, Lagos",
      value: "94%", unit: "of queries resolved without escalation",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "pt-case-study", name: "Feed post · Case study", layout: "caseStudy",
    surface: "foundation",
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
    ...base, id: "pt-cta", name: "Feed post · CTA", layout: "cta",
    surface: "brand", align: "center",
    text: {
      eyebrow: "01 / COMPANY", index: "",
      headline: "Run the pilot on your own data.",
      subhead: "Four weeks, your hardware or ours, a written evaluation at the end — whatever we conclude.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
];
