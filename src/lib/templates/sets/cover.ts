import type { TemplateDef } from "../types";

const base = { category: "cover", layout: "banner" } as const;

/** Profile headers, channel art and share covers. The lockup carries these. */
export const coverTemplates: TemplateDef[] = [
  {
    ...base, id: "cv-x", name: "X / Twitter header", sizeId: "x-header", surface: "foundation", showMarks: true,
    text: { eyebrow: "AFRICAN AI LABORATORY", headline: "Private AI, built on your data, in your languages, under your control.", subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-linkedin", name: "LinkedIn cover", sizeId: "linkedin-cover", surface: "paper", showRule: true,
    text: { eyebrow: "AFRICAN AI LABORATORY", headline: "We build, adapt and privately operate AI for African organizations.", subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-facebook", name: "Facebook cover", sizeId: "facebook-cover", surface: "brand",
    text: { eyebrow: "AFRICAN AI LABORATORY", headline: "Your data. Your languages. Your boundary.", subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-youtube-art", name: "YouTube channel art", sizeId: "youtube-art", surface: "foundation", align: "center", showMarks: true,
    text: { eyebrow: "RESEARCH · ENGINEERING · PRIVATE AI", headline: "Evidence-led work on AI that runs where your data already is.", subhead: "New evaluations and engineering notes, every month.", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-twitch", name: "Twitch banner", sizeId: "twitch-banner", surface: "foundation",
    text: { eyebrow: "LIVE BUILDS · EVALUATIONS", headline: "We build in the open and publish what fails.", subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    // A square cover is not a banner — it uses the centred call-to-action layout so the
    // title fills the artwork the way a podcast tile has to.
    ...base, id: "cv-podcast", name: "Podcast cover", layout: "statement", sizeId: "podcast-cover", surface: "brand", align: "center", showMarks: true, showRule: true,
    text: {
      eyebrow: "A PRIVEXLABS PODCAST", index: "",
      headline: "Private by construction",
      subhead: "Conversations on building AI where the data already lives.",
      body: "New episodes monthly.",
      cta: "", url: "privexlabs.com/podcast",
    },
  },
  {
    ...base, id: "cv-newsletter", name: "Newsletter header", sizeId: "newsletter-header", surface: "paper", showRule: true,
    text: { eyebrow: "THE PRIVEX BRIEF · MONTHLY", headline: "What we tested, what worked, and what did not.", subhead: "", url: "PRIVEXLABS.COM/BRIEF" },
  },
  {
    ...base, id: "cv-og", name: "Website / Open Graph cover", sizeId: "og", surface: "foundation",
    text: { eyebrow: "PRIVEXLABS", headline: "Private AI, built on your data, in your languages, under your control.", subhead: "", url: "PRIVEXLABS.COM" },
  },
  {
    ...base, id: "cv-event", name: "Event banner", sizeId: "event-banner", surface: "paper", align: "center", showRule: true,
    text: { eyebrow: "14 MAY 2026 · 15:00 EAT · ONLINE", headline: "Evaluating AI in low-resource languages", subhead: "An open working session on method, not marketing.", url: "PRIVEXLABS.COM/EVENTS" },
  },
  {
    ...base, id: "cv-community", name: "Community banner", sizeId: "community-banner", surface: "elevated",
    text: { eyebrow: "PRIVEX COMMUNITY", headline: "Open evaluation sets, open rubrics, open results.", subhead: "", url: "PRIVEXLABS.COM/COMMUNITY" },
  },
];
