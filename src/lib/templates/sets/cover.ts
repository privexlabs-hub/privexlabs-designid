import { BRAND_DESCRIPTIONS, GOAL, company } from "@/lib/brand";
import { EVENT } from "@/lib/examples";
import type { TemplateDef } from "../types";

const base = { category: "cover", layout: "banner" } as const;

/** Profile headers, channel art and share covers. The lockup carries these. */
export const coverTemplates: TemplateDef[] = [
  {
    ...base, id: "cv-x", name: "X / Twitter header", sizeId: "x-header", surface: "foundation", showMarks: true,
    text: { eyebrow: "BUILD. DEPLOY. OWN AI.", headline: BRAND_DESCRIPTIONS.short, subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-linkedin", name: "LinkedIn cover", sizeId: "linkedin-cover", surface: "paper", showRule: true,
    text: { eyebrow: "AI · SOFTWARE · INFRASTRUCTURE · TRAINING", headline: "We help businesses build, deploy and operate intelligent systems on their own data.", subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-facebook", name: "Facebook cover", sizeId: "facebook-cover", surface: "brand",
    text: { eyebrow: "BUILD. DEPLOY. OWN AI.", headline: GOAL, subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-youtube-art", name: "YouTube channel art", sizeId: "youtube-art", surface: "foundation", align: "center", showMarks: true,
    text: { eyebrow: "AI · SOFTWARE · INFRASTRUCTURE · TRAINING", headline: "Practical AI and software, built on your data, workflows and infrastructure.", subhead: "Engineering notes, evaluations and training, every month.", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-twitch", name: "Twitch banner", sizeId: "twitch-banner", surface: "foundation",
    text: { eyebrow: "LIVE BUILDS · EVALUATIONS", headline: "We build in the open and publish what fails.", subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    // A square cover is not a banner — it uses the centred statement layout so the
    // title fills the artwork the way a podcast tile has to.
    ...base, id: "cv-podcast", name: "Podcast cover", layout: "statement", sizeId: "podcast-cover", surface: "brand", align: "center", showMarks: true, showRule: true,
    text: {
      eyebrow: "A PRIVEXLABS PODCAST", index: "",
      headline: "Private by construction",
      subhead: "Conversations on building AI that runs on your own data and infrastructure.",
      body: "New episodes monthly.",
      cta: "", url: "privexlabs.com/podcast",
    },
  },
  {
    ...base, id: "cv-newsletter", name: "Newsletter header", sizeId: "newsletter-header", surface: "paper", showRule: true,
    text: { eyebrow: "THE PRIVEX BRIEF · MONTHLY", headline: "What we built, what we measured, and what did not work.", subhead: "", url: "PRIVEXLABS.COM/BRIEF" },
  },
  {
    ...base, id: "cv-og", name: "Website / Open Graph cover", sizeId: "og", surface: "foundation",
    text: { eyebrow: "PRIVEXLABS", headline: company.lead, subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-event", name: "Event banner", sizeId: "event-banner", surface: "paper", align: "center", showRule: true,
    text: { eyebrow: `${EVENT.date.toUpperCase()} · ${EVENT.venue.toUpperCase()}`, headline: EVENT.headline, subhead: EVENT.subhead, url: "PRIVEXLABS.COM/EVENTS" },
  },
  {
    ...base, id: "cv-community", name: "Community banner", sizeId: "community-banner", surface: "elevated",
    text: { eyebrow: "PRIVEX COMMUNITY", headline: "Open evaluation rubrics, open benchmarks, open results.", subhead: "", url: "PRIVEXLABS.COM/COMMUNITY" },
  },
];
