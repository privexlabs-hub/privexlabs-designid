import { eyebrow } from "@/lib/brand";
import { RD, metric } from "@/lib/examples";
import type { TemplateDef } from "../types";

const base = { category: "carousel", sizeId: "square" } as const;
const label = eyebrow("models", "research");
const url = RD.evaluation.url;

/** A ten-slide argument. The deck reads as one piece: same label, running index. */
export const carouselTemplates: TemplateDef[] = [
  {
    ...base, id: "ca-01-hook", name: "Slide 1 · Hook", layout: "statement",
    surface: "brand",
    text: {
      eyebrow: label, index: "01 / 10",
      headline: "We tested six open models on one document-extraction task.",
      subhead: "Two were usable without customization.",
      body: "Swipe for what separated them.",
      cta: "", url,
    },
  },
  {
    ...base, id: "ca-02-problem", name: "Slide 2 · Problem", layout: "statement",
    surface: "paper", showRule: true,
    text: {
      eyebrow: label, index: "02 / 10",
      headline: "The leaderboard was no help",
      subhead: "Every candidate scored well on public benchmarks. None of those scores predicted performance on a scanned loan file.",
      body: "So we built the evaluation set first.",
      cta: "", url,
    },
  },
  {
    ...base, id: "ca-03-insight", name: "Slide 3 · Insight", layout: "stat",
    surface: "paper",
    text: {
      eyebrow: label, index: "03 / 10",
      value: "71", unit: "%",
      headline: "of extraction errors came from scanned tables and multi-column layouts.",
      subhead: "The models read clean text well. They lost the structure before they reached the content.",
      source: "Error analysis across 6 candidate models",
      cta: "", url,
    },
  },
  {
    ...base, id: "ca-04-solution", name: "Slide 4 · Solution", layout: "steps",
    surface: "foundation",
    text: {
      eyebrow: label, index: "04 / 10",
      headline: "What we did instead", subhead: "",
      cta: "", url,
    },
    items: [
      "Built a 1,240-document evaluation set from 4 organizations",
      "Scored every candidate on extraction, not on chat quality",
      "Customized the two survivors on in-domain data",
      "Re-scored, then measured p95 latency at real batch sizes",
    ],
  },
  {
    ...base, id: "ca-05-proof", name: "Slide 5 · Proof", layout: "metrics",
    surface: "paper",
    text: {
      eyebrow: label, index: "05 / 10",
      headline: "After customization", subhead: "Same evaluation set, same hardware.",
      source: RD.followUp.note,
      cta: "", url,
    },
    items: RD.followUp.metrics.map(metric),
  },
  {
    ...base, id: "ca-06-steps", name: "Slide 6 · Steps / how-to", layout: "steps",
    surface: "elevated",
    text: {
      eyebrow: label, index: "06 / 10",
      headline: "Run this yourself", subhead: "Five days of work, and it decides everything after.",
      cta: "", url,
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
      eyebrow: label, index: "07 / 10",
      headline: "Where this has already applied", subhead: "",
      cta: "", url: "privexlabs.com/work",
    },
    items: [
      "Loan-file review — financial institution",
      "Tender extraction — public-sector agency",
      "Clinical guideline search — hospital network",
    ],
  },
  {
    ...base, id: "ca-08-data", name: "Slide 8 · Data / stats", layout: "metrics",
    surface: "foundation",
    text: {
      eyebrow: label, index: "08 / 10",
      headline: "The full picture", subhead: "",
      source: `Evaluation set: ${RD.evaluation.sample}`,
      cta: "", url,
    },
    items: ["6 — models evaluated", "2 — usable without customization", "1,240 — documents scored", "4 — contributing organizations"],
  },
  {
    ...base, id: "ca-09-takeaways", name: "Slide 9 · Takeaways", layout: "list",
    surface: "paper", showRule: true,
    text: {
      eyebrow: label, index: "09 / 10",
      headline: "Three things to take away", subhead: "",
      cta: "", url,
    },
    items: [
      "Public benchmarks do not transfer to your documents",
      "Document layout is the cheapest thing to check and the most predictive",
      "A small customized model usually wins on the work you actually do",
    ],
  },
  {
    ...base, id: "ca-10-close", name: "Final slide · Close / CTA", layout: "cta",
    surface: "brand", align: "center",
    text: {
      eyebrow: label, index: "10 / 10",
      headline: "The method and the rubric are open.",
      subhead: "Reproduce it, disagree with it, or send us documents we should have included.",
      cta: "Read the evaluation", url,
    },
  },
];
