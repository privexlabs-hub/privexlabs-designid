import { eyebrow } from "@/lib/brand";
import { CASES, EVENT, OPINION, PARTNERSHIP, PRIVEXBOT, RD, CAST, TRAINING, metric } from "@/lib/examples";
import type { TemplateDef } from "../types";

const S = "square";
const { docReview, support } = CASES;

export const squareTemplates: TemplateDef[] = [
  {
    id: "sq-normal", category: "square", name: "Normal post", layout: "statement", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: "PRIVEXLABS", index: "PXC-2026-041",
      headline: "Build. Deploy. Own AI.",
      subhead: "We build, deploy and operate practical AI systems for businesses, using their own data, workflows and infrastructure.",
      body: "Six areas of work. One problem-first approach. Measured outcomes.",
      cta: "Read more", url: "privexlabs.com",
    },
  },
  {
    id: "sq-feature", category: "square", name: "Feature announcement", layout: "feature", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: eyebrow("products"), index: "PRIVEXBOT",
      headline: "Chatbots built on your own knowledge base",
      subhead: `${PRIVEXBOT.name} is one of the products from PrivexLabs.`,
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
    items: [
      "Knowledge bases — add your documents, then reindex when they change",
      "Chatbots and chatflows — built on the knowledge base you choose",
      "Templates — start from one instead of a blank page",
    ],
  },
  {
    id: "sq-product-update", category: "square", name: "Product update", layout: "feature", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: eyebrow("products"), index: "PRIVEXBOT",
      headline: "Organise PrivexBot work in workspaces",
      subhead: "Each team manages its own chatbots, members and roles.",
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
    items: [
      "Workspaces — separate spaces for separate teams",
      "Members and roles — decide who can do what in each workspace",
      "Analytics — see how each chatbot is used",
    ],
  },
  {
    id: "sq-customer-quote", category: "square", name: "Customer quote", layout: "quote", sizeId: S,
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: eyebrow("private", "case study"), index: docReview.quoteId,
      quote: docReview.quote,
      author: docReview.by.name, role: docReview.by.role,
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    id: "sq-testimonial", category: "square", name: "Customer testimonial", layout: "testimonial", sizeId: S,
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
    id: "sq-stat", category: "square", name: "Big stat card", layout: "stat", sizeId: S,
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
    id: "sq-data", category: "square", name: "Data / insight", layout: "metrics", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.followUp.id,
      headline: RD.followUp.headline,
      subhead: RD.followUp.subhead,
      source: RD.followUp.note,
      cta: "Method and data", url: RD.evaluation.url,
    },
    items: RD.followUp.metrics.map(metric),
  },
  {
    id: "sq-launch", category: "square", name: "Launch / milestone", layout: "statement", sizeId: S,
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
    id: "sq-event", category: "square", name: "Event announcement", layout: "event", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: eyebrow("events"), index: EVENT.id,
      headline: EVENT.headline,
      subhead: EVENT.subhead,
      date: EVENT.date, venue: EVENT.venue,
      cta: "Register", url: "privexlabs.com/events",
    },
    items: [...EVENT.speakers],
  },
  {
    id: "sq-hot-take", category: "square", name: "Industry hot take", layout: "statement", sizeId: S,
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: eyebrow("opinion"), index: "PXO-2026-06",
      headline: "A model you cannot inspect, running where you cannot audit it, is not private AI.",
      subhead: "Where the weights live matters less than where the request goes.",
      body: "Own what matters: the data, the systems and the critical technology.",
      cta: "Read the argument", url: "privexlabs.com/writing",
    },
  },
  {
    id: "sq-did-you-know", category: "square", name: "Educational / did you know", layout: "stat", sizeId: S,
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
    id: "sq-blog-promo", category: "square", name: "Blog promo", layout: "statement", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: "NEW ARTICLE",
      headline: RD.method.headline,
      subhead: RD.method.subhead,
      body: RD.method.readTime,
      cta: "Read", url: "privexlabs.com/writing",
    },
  },
  {
    id: "sq-case-study", category: "square", name: "Case study", layout: "caseStudy", sizeId: S,
    surface: "paper",
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
    id: "sq-spotlight", category: "square", name: "Product / feature spotlight", layout: "feature", sizeId: S,
    surface: "foundation",
    text: {
      eyebrow: eyebrow("products"), index: "PRIVEXBOT",
      headline: "See how your chatbots are used",
      subhead: "PrivexBot analytics shows how each chatbot is used.",
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
    items: [
      "Analytics — for each chatbot",
      "Knowledge bases — reindex when your documents change",
      "Workspaces — members and roles for each team",
    ],
  },
  {
    id: "sq-comparison", category: "square", name: "Comparison / vs alternatives", layout: "split", sizeId: S,
    surface: "paper",
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.followUp.id,
      headline: "Prompted large model vs customized small model",
      leftTitle: "Prompted 70B, hosted", leftBody: "Higher ceiling on open-ended reasoning. Data leaves your environment. Cost grows with every request.",
      rightTitle: "Customized 8B, private", rightBody: "Higher accuracy on your documents. Runs on your infrastructure. Cost is fixed after customization.",
      cta: "Method and data", url: RD.evaluation.url,
    },
  },
  {
    id: "sq-community", category: "square", name: "Community spotlight", layout: "profile", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: eyebrow("community"), index: "PXC-2026-030",
      author: CAST.contributor.name, role: CAST.contributor.role,
      headline: "The rubric we were missing, published in the open",
      body: "Mateo published a scoring rubric for document extraction, with the script to reproduce it. We now use it on every evaluation.",
      cta: "See the rubric", url: "privexlabs.com/community",
    },
  },
  {
    id: "sq-hiring", category: "square", name: "Hiring / careers", layout: "hiring", sizeId: S,
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("careers"), index: "ENG-2026-02",
      role: "Inference engineer",
      headline: "Make private inference fast enough that nobody argues for the alternative.",
      subhead: "You will own serving performance across the environments our clients run — on-premise, private cloud and hybrid.",
      cta: "Apply", url: "privexlabs.com/careers",
    },
    items: ["Location — Remote or hybrid", "Mode — Full time", "Stack — vLLM, Triton, Rust"],
  },
  {
    id: "sq-partnership", category: "square", name: "Partnership announcement", layout: "statement", sizeId: S,
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
    id: "sq-meme", category: "square", name: "Lighthearted", layout: "meme", sizeId: S,
    surface: "elevated",
    text: {
      eyebrow: eyebrow("aside"), index: "",
      headline: "\"It works on the benchmark\"",
      body: "[ screenshot or diagram ]",
      subhead: "The benchmark was not your documents.",
      cta: "privexlabs.com",
    },
  },
  {
    id: "sq-cta", category: "square", name: "CTA · sign up", layout: "cta", sizeId: S,
    surface: "foundation", align: "center",
    text: {
      eyebrow: "PRIVEXLABS", index: "",
      headline: "Start with one problem and your own data.",
      subhead: "Four weeks in your own environment — cloud, private cloud or on-premise — and a written evaluation at the end.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
];
