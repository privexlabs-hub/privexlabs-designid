import type { CSSProperties } from "react";
import { FONT_MONO, FONT_SANS, FONT_SERIF, P, skinFor, type Skin } from "@/lib/palette";
import { splitItem } from "@/lib/templates/layouts";
import type { CanvasSize, Doc } from "@/lib/templates/types";
import { Label, Lockup, Mark, Node, RegMarks, Wordmark } from "./primitives";

type Ctx = {
  doc: Doc;
  size: CanvasSize;
  skin: Skin;
  u: number;
  pad: number;
  t: (n: number) => number;
  tall: boolean;
  wide: boolean;
};

const clean = (v?: string) => (v ?? "").trim();
const lines = (items: string[]) => items.map(clean).filter(Boolean);

/* ------------------------------------------------------------------ shared */

function Header({ ctx }: { ctx: Ctx }) {
  const { doc, skin, u, t } = ctx;
  const eyebrow = clean(doc.text.eyebrow);
  const index = clean(doc.text.index);
  if (!eyebrow && !index) return null;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: t(24), flexShrink: 0 }}>
      <Label u={u} color={skin.accent} size={20}>{eyebrow}</Label>
      <Label u={u} color={skin.muted} size={18}>{index}</Label>
    </div>
  );
}

function Footer({ ctx }: { ctx: Ctx }) {
  const { doc, skin, u, t } = ctx;
  const cta = clean(doc.text.cta);
  const url = clean(doc.text.url);
  const note = [cta, url].filter(Boolean).join("  →  ");
  if (doc.logo === "none" && !note) return null;
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: t(24),
      borderTop: `1px solid ${skin.border}`, paddingTop: t(32), marginTop: t(40), flexShrink: 0,
    }}>
      <Lockup u={u} skin={skin} variant={doc.logo} />
      <Label u={u} color={skin.muted} size={16}>{note}</Label>
    </div>
  );
}

function Headline({ ctx, size, serif, children }: { ctx: Ctx; size: number; serif?: boolean; children?: string }) {
  const text = clean(children);
  if (!text) return null;
  return (
    <div style={{
      fontFamily: serif ? FONT_SERIF : FONT_SANS,
      fontSize: ctx.t(size),
      lineHeight: serif ? 1.22 : 1.14,
      fontWeight: serif ? 500 : 700,
      letterSpacing: serif ? "0" : "-0.02em",
      color: ctx.skin.text,
      whiteSpace: "pre-wrap",
    }}>{text}</div>
  );
}

function Sub({ ctx, size = 30, color, children }: { ctx: Ctx; size?: number; color?: string; children?: string }) {
  const text = clean(children);
  if (!text) return null;
  return (
    <div style={{ fontSize: ctx.t(size), lineHeight: 1.45, color: color ?? ctx.skin.secondary, whiteSpace: "pre-wrap", fontWeight: 400 }}>{text}</div>
  );
}

function Figure({ ctx, value, unit, size = 200 }: { ctx: Ctx; value?: string; unit?: string; size?: number }) {
  const v = clean(value);
  if (!v) return null;
  return (
    <div style={{
      fontFamily: FONT_MONO, fontSize: ctx.t(size), lineHeight: 1, fontWeight: 600,
      color: ctx.skin.dark ? ctx.skin.brandInk : P.viridian600, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em",
    }}>
      {v}{clean(unit) ? <span style={{ color: ctx.skin.muted }}>{clean(unit)}</span> : null}
    </div>
  );
}

function Button({ ctx, children }: { ctx: Ctx; children?: string }) {
  const text = clean(children);
  if (!text) return null;
  const { skin, t } = ctx;
  const solid = skin.dark ? skin.brandInk : P.viridian600;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: solid, color: skin.dark ? P.foundation : P.onBrand,
      fontWeight: 600, fontSize: t(24), padding: `${t(18)}px ${t(34)}px`,
      borderRadius: t(4), lineHeight: 1,
    }}>{text}</span>
  );
}

function Stack({ ctx, gap = 24, children }: { ctx: Ctx; gap?: number; children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: ctx.t(gap), minHeight: 0 }}>{children}</div>;
}

