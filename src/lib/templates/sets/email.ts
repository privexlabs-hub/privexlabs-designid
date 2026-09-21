import { eyebrow } from "@/lib/brand";
import { CASES, EVENT, PRIVEXBOT, metric } from "@/lib/examples";
import type { TemplateDef } from "../types";

const base = { category: "email" } as const;
const { docReview } = CASES;

/** Campaign blocks. Rendered at 1200px wide, exported as images for email clients. */
export const emailTemplates: TemplateDef[] = [
  {
    ...base, id: "em-header", name: "Email · Header", layout: "banner", sizeId: "newsletter-header",
    surface: "paper", showRule: true,
    text: { eyebrow: "THE PRIVEX BRIEF · APRIL 2026", headline: "What we built, what we measured, and what did not work.", subhead: "", url: "PRIVEXLABS.COM/BRIEF" },
  },
  {
    ...base, id: "em-product", name: "Email · Product announcement", layout: "email", sizeId: "email-block",
    surface: "elevated",
    text: {
      eyebrow: eyebrow("products"),
      headline: "PrivexBot: chatbots on your own knowledge bases",
      subhead: "One of the products from PrivexLabs.",
      body: "Add documents to a knowledge base, build a chatbot or chatflow on it, and see how it is used in analytics. Workspaces keep each team's work separate.",
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
  },
  {
    ...base, id: "em-feature", name: "Email · Feature launch", layout: "web", sizeId: "email-block",
    surface: "paper",
    text: {
      eyebrow: eyebrow("products"),
      headline: "Organise PrivexBot by team",
      subhead: "Workspaces with members and roles.",
      cta: "See how it works", url: PRIVEXBOT.url,
    },
    items: [
      "Workspaces — one for each team",
      "Roles — set for each member",
      "Analytics — for each chatbot",
    ],
  },
  {
    ...base, id: "em-newsletter", name: "Email · Newsletter", layout: "list", sizeId: "email-block",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "THE PRIVEX BRIEF", index: "APRIL 2026",
      headline: "Four things this month",
      subhead: "",
      cta: "Read the brief", url: "privexlabs.com/brief",
    },
    items: [
      "Six models on one document-extraction task — two were usable",
      "AI training now covers business, technical and leadership teams",
      "A private AI partnership with a hospital network",
      "Working session on evaluation method — 14 May",
    ],
  },
  {
    ...base, id: "em-event", name: "Email · Event", layout: "event", sizeId: "email-block",
    surface: "elevated",
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
    ...base, id: "em-promotion", name: "Email · Promotion", layout: "offer", sizeId: "email-block",
    surface: "brand",
    text: {
      eyebrow: eyebrow("engineering"), index: "",
      value: "4", unit: " weeks",
      headline: "A fixed-scope pilot on one real problem",
      subhead: "Evaluation set, working pilot, written findings.",
      source: "Four engagements per quarter. Fixed fee, no renewal clause.",
      cta: "Book the pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "em-customer-story", name: "Email · Customer story", layout: "caseStudy", sizeId: "email-block",
    surface: "paper",
    text: {
      eyebrow: eyebrow("private", "case study"), index: docReview.id,
      client: docReview.client,
      headline: docReview.headline,
      leftTitle: "Challenge", leftBody: docReview.challenge,
      rightTitle: "Result", rightBody: docReview.result,
      cta: "Read the case study", url: "privexlabs.com/work",
    },
    items: docReview.metrics.slice(0, 2).map(metric),
  },
  {
    ...base, id: "em-cta", name: "Email · CTA banner", layout: "cta", sizeId: "email-banner",
    surface: "foundation", align: "center",
    text: {
      eyebrow: "PRIVEXLABS", index: "",
      headline: "Start with one problem and your own data.",
      subhead: "Four weeks. A written evaluation either way.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
];
