import type { CSSProperties } from "react";
import { FONT_MONO, FONT_SANS, FONT_SERIF, P, skinFor, type Skin } from "@/lib/palette";
import type { CanvasSize, Doc } from "@/lib/templates/types";
import { fitText } from "./fit";
import { isPrivexLabsPerson } from "@/lib/examples";
import { Label, Lockup, Mark, RegMarks } from "./primitives";

/*
 * Article covers, pull quotes and key figures.
 *
 * One frame serves every article canvas, from a 1000×420 DEV cover to a 1080×1920 story.
 * Everything is sized from `k`, the canvas's scale against a 1200×630 share card, and the
 * title and subtitle are fitted to the space that is actually left — so the same copy
 * holds its hierarchy at every size instead of overflowing the short ones.
 */

const clean = (v?: string) => (v ?? "").trim();

type Geometry = {
  w: number;
  h: number;
  k: number;
  px: (n: number) => number;
  /** Scale for header, byline, lockup and motif — see `geometry`. */
  kc: number;
  pc: (n: number) => number;
  wide: boolean;
  tall: boolean;
  /** Under 480px tall — newsletter headers, DEV covers. */
  short: boolean;
  centered: boolean;
  rule: number;
  padX: number;
  padTop: number;
  padBottom: number;
  innerW: number;
  innerH: number;
};

function geometry(doc: Doc, size: CanvasSize): Geometry {
  const { w, h } = size;
  const aspect = w / h;
  const k = Math.min(w / 1200, h / 630);
  const px = (n: number) => Math.round(n * k);
  const wide = aspect >= 1.45;
  const tall = aspect <= 0.6;
  // Wide covers are displayed near their pixel width, so their chrome scales with the card.
  // Square, portrait and story canvases are viewed full-screen on a phone, so their chrome
  // scales like the other feed templates — otherwise the byline and lockup read as specks.
  const kc = wide ? k : (w / 1080) * (tall ? 1.45 : 1.3);
  const pc = (n: number) => Math.round(n * kc);
  const short = h < 480;
  const rule = doc.showRule ? Math.max(6, wide ? px(12) : pc(12)) : 0;
  // Feed canvases share the 0.089 margin every other feed template uses.
  const padX = wide ? Math.max(24, px(64)) : Math.round(w * 0.089);
  // Stories are overlaid by platform chrome top and bottom; keep content out of those bands.
  const padTop = tall ? Math.round(h * 0.11) : wide ? Math.max(22, px(54)) : Math.round(w * 0.089);
  const padBottom = tall ? Math.round(h * 0.11) : wide ? Math.max(22, px(50)) : Math.round(w * 0.089);
  const centered = doc.align === "center";
  // LinkedIn crops article covers differently in feed, header and email; a centred cover
  // keeps its content inside the middle of the frame.
  const innerW = Math.round((w - padX * 2) * (centered && wide ? 0.82 : 1));
  const innerH = h - rule - padTop - padBottom;
  return { w, h, k, px, kc, pc, wide, tall, short, centered, rule, padX, padTop, padBottom, innerW, innerH };
}

/* ------------------------------------------------------------------ parts */

function Header({ doc, g, skin }: { doc: Doc; g: Geometry; skin: Skin }) {
  const eyebrow = clean(doc.text.eyebrow);
  const series = clean(doc.text.series);
  const index = clean(doc.text.index);
  const size = Math.max(11, g.pc(15));
  const lead = [eyebrow, series].filter(Boolean);
  if (!lead.length && !index) return null;

  const labelRow = (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: g.pc(14), minWidth: 0, flexWrap: "wrap", justifyContent: g.centered ? "center" : "flex-start" }}>
      {eyebrow ? <Label u={1} size={size} color={skin.accent}>{eyebrow}</Label> : null}
      {series ? (
        <span style={{
          fontFamily: FONT_MONO, fontSize: size, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
          color: skin.text, border: `1px solid ${skin.border}`, borderRadius: Math.max(2, g.pc(2)),
          padding: `${Math.max(2, g.pc(3))}px ${Math.max(5, g.pc(8))}px`, lineHeight: 1.2, whiteSpace: "nowrap",
        }}>{series}</span>
      ) : null}
    </span>
  );

  if (g.centered) {
    return <div style={{ display: "flex", justifyContent: "center", height: headerHeight(doc, g), alignItems: "flex-start" }}>{labelRow}</div>;
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: g.pc(24), height: headerHeight(doc, g) }}>
      {labelRow}
      {index ? <Label u={1} size={Math.max(10, g.pc(13))} color={skin.muted}>{index}</Label> : null}
    </div>
  );
}

