import type { Metadata } from "next";
import Image from "next/image";
import { DoDont, Grid, Note, PageHead, Section, Table } from "@/components/site/ui";
import { Mark } from "@/components/canvas/primitives";
import { logoRules } from "@/lib/brand";
import { P } from "@/lib/palette";

export const metadata: Metadata = { title: "Logo & mark" };

const VARIANTS = [
  { file: "/brand/logo.svg", name: "logo.svg", use: "Horizontal lockup, light backgrounds", bg: "var(--color-surface-elevated)", w: 244 },
  { file: "/brand/logo-dark.svg", name: "logo-dark.svg", use: "Horizontal lockup, dark backgrounds", bg: P.foundation, w: 244 },
  { file: "/brand/logo-mono.svg", name: "logo-mono.svg", use: "Single colour — print, engraving, watermark", bg: "var(--color-surface-muted)", w: 244 },
  { file: "/brand/mark.svg", name: "mark.svg", use: "Icon only, light backgrounds", bg: "var(--color-surface-elevated)", w: 64 },
  { file: "/brand/mark-dark.svg", name: "mark-dark.svg", use: "Icon only, dark backgrounds", bg: P.foundation, w: 64 },
  { file: "/brand/favicon.svg", name: "favicon.svg", use: "Filled tile at 24px and below", bg: "var(--color-surface-muted)", w: 56 },
];

export default function LogoPage() {
  return (
    <>
      <PageHead
        index="01 / LOGO & MARK"
        title="One mark, shared by every pillar"
        lede="A rounded boundary square holds an orthogonal trace that terminates in a brass node — the private boundary, the signal path, the signal terminal. It is drawn in the system's own diagram language, so it belongs to the same grammar as every chart and schematic we publish."
      />

      <Section index="1.1" title="Construction" lede="Pure geometry on a 48-unit grid. 3-unit strokes, 9-unit corner radius, a 6-unit brass node seated on the trace. The mark is never redrawn or re-traced — it is used as supplied.">
        <div style={{ display: "flex", gap: "var(--space-8)", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", padding: "var(--space-7)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2)", background: "var(--color-surface-elevated)" }}>
            <Mark size={200} stroke={P.viridian600} node={P.brass500} />
          </div>
          <div style={{ display: "grid", gap: "var(--space-4)", maxWidth: "46ch" }}>
            <div><span className="px-label">Boundary square</span><p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)" }}>The perimeter your data does not cross.</p></div>
            <div><span className="px-label">Signal trace</span><p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)" }}>An orthogonal path — the same line language as our system diagrams.</p></div>
            <div><span className="px-label">Brass node</span><p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)" }}>The terminal. The single accent in the identity, and the unit that defines clear space.</p></div>
          </div>
        </div>
      </Section>

      <Section index="1.2" title="Variations" lede="Eight supplied files cover every surface. There is no ninth — if a context is not covered here, it is a token or layout problem, not a new logo.">
        <Grid min={280}>
          {VARIANTS.map((v) => (
            <div key={v.name} className="px-swatch">
              <div style={{ background: v.bg, padding: "var(--space-6)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 132 }}>
                <Image src={v.file} alt={v.name} width={v.w} height={Math.round(v.w * (v.w === 244 ? 48 / 244 : 1))} style={{ maxWidth: "100%", height: "auto" }} />
              </div>
              <div className="px-swatch__meta">
                <code>{v.name}</code>
                <span style={{ fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)" }}>{v.use}</span>
              </div>
            </div>
          ))}
        </Grid>
        <div style={{ marginTop: "var(--space-5)" }}>
          <Note>
            <code>logo-mono.svg</code>, <code>mark-mono.svg</code> and <code>wordmark-mono.svg</code> draw with <code>currentColor</code>.
            Set the colour on the parent element; never hardcode a hex into the file.
          </Note>
        </div>
      </Section>

      <Section index="1.3" title="Clear space and minimums">
        <Table
          head={["Rule", "Value"]}
          rows={[
            ["Clear space", logoRules.clearSpace],
            ["Minimum mark", "20px — below this, use the filled favicon tile"],
            ["Minimum lockup", "96px wide"],
            ["Lockup text", "Live SVG text in Archivo. Outline the text for contexts where Archivo is not loaded."],
            ["Pillar lockups", "Wordmark plus a mono pillar label. Never a separate symbol."],
          ]}
        />
      </Section>

      <Section index="1.4" title="What is never done">
        <DoDont
          dos={[
            "Use the supplied file for the surface you are on",
            "Give the mark its full clear space, even in tight headers",
            "Switch to the favicon tile below 20px",
            "Set colour on mono variants through currentColor",
          ]}
          donts={logoRules.never}
        />
      </Section>
    </>
  );
}
