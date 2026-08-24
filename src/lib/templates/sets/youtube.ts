import type { TemplateDef } from "../types";

const base = { category: "youtube", sizeId: "youtube", layout: "thumbnail" } as const;

/** 1280×720. Written to read at 210px wide: three to five words, one figure. */
export const youtubeTemplates: TemplateDef[] = [
  {
    ...base, id: "yt-tutorial", name: "Thumbnail · Tutorial", surface: "foundation",
    text: { eyebrow: "Tutorial", headline: "Fine-tune on\nyour own data", subhead: "Start to finish, on one GPU", value: "01", cta: "PRIVEXLABS.COM/ACADEMY" },
  },
  {
    ...base, id: "yt-howto", name: "Thumbnail · How-to", surface: "paper",
    text: { eyebrow: "How-to", headline: "Build an\nevaluation set", subhead: "Five days that decide everything after", value: "", cta: "PRIVEXLABS.COM/ACADEMY" },
  },
  {
    ...base, id: "yt-review", name: "Thumbnail · Review", surface: "foundation",
    text: { eyebrow: "Review", headline: "Six models,\none language", subhead: "Two survived", value: "2/6", cta: "PRIVEXLABS.COM/RESEARCH" },
  },
  {
    ...base, id: "yt-product", name: "Thumbnail · Product", surface: "brand",
    text: { eyebrow: "Product", headline: "PrivexBot Docs", subhead: "Answers that cite their source", value: "", cta: "PRIVEXLABS.COM/PRIVEXBOT" },
  },
  {
    ...base, id: "yt-feature", name: "Thumbnail · Feature", surface: "elevated",
    text: { eyebrow: "Feature", headline: "Source-locked\nanswers", subhead: "No source, no answer", value: "v2.3", cta: "PRIVEXLABS.COM/CHANGELOG" },
  },
  {
    ...base, id: "yt-hot-take", name: "Thumbnail · Hot take", surface: "foundation",
    text: { eyebrow: "Opinion", headline: "Benchmarks\nlie to you", subhead: "If you do not work in English", value: "", cta: "PRIVEXLABS.COM/WRITING" },
  },
  {
    ...base, id: "yt-interview", name: "Thumbnail · Interview", surface: "paper",
    text: { eyebrow: "Interview", headline: "Amina Mwangi", subhead: "On evaluating what nobody has benchmarked", value: "", cta: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "yt-podcast", name: "Thumbnail · Podcast", surface: "foundation",
    text: { eyebrow: "Podcast · 014", headline: "Private by\nconstruction", subhead: "Where the request goes matters most", value: "014", cta: "PRIVEXLABS.COM/PODCAST" },
  },
  {
    ...base, id: "yt-launch", name: "Thumbnail · Launch", surface: "brand",
    text: { eyebrow: "Launch", headline: "Cluster LG-1\nis live", subhead: "Private inference in Lagos", value: "", cta: "PRIVEXLABS.COM/INFRASTRUCTURE" },
  },
  {
    ...base, id: "yt-announcement", name: "Thumbnail · Announcement", surface: "elevated",
    text: { eyebrow: "Announcement", headline: "An open Amharic\nevaluation set", subhead: "With Addis Ababa University", value: "", cta: "PRIVEXLABS.COM/NEWS" },
  },
  {
    ...base, id: "yt-case-study", name: "Thumbnail · Case study", surface: "paper",
    text: { eyebrow: "Case study", headline: "Two days to\nforty minutes", subhead: "Loan review moved in-house", value: "9wk", cta: "PRIVEXLABS.COM/WORK" },
  },
  {
    ...base, id: "yt-roundup", name: "Thumbnail · List / roundup", surface: "foundation",
    text: { eyebrow: "Roundup", headline: "Five checks\nbefore you pick", subhead: "Three of them eliminate most models", value: "05", cta: "PRIVEXLABS.COM/WRITING" },
  },
];