function headerHeight(doc: Doc, g: Geometry): number {
  const has = clean(doc.text.eyebrow) || clean(doc.text.series) || (!g.centered && clean(doc.text.index));
  if (!has) return 0;
  const size = Math.max(11, g.pc(15));
  // Label line, badge padding, and the gap before the body.
  return Math.round(size * 1.2) + Math.max(4, g.pc(6)) * 2 + Math.max(12, g.pc(26));
}

function footerHeight(doc: Doc, g: Geometry): number {
  if (!doc.showFooter) return 0;
  return Math.max(16, g.pc(22)) + 1 + Math.max(12, g.pc(18)) + Math.max(30, g.pc(46));
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

function Footer({ doc, g, skin }: { doc: Doc; g: Geometry; skin: Skin }) {
  if (!doc.showFooter) return null;
  const author = clean(doc.text.author);
  // A short canvas has room for when and how long, not who else and where.
  const meta = (g.short ? [doc.text.date, doc.text.readTime] : [doc.text.role, doc.text.date, doc.text.readTime, doc.text.url])
    .map(clean).filter(Boolean).join("  ·  ");
  const avatar = Math.max(30, g.pc(46));
  const radius = Math.max(2, g.pc(4));

  // PrivexLabs' own people are shown by role, so their tile carries the mark, not initials.
  const own = isPrivexLabsPerson(clean(doc.text.role));
  const face = doc.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={doc.photo} alt="" width={avatar} height={avatar} style={{ width: avatar, height: avatar, objectFit: "cover", borderRadius: radius, display: "block", flexShrink: 0 }} />
  ) : own && author ? (
    <span style={{ width: avatar, height: avatar, borderRadius: radius, border: `1px solid ${skin.border}`, background: skin.panel, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Mark size={Math.round(avatar * 0.66)} stroke={skin.dark ? skin.brandInk : P.viridian600} node={skin.accent} />
    </span>
  ) : author ? (
    <span style={{ width: avatar, height: avatar, borderRadius: radius, border: `1px solid ${skin.border}`, background: skin.panel, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: FONT_MONO, fontWeight: 600, fontSize: Math.round(avatar * 0.36), color: skin.accent, letterSpacing: "0.02em" }}>{initials(author)}</span>
    </span>
  ) : null;

  const byline = author || meta ? (
    <span style={{ display: "flex", alignItems: "center", gap: Math.max(10, g.pc(14)), minWidth: 0 }}>
      {face}
      <span style={{ display: "flex", flexDirection: "column", gap: Math.max(2, g.pc(4)), minWidth: 0, textAlign: "left" }}>
        {author ? <span style={{ fontSize: Math.max(13, g.pc(19)), fontWeight: 600, color: skin.text, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{author}</span> : null}
        {meta ? (
          <span style={{ fontFamily: FONT_MONO, fontSize: Math.max(10, g.pc(13)), letterSpacing: "0.06em", textTransform: "uppercase", color: skin.muted, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{meta}</span>
        ) : null}
      </span>
    </span>
  ) : <span />;

  // Lockup never drops below the 96px minimum: u 0.5 renders it at roughly 100px wide.
  const lockU = Math.max(0.5, 0.8 * g.kc);

  return (
    <div style={{
      marginTop: Math.max(16, g.pc(22)), paddingTop: Math.max(12, g.pc(18)), borderTop: `1px solid ${skin.border}`,
      height: footerHeight(doc, g) - Math.max(16, g.pc(22)), boxSizing: "border-box",
      display: "flex", alignItems: "center", justifyContent: g.centered ? "center" : "space-between",
      gap: g.pc(g.centered ? 40 : 24),
    }}>
      {byline}
      {doc.logo !== "none" ? <span style={{ flexShrink: 0 }}><Lockup u={lockU} skin={skin} variant={doc.logo} /></span> : null}
    </div>
  );
}

/** The documented motif set: hairline grid, orthogonal trace, square nodes, mono indices. */
function Motif({ width, height, g, skin }: { width: number; height: number; g: Geometry; skin: Skin }) {
  if (width < 60 || height < 60) return null;
  const stroke = Math.max(1.5, 1.5 * g.kc);
  const cols = 6;
  const cell = width / cols;
  const rows = Math.max(2, Math.round(height / cell));
  const cellH = height / rows;
  const node = Math.max(8, Math.round(12 * g.kc));
  const brand = skin.dark ? skin.brandInk : P.viridian600;
  const labelSize = Math.max(9, Math.round(11 * g.kc));

  const x0 = cell * 1;
  const x1 = cell * 3;
  const x2 = cell * 5;
  const yLow = cellH * Math.max(1, rows - 1);
  const yHigh = cellH * 1;

  const nodes = [
    { x: x0, y: yLow, fill: skin.panel, line: skin.border, label: "01" },
    { x: x1, y: yHigh, fill: brand, line: brand, label: "02" },
    { x: x2, y: yHigh, fill: skin.accent, line: skin.accent, label: "03" },
  ];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }} aria-hidden>
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={i * cell} y1={0} x2={i * cell} y2={height} stroke={skin.divider} strokeWidth={1} />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * cellH} x2={width} y2={i * cellH} stroke={skin.divider} strokeWidth={1} />
      ))}
      <path d={`M${x0} ${yLow} H${x1} V${yHigh} H${x2}`} fill="none" stroke={brand} strokeWidth={stroke} />
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - node / 2} y={n.y - node / 2} width={node} height={node} rx={Math.max(1, node * 0.2)} fill={n.fill} stroke={n.line} strokeWidth={stroke} />
          <text x={n.x + node} y={n.y - node} fontFamily={FONT_MONO} fontSize={labelSize} letterSpacing="0.08em" fill={skin.muted}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------- bodies */

