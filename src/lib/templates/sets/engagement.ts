import { PRINCIPLES, eyebrow } from "@/lib/brand";
import { CASES, CAST, COMPANY_FIGURES, OPINION, RD, metric } from "@/lib/examples";
import type { TemplateDef } from "../types";

const S = "square";
const { docReview, clinical } = CASES;

export const engagementTemplates: TemplateDef[] = [
  {
    id: "en-why-us", category: "engagement", name: "Why us · founder story", layout: "profile", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: eyebrow("opinion", "founder story"), index: "PXC-2026-001",
      author: CAST.founder.name, role: CAST.founder.role,
      headline: "We started because AI kept arriving as a demo, not a system",
      body: "Organizations were buying AI tools that never touched their own data or workflows. We thought the harder, more useful job was to build systems that do — and to leave the team able to run them.",
      cta: "About us", url: "privexlabs.com/about",
    },
  },
  {
    id: "en-team-story", category: "engagement", name: "Founder / team story", layout: "profile", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: eyebrow("models", "team"), index: "PXC-2026-022",
      author: CAST.rd.name, role: CAST.rd.role,
      headline: "If we cannot measure it on your documents, we do not claim it",
      body: "Our R&D team builds the evaluation set before a model is chosen. Every recommendation we make comes with the scores behind it.",
      cta: "The team", url: "privexlabs.com/team",
    },
  },
  {
    id: "en-manifesto", category: "engagement", name: "Manifesto · what we believe", layout: "list", sizeId: S,
    surface: "brand",
    text: {
      eyebrow: "PRIVEXLABS", index: "WHAT WE BELIEVE",
      headline: "Four of the principles we work by",
      subhead: "",
      cta: "Read how we work", url: "privexlabs.com/about",
    },
    // Four of the six, verbatim; the list layout is set for four lines.
    items: [PRINCIPLES[0], PRINCIPLES[2], PRINCIPLES[3], PRINCIPLES[5]].map((p) => p.title),
  },
  {
    id: "en-problem-solution", category: "engagement", name: "Problem / solution split", layout: "split", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: eyebrow("private"), index: "",
      headline: "The constraint is rarely the model. It is where the data is allowed to go.",
      leftTitle: "The problem", leftBody: "Sensitive data cannot leave the organization. Most hosted assistants need it to.",
      rightTitle: "What we build", rightBody: "Private AI deployed in your own environment — on-premise, private cloud or hybrid.",
      cta: "How it works", url: "privexlabs.com/private-ai",
    },
  },
  {
    id: "en-before-after", category: "engagement", name: "Before / after", layout: "split", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: eyebrow("private", "case study"), index: docReview.id,
      headline: "Nine weeks of difference",
      leftTitle: "Before", leftBody: "Loan files reviewed by hand. Two-day median turnaround. No audit trail.",
      rightTitle: "After", rightBody: "A customized model on the institution's own infrastructure. 40-minute median. Every decision traceable to its source.",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    id: "en-did-you-know", category: "engagement", name: "Did you know · educational", layout: "stat", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("training"), index: RD.method.id,
      value: "9", unit: " checks",
      headline: "run before we recommend any model.",
      subhead: "Three of them eliminate most candidates before a single benchmark is run.",
      source: `Method: ${RD.method.id}`,
      cta: "AI training", url: "privexlabs.com/training",
    },
  },
  {
    id: "en-how-it-works", category: "engagement", name: "How it works", layout: "steps", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: eyebrow("private"), index: "",
      headline: "How a private deployment runs",
      subhead: "Four stages, all inside your environment.",
      cta: "Technical overview", url: "privexlabs.com/private-ai",
    },
    items: [
      "Understand — we study the process, the data and the people who use it",
      "Build — a model customized on your data, integrated with your systems",
      "Deploy — on-premise, private cloud or hybrid, wherever your data is allowed to be",
      "Measure — every request, answer and outcome logged and evaluated",
    ],
  },
  {
    id: "en-use-cases", category: "engagement", name: "Use case · examples", layout: "list", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: eyebrow("engineering"), index: "",
      headline: "Where practical AI has paid for itself",
      subhead: "Four deployments, four different constraints.",
      cta: "See the work", url: "privexlabs.com/work",
    },
    items: [
      "Loan-file review for a financial institution",
      "Clinical guideline search inside a hospital network",
      "Tender-document extraction for a public-sector agency",
      "Customer-support automation for a logistics group",
    ],
  },
  {
    id: "en-testimonial-proof", category: "engagement", name: "Customer testimonial · proof", layout: "testimonial", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: eyebrow("private", "case study"), index: clinical.id,
      quote: clinical.quote,
      author: clinical.by.name, role: clinical.by.role,
      value: clinical.metrics[1].value, unit: clinical.metrics[1].label,
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    id: "en-social-proof", category: "engagement", name: "Social proof", layout: "metrics", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: "PRIVEXLABS", index: "2026",
      headline: "What PrivexLabs covers",
      subhead: "",
      source: "",
      cta: "About PrivexLabs", url: "privexlabs.com",
    },
    items: [...COMPANY_FIGURES, { value: String(PRINCIPLES.length), label: "principles we work by" }].map(metric),
  },
  {
    id: "en-faq", category: "engagement", name: "FAQ", layout: "faq", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: eyebrow("private"), index: "",
      headline: "Four questions we are asked every week",
      cta: "More answers", url: "privexlabs.com/faq",
    },
    items: [
      "Do you train on our data? — Only inside your environment, and the resulting model stays yours.",
      "Do we need GPUs? — Not always. Where an existing model or API is sufficient, we use it.",
      "Where does it run? — Cloud, private cloud, on-premise or hybrid — wherever your data is allowed to be.",
      "What if the model does not know? — It says so. We measure how often, and close the gaps.",
    ],
  },
  {
    id: "en-myth-fact", category: "engagement", name: "Myth vs fact", layout: "split", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.followUp.id,
      headline: "\"Private AI means worse AI\"",
      leftTitle: "The myth", leftBody: "Running AI privately means settling for a weaker model and worse answers.",
      rightTitle: "What we measured", rightBody: "On one document-extraction task, a customized 8B model scored 18 points above a prompted 70B — at a sixth of the latency.",
      cta: "Method and data", url: RD.evaluation.url,
    },
  },
  {
    id: "en-tips", category: "engagement", name: "Tips / checklist", layout: "list", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: eyebrow("training"), index: "",
      headline: "Before you pick a model, check these five",
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
    id: "en-comparison", category: "engagement", name: "Comparison · vs alternatives", layout: "split", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: eyebrow("private"), index: "",
      headline: "Public AI tools vs your own AI capability",
      leftTitle: "Public tools", leftBody: "Fast to start. Data leaves your control. Cost grows with every request. Behaviour changes without notice.",
      rightTitle: "Your own capability", rightBody: "Slower to start. Data stays inside. You control the model, the infrastructure and when anything changes.",
      cta: "Which fits you", url: "privexlabs.com/compare",
    },
  },
  {
    id: "en-opinion", category: "engagement", name: "Opinion / hot take", layout: "statement", sizeId: S,
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: eyebrow("opinion"), index: OPINION.id,
      headline: OPINION.headline,
      subhead: OPINION.subhead,
      body: OPINION.body,
      cta: "Read the argument", url: "privexlabs.com/writing",
    },
  },
  {
    id: "en-question", category: "engagement", name: "Question / conversation starter", layout: "statement", sizeId: S,
    surface: "brand", align: "center",
    text: {
      eyebrow: eyebrow("community"), index: "",
      headline: "What would you build first if your data never had to leave your systems?",
      subhead: "We are collecting answers from teams building with AI.",
      body: "",
      cta: "Reply in the thread", url: "privexlabs.com/community",
    },
  },
  {
    id: "en-poll", category: "engagement", name: "Poll / vote", layout: "poll", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("community"), index: "POLL",
      headline: "What blocks your AI project first?",
      subhead: "Four options. Pick the one that stopped you most recently.",
      cta: "Vote", url: "privexlabs.com/community",
    },
    items: ["Data that cannot leave your systems — 42%", "No way to measure success — 27%", "Cost per request — 19%", "Skills in the team — 12%"],
  },
  {
    id: "en-community", category: "engagement", name: "Community spotlight", layout: "profile", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: eyebrow("community"), index: "PXC-2026-031",
      author: CAST.contributor2.name, role: CAST.contributor2.role,
      headline: "A benchmark for scanned documents, built in the open",
      body: "Ingrid published a document-layout benchmark — scanned tables, forms and handwriting — with the script to reproduce it. It changed which model we recommend for scanned files.",
      cta: "See the work", url: "privexlabs.com/community",
    },
  },
  {
    id: "en-cta-signup", category: "engagement", name: "CTA · sign up", layout: "cta", sizeId: S,
    surface: "foundation", align: "center",
    text: {
      eyebrow: "PRIVEXLABS", index: "",
      headline: "Start a four-week pilot on one real problem.",
      subhead: "You keep the evaluation set and the written findings, whatever we conclude.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    id: "en-cta-learn", category: "engagement", name: "CTA · learn more", layout: "cta", sizeId: S,
    surface: "paper", align: "left", showRule: true,
    text: {
      eyebrow: eyebrow("models"), index: "",
      headline: "Read how we evaluate before we recommend.",
      subhead: "Nine checks, the data behind them, and the three that eliminate most candidates.",
      cta: "Read the method", url: RD.evaluation.url,
    },
  },
];
