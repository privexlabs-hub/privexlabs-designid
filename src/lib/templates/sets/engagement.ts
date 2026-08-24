import type { TemplateDef } from "../types";

const S = "square";

export const engagementTemplates: TemplateDef[] = [
  {
    id: "en-why-us", category: "engagement", name: "Why us · founder story", layout: "profile", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: "01 / COMPANY", index: "PXC-2026-001",
      author: "Chidi Nwosu", role: "Founder · PrivexLabs",
      headline: "We started because the answer was always \"send us your data\"",
      body: "Every credible option required a bank in Lagos to ship customer files to another continent. We thought that was a solvable engineering problem, not a fact of life. It was.",
      cta: "About us", url: "privexlabs.com/about",
    },
  },
  {
    id: "en-team-story", category: "engagement", name: "Founder / team story", layout: "profile", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: "01 / COMPANY", index: "PXC-2026-022",
      author: "Amina Mwangi", role: "Head of research · PrivexLabs",
      headline: "Nine years of NLP, four of them on languages with no benchmark",
      body: "Amina leads evaluation. Her rule: if we cannot measure it on your documents, we do not claim it.",
      cta: "The team", url: "privexlabs.com/team",
    },
  },
  {
    id: "en-manifesto", category: "engagement", name: "Manifesto · what we believe", layout: "list", sizeId: S,
    surface: "brand",
    text: {
      eyebrow: "01 / COMPANY", index: "WHAT WE BELIEVE",
      headline: "Four things we will not trade away",
      subhead: "",
      cta: "Read the full statement", url: "privexlabs.com/principles",
    },
    items: [
      "Your data stays inside your boundary — no exceptions for convenience",
      "A claim without a measurement is marketing",
      "Local languages are a requirement, not a roadmap item",
      "If we cannot explain how it works, we will not deploy it",
    ],
  },
  {
    id: "en-problem-solution", category: "engagement", name: "Problem / solution split", layout: "split", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "",
      headline: "The constraint is not the model. It is where the request goes.",
      leftTitle: "The problem", leftBody: "Regulated data cannot leave the country. Every hosted assistant asks it to.",
      rightTitle: "What we build", rightBody: "Adaptation and inference inside your boundary, on hardware you or we operate in-region.",
      cta: "How it works", url: "privexlabs.com/infrastructure",
    },
  },
  {
    id: "en-before-after", category: "engagement", name: "Before / after", layout: "split", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      headline: "Nine weeks of difference",
      leftTitle: "Before", leftBody: "Manual review of loan files in three languages. Two-day median turnaround. No audit trail.",
      rightTitle: "After", rightBody: "Adapted 8B model on internal hardware. 40-minute median. Every decision cites its source paragraph.",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    id: "en-did-you-know", category: "engagement", name: "Did you know · educational", layout: "stat", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "PXA-2026-14",
      value: "4", unit: "×",
      headline: "more tokens are needed to say the same sentence in Amharic than in English.",
      subhead: "Tokenizer coverage, not model quality, drives most of that gap.",
      source: "Measured across 5 open tokenizers, 2026",
      cta: "Privex Academy", url: "privexlabs.com/academy",
    },
  },
  {
    id: "en-how-it-works", category: "engagement", name: "How it works", layout: "steps", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: "04 / INFRASTRUCTURE", index: "",
      headline: "How a private deployment runs",
      subhead: "Four stages. None of them leave your network.",
      cta: "Technical overview", url: "privexlabs.com/infrastructure",
    },
    items: [
      "Ingest — your documents are indexed in place, inside your boundary",
      "Adapt — a small open model is fine-tuned on your data and language",
      "Serve — inference runs on your hardware or our in-region cluster",
      "Observe — every request, citation and refusal is logged for audit",
    ],
  },
  {
    id: "en-use-cases", category: "engagement", name: "Use case · examples", layout: "list", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "",
      headline: "Where private AI has actually paid for itself",
      subhead: "Four deployments, four different constraints.",
      cta: "See the work", url: "privexlabs.com/work",
    },
    items: [
      "Loan-file review in Swahili, English and Kikuyu",
      "Clinical note summarization inside a hospital network",
      "Tender-document extraction for a public procurement office",
      "Multilingual support triage across six markets",
    ],
  },
  {
    id: "en-testimonial-proof", category: "engagement", name: "Customer testimonial · proof", layout: "testimonial", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      quote: "Our regulator asked where the data goes. The answer fits in one sentence now.",
      author: "Grace Achieng", role: "CTO · Regional bank, Nairobi",
      value: "0", unit: "documents left the boundary in 12 months",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    id: "en-social-proof", category: "engagement", name: "Social proof", layout: "metrics", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "01 / COMPANY", index: "2026",
      headline: "Where we are, measured",
      subhead: "",
      source: "As of April 2026",
      cta: "About PrivexLabs", url: "privexlabs.com",
    },
    items: ["14 — production deployments", "6 — languages in evaluation", "99.97% — cluster uptime, 30 days", "0 — cross-border data transfers"],
  },
  {
    id: "en-faq", category: "engagement", name: "FAQ", layout: "faq", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: "05 / PRODUCT", index: "",
      headline: "Four questions we are asked every week",
      cta: "More answers", url: "privexlabs.com/faq",
    },
    items: [
      "Do you train on our data? — No. Adaptation happens inside your environment and the weights stay yours.",
      "Do we need GPUs? — For an 8B model, one modern GPU serves a mid-sized team. We size it during the pilot.",
      "Which languages? — Swahili, Amharic, Hausa, Yoruba, Wolof and English today. Others on evaluation.",
      "What if the model does not know? — It refuses and says so. That behaviour is not configurable.",
    ],
  },
  {
    id: "en-myth-fact", category: "engagement", name: "Myth vs fact", layout: "split", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "",
      headline: "\"Private AI means worse AI\"",
      leftTitle: "The myth", leftBody: "Running privately means settling for a weaker model and worse answers.",
      rightTitle: "What we measured", rightBody: "On domain documents, an adapted 8B model scored 18 points above a prompted 70B — at a sixth of the latency.",
      cta: "Method and data", url: "privexlabs.com/research",
    },
  },
  {
    id: "en-tips", category: "engagement", name: "Tips / checklist", layout: "list", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "",
      headline: "Before you pick a model, check these five",
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
    id: "en-comparison", category: "engagement", name: "Comparison · vs alternatives", layout: "split", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: "03 / AI ENGINE", index: "",
      headline: "Hosted assistant vs private deployment",
      leftTitle: "Hosted", leftBody: "Fast to start. Data leaves the region. Cost grows with every request. Behaviour changes without notice.",
      rightTitle: "Private", rightBody: "Slower to start. Data stays inside. Fixed cost after adaptation. You control when anything changes.",
      cta: "Which fits you", url: "privexlabs.com/compare",
    },
  },
  {
    id: "en-opinion", category: "engagement", name: "Opinion / hot take", layout: "statement", sizeId: S,
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "07 / OPINION", index: "PXO-2026-06",
      headline: "Benchmarks in English tell you almost nothing about performance in Hausa.",
      subhead: "We keep meeting teams who chose a model on a leaderboard and discovered this in production.",
      body: "Build the evaluation set first. It is a week of work and it decides everything after.",
      cta: "Read the argument", url: "privexlabs.com/writing",
    },
  },
  {
    id: "en-question", category: "engagement", name: "Question / conversation starter", layout: "statement", sizeId: S,
    surface: "brand", align: "center",
    text: {
      eyebrow: "08 / COMMUNITY", index: "",
      headline: "What would you deploy tomorrow if the data could not leave the building?",
      subhead: "We are collecting answers from teams across the continent.",
      body: "",
      cta: "Reply in the thread", url: "privexlabs.com/community",
    },
  },
  {
    id: "en-poll", category: "engagement", name: "Poll / vote", layout: "poll", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: "08 / COMMUNITY", index: "POLL",
      headline: "What blocks your AI deployment first?",
      subhead: "Four options. Pick the one that stopped you most recently.",
      cta: "Vote", url: "privexlabs.com/community",
    },
    items: ["Data residency rules — 42%", "No evaluation set — 27%", "Cost per request — 19%", "Language coverage — 12%"],
  },
  {
    id: "en-community", category: "engagement", name: "Community spotlight", layout: "profile", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "08 / COMMUNITY", index: "PXC-2026-031",
      author: "Kwame Boateng", role: "Contributor · Twi tokenizer study",
      headline: "He measured what nobody had measured",
      body: "Kwame published tokenizer coverage for Twi across seven open models, with the script to reproduce it. It changed which model we recommend for Ghana.",
      cta: "See the work", url: "privexlabs.com/community",
    },
  },
  {
    id: "en-cta-signup", category: "engagement", name: "CTA · sign up", layout: "cta", sizeId: S,
    surface: "foundation", align: "center",
    text: {
      eyebrow: "01 / COMPANY", index: "",
      headline: "Start a four-week pilot on your own data.",
      subhead: "You keep the evaluation set and the written findings, whatever we conclude.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    id: "en-cta-learn", category: "engagement", name: "CTA · learn more", layout: "cta", sizeId: S,
    surface: "paper", align: "left", showRule: true,
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "",
      headline: "Read how we evaluate before we recommend.",
      subhead: "Nine checks, the data behind them, and the three that eliminate most candidates.",
      cta: "Read the method", url: "privexlabs.com/research",
    },
  },
];
