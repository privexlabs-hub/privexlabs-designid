import { eyebrow } from "@/lib/brand";
import { CASES, CAST, OPINION, PARTNERSHIP, PRIVEXBOT, RD } from "@/lib/examples";
import type { TemplateDef } from "../types";

/*
 * Articles. Two kinds of template live here:
 *
 * - Platform covers, one per publishing destination, all carrying the same article so the
 *   group exports as one coherent set.
 * - Treatments, one per content category, following the category treatments in the social
 *   system: Newsreader for long-form writing and quotation (research, tutorials, opinion);
 *   Archivo everywhere else.
 *
 * Copy typed into any article template carries to the next one you open, and "Export for
 * every platform" renders the current design at every size in ARTICLE_PACK.
 */

const base = { category: "articles" } as const;

/** The one article every platform cover carries by default. */
const research = {
  eyebrow: eyebrow("models", "research"),
  index: RD.evaluation.id,
  series: "",
  headline: RD.evaluation.headline,
  subhead: RD.evaluation.subhead,
  author: RD.evaluation.author.name,
  role: RD.evaluation.author.role,
  date: RD.evaluation.date,
  readTime: RD.evaluation.readTime,
  url: RD.evaluation.url,
};

const cover = { ...base, layout: "article", surface: "paper", titleFont: "serif", showMotif: true, text: research } as const;

