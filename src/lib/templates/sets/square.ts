import type { TemplateDef } from "../types";

const S = "square";

export const squareTemplates: TemplateDef[] = [
  {
    id: "sq-normal", category: "square", name: "Normal post", layout: "statement", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: "01 / RESEARCH", index: "PXC-2026-041",
      headline: "Private AI, built on your data, in your languages, under your control.",
      subhead: "We build, adapt and privately operate AI for African organizations.",
      body: "Nothing leaves your boundary. Every answer cites its source.",
      cta: "Read more", url: "privexlabs.com",
    },
  },
  {
    id: "sq-feature", category: "square", name: "Feature announcement", layout: "feature", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "05 / PRODUCT", index: "PRIVEXBOT v2.3",
      headline: "Source-locked answers in PrivexBot Docs",
      subhead: "Answers come from your documents only. Every claim carries a citation.",
      cta: "Release notes", url: "privexlabs.com/changelog",
    },
    items: [
      "Citation on every sentence — click through to the source paragraph",
      "Refusal by default — no source, no answer",
      "Per-collection access control — inherited from your directory",
    ],
  },
  {
    id: "sq-product-update", category: "square", name: "Product update", layout: "feature", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: "05 / PRODUCT", index: "2026.04",
      headline: "What changed this month",
      subhead: "Three shipped items, one deprecation.",
      cta: "Full changelog", url: "privexlabs.com/changelog",
    },
    items: [
      "Swahili and Amharic OCR — now default for scanned PDFs",
      "Evaluation runs export to CSV — reproducible scoring",
      "Deprecated: legacy /v1 retrieval endpoint, removed 30 June",
    ],
  },
  {
    id: "sq-customer-quote", category: "square", name: "Customer quote", layout: "quote", sizeId: S,
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "09 / LEADERSHIP", index: "PXQ-2026-12",
      quote: "We stopped sending customer documents to a third country. Accuracy went up, not down.",
      author: "Grace Achieng", role: "CTO · Regional bank, Nairobi",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    id: "sq-testimonial", category: "square", name: "Customer testimonial", layout: "testimonial", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXC-2026-018",
      quote: "The pilot answered questions our support team took two days to answer. It ran entirely on our own hardware.",
      author: "Samuel Okonkwo", role: "Head of operations · Logistics group, Lagos",
      value: "94%", unit: "of queries resolved without escalation",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    id: "sq-stat", category: "square", name: "Big stat card", layout: "stat", sizeId: S,
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
    id: "sq-data", category: "square", name: "Data / insight", layout: "metrics", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: "01 / RESEARCH", index: "PXR-2026-09",
      headline: "Small, adapted models beat large, prompted ones",
      subhead: "Measured on the same 1,240-document Swahili extraction set.",
      source: "Latency measured at p95, single A100, batch size 1",
      cta: "Method and data", url: "privexlabs.com/research",
    },
    items: ["+18pt — accuracy over the prompted 70B baseline", "6.4× — lower p95 latency", "91% — lower cost per 1k documents"],
  },
  {
    id: "sq-launch", category: "square", name: "Launch / milestone", layout: "statement", sizeId: S,
    surface: "brand", align: "left",
    text: {
      eyebrow: "04 / INFRASTRUCTURE", index: "LG-1",
      headline: "Inference cluster LG-1 is operational.",
      subhead: "Private inference in Lagos. Your data does not leave the region.",
      body: "99.97% uptime over the first 30 days.",
      cta: "Capacity and pricing", url: "privexlabs.com/infrastructure",
    },
  },
  {
    id: "sq-event", category: "square", name: "Event announcement", layout: "event", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "PXE-2026-03",
      headline: "Evaluating AI in low-resource languages",
      subhead: "An open working session on method, not marketing.",
      date: "14 May 2026 · 15:00 EAT", venue: "Online · Privex Academy",
      cta: "Register", url: "privexlabs.com/events",
    },
    items: ["Amina Mwangi — Head of research, PrivexLabs", "Dr. Yohannes Bekele — Computational linguistics, Addis Ababa University"],
  },
  {
    id: "sq-hot-take", category: "square", name: "Industry hot take", layout: "statement", sizeId: S,
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "07 / OPINION", index: "PXO-2026-05",
      headline: "\"AI sovereignty\" means nothing if inference runs offshore.",
      subhead: "Where the weights live matters less than where the request goes.",
      body: "A model you can download, running on a cluster you cannot audit, is not private.",
      cta: "Read the argument", url: "privexlabs.com/writing",
    },
  },
  {
    id: "sq-did-you-know", category: "square", name: "Educational / did you know", layout: "stat", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "PXA-2026-11",
      value: "3", unit: "%",
      headline: "of common tokenizer vocabularies cover Amharic script.",
      subhead: "That is why the same prompt costs four times more in Amharic than in English.",
      source: "Measured across 5 open tokenizers, 2026",
      cta: "Privex Academy", url: "privexlabs.com/academy",
    },
  },
  {
    id: "sq-blog-promo", category: "square", name: "Blog promo", layout: "statement", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "NEW ARTICLE",
      headline: "How we evaluate a model before we recommend it",
      subhead: "Nine checks, in order, and the three that eliminate most candidates.",
      body: "8 min read",
      cta: "Read", url: "privexlabs.com/writing",
    },
  },
  {
    id: "sq-case-study", category: "square", name: "Case study", layout: "caseStudy", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      client: "Regional bank · Nairobi",
      headline: "Document review moved in-house in nine weeks",
      leftTitle: "Challenge", leftBody: "Loan files in three languages, reviewed manually, two-day turnaround.",
      rightTitle: "Result", rightBody: "An adapted 8B model on the bank's own hardware, reviewed and audited internally.",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
    items: ["9 wks — pilot to production", "2 days → 40 min — median review time", "0 — documents leaving the boundary"],
  },
  {
    id: "sq-spotlight", category: "square", name: "Product / feature spotlight", layout: "feature", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: "05 / PRODUCT", index: "PRIVEXBOT DOCS",
      headline: "Every answer shows its work",
      subhead: "The citation is not a footnote. It is the interface.",
      cta: "See it", url: "privexlabs.com/privexbot",
    },
    items: [
      "Inline citations — hover to see the source paragraph",
      "Confidence shown as coverage, not a percentage guess",
      "Refuses when the corpus does not contain the answer",
    ],
  },
  {
    id: "sq-comparison", category: "square", name: "Comparison / vs alternatives", layout: "split", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "03 / AI ENGINE", index: "PXR-2026-09",
      headline: "Prompted frontier model vs adapted small model",
      leftTitle: "Prompted 70B, hosted", leftBody: "Higher ceiling on open-ended reasoning. Data leaves the region. Cost scales with every request.",
      rightTitle: "Adapted 8B, private", rightBody: "Higher accuracy on your documents. Runs on your hardware. Cost is fixed after adaptation.",
      cta: "Method and data", url: "privexlabs.com/research",
    },
  },
  {
    id: "sq-community", category: "square", name: "Community spotlight", layout: "profile", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: "08 / COMMUNITY", index: "PXC-2026-030",
      author: "Fatima Diallo", role: "Contributor · Wolof evaluation set",
      headline: "She built the benchmark we were missing",
      body: "Fatima assembled and annotated 600 Wolof customer-service transcripts, then published the scoring rubric alongside them. Both are open.",
      cta: "See the dataset", url: "privexlabs.com/community",
    },
  },
  {
    id: "sq-hiring", category: "square", name: "Hiring / careers", layout: "hiring", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: "10 / CAREERS", index: "ENG-2026-02",
      role: "Inference engineer",
      headline: "Make private inference fast enough that nobody argues for the alternative.",
      subhead: "You will own serving performance on our Lagos and Nairobi clusters.",
      cta: "Apply", url: "privexlabs.com/careers",
    },
    items: ["Location — Lagos or Nairobi", "Mode — Hybrid, 3 days", "Stack — vLLM, Triton, Rust"],
  },
  {
    id: "sq-partnership", category: "square", name: "Partnership announcement", layout: "statement", sizeId: S,
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
    id: "sq-meme", category: "square", name: "Lighthearted", layout: "meme", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: "11 / ASIDE", index: "",
      headline: "\"It works on the benchmark\"",
      body: "[ screenshot or diagram ]",
      subhead: "The benchmark was in English.",
      cta: "privexlabs.com",
    },
  },
  {
    id: "sq-cta", category: "square", name: "CTA · sign up", layout: "cta", sizeId: S,
    surface: "foundation", align: "center",
    text: {
      eyebrow: "01 / COMPANY", index: "",
      headline: "Run the pilot on your own data.",
      subhead: "Four weeks, your hardware or ours, a written evaluation at the end.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
];