function From({ title, g, skin, width }: { title: string; g: Geometry; skin: Skin; width: number }) {
  if (!title) return null;
  const size = Math.max(12, g.pc(18));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: g.pc(14), maxWidth: width, justifyContent: g.centered ? "center" : "flex-start" }}>
      <span style={{ width: Math.max(18, g.pc(32)), height: 2, background: skin.accent, flexShrink: 0 }} />
      <span style={{ fontSize: size, fontWeight: 600, color: skin.secondary, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>
        From “{title}”
      </span>
    </div>
  );
}

const fromHeight = (g: Geometry) => Math.round(Math.max(12, g.pc(18)) * 1.3);

function fitted(style: CSSProperties, size: number, lines: number, lineHeight: number): CSSProperties {
  return {
    ...style,
    fontSize: size,
    lineHeight,
    maxHeight: Math.ceil(lines * size * lineHeight),
    overflow: "hidden",
    overflowWrap: "anywhere",
    whiteSpace: "pre-wrap",
  };
}

function CoverBody({ doc, g, skin, bodyH }: { doc: Doc; g: Geometry; skin: Skin; bodyH: number }) {
  const serif = doc.titleFont === "serif";
  const title = clean(doc.text.headline);
  const subtitle = clean(doc.text.subhead);

  const motifSide = doc.showMotif && g.wide && !g.centered;
  const motifTop = doc.showMotif && !g.wide && !g.centered;
  const colGap = g.px(48);
  const motifW = motifSide ? Math.round(g.innerW * 0.3) : 0;
  const textW = g.innerW - motifW - (motifSide ? colGap : 0);
  const bandH = motifTop ? Math.round(bodyH * (g.tall ? 0.22 : 0.16)) : 0;
  const bandGap = motifTop ? g.pc(g.tall ? 56 : 32) : 0;
  const textH = bodyH - bandH - bandGap;

  const family = serif ? FONT_SERIF : FONT_SANS;
  const weight = serif ? 500 : 700;
  const titleLH = serif ? 1.16 : 1.1;
  const subLH = 1.4;
  const maxTitle = g.wide ? g.px(66) : Math.round(g.w * (g.tall ? 0.088 : 0.074));
  const maxSub = g.wide ? g.px(26) : Math.round(g.w * (g.tall ? 0.032 : 0.027));
  const gap = g.wide ? g.px(18) : g.pc(g.tall ? 26 : 18);

  const titleFit = fitText({
    text: title, family, weight, width: textW,
    maxHeight: subtitle ? textH * (g.tall ? 0.62 : 0.66) : textH,
    maxSize: maxTitle, minSize: Math.max(14, maxTitle * 0.44), lineHeight: titleLH,
    maxLines: g.tall ? 6 : g.wide ? 4 : 5,
  });
  const titleH = title ? Math.ceil(titleFit.lines * titleFit.size * titleLH) : 0;

  const subRoom = textH - titleH - (title ? gap : 0);
  const minSub = Math.max(12, maxSub * 0.72);
  const subFit = subtitle && subRoom >= minSub * subLH
    ? fitText({ text: subtitle, family: FONT_SANS, weight: 400, width: textW, maxHeight: subRoom, maxSize: maxSub, minSize: minSub, lineHeight: subLH, maxLines: g.tall ? 5 : 3 })
    : null;

  const text = (
    <div style={{ width: textW, display: "flex", flexDirection: "column", gap, textAlign: g.centered ? "center" : "left" }}>
      {title ? (
        <div style={fitted({ fontFamily: family, fontWeight: weight, letterSpacing: serif ? "0" : "-0.02em", color: skin.text }, titleFit.size, titleFit.lines, titleLH)}>
          {title}
        </div>
      ) : null}
      {subFit ? (
        <div style={fitted({ fontFamily: FONT_SANS, color: skin.secondary }, subFit.size, subFit.lines, subLH)}>{subtitle}</div>
      ) : null}
    </div>
  );

  return (
    <div style={{ height: bodyH, display: "flex", flexDirection: motifTop ? "column" : "row", alignItems: g.centered ? "center" : "stretch", justifyContent: g.centered ? "center" : "space-between", gap: motifSide ? colGap : bandGap }}>
      {motifTop ? <Motif width={g.innerW} height={bandH} g={g} skin={skin} /> : null}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: motifTop ? textH : bodyH }}>{text}</div>
      {motifSide ? <div style={{ display: "flex", alignItems: "center" }}><Motif width={motifW} height={Math.round(bodyH * 0.86)} g={g} skin={skin} /></div> : null}
    </div>
  );
}