export const articleTemplates: TemplateDef[] = [
  /* ---------------------------------------------------------- platforms */
  { ...cover, id: "ar-medium", name: "Article · Medium story cover", sizeId: "medium-cover", showRule: true },
  {
    ...cover, id: "ar-linkedin", name: "Article · LinkedIn article cover", sizeId: "linkedin-article",
    // LinkedIn crops this cover differently in feed, header and email: centred and motif-free.
    align: "center", showMotif: false, showMarks: true,
  },
  { ...cover, id: "ar-link-card", name: "Article · X / LinkedIn link card", sizeId: "link-card", showRule: true },
  { ...cover, id: "ar-x-cover", name: "Article · X article cover", sizeId: "x-article", surface: "foundation", showMarks: true },
  { ...cover, id: "ar-og", name: "Article · Substack / blog share", sizeId: "og", surface: "elevated", showRule: true },
  { ...cover, id: "ar-devto", name: "Article · DEV cover", sizeId: "devto-cover", surface: "foundation" },
  { ...cover, id: "ar-hashnode", name: "Article · Hashnode cover", sizeId: "hashnode-cover", showRule: true },
  { ...cover, id: "ar-newsletter", name: "Article · Newsletter header", sizeId: "newsletter-header", showRule: true },
  { ...cover, id: "ar-square", name: "Article · Square promo", sizeId: "square", showRule: true },
  { ...cover, id: "ar-portrait", name: "Article · Portrait promo", sizeId: "portrait", surface: "foundation", showMarks: true },
  { ...cover, id: "ar-story", name: "Article · Story promo", sizeId: "vertical", surface: "brand" },

  /* --------------------------------------------------------- treatments */
  {
    ...base, id: "ar-t-research", name: "Article · Research", layout: "article", sizeId: "og",
    surface: "paper", titleFont: "serif", showMotif: true, showRule: true, text: research,
  },
  {
    ...base, id: "ar-t-engineering", name: "Article · Engineering note", layout: "article", sizeId: "og",
    surface: "foundation", titleFont: "sans", showMotif: true,
    text: {
      eyebrow: eyebrow("infrastructure", "engineering"), index: RD.engNote.id, series: "",
      headline: RD.engNote.headline,
      subhead: RD.engNote.subhead,
      author: RD.engNote.author.name, role: RD.engNote.author.role,
      date: RD.engNote.date, readTime: RD.engNote.readTime,
      url: "privexlabs.com/engineering",
    },
  },
  {
    ...base, id: "ar-t-opinion", name: "Article · Opinion / leadership", layout: "article", sizeId: "og",
    surface: "foundation", titleFont: "serif", showMotif: false, showMarks: true,
    text: {
      eyebrow: eyebrow("opinion"), index: OPINION.id, series: "",
      headline: OPINION.headline,
      subhead: OPINION.subhead,
      author: OPINION.author.name, role: OPINION.author.role,
      date: OPINION.date, readTime: OPINION.readTime,
      url: "privexlabs.com/writing",
    },
  },
  {
    ...base, id: "ar-t-product", name: "Article · Product / release notes", layout: "article", sizeId: "og",
    surface: "elevated", titleFont: "sans", showMotif: true, showRule: true,
    text: {
      eyebrow: eyebrow("products", "privexbot"), index: "PRIVEXBOT", series: "",
      headline: "What you can build with PrivexBot",
      subhead: "Chatbots and chatflows on your own knowledge bases, organised in workspaces with members and roles.",
      author: CAST.product.name, role: CAST.product.role,
      date: "9 Jun 2026", readTime: "4 min read",
      url: PRIVEXBOT.url,
    },
  },
  {
    ...base, id: "ar-t-announcement", name: "Article · Announcement", layout: "article", sizeId: "og",
    surface: "brand", titleFont: "sans", showMotif: true,
    text: {
      eyebrow: eyebrow("news"), index: PARTNERSHIP.id, series: "",
      headline: PARTNERSHIP.headline,
      subhead: PARTNERSHIP.subhead,
      author: "", role: "", date: PARTNERSHIP.date, readTime: "3 min read",
      url: "privexlabs.com/news",
    },
  },
  {
    ...base, id: "ar-t-tutorial", name: "Article · Tutorial / how-to", layout: "article", sizeId: "og",
    surface: "paper", titleFont: "serif", showMotif: true, showRule: true,
    text: {
      eyebrow: eyebrow("training", "how-to"), index: "PXT-2026-14", series: "5 STEPS",
      headline: "How to build an evaluation set in five days",
      subhead: "Collect real documents, write the rubric first, score blind, measure latency, publish the rubric.",
      author: CAST.training.name, role: CAST.training.role,
      date: "18 Jul 2026", readTime: "9 min read",
      url: "privexlabs.com/training",
    },
  },
  {
    ...base, id: "ar-t-case-study", name: "Article · Case study", layout: "article", sizeId: "og",
    surface: "muted", titleFont: "sans", showMotif: true,
    text: {
      eyebrow: eyebrow("private", "case study"), index: CASES.docReview.id, series: "",
      headline: CASES.docReview.headline,
      subhead: "How a financial institution took loan-file review from two days to forty minutes without documents leaving its environment.",
      author: CAST.solutions.name, role: CAST.solutions.role,
      date: "30 Jul 2026", readTime: "7 min read",
      url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "ar-t-series", name: "Article · Series part", layout: "article", sizeId: "og",
    surface: "foundation", titleFont: "serif", showMotif: true,
    text: {
      eyebrow: eyebrow("rd", "series"), index: RD.series.id, series: RD.series.badge,
      headline: RD.series.headline,
      subhead: RD.series.subhead,
      author: RD.series.author.name, role: RD.series.author.role,
      date: RD.series.date, readTime: RD.series.readTime,
      url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "ar-t-quote", name: "Article · Pull quote", layout: "articleQuote", sizeId: "og",
    surface: "foundation", titleFont: "serif", showMarks: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.method.id,
      quote: RD.method.quote,
      headline: RD.method.headline,
      author: RD.method.author.name, role: RD.method.author.role,
      date: RD.method.date, readTime: RD.method.readTime,
      url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "ar-t-stat", name: "Article · Key figure", layout: "articleStat", sizeId: "og",
    surface: "paper", titleFont: "sans", showRule: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.evaluation.id,
      value: RD.evaluation.value, unit: RD.evaluation.unit,
      claim: RD.evaluation.claim,
      source: RD.evaluation.sample.replace(" from ", " · "),
      headline: RD.evaluation.headline,
      author: RD.evaluation.author.name, role: RD.evaluation.author.role,
      date: RD.evaluation.date, readTime: RD.evaluation.readTime,
      url: RD.evaluation.url,
    },
  },
];
