import type { Metadata } from "next";
import Image from "next/image";
import { DoDont, Grid, Note, PageHead, Section, Table } from "@/components/site/ui";
import { Mark } from "@/components/canvas/primitives";
import { discipline, logoRules, logoSpecs, logoVariants, philosophy } from "@/lib/brand";
import { P } from "@/lib/palette";

export const metadata: Metadata = { title: "Logo & mark" };

/** How each supplied file is displayed here. The file list itself lives in brand.ts. */
const RENDER: Record<string, { file: string; bg: string; w: number }> = {
  "logo.svg": { file: "/brand/logo.svg", bg: "var(--color-surface-elevated)", w: 244 },
  "logo-dark.svg": { file: "/brand/logo-dark.svg", bg: P.foundation, w: 244 },
  "logo-mono.svg": { file: "/brand/logo-mono.svg", bg: "var(--color-surface-muted)", w: 244 },
  "mark.svg": { file: "/brand/mark.svg", bg: "var(--color-surface-elevated)", w: 64 },
  "mark-dark.svg": { file: "/brand/mark-dark.svg", bg: P.foundation, w: 64 },
  "mark-mono.svg": { file: "/brand/mark-mono.svg", bg: "var(--color-surface-muted)", w: 64 },
  "favicon.svg": { file: "/brand/favicon.svg", bg: "var(--color-surface-muted)", w: 56 },
  "avatar.svg": { file: "/brand/avatar.svg", bg: "var(--color-surface-muted)", w: 64 },
};

const VARIANTS = logoVariants.map((v) => ({ ...v, ...RENDER[v.name] }));

export default function LogoPage() {
  return (
    <>
      <PageHead
        index="01 / LOGO & MARK"
        title="One mark, shared by every area of work"
        lede={philosophy.logo}
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
          rows={logoSpecs.map((r) => [...r])}
        />
      </Section>

      <Section index="1.4" title="What is never done">
        <DoDont dos={discipline.logo.dos} donts={discipline.logo.donts} />
      </Section>
    </>
  );
}
