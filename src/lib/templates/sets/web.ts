import { eyebrow } from "@/lib/brand";
import { CASES, CAST, COMPANY_FIGURES, PRIVEXBOT, RD, metric } from "@/lib/examples";
import type { TemplateDef } from "../types";

const base = { category: "web" } as const;
const { docReview, platform } = CASES;

/** Heroes, sections, banners and share cards for privexlabs.com. */
export const webTemplates: TemplateDef[] = [
  {
    ...base, id: "wb-hero", name: "Website · Hero", layout: "web", sizeId: "web-hero",
    surface: "foundation", showMarks: true,
    text: {
      eyebrow: "BUILD. DEPLOY. OWN AI.",
      headline: "Practical AI systems, built on your data, workflows and infrastructure.",
      subhead: "We help businesses build, deploy and operate intelligent systems — from AI applications and automation to private model deployment.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
    items: COMPANY_FIGURES.map(metric),
  },
  {
    ...base, id: "wb-feature", name: "Website · Feature", layout: "feature", sizeId: "web-section",
    surface: "paper",
    text: {
      eyebrow: eyebrow("products"), index: "PRIVEXBOT",
      headline: "Every chatbot, on your own knowledge base",
      subhead: `${PRIVEXBOT.name}, one of the products from PrivexLabs.`,
      cta: "See PrivexBot", url: PRIVEXBOT.url,
    },
    items: [
      "Knowledge bases — add documents and reindex them",
      "Chatbots and chatflows — built on your knowledge bases",
      "Workspaces — members and roles for each team",
    ],
  },
  {
    ...base, id: "wb-product", name: "Website · Product", layout: "diagram", sizeId: "web-section",
    surface: "foundation",
    text: {
      eyebrow: eyebrow("private"), index: "REFERENCE DEPLOYMENT",
      headline: "What runs where",
      subhead: "Nothing in this diagram leaves your environment.",
      source: "Reference deployment · on-premise or private cloud",
      cta: "Technical overview", url: "privexlabs.com/private-ai",
    },
    items: [
      "Your documents — indexed where they live",
      "Customization — fine-tuning on your data",
      "Inference — on-premise, private cloud or hybrid",
      "Observability — full request and answer log",
    ],
  },
  {
    ...base, id: "wb-testimonial", name: "Website · Testimonial", layout: "testimonial", sizeId: "web-section",
    surface: "elevated",
    text: {
      eyebrow: eyebrow("private", "case study"), index: docReview.id,
      quote: docReview.quote,
      author: docReview.by.name, role: docReview.by.role,
      value: docReview.metrics[1].value, unit: docReview.metrics[1].label,
      cta: "Read the case study", url: "privexlabs.com/work",
    },
  },
  {
    ...base, id: "wb-case-study", name: "Website · Case study", layout: "caseStudy", sizeId: "web-section",
    surface: "paper",
    text: {
      eyebrow: eyebrow("software", "case study"), index: platform.id,
      client: platform.client,
      headline: platform.headline,
      leftTitle: "Challenge", leftBody: platform.challenge,
      rightTitle: "Result", rightBody: platform.result,
      cta: "Read the case study", url: "privexlabs.com/work",
    },
    items: platform.metrics.map(metric),
  },
  {
    ...base, id: "wb-cta", name: "Website · CTA", layout: "cta", sizeId: "web-banner",
    surface: "brand", align: "center",
    text: {
      eyebrow: "", index: "",
      headline: "Start with one problem and your own data.",
      subhead: "Four weeks. A written evaluation either way.",
      cta: "Start a pilot", url: "privexlabs.com/pilot",
    },
  },
  {
    ...base, id: "wb-blog-hero", name: "Website · Blog hero", layout: "statement", sizeId: "web-hero",
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: `${RD.evaluation.id} · 8 MIN READ`,
      headline: RD.evaluation.headline,
      subhead: RD.evaluation.subhead,
      body: `${CAST.rd.name}, ${CAST.rd.role} · 14 April 2026`,
      cta: "", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "wb-og", name: "Website · Open Graph", layout: "statement", sizeId: "og",
    surface: "foundation",
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.evaluation.id,
      headline: RD.evaluation.headline,
      subhead: "Two were usable without customization. Here is where the others failed.",
      body: "",
      cta: "", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "wb-social-share", name: "Website · Social share", layout: "stat", sizeId: "og",
    surface: "paper", showRule: true,
    text: {
      eyebrow: eyebrow("models", "research"), index: RD.evaluation.id,
      value: RD.evaluation.value, unit: RD.evaluation.unit,
      headline: "open models were usable without customization.",
      subhead: "Document extraction, 1,240 documents.",
      source: "",
      cta: "Full evaluation", url: RD.evaluation.url,
    },
  },
  {
    ...base, id: "wb-banner", name: "Website · Banner", layout: "banner", sizeId: "web-banner",
    surface: "elevated",
    text: { eyebrow: "NEW", headline: "AI training for business teams, technical teams and leadership.", subhead: "", url: "PRIVEXLABS.COM/TRAINING" },
  },
];
