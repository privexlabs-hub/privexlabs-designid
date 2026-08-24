import type { TemplateDef } from "../types";

const base = { category: "carousel", sizeId: "square" } as const;

/** A ten-slide argument. The deck reads as one piece: same eyebrow, running index. */
export const carouselTemplates: TemplateDef[] = [
  {
    ...base, id: "ca-01-hook", name: "Slide 1 · Hook", layout: "statement",
    surface: "brand",
    text: {
      eyebrow: "01 / RESEARCH", index: "01 / 10",
      headline: "We tested six open models on Swahili financial documents.",
      subhead: "Two were usable.",
      body: "Swipe for what separated them.",
      cta: "", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "ca-02-problem", name: "Slide 2 · Problem", layout: "statement",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "01 / RESEARCH", index: "02 / 10",
      headline: "The leaderboard was no help",
      subhead: "Every candidate scored well in English. None of those scores predicted performance on a Swahili loan file.",
      body: "So we built the evaluation set first.",
      cta: "", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "ca-03-insight", name: "Slide 3 · Insight", layout: "stat",
    surface: "paper",
    text: {
      eyebrow: "01 / RESEARCH", index: "03 / 10",
      value: "3", unit: "%",
      headline: "tokenizer coverage explained most of the gap.",
      subhead: "Models that fragmented Swahili morphology lost the entity before the model saw it.",
      source: "Measured across 6 candidate models",
      cta: "", url: "privexlabs.com/research",
    },
  },
  {
    ...base, id: "ca-04-solution", name: "Slide 4 · Solution", layout: "steps",
    surface: "foundation",
    text: {
      eyebrow: "01 / RESEARCH", index: "04 / 10",
      headline: "What we did instead", subhead: "",
      cta: "", url: "privexlabs.com/research",
    },
    items: [
      "Built a 1,240-document evaluation set from four institutions",
      "Scored every candidate on extraction, not on chat quality",
      "Adapted the two survivors on in-domain data",
      "Re-scored, then measured p95 latency at real batch sizes",
    ],
  },
  {
    ...base, id: "ca-05-proof", name: "Slide 5 · Proof", layout: "metrics",
    surface: "paper",
    text: {
      eyebrow: "01 / RESEARCH", index: "05 / 10",
      headline: "After adaptation", subhead: "Same evaluation set, same hardware.",
      source: "p95 latency, single A100, batch size 1",
      cta: "", url: "privexlabs.com/research",
    },
    items: ["+18pt — accuracy over the prompted 70B baseline", "6.4× — lower p95 latency", "91% — lower cost per 1k documents"],
  },
  {
    ...base, id: "ca-06-steps", name: "Slide 6 · Steps / how-to", layout: "steps",
    surface: "elevated",
    text: {
      eyebrow: "01 / RESEARCH", index: "06 / 10",
      headline: "Run this yourself", subhead: "Five days of work, and it decides everything after.",
      cta: "", url: "privexlabs.com/research",
    },
    items: [
      "Collect 200 real documents — not synthetic ones",
      "Write the scoring rubric before you look at any output",
      "Score three candidates blind",
      "Measure latency at the batch size you will actually run",
      "Publish the rubric with the result",
    ],
  },
  {
    ...base, id: "ca-07-examples", name: "Slide 7 · Examples", layout: "list",
    surface: "paper",
    text: {
      eyebrow: "01 / RESEARCH", index: "07 / 10",
      headline: "Where this has already applied", subhead: "",
      cta: "", url: "privexlabs.com/work",
    },
    items: [
      "Loan-file review — Swahili, English, Kikuyu",
      "Tender extraction — public procurement office",
      "Clinical note summarization — hospital network",
    ],
  },
  {
    ...base, id: "ca-08-data", name: "Slide 8 · Data / stats", layout: "metrics",
    surface: "foundation",
    text: {
      eyebrow: "01 / RESEARCH", index: "08 / 10",
      headline: "The full picture", subhead: "",
      source: "Evaluation set: 1,240 documents, 4 institutions",
      cta: "", url: "privexlabs.com/research",
    },
    items: ["6 — models evaluated", "2 — usable before adaptation", "1,240 — documents scored", "4 — contributing institutions"],
  },
  {
    ...base, id: "ca-09-takeaways", name: "Slide 9 · Takeaways", layout: "list",
    surface: "paper", showRule: true,
    text: {
      eyebrow: "01 / RESEARCH", index: "09 / 10",
      headline: "Three things to take away", subhead: "",
      cta: "", url: "privexlabs.com/research",
    },
    items: [
      "Public benchmarks do not transfer to your language or your documents",
      "Tokenizer coverage is the cheapest thing to check and the most predictive",
      "A small adapted model usually wins on the work you actually do",
    ],
  },
  {
    ...base, id: "ca-10-close", name: "Final slide · Close / CTA", layout: "cta",
    surface: "brand", align: "center",
    text: {
      eyebrow: "01 / RESEARCH", index: "10 / 10",
      headline: "The full evaluation, method and data are open.",
      subhead: "Reproduce it, disagree with it, or send us documents we should have included.",
      cta: "Read the evaluation", url: "privexlabs.com/research",
    },
  },
];
