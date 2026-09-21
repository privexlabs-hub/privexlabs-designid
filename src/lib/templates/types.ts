/** Canvas sizes, layouts and the document model the editor edits. */

export type CanvasSize = {
  id: string;
  label: string;
  w: number;
  h: number;
  group: string;
};

export const SIZES: CanvasSize[] = [
  { id: "square", label: "Square · 1080×1080", w: 1080, h: 1080, group: "Social" },
  { id: "portrait", label: "Portrait · 1080×1350", w: 1080, h: 1350, group: "Social" },
  { id: "vertical", label: "Vertical · 1080×1920", w: 1080, h: 1920, group: "Social" },
  { id: "landscape", label: "Landscape · 1600×900", w: 1600, h: 900, group: "Social" },
  { id: "youtube", label: "YouTube thumbnail · 1280×720", w: 1280, h: 720, group: "Video" },
  { id: "youtube-art", label: "YouTube channel art · 2560×1440", w: 2560, h: 1440, group: "Cover" },
  { id: "og", label: "Open Graph · 1200×630", w: 1200, h: 630, group: "Web" },
  { id: "x-header", label: "X header · 1500×500", w: 1500, h: 500, group: "Cover" },
  { id: "linkedin-cover", label: "LinkedIn cover · 1584×396", w: 1584, h: 396, group: "Cover" },
  { id: "facebook-cover", label: "Facebook cover · 1640×624", w: 1640, h: 624, group: "Cover" },
  { id: "twitch-banner", label: "Twitch banner · 1920×480", w: 1920, h: 480, group: "Cover" },
  { id: "community-banner", label: "Community banner · 1920×480", w: 1920, h: 480, group: "Cover" },
  { id: "podcast-cover", label: "Podcast cover · 3000×3000", w: 3000, h: 3000, group: "Cover" },
  { id: "newsletter-header", label: "Newsletter header · 1200×400", w: 1200, h: 400, group: "Email" },
  { id: "event-banner", label: "Event banner · 1920×1080", w: 1920, h: 1080, group: "Cover" },
  { id: "avatar", label: "Avatar · 400×400", w: 400, h: 400, group: "Identity" },
  { id: "ad-landscape", label: "Ad landscape · 1200×628", w: 1200, h: 628, group: "Ads" },
  { id: "email-block", label: "Email block · 1200×800", w: 1200, h: 800, group: "Email" },
  { id: "email-banner", label: "Email banner · 1200×500", w: 1200, h: 500, group: "Email" },
  { id: "web-hero", label: "Web hero · 1600×900", w: 1600, h: 900, group: "Web" },
  { id: "web-section", label: "Web section · 1200×800", w: 1200, h: 800, group: "Web" },
  { id: "web-banner", label: "Web banner · 1600×400", w: 1600, h: 400, group: "Web" },
  // Article covers. LinkedIn and Substack figures are from their own help centres; X
  // recommends a 5:2 aspect ratio for article images; DEV and Hashnode are their documented
  // ratios; Medium publishes no pixel spec ("a wide horizontal rectangle"), so 1200×680 is
  // the commonly recommended size rather than an official one.
  { id: "medium-cover", label: "Medium story cover · 1200×680", w: 1200, h: 680, group: "Articles" },
  { id: "linkedin-article", label: "LinkedIn article / newsletter cover · 1920×1080", w: 1920, h: 1080, group: "Articles" },
  { id: "link-card", label: "X / LinkedIn link card · 1200×628", w: 1200, h: 628, group: "Articles" },
  { id: "x-article", label: "X article cover · 1500×600 (5:2)", w: 1500, h: 600, group: "Articles" },
  { id: "devto-cover", label: "DEV cover · 1000×420", w: 1000, h: 420, group: "Articles" },
  { id: "hashnode-cover", label: "Hashnode cover · 1600×840", w: 1600, h: 840, group: "Articles" },
];

export const SIZE_BY_ID: Record<string, CanvasSize> = Object.fromEntries(SIZES.map((s) => [s.id, s]));

/** Surface treatments. Each maps to a background + text pair drawn from tokens only. */
export type SurfaceId = "paper" | "elevated" | "foundation" | "brand" | "muted";

export const SURFACES: { id: SurfaceId; label: string; dark: boolean }[] = [
  { id: "paper", label: "Paper", dark: false },
  { id: "elevated", label: "Paper elevated", dark: false },
  { id: "muted", label: "Paper muted", dark: false },
  { id: "foundation", label: "Foundation dark", dark: true },
  { id: "brand", label: "Viridian", dark: true },
];

