/**
 * The example cast and cases every template, the brand data and the component gallery
 * draw from.
 *
 * One source for people, figures and content IDs means a quote can't be paired with
 * another case's metric, and an ID can't mean two things.
 *
 * - PrivexLabs' own people appear by role only until real names are supplied. Their
 *   role goes in the name slot ("Founder") and "PrivexLabs" in the role slot.
 * - Customers and outside contributors are fictional and have diverse international
 *   names, always with a role.
 * - Every figure belongs to a case or a research note, never to the company as a whole.
 *   The only company-level figures are counts taken from the company document itself.
 * - Nothing here is tied to a city, country, region or language.
 */

export type Person = { name: string; role: string };

/** A PrivexLabs role, shown by role until a real name is supplied. */
const staff = (role: string): Person => ({ name: role, role: "PrivexLabs" });

export const CAST = {
  founder: staff("Founder"),
  rd: staff("Head of R&D"),
  engineer: staff("Inference engineer"),
  product: staff("Product lead, PrivexBot"),
  solutions: staff("Solutions lead"),
  software: staff("Engineering lead"),
  training: staff("Head of training"),
  clientFinance: { name: "Hannah Weber", role: "CTO · Financial institution" },
  clientLogistics: { name: "Rafael Costa", role: "Head of operations · Logistics group" },
  clientHealth: { name: "Aisha Rahman", role: "Head of data · Hospital network" },
  clientPublic: { name: "Tomás Novak", role: "Head of digital · Public-sector agency" },
  contributor: { name: "Mateo Rojas", role: "Contributor · Open evaluation rubric" },
  contributor2: { name: "Ingrid Solberg", role: "Contributor · Document-layout benchmark" },
  guest: { name: "Dr. Wei Chen", role: "Applied ML researcher" },
} satisfies Record<string, Person>;

/** True when the person is PrivexLabs itself, shown by role. Bylines show the mark for them. */
export const isPrivexLabsPerson = (role: string) => role.trim() === "PrivexLabs";

export type Metric = { value: string; label: string };
export const metric = (m: Metric) => `${m.value} — ${m.label}`;

/* ---------------------------------------------------------------- research */

export const RD = {
  /** The running research example: one extraction task, six candidate models. */
  evaluation: {
    id: "PXR-2026-07",
    headline: "Six open models on one document-extraction task",
    subhead: "Two were usable without customization. Here is where the others failed, and why document layout explains most of it.",
    value: "2", unit: "/6",
    claim: "open models were usable for financial-document extraction without customization.",
    sample: "1,240 documents from 4 organizations",
    author: CAST.rd, date: "14 Apr 2026", readTime: "8 min read",
    url: "privexlabs.com/research",
  },
  /** What customization changed on the same task. */
  followUp: {
    id: "PXR-2026-09",
    headline: "Small, customized models beat large, prompted ones",
    subhead: "Measured on the same 1,240-document extraction set.",
    metrics: [
      { value: "+18pt", label: "accuracy over the prompted 70B baseline" },
      { value: "6.4×", label: "lower p95 latency" },
      { value: "91%", label: "lower cost per 1k documents" },
    ] as Metric[],
    note: "p95 latency at batch size 1, single GPU",
    quoteId: "PXQ-2026-16",
    quote: "Customizing a small model on your own data beat prompting a model ten times its size — on accuracy, latency and cost.",
    by: CAST.rd,
  },
  series: {
    id: "PXR-2026-10",
    badge: "PART 02 / 05",
    headline: "Scanned tables: where document extraction loses accuracy",
    subhead: "Part two of Evaluating AI on your own documents.",
    author: CAST.rd, date: "12 Aug 2026", readTime: "10 min read",
  },
  method: {
    id: "PXR-2026-11",
    headline: "How we evaluate a model before we recommend it",
    subhead: "Nine checks, in order, and the three that eliminate most candidates.",
    quote: "Build the evaluation set first. It is a week of work and it decides everything after.",
    author: CAST.rd, date: "26 Aug 2026", readTime: "8 min read",
  },
  retrieval: {
    id: "PXR-2026-13",
    value: "31", unit: "%",
    claim: "of wrong answers traced back to documents that were never indexed.",
    subhead: "The model was fine. The retrieval pipeline was missing a third of the source files.",
    sample: "One deployment · 400 reviewed answers",
  },
  engNote: {
    id: "PXN-2026-12",
    headline: "Serving an 8B model at 310ms p95 on one GPU",
    subhead: "What we changed in the batching path, and the two optimisations that did nothing.",
    author: CAST.engineer, date: "2 May 2026", readTime: "11 min read",
  },
} as const;

/* ------------------------------------------------------------------- cases */

export type Case = {
  id: string;
  quoteId: string;
  client: string;
  headline: string;
  challenge: string;
  result: string;
  metrics: Metric[];
  quote: string;
  by: Person;
};