function QuoteBody({ doc, g, skin, bodyH }: { doc: Doc; g: Geometry; skin: Skin; bodyH: number }) {
  const serif = doc.titleFont !== "sans";
  const quote = clean(doc.text.quote);
  const title = clean(doc.text.headline);
  const family = serif ? FONT_SERIF : FONT_SANS;
  const weight = serif ? 500 : 600;
  const lh = serif ? 1.22 : 1.18;
  const gap = g.wide ? g.px(26) : g.pc(g.tall ? 34 : 26);
  const room = bodyH - (title ? fromHeight(g) + gap : 0);
  const maxSize = g.wide ? g.px(56) : Math.round(g.w * (g.tall ? 0.074 : 0.062));
  const fit = fitText({ text: `“${quote}”`, family, weight, width: g.innerW, maxHeight: room, maxSize, minSize: Math.max(14, maxSize * 0.42), lineHeight: lh, maxLines: g.tall ? 9 : g.wide ? 5 : 7 });

  return (
    <div style={{ height: bodyH, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: g.centered ? "center" : "stretch", gap }}>
      {quote ? (
        <div style={fitted({ fontFamily: family, fontWeight: weight, color: skin.text, width: g.innerW, textAlign: g.centered ? "center" : "left" }, fit.size, fit.lines, lh)}>
          “{quote}”
        </div>
      ) : null}
      <From title={title} g={g} skin={skin} width={g.innerW} />
    </div>
  );
}

