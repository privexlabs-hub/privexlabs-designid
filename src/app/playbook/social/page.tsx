import type { Metadata } from "next";
import Link from "next/link";
import { Grid, Note, PageHead, Section, Table } from "@/components/site/ui";
import {
  categoryTreatments, contentMetadata, contentStatuses, lifecycle,
  philosophy, repurposingMap, socialGrammar, sourceRule,
} from "@/lib/brand";
import { TEMPLATES, TEMPLATES_BY_CATEGORY } from "@/lib/templates";

export const metadata: Metadata = { title: "Social system" };

export default function SocialPage() {
  return (
    <>
      <PageHead
        index="07 / SOCIAL SYSTEM"
        title="Recognisable with the logo removed"
        lede={philosophy.social}
      />

      <Section index="7.1" title="The grammar" lede="Four elements, in this order, on every published asset.">
        <Table
          head={["Element", "Rule"]}
          rows={socialGrammar.map((r) => [...r])}
        />
      </Section>

      <Section index="7.2" title="Category treatments" lede="Categories are differentiated by surface and typographic emphasis, never by a new colour.">
        <Table head={["Category", "Treatment"]} rows={categoryTreatments.map((r) => [...r])} />
      </Section>

      <Section index="7.3" title="Formats" lede={`${TEMPLATES.length} templates are built into the editor, grouped by placement. Every one of them is produced from the tokens on this site — nothing is drawn by hand.`}>
        <Grid min={240}>
          {TEMPLATES_BY_CATEGORY.map(({ category, templates }) => (
            <Link key={category.id} href={`/editor?category=${category.id}`} className="px-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)" }}>
                <h4>{category.name}</h4>
                <span className="px-label">{String(templates.length).padStart(2, "0")}</span>
              </div>
              <p style={{ marginTop: "var(--space-2)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>{category.blurb}</p>
            </Link>
          ))}
        </Grid>
      </Section>

      <Section index="7.4" title="Content lifecycle" lede="Every piece moves through this sequence. Brand review sits before design, so nothing is styled that has not been approved on substance.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
          {lifecycle.map((s, i) => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-size)", letterSpacing: "0.06em", border: "1px solid var(--color-border)", borderRadius: "var(--radius-1)", padding: "6px 10px", background: "var(--color-surface-elevated)" }}>
              <span style={{ width: 6, height: 6, background: i === 5 ? "var(--color-brand-accent)" : "var(--color-border-strong)" }} />
              {s}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "var(--space-6)" }}>
          <span className="px-label">Statuses</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
            {contentStatuses.map((s) => (
              <code key={s} style={{ border: "1px solid var(--color-divider)", padding: "4px 8px", borderRadius: "var(--radius-1)", color: "var(--color-text-secondary)" }}>{s}</code>
            ))}
          </div>
        </div>
      </Section>

      <Section index="7.5" title="Metadata per piece">
        <Table
          head={["Field", "Example"]}
          rows={contentMetadata.map((r) => [...r])}
        />
        <div style={{ marginTop: "var(--space-5)" }}>
          <Note>{sourceRule}</Note>
        </div>
      </Section>

      <Section index="7.6" title="Repurposing" lede="One serious source becomes nine artefacts. The editor covers every one of them.">
        <Table
          head={["Step", "Artefact", "Template"]}
          rows={repurposingMap.map((r) => [r.step, r.artefact, r.template])}
        />
      </Section>
    </>
  );
}
