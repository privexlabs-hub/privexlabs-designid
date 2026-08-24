import type { TemplateDef } from "../types";

const base = { category: "email" } as const;

/** Campaign blocks. Rendered at 1200px wide, exported as images for email clients. */
export const emailTemplates: TemplateDef[] = [
  {
    ...base, id: "em-header", name: "Email · Header", layout: "banner", sizeId: "newsletter-header",
    surface: "paper", showRule: true,
    text: { eyebrow: "THE PRIVEX BRIEF · APRIL 2026", headline: "What we tested, what worked, and what did not.", subhead: "", url: "PRIVEXLABS.COM/BRIEF" },
  },
  {
    ...base, id: "em-product", name: "Email · Product announcement", layout: "email", sizeId: "email-block",
    surface: "elevated",
    text: {
      eyebrow: "05 / PRODUCT",
      headline: "PrivexBot Docs v2.3 is available",
      subhead: "Answers come from your documents only, with a citation on every sentence.",
      body: "Existing deployments upgrade in place. The legacy /v1 retrieval endpoint is removed on 30 June.",
      cta: "Read the release notes", url: "privexlabs.com/changelog",
    },
  },
  {
    ...base, id: "em-feature", name: "Email · Feature launch", layout: "web", sizeId: "email-block",
    surface: "paper",
    text: {
      eyebrow: "05 / PRODUCT",
      headline: "Source-locked answers",
      subhead: "No source in your corpus, no answer.",
      cta: "See how it works", url: "privexlabs.com/privexbot",
    },
    items: ["3 — citation formats supported", "0 — answers without a source", "1 — click to the source paragraph"],
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
      "Six models on Swahili financial documents — two were usable",
      "Cluster LG-1 is operational in Lagos",
      "An open Amharic evaluation set, with Addis Ababa University",
      "Working session on evaluation method — 14 May",
    ],
  },
  {
    ...base, id: "em-event", name: "Email · Event", layout: "event", sizeId: "email-block",
    surface: "elevated",
    text: {
      eyebrow: "02 / KNOWLEDGE", index: "PXE-2026-03",
      headline: "Evaluating AI in low-resource languages",
      subhead: "An open working session on method, not marketing.",
      date: "14 May 2026 · 15:00 EAT", venue: "Online · Privex Academy",
      cta: "Register", url: "privexlabs.com/events",
    },
    items: ["Amina Mwangi — Head of research, PrivexLabs", "Dr. Yohannes Bekele — Addis Ababa University"],
  },
  {
    ...base, id: "em-promotion", name: "Email · Promotion", layout: "offer", sizeId: "email-block",
    surface: "brand",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "",
      value: "4", unit: " weeks",
      headline: "A fixed-scope pilot on your own data",
      subhead: "Evaluation set, adapted model, written findings.",
      source: "Four engagements per quarter. Fixed fee, no renewal clause.",
      cta: "Book the pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "em-customer-story", name: "Email · Customer story", layout: "caseStudy", sizeId: "email-block",
    surface: "paper",
    text: {
      eyebrow: "06 / SOLUTIONS", index: "PXW-2026-04",
      client: "REGIONAL BANK · NAIROBI",
      headline: "Document review moved in-house in nine weeks",
      leftTitle: "Challenge", leftBody: "Loan files in three languages, two-day median turnaround, no audit trail.",
      rightTitle: "Result", rightBody: "An adapted 8B model on the bank's own hardware, every decision cited.",
      cta: "Read the case study", url: "privexlabs.com/work",
    },
    items: ["9 wks — pilot to production", "40 min — median review time"],
  },
  {
    ...base, id: "em-cta", name: "Email · CTA banner", layout: "cta", sizeId: "email-banner",
    surface: "foundation", align: "center",
    text: {
      eyebrow: "01 / COMPANY", index: "",
      headline: "Run the pilot on your own data.",
      subhead: "Four weeks. A written evaluation either way.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
];