export type AccentId = "brass" | "viridian";

export type LayoutId =
  | "statement" | "stat" | "quote" | "testimonial" | "split" | "list" | "steps"
  | "metrics" | "diagram" | "feature" | "profile" | "faq" | "poll" | "thumbnail"
  | "banner" | "avatar" | "carousel" | "email" | "web" | "cta" | "event"
  | "offer" | "caseStudy" | "meme" | "hiring"
  | "article" | "articleQuote" | "articleStat";

export const ARTICLE_LAYOUTS: LayoutId[] = ["article", "articleQuote", "articleStat"];
export const isArticleLayout = (layout: LayoutId) => ARTICLE_LAYOUTS.includes(layout);

/** Every size an article design is exported at by "Export for every platform". */
export const ARTICLE_PACK: { sizeId: string; platform: string }[] = [
  { sizeId: "medium-cover", platform: "Medium story cover" },
  { sizeId: "linkedin-article", platform: "LinkedIn article or newsletter cover" },
  { sizeId: "link-card", platform: "X and LinkedIn link card" },
  { sizeId: "x-article", platform: "X article cover, 5:2" },
  { sizeId: "og", platform: "Substack and blog share, Open Graph" },
  { sizeId: "devto-cover", platform: "DEV cover" },
  { sizeId: "hashnode-cover", platform: "Hashnode cover" },
  { sizeId: "newsletter-header", platform: "Newsletter header" },
  { sizeId: "square", platform: "Square promo, LinkedIn and Instagram" },
  { sizeId: "portrait", platform: "Portrait promo, LinkedIn and Instagram" },
  { sizeId: "vertical", platform: "Story promo, Instagram and LinkedIn" },
];

export type FieldKind = "text" | "textarea" | "list";

export type FieldDef = {
  key: string;
  label: string;
  kind: FieldKind;
  help?: string;
};

/** A concrete, editable design. */
export type Doc = {
  templateId: string;
  layout: LayoutId;
  sizeId: string;
  surface: SurfaceId;
  accent: AccentId;
  align: "left" | "center";
  logo: "lockup" | "mark" | "wordmark" | "none";
  showMarks: boolean;
  showFooter: boolean;
  showRule: boolean;
  text: Record<string, string>;
  items: string[];
  /** Article layouts only. Newsreader is for long-form writing and quotations. */
  titleFont?: "sans" | "serif";
  /** Article cover only — the hairline grid and signal-trace panel. */
  showMotif?: boolean;
  /** Author photo for article bylines and the photo avatar, as a downscaled data URL. */
  photo?: string;
};

export type TemplateDef = {
  id: string;
  category: string;
  name: string;
  layout: LayoutId;
  sizeId: string;
  surface: SurfaceId;
  accent?: AccentId;
  align?: "left" | "center";
  logo?: Doc["logo"];
  showMarks?: boolean;
  showFooter?: boolean;
  showRule?: boolean;
  titleFont?: "sans" | "serif";
  showMotif?: boolean;
  text: Record<string, string>;
  items?: string[];
};

export type Category = { id: string; name: string; blurb: string };

export const CATEGORIES: Category[] = [
  { id: "square", name: "Square", blurb: "1080×1080 — the everyday feed unit across LinkedIn, X and Instagram." },
  { id: "engagement", name: "Engagement", blurb: "1080×1080 — formats built to start a conversation rather than announce one." },
  { id: "carousel", name: "Carousel", blurb: "1080×1080 — a ten-slide argument: hook, problem, insight, solution, proof, close." },
  { id: "vertical", name: "Vertical", blurb: "1080×1920 — stories and reels. One idea, thumb-readable." },
  { id: "portrait", name: "Portrait", blurb: "1080×1350 — the highest-density feed post. Room for evidence." },
  { id: "youtube", name: "YouTube", blurb: "1280×720 — thumbnails that read at 210px wide." },
  { id: "cover", name: "Cover · Banners", blurb: "Profile headers, channel art and open-graph covers." },
  { id: "avatar", name: "Avatar", blurb: "400×400 — the mark under every surface treatment." },
  { id: "ads", name: "Ads", blurb: "Paid placements. Claim, proof, one action." },
  { id: "email", name: "Email", blurb: "Headers, announcement blocks and CTA banners for campaigns." },
  { id: "web", name: "Web", blurb: "Heroes, sections, banners and share cards for privexlabs.com." },
  { id: "articles", name: "Articles", blurb: "Covers and share cards for anything we publish. Type the title once, then export it for Medium, LinkedIn, X, Substack, DEV, Hashnode and the newsletter." },
];