function StatBody({ doc, g, skin, bodyH }: { doc: Doc; g: Geometry; skin: Skin; bodyH: number }) {
  const value = clean(doc.text.value);
  // A suffix typed as " docs" is meant to sit apart from the figure. A literal monospace space
  // is a full character wide at this size, so it is rendered as a proportional margin.
  const unit = clean(doc.text.unit);
  const unitSpaced = /^\s/.test(doc.text.unit ?? "");
  const claim = clean(doc.text.claim);
  const source = clean(doc.text.source);
  const title = clean(doc.text.headline);
  const brand = skin.dark ? skin.brandInk : P.viridian600;

  const gap = g.wide ? g.px(16) : g.pc(g.tall ? 26 : 16);
  const sourceSize = Math.max(10, g.pc(14));
  const reserved = (title ? fromHeight(g) + gap : 0) + (source ? Math.round(sourceSize * 1.3) + gap : 0);
  const room = bodyH - reserved;

  const figureMax = Math.min(Math.round(room * (claim ? 0.5 : 0.9)), g.wide ? g.px(170) : Math.round(g.w * 0.26));
  const figure = fitText({ text: `${value}${unit}`, family: FONT_MONO, weight: 600, width: g.innerW, maxHeight: room * (claim ? 0.55 : 1), maxSize: figureMax, minSize: Math.max(24, figureMax * 0.4), lineHeight: 1, maxLines: 1 });
  const figureH = value ? figure.size : 0;

  const claimRoom = room - figureH - (value ? gap : 0);
  const claimMax = g.wide ? g.px(38) : Math.round(g.w * (g.tall ? 0.05 : 0.042));
  const claimFit = claim && claimRoom > 16
    ? fitText({ text: claim, family: FONT_SANS, weight: 600, width: g.innerW, maxHeight: claimRoom, maxSize: claimMax, minSize: Math.max(12, claimMax * 0.5), lineHeight: 1.25, maxLines: g.tall ? 5 : 3 })
    : null;

  return (
    <div style={{ height: bodyH, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: g.centered ? "center" : "stretch", gap, textAlign: g.centered ? "center" : "left" }}>
      {value ? (
        <div style={{ fontFamily: FONT_MONO, fontWeight: 600, fontSize: figure.size, lineHeight: 1, color: brand, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
          {value}{unit ? <span style={{ color: skin.muted, marginLeft: unitSpaced ? "0.22em" : undefined }}>{unit}</span> : null}
        </div>
      ) : null}
      {claimFit ? (
        <div style={fitted({ fontFamily: FONT_SANS, fontWeight: 600, color: skin.text, letterSpacing: "-0.01em" }, claimFit.size, claimFit.lines, 1.25)}>{claim}</div>
      ) : null}
      {source ? <Label u={1} size={sourceSize} color={skin.muted}>{source}</Label> : null}
      <From title={title} g={g} skin={skin} width={g.innerW} />
    </div>
  );
}

/* ----------------------------------------------------------------- frame */

export function ArticleFrame({ doc, size }: { doc: Doc; size: CanvasSize }) {
  const skin = skinFor(doc.surface, doc.accent);
  const g = geometry(doc, size);
  const bodyH = Math.max(0, g.innerH - headerHeight(doc, g) - footerHeight(doc, g));

  const Body = doc.layout === "articleQuote" ? QuoteBody : doc.layout === "articleStat" ? StatBody : CoverBody;

  return (
    <div style={{
      width: g.w, height: g.h, boxSizing: "border-box", position: "relative", overflow: "hidden",
      background: skin.bg, color: skin.text, fontFamily: FONT_SANS,
      borderTop: g.rule ? `${g.rule}px solid ${skin.dark ? skin.brandInk : P.viridian600}` : undefined,
      padding: `${g.padTop}px ${g.padX}px ${g.padBottom}px`,
    }}>
      {doc.showMarks ? <RegMarks pad={Math.max(g.padX, 40)} skin={skin} /> : null}
      <div style={{ width: g.innerW, margin: "0 auto", height: g.innerH, display: "flex", flexDirection: "column" }}>
        <Header doc={doc} g={g} skin={skin} />
        <Body doc={doc} g={g} skin={skin} bodyH={bodyH} />
        <Footer doc={doc} g={g} skin={skin} />
      </div>
    </div>
  );
}
