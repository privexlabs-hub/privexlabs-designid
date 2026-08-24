import type { Metadata } from "next";
import { DoDont, Grid, PageHead, Section, Table } from "@/components/site/ui";
import { containers, motifRules, radiusScale, spacingScale } from "@/lib/brand";

export const metadata: Metadata = { title: "Layout & structure" };

export default function LayoutPage() {
  return (
    <>
      <PageHead
        index="04 / LAYOUT & STRUCTURE"
        title="Structure carried by lines, not shadows"
        lede="The system is architectural. A 1px divider does the work a drop shadow would do elsewhere. Corners are barely rounded, cards sit flat at rest, and the grid is visible in the alignment rather than in decoration."
      />

      <Section index="4.1" title="Spacing — 4px base">
        <Grid min={140}>
          {spacingScale.map((s) => (
            <div key={s.token} className="px-card">
              <div style={{ height: 12, background: "var(--color-brand-primary)", width: s.value, maxWidth: "100%" }} />
              <code style={{ display: "block", marginTop: "var(--space-3)", color: "var(--color-text-muted)" }}>{s.token}</code>
              <code style={{ color: "var(--color-text-secondary)" }}>{s.value}</code>
            </div>
          ))}
        </Grid>
      </Section>

      <Section index="4.2" title="Radius" lede="Minimal rounding throughout. The only pill in the system is a badge.">
        <Table head={["Token", "Value", "Applied to"]} rows={radiusScale.map((r) => [<code key={r.token}>{r.token}</code>, r.value, r.use])} />
      </Section>

      <Section index="4.3" title="Containers and grid">
        <Table head={["Token", "Width", "Used for"]} rows={containers.map((c) => [<code key={c.token}>{c.token}</code>, c.value, c.use])} />
        <div style={{ marginTop: "var(--space-5)" }}>
          <Table
            head={["Property", "Value"]}
            rows={[
              ["Columns", "12"],
              ["Gutter", "24px — var(--grid-gutter)"],
              ["Margin", "32px — var(--grid-margin)"],
              ["Breakpoints", "480 / 768 / 1080 / 1440"],
            ]}
          />
        </div>
      </Section>

      <Section index="4.4" title="Surfaces and elevation" lede="Cards are a 1px border on an elevated surface with a 4px radius and no shadow. Shadow 1 appears on hover only where the card is interactive; shadow 2 is reserved for overlays.">
        <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
            { label: "At rest", style: { border: "1px solid var(--color-border)" } },
            { label: "Interactive hover", style: { border: "1px solid var(--color-border)", boxShadow: "var(--shadow-1)" } },
            { label: "Overlay", style: { border: "1px solid var(--color-border)", boxShadow: "var(--shadow-2)", borderRadius: "var(--radius-3)" } },
          ].map((s) => (
            <div key={s.label} style={{ background: "var(--color-surface-elevated)", borderRadius: "var(--radius-2)", padding: "var(--space-5)", ...s.style }}>
              <span className="px-label">{s.label}</span>
              <p style={{ marginTop: "var(--space-3)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>
                Structure is the border. Elevation is the exception.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="4.5" title="Motifs" lede="A small, fixed vocabulary. These are the only decorative elements the system has, and each one carries meaning.">
        <DoDont dos={motifRules.use} donts={motifRules.avoid} />
      </Section>

      <Section index="4.6" title="Diagrams" lede="Diagrams are part of the identity, not illustrations dropped into it.">
        <Table
          head={["Property", "Specification"]}
          rows={[
            ["Line weight", "1.5px"],
            ["Nodes", "Squares with a 4px radius"],
            ["Connectors", "Orthogonal only — no curves, no diagonals"],
            ["Labels", "IBM Plex Mono, uppercase, muted"],
            ["Active path", "Viridian"],
            ["Signals and annotations", "Brass"],
          ]}
        />
      </Section>

      <Section index="4.7" title="Responsive behaviour">
        <DoDont
          dos={[
            "Stack pillar grids to a single column below 768px",
            "Let dashboard tables scroll horizontally inside their own container",
            "Hold the editorial column at 680px on every viewport",
            "Keep touch targets at 44px",
          ]}
          donts={[
            "Scale a desktop layout down and call it mobile",
            "Hide structural dividers to save vertical space",
            "Let the page body scroll horizontally",
          ]}
        />
      </Section>
    </>
  );
}