function Panel({ ctx, children, style }: { ctx: Ctx; children: React.ReactNode; style?: CSSProperties }) {
  const { skin, t } = ctx;
  return (
    <div style={{
      border: `1px solid ${skin.border}`, borderRadius: t(4), background: skin.panel,
      padding: t(32), display: "flex", flexDirection: "column", gap: t(14), minWidth: 0, ...style,
    }}>{children}</div>
  );
}

function RowList({ ctx, entries, numbered }: { ctx: Ctx; entries: string[]; numbered?: boolean }) {
  const { skin, t, u } = ctx;
  if (!entries.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {entries.map((raw, i) => {
        const { a, b } = splitItem(raw);
        return (
          <div key={i} style={{
            display: "flex", gap: t(24), alignItems: "flex-start",
            borderTop: `1px solid ${skin.divider}`, padding: `${t(22)}px 0`,
          }}>
            {numbered ? (
              <span style={{ fontFamily: FONT_MONO, fontSize: t(20), fontWeight: 600, color: skin.accent, letterSpacing: "0.08em", paddingTop: t(6), minWidth: t(48) }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : (
              <span style={{ paddingTop: t(14) }}><Node size={t(12)} color={skin.accent} /></span>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: t(6), minWidth: 0 }}>
              <div style={{ fontSize: t(28), fontWeight: 600, lineHeight: 1.3, color: skin.text, whiteSpace: "pre-wrap" }}>{a}</div>
              {b ? <div style={{ fontSize: t(23), lineHeight: 1.45, color: skin.secondary, whiteSpace: "pre-wrap" }}>{b}</div> : null}
            </div>
            <span style={{ display: "none" }}>{u}</span>
          </div>
        );
      })}
      <div style={{ borderTop: `1px solid ${skin.divider}` }} />
    </div>
  );
}

function MetricRow({ ctx, entries, columns }: { ctx: Ctx; entries: string[]; columns?: number }) {
  const { skin, t } = ctx;
  if (!entries.length) return null;
  const cols = columns ?? Math.min(entries.length, ctx.tall ? 2 : entries.length > 3 ? 2 : entries.length);
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: t(28) }}>
      {entries.map((raw, i) => {
        const { a, b } = splitItem(raw);
        return (
          <div key={i} style={{ borderTop: `2px solid ${skin.accent}`, paddingTop: t(20), display: "flex", flexDirection: "column", gap: t(8), minWidth: 0 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: t(56), fontWeight: 600, lineHeight: 1, color: skin.dark ? skin.brandInk : P.viridian600, fontVariantNumeric: "tabular-nums" }}>{a}</div>
            <div style={{ fontSize: t(21), lineHeight: 1.35, color: skin.secondary, whiteSpace: "pre-wrap" }}>{b}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- layouts */

function renderBody(ctx: Ctx): React.ReactNode {
  const { doc, skin, t, u, tall } = ctx;
  const T = doc.text;
  const it = lines(doc.items);

  switch (doc.layout) {
    case "statement":
      return (
        <Stack ctx={ctx} gap={28}>
          <Headline ctx={ctx} size={tall ? 72 : 64}>{T.headline}</Headline>
          <Sub ctx={ctx} size={31}>{T.subhead}</Sub>
          <Sub ctx={ctx} size={25} color={skin.muted}>{T.body}</Sub>
        </Stack>
      );

    case "stat":
      return (
        <Stack ctx={ctx} gap={26}>
          <Figure ctx={ctx} value={T.value} unit={T.unit} size={tall ? 200 : 210} />
          <Headline ctx={ctx} size={46}>{T.headline}</Headline>
          <Sub ctx={ctx} size={27}>{T.subhead}</Sub>
          {clean(T.source) ? <Label u={u} color={skin.muted} size={17}>{T.source}</Label> : null}
        </Stack>
      );

    case "quote":
      return (
        <Stack ctx={ctx} gap={40}>
          <Headline ctx={ctx} size={tall ? 62 : 58} serif>{T.quote ? `“${clean(T.quote)}”` : ""}</Headline>
          <div style={{ display: "flex", flexDirection: "column", gap: t(8) }}>
            <div style={{ fontSize: t(28), fontWeight: 600, color: skin.text }}>{clean(T.author)}</div>
            <Label u={u} color={skin.muted} size={17}>{T.role}</Label>
          </div>
        </Stack>
      );

    case "testimonial":
      return (
        <Stack ctx={ctx} gap={34}>
          <Headline ctx={ctx} size={44}>{T.quote ? `“${clean(T.quote)}”` : ""}</Headline>
          <div style={{ display: "flex", alignItems: "center", gap: t(20) }}>
            <span style={{ width: t(72), height: t(72), borderRadius: t(4), border: `1px solid ${skin.border}`, background: skin.panel, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: FONT_MONO, fontWeight: 600, fontSize: t(26), color: skin.accent }}>
                {clean(T.author).split(/\s+/).slice(0, 2).map((w) => w[0] ?? "").join("")}
              </span>
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: t(6), minWidth: 0 }}>
              <div style={{ fontSize: t(27), fontWeight: 600, color: skin.text }}>{clean(T.author)}</div>
              <Label u={u} color={skin.muted} size={17}>{T.role}</Label>
            </div>
          </div>
          {clean(T.value) ? (
            <div style={{ borderTop: `2px solid ${skin.accent}`, paddingTop: t(18), display: "flex", alignItems: "baseline", gap: t(16) }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: t(58), fontWeight: 600, lineHeight: 1, color: skin.dark ? skin.brandInk : P.viridian600, fontVariantNumeric: "tabular-nums" }}>{clean(T.value)}</span>
              <span style={{ fontSize: t(23), color: skin.secondary }}>{clean(T.unit)}</span>
            </div>
          ) : null}
        </Stack>
      );

    case "split": {
      const stack = tall || ctx.size.w < 1100;
      return (
        <Stack ctx={ctx} gap={34}>
          <Headline ctx={ctx} size={48}>{T.headline}</Headline>
          <div style={{ display: "grid", gridTemplateColumns: stack ? "1fr" : "1fr 1fr", gap: t(24) }}>
            <Panel ctx={ctx}>
              <Label u={u} color={skin.muted} size={17}>{T.leftTitle}</Label>
              <Sub ctx={ctx} size={26} color={skin.text}>{T.leftBody}</Sub>
            </Panel>
            <Panel ctx={ctx} style={{ borderColor: skin.accent }}>
              <Label u={u} color={skin.accent} size={17}>{T.rightTitle}</Label>
              <Sub ctx={ctx} size={26} color={skin.text}>{T.rightBody}</Sub>
            </Panel>
          </div>
        </Stack>
      );
    }

    case "list":
      return (
        <Stack ctx={ctx} gap={30}>
          <Headline ctx={ctx} size={48}>{T.headline}</Headline>
          <Sub ctx={ctx} size={27}>{T.subhead}</Sub>
          <RowList ctx={ctx} entries={it} numbered />
        </Stack>
      );

    case "steps":
      return (
        <Stack ctx={ctx} gap={30}>
          <Headline ctx={ctx} size={48}>{T.headline}</Headline>
          <Sub ctx={ctx} size={27}>{T.subhead}</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {it.map((raw, i) => {
              const { a, b } = splitItem(raw);
              const last = i === it.length - 1;
              return (
                <div key={i} style={{ display: "flex", gap: t(26), minWidth: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <Node size={t(16)} color={skin.accent} />
                    {!last ? <span style={{ width: 1.5, flex: 1, background: skin.border, minHeight: t(40) }} /> : null}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: t(6), paddingBottom: last ? 0 : t(28), minWidth: 0 }}>
                    <Label u={u} color={skin.muted} size={16}>{`STEP ${String(i + 1).padStart(2, "0")}`}</Label>
                    <div style={{ fontSize: t(29), fontWeight: 600, lineHeight: 1.3, color: skin.text }}>{a}</div>
                    {b ? <div style={{ fontSize: t(23), lineHeight: 1.45, color: skin.secondary }}>{b}</div> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </Stack>
      );

    case "metrics":
      return (
        <Stack ctx={ctx} gap={34}>
          <Headline ctx={ctx} size={48}>{T.headline}</Headline>
          <Sub ctx={ctx} size={27}>{T.subhead}</Sub>
          <MetricRow ctx={ctx} entries={it} />
          {clean(T.source) ? <Label u={u} color={skin.muted} size={17}>{T.source}</Label> : null}
        </Stack>
      );

    case "diagram": {
      // Connector runs and box padding tighten as the stack grows, so a four- or
      // five-layer diagram still fits a short canvas without shrinking the labels.
      const dense = it.length >= 4;
      const run = dense ? 20 : 28;
      const boxPad = dense ? 18 : 22;
      return (
        <Stack ctx={ctx} gap={dense ? 16 : 30}>
          <Headline ctx={ctx} size={dense ? 40 : 46}>{T.headline}</Headline>
          <Sub ctx={ctx} size={24}>{T.subhead}</Sub>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
            {it.map((raw, i) => {
              const { a, b } = splitItem(raw);
              const active = i === Math.min(1, it.length - 1);
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                  {i > 0 ? (
                    <div style={{ height: t(run), display: "flex", justifyContent: "center" }}>
                      <span style={{ width: 1.5, height: "100%", background: active ? skin.accent : skin.border }} />
                    </div>
                  ) : null}
                  <div style={{
                    border: `1.5px solid ${active ? (skin.dark ? skin.brandInk : P.viridian600) : skin.border}`,
                    borderRadius: t(4), padding: `${t(boxPad)}px ${t(26)}px`, background: skin.panel,
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: t(20),
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: t(16), minWidth: 0 }}>
                      <Node size={t(12)} color={active ? skin.accent : skin.muted} />
                      <span style={{ fontSize: t(27), fontWeight: 600, color: skin.text }}>{a}</span>
                    </span>
                    <Label u={u} color={skin.muted} size={16}>{b}</Label>
                  </div>
                </div>
              );
            })}
          </div>
          {clean(T.source) ? <Label u={u} color={skin.muted} size={16}>{T.source}</Label> : null}
        </Stack>
      );
    }

    case "feature":
      return (
        <Stack ctx={ctx} gap={30}>
          <Headline ctx={ctx} size={50}>{T.headline}</Headline>
          <Sub ctx={ctx} size={27}>{T.subhead}</Sub>
          <RowList ctx={ctx} entries={it} />
        </Stack>
      );

    case "profile":
      return (
        <Stack ctx={ctx} gap={32}>
          <div style={{ display: "flex", alignItems: "center", gap: t(24) }}>
            <span style={{ width: t(120), height: t(120), border: `1px solid ${skin.border}`, borderRadius: t(4), background: skin.panel, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Mark size={t(64)} stroke={skin.dark ? skin.brandInk : P.viridian600} node={skin.accent} />
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: t(8), minWidth: 0 }}>
              <div style={{ fontSize: t(38), fontWeight: 700, letterSpacing: "-0.015em", color: skin.text }}>{clean(T.author)}</div>
              <Label u={u} color={skin.muted} size={17}>{T.role}</Label>
            </div>
          </div>
          <Headline ctx={ctx} size={42}>{T.headline}</Headline>
          <Sub ctx={ctx} size={26}>{T.body}</Sub>
        </Stack>
      );

    case "faq":
      return (
        <Stack ctx={ctx} gap={30}>
          <Headline ctx={ctx} size={48}>{T.headline}</Headline>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {it.map((raw, i) => {
              const { a, b } = splitItem(raw);
              return (
                <div key={i} style={{ borderTop: `1px solid ${skin.divider}`, padding: `${t(24)}px 0`, display: "flex", flexDirection: "column", gap: t(10) }}>
                  <div style={{ display: "flex", gap: t(16) }}>
                    <Label u={u} color={skin.accent} size={18}>Q</Label>
                    <div style={{ fontSize: t(28), fontWeight: 600, lineHeight: 1.3, color: skin.text }}>{a}</div>
                  </div>
                  {b ? (
                    <div style={{ display: "flex", gap: t(16) }}>
                      <Label u={u} color={skin.muted} size={18}>A</Label>
                      <div style={{ fontSize: t(24), lineHeight: 1.45, color: skin.secondary }}>{b}</div>
                    </div>
                  ) : null}
                </div>
              );
            })}
            <div style={{ borderTop: `1px solid ${skin.divider}` }} />
          </div>
        </Stack>
      );

    case "poll": {
      const parsed = it.map((raw) => {
        const { a, b } = splitItem(raw);
        const pct = Math.max(0, Math.min(100, parseFloat(b.replace("%", "")) || 0));
        return { a, b, pct };
      });
      return (
        <Stack ctx={ctx} gap={32}>
          <Headline ctx={ctx} size={48}>{T.headline}</Headline>
          <Sub ctx={ctx} size={27}>{T.subhead}</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: t(18) }}>
            {parsed.map((o, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: t(10) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: t(16) }}>
                  <span style={{ fontSize: t(27), fontWeight: 600, color: skin.text }}>{o.a}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: t(23), color: skin.muted, fontVariantNumeric: "tabular-nums" }}>{o.b}</span>
                </div>
                <span style={{ height: t(12), background: skin.panel, border: `1px solid ${skin.border}`, borderRadius: t(2), display: "block", overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: `${o.pct}%`, background: i === 0 ? (skin.dark ? skin.brandInk : P.viridian600) : skin.border }} />
                </span>
              </div>
            ))}
          </div>
        </Stack>
      );
    }

    case "carousel":
      return (
        <Stack ctx={ctx} gap={28}>
          <Headline ctx={ctx} size={56}>{T.headline}</Headline>
          <Sub ctx={ctx} size={29}>{T.subhead}</Sub>
          <Sub ctx={ctx} size={25} color={skin.muted}>{T.body}</Sub>
          {it.length ? <RowList ctx={ctx} entries={it} /> : null}
        </Stack>
      );

    case "email":
      return (
        <Stack ctx={ctx} gap={26}>
          <Headline ctx={ctx} size={46}>{T.headline}</Headline>
          <Sub ctx={ctx} size={27}>{T.subhead}</Sub>
          <Sub ctx={ctx} size={24} color={skin.muted}>{T.body}</Sub>
          {clean(T.cta) ? <span><Button ctx={ctx}>{T.cta}</Button></span> : null}
        </Stack>
      );

    case "web":
      return (
        <Stack ctx={ctx} gap={30}>
          <Headline ctx={ctx} size={58}>{T.headline}</Headline>
          <Sub ctx={ctx} size={29}>{T.subhead}</Sub>
          {it.length ? <MetricRow ctx={ctx} entries={it} columns={Math.min(3, it.length)} /> : null}
          {clean(T.cta) ? <span><Button ctx={ctx}>{T.cta}</Button></span> : null}
        </Stack>
      );

    case "cta":
      return (
        <Stack ctx={ctx} gap={30}>
          <Headline ctx={ctx} size={58}>{T.headline}</Headline>
          <Sub ctx={ctx} size={29}>{T.subhead}</Sub>
          {clean(T.cta) ? <span style={{ alignSelf: ctx.doc.align === "center" ? "center" : "flex-start" }}><Button ctx={ctx}>{T.cta}</Button></span> : null}
        </Stack>
      );

    case "event":
      return (
        <Stack ctx={ctx} gap={30}>
          <Headline ctx={ctx} size={52}>{T.headline}</Headline>
          <Sub ctx={ctx} size={28}>{T.subhead}</Sub>
          <div style={{ display: "flex", flexWrap: "wrap", gap: t(28), borderTop: `2px solid ${skin.accent}`, paddingTop: t(20) }}>
            <div style={{ display: "flex", flexDirection: "column", gap: t(6) }}>
              <Label u={u} color={skin.muted} size={16}>Date</Label>
              <span style={{ fontFamily: FONT_MONO, fontSize: t(30), fontWeight: 600, color: skin.text }}>{clean(T.date)}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: t(6) }}>
              <Label u={u} color={skin.muted} size={16}>Venue</Label>
              <span style={{ fontSize: t(28), fontWeight: 600, color: skin.text }}>{clean(T.venue)}</span>
            </div>
          </div>
          {it.length ? <RowList ctx={ctx} entries={it} /> : null}
        </Stack>
      );

    case "offer":
      return (
        <Stack ctx={ctx} gap={26}>
          <Figure ctx={ctx} value={T.value} unit={T.unit} size={150} />
          <Headline ctx={ctx} size={48}>{T.headline}</Headline>
          <Sub ctx={ctx} size={27}>{T.subhead}</Sub>
          {clean(T.cta) ? <span><Button ctx={ctx}>{T.cta}</Button></span> : null}
          {clean(T.source) ? <Label u={u} color={skin.muted} size={15}>{T.source}</Label> : null}
        </Stack>
      );

    case "caseStudy":
      return (
        <Stack ctx={ctx} gap={28}>
          {clean(T.client) ? <Label u={u} color={skin.muted} size={19}>{T.client}</Label> : null}
          <Headline ctx={ctx} size={46}>{T.headline}</Headline>
          <div style={{ display: "grid", gridTemplateColumns: tall ? "1fr" : "1fr 1fr", gap: t(24) }}>
            <Panel ctx={ctx}>
              <Label u={u} color={skin.muted} size={17}>{T.leftTitle}</Label>
              <Sub ctx={ctx} size={24} color={skin.text}>{T.leftBody}</Sub>
            </Panel>
            <Panel ctx={ctx} style={{ borderColor: skin.accent }}>
              <Label u={u} color={skin.accent} size={17}>{T.rightTitle}</Label>
              <Sub ctx={ctx} size={24} color={skin.text}>{T.rightBody}</Sub>
            </Panel>
          </div>
          <MetricRow ctx={ctx} entries={it} />
        </Stack>
      );

    case "meme":
      return (
        <Stack ctx={ctx} gap={30}>
          <Headline ctx={ctx} size={54}>{T.headline}</Headline>
          <div style={{
            border: `1px dashed ${skin.border}`, borderRadius: t(4), background: skin.panel,
            padding: t(40), display: "flex", alignItems: "center", justifyContent: "center", minHeight: t(220),
          }}>
            <Sub ctx={ctx} size={28} color={skin.muted}>{T.body}</Sub>
          </div>
          <Headline ctx={ctx} size={40}>{T.subhead}</Headline>
        </Stack>
      );

    case "hiring":
      return (
        <Stack ctx={ctx} gap={28}>
          <Headline ctx={ctx} size={52}>{T.role}</Headline>
          <Sub ctx={ctx} size={29}>{T.headline}</Sub>
          <Sub ctx={ctx} size={25} color={skin.muted}>{T.subhead}</Sub>
          {it.length ? <MetricRow ctx={ctx} entries={it} columns={Math.min(3, it.length)} /> : null}
          {clean(T.cta) ? <span><Button ctx={ctx}>{T.cta}</Button></span> : null}
        </Stack>
      );

    default:
      return null;
  }
}