export const CASES = {
  /** Loan-file review moved inside a financial institution's own environment. */
  docReview: {
    id: "PXW-2026-04", quoteId: "PXQ-2026-12",
    client: "FINANCIAL INSTITUTION",
    headline: "Document review moved in-house in nine weeks",
    challenge: "Loan files reviewed by hand, a two-day turnaround and no audit trail.",
    result: "A customized 8B model on the institution's own infrastructure, with every decision traceable to its source.",
    metrics: [
      { value: "9 wks", label: "pilot to production" },
      { value: "2 days → 40 min", label: "median review time" },
      { value: "0", label: "documents leaving the institution's environment" },
    ],
    quote: "We stopped sending customer documents outside our own environment. Accuracy went up, not down.",
    by: CAST.clientFinance,
  },
  /** Customer-support automation for a logistics group. */
  support: {
    id: "PXW-2026-05", quoteId: "PXQ-2026-13",
    client: "LOGISTICS GROUP",
    headline: "Support answers in minutes, not days",
    challenge: "Shipment and billing questions queued for two days before anyone could answer them.",
    result: "An internal assistant that answers from the group's own systems and escalates what it cannot resolve.",
    metrics: [
      { value: "94%", label: "of queries resolved without escalation" },
      { value: "6 wks", label: "discovery to first release" },
    ],
    quote: "The assistant answered questions our support team took two days to answer. It runs on our own systems.",
    by: CAST.clientLogistics,
  },
  /** A private knowledge assistant inside a hospital network. */
  clinical: {
    id: "PXW-2026-06", quoteId: "PXQ-2026-14",
    client: "HOSPITAL NETWORK",
    headline: "Clinical guidelines, answered inside the network",
    challenge: "Staff searched thousands of internal guidelines by hand, and patient data could not leave the network.",
    result: "A private assistant over the network's own guidelines, deployed on its own infrastructure.",
    metrics: [
      { value: "3,800", label: "internal guidelines indexed" },
      { value: "0", label: "records leaving the network" },
    ],
    quote: "Staff find the right internal guideline in seconds, and patient records never leave our network.",
    by: CAST.clientHealth,
  },
  /** An internal operations platform for a public-sector agency. */
  platform: {
    id: "PXW-2026-07", quoteId: "PXQ-2026-15",
    client: "PUBLIC-SECTOR AGENCY",
    headline: "One platform replaced four spreadsheets",
    challenge: "Tender documents tracked across four spreadsheets and a shared inbox.",
    result: "An internal platform with document extraction built in, integrated with the agency's existing systems.",
    metrics: [
      { value: "12 wks", label: "discovery to release" },
      { value: "1", label: "system replacing four spreadsheets" },
      { value: "0", label: "tender data copied between systems by hand" },
    ],
    quote: "Our team stopped copying data between systems. That alone paid for the project.",
    by: CAST.clientPublic,
  },
} satisfies Record<string, Case>;

/* ------------------------------------------------------ company-level items */

/** A training programme — the three tracks are the company document's own. */
export const TRAINING = {
  id: "PXT-2026-03",
  headline: "AI training for business teams, technical teams and leadership",
  subhead: "Three tracks, six weeks, taught on your own workflows and data.",
  weeks: "6 weeks",
} as const;

export const NEWS = {
  id: "PXP-2026-02",
  headline: "PrivexLabs training now covers business teams, technical teams and leadership",
  subhead: "Three tracks, taught on each organization's own workflows and data.",
  date: "1 Jul 2026",
} as const;

/** The announcement every announcement template carries: a partnership built on the clinical case. */
export const PARTNERSHIP = {
  id: "PXP-2026-03",
  headline: "Private AI for a hospital network's clinical teams",
  statement: "PrivexLabs is partnering with a hospital network to put private AI in front of its clinical teams.",
  subhead: "An assistant over the network's own guidelines, deployed on its own infrastructure.",
  body: "Patient records never leave the network.",
  date: "1 Jul 2026",
} as const;

export const OPINION = {
  id: "PXO-2026-05",
  headline: "Most AI projects fail before a model is chosen",
  subhead: "The problem definition decides more than the model does.",
  body: "Start with the process, the data and the measure of success. The model is the last decision, not the first.",
  author: CAST.founder, date: "20 May 2026", readTime: "5 min read",
} as const;

/** The event used across event templates. */
export const EVENT = {
  id: "PXE-2026-03",
  headline: "Evaluating AI on your own documents",
  subhead: "An open working session on method, not marketing.",
  date: "14 May 2026 · 15:00 UTC",
  venue: "Online",
  // "name — role", the form the list layouts split into two lines.
  speakers: [
    `${CAST.rd.name} — ${CAST.rd.role}`,
    `${CAST.guest.name} — ${CAST.guest.role}`,
  ],
} as const;

/**
 * Company-level figures. Only counts taken from the company document itself — never
 * deployment totals, uptime or anything else the document does not state.
 */
export const COMPANY_FIGURES: Metric[] = [
  { value: "6", label: "areas of work" },
  { value: "6", label: "steps from problem to measured outcome" },
  { value: "3", label: "training tracks" },
];

/* --------------------------------------------------------------- PrivexBot */

/**
 * PrivexBot is one of PrivexLabs' products. It is described only by what its own
 * interface does — no versions, releases, endpoints or claims beyond this list.
 */
export const PRIVEXBOT = {
  name: "PrivexBot",
  relation: "One of the products from PrivexLabs.",
  summary: "Build chatbots and chatflows on your organization's own knowledge bases.",
  capabilities: [
    "Build chatbots and chatflows on your organization's knowledge bases",
    "Add documents to a knowledge base and reindex it",
    "Start from templates",
    "Organise work in workspaces with members and roles",
    "See chatbot analytics",
  ],
  url: "privexlabs.com/privexbot",
} as const;