/* --------------------------------------------------- full-frame layouts */

function ThumbnailFrame(ctx: Ctx) {
  const { doc, skin, t, u, pad } = ctx;
  const T = doc.text;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: t(24) }}>
        <span style={{ background: skin.accent, color: skin.dark ? P.foundation : P.neutral0, fontFamily: FONT_MONO, fontSize: t(22), letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, padding: `${t(10)}px ${t(16)}px`, borderRadius: t(2), lineHeight: 1 }}>
          {clean(T.eyebrow)}
        </span>
        {clean(T.value) ? (
          <span style={{ fontFamily: FONT_MONO, fontSize: t(74), fontWeight: 600, lineHeight: 1, color: skin.dark ? skin.brandInk : P.viridian600, fontVariantNumeric: "tabular-nums" }}>{clean(T.value)}</span>
        ) : null}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: t(18), minHeight: 0, overflow: "hidden" }}>
        <div style={{ fontSize: t(96), fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", color: skin.text, whiteSpace: "pre-wrap" }}>{clean(T.headline)}</div>
        <Sub ctx={ctx} size={32}>{T.subhead}</Sub>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `2px solid ${skin.accent}`, paddingTop: t(20) }}>
        <Lockup u={u} skin={skin} variant={doc.logo === "none" ? "lockup" : doc.logo} />
        <Label u={u} color={skin.muted} size={18}>{T.cta}</Label>
      </div>
      <span style={{ display: "none" }}>{pad}</span>
    </>
  );
}

function BannerFrame(ctx: Ctx) {
  const { doc, skin, t, u } = ctx;
  const T = doc.text;
  const centered = doc.align === "center";
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: centered ? "center" : "flex-start", textAlign: centered ? "center" : "left", gap: t(22), minHeight: 0,
    }}>
      <Label u={u} color={skin.accent} size={20}>{T.eyebrow}</Label>
      <div style={{ display: "flex", alignItems: "center", gap: t(20) }}>
        <Lockup u={u * 1.35} skin={skin} variant={doc.logo === "none" ? "lockup" : doc.logo} />
      </div>
      <div style={{ fontSize: t(42), fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.015em", color: skin.text, maxWidth: centered ? "80%" : "72%", whiteSpace: "pre-wrap" }}>
        {clean(T.headline)}
      </div>
      <Sub ctx={ctx} size={26}>{T.subhead}</Sub>
      {clean(T.url) ? (
        <span style={{ display: "flex", alignItems: "center", gap: t(14), marginTop: t(6) }}>
          <span style={{ width: t(48), height: 2, background: skin.accent, display: "block" }} />
          <Label u={u} color={skin.muted} size={18}>{T.url}</Label>
        </span>
      ) : null}
    </div>
  );
}

function AvatarFrame(ctx: Ctx) {
  const { doc, size, skin, t } = ctx;
  const initials = clean(doc.text.headline);
  const rings = doc.showMarks;
  const markSize = Math.round(size.w * 0.44);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: skin.bg }}>
      {rings ? [0, 1, 2].map((i) => (
        <span key={i} style={{
          position: "absolute", width: size.w * (0.95 - i * 0.17), height: size.w * (0.95 - i * 0.17),
          borderRadius: "50%", border: `1.5px solid ${skin.border}`,
        }} />
      )) : null}
      {initials ? (
        <span style={{ fontFamily: FONT_SANS, fontWeight: 800, fontSize: t(150), letterSpacing: "-0.03em", color: skin.dark ? skin.brandInk : P.viridian600, lineHeight: 1 }}>{initials}</span>
      ) : (
        <Mark size={markSize} stroke={skin.dark ? skin.brandInk : P.viridian600} node={skin.accent} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------- artboard */

export function Artboard({ doc, size }: { doc: Doc; size: CanvasSize }) {
  const skin = skinFor(doc.surface, doc.accent);
  // Type scales with the canvas, but a wide, short canvas is bound by its height —
  // otherwise a 1600×400 banner sets headlines that cannot fit between its margins.
  // Banners carry only four short elements, so the general height bound starves them.
  // They get their own, looser bound; everything else stays on the content-height rule.
  const uWidth = (size.w * 0.85 + size.h * 0.15) / 1080;
  const u = doc.layout === "banner"
    ? Math.min(uWidth, size.h / 430)
    : Math.min(uWidth, size.h / 820);
  const pad = Math.max(20, Math.round(Math.min(size.w, size.h) * 0.089));
  const t = (n: number) => Math.round(n * u);
  const ctx: Ctx = { doc, size, skin, u, pad, t, tall: size.h / size.w >= 1.2, wide: size.w / size.h >= 1.6 };

  const frame: CSSProperties = {
    width: size.w,
    height: size.h,
    background: skin.bg,
    color: skin.text,
    fontFamily: FONT_SANS,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: pad,
    boxSizing: "border-box",
    textAlign: doc.align,
    borderTop: doc.showRule ? `${Math.max(6, t(16))}px solid ${skin.dark ? skin.brandInk : P.viridian600}` : undefined,
  };

  if (doc.layout === "avatar") {
    return <div style={{ ...frame, padding: 0, borderTop: undefined }}><AvatarFrame {...ctx} /></div>;
  }

  return (
    <div style={frame}>
      {doc.showMarks ? <RegMarks pad={pad} skin={skin} w={size.w} h={size.h} /> : null}
      {doc.layout === "thumbnail" ? (
        ThumbnailFrame(ctx)
      ) : doc.layout === "banner" ? (
        BannerFrame(ctx)
      ) : (
        <>
          <Header ctx={ctx} />
          <div style={{
            flex: 1, minHeight: 0, display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: doc.align === "center" ? "center" : "stretch", overflow: "hidden",
          }}>
            <div style={{ width: "100%", maxWidth: doc.align === "center" ? "88%" : undefined }}>{renderBody(ctx)}</div>
          </div>
        </>
      )}
      {/* Thumbnails and banners close themselves — a thumbnail with its own accent rule,
          a banner with the lockup and URL already set in its body. */}
      {doc.showFooter && doc.layout !== "thumbnail" && doc.layout !== "banner" ? <Footer ctx={ctx} /> : null}
    </div>
  );
}

export { Wordmark };
