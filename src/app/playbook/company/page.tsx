import type { Metadata } from "next";
import { Grid, Note, PageHead, Section } from "@/components/site/ui";
import {
  APPROACH, DIFFERENTIATORS, POSITIONING_FLOW, POSITIONING_INTERSECTION, PRINCIPLES,
  TARGET_INDUSTRIES, TRAINING_TRACKS, VALUE_QUESTIONS, areas, company, includeInternal,
  products, sectionById, taglines, type DocBlock,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: "Company",
  description: company.definition,
};

const muted = { color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)" } as const;
const mono = { fontFamily: "var(--font-mono)", fontSize: "var(--text-caption-size)", letterSpacing: "0.06em" } as const;

/** The company document's own blocks, rendered as written. */
function DocBlocks({ blocks }: { blocks: readonly DocBlock[] }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-3)" }}>
      {blocks.map((b, i) => {
        const internal = b.internal ? <span className="px-label" style={{ color: "var(--color-danger)" }}>Internal — do not quote</span> : null;
        switch (b.kind) {
          case "p": return <div key={i}>{internal}<p style={{ maxWidth: "68ch" }}>{b.text}</p></div>;
          case "list": return <ul key={i} style={{ paddingLeft: "var(--space-5)", display: "grid", gap: 2, ...muted }}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
          case "numbered": return <ol key={i} style={{ paddingLeft: "var(--space-5)", display: "grid", gap: "var(--space-2)" }}>{b.items.map((it) => <li key={it}>{it}</li>)}</ol>;
          case "flow": return <p key={i} style={mono}>{b.steps.join(` ${b.arrow} `)}</p>;
          case "sub": return (
            <div key={i} style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "var(--space-3)" }}>
              {internal}
              <h4>{b.title}</h4>
              <div style={{ marginTop: "var(--space-2)" }}><DocBlocks blocks={b.blocks} /></div>
            </div>
          );
        }
      })}
    </div>
  );
}

function DocSectionBody({ id }: { id: string }) {
  const s = sectionById(id);
  if (!s) return null;
  return <DocBlocks blocks={s.blocks} />;
}

export default function CompanyPage() {
  return (
    <>
      <PageHead index="00 / COMPANY" title={company.lead} lede={company.definition} />

      <Section index="0.1" title="Who we are" lede={company.overview}>
        <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {(["overview", "vision", "mission"] as const).map((id) => (
            <div key={id} className="px-card">
              <span className="px-label">{sectionById(id)?.title}</span>
              <div style={{ marginTop: "var(--space-3)" }}><DocSectionBody id={id} /></div>
            </div>
          ))}
        </div>
      </Section>

      <Section index="0.2" title="Six areas of work" lede="PrivexLabs operates across several connected areas. Each has its own category label and visual treatment; all of them share one system.">
        <Grid min={320}>
          {areas.map((a) => (
            <div key={a.id} className="px-card" style={{ display: "grid", gap: "var(--space-3)", alignContent: "start" }}>
              <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{a.eyebrow}</span>
              <h3>{a.name}</h3>
              <p style={muted}>{a.intro}</p>
              {a.id === "training" ? (
                <div style={{ display: "grid", gap: "var(--space-2)" }}>
                  {TRAINING_TRACKS.map((t) => (
                    <div key={t.title}>
                      <strong style={{ fontSize: "var(--text-body-sm-size)" }}>{t.title}</strong>
                      <p style={{ ...muted, marginTop: 2 }}>{t.topics.join(" · ")}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul style={{ paddingLeft: "var(--space-5)", display: "grid", gap: 2, ...muted }}>
                  {a.capabilities.map((c) => <li key={c}>{c}</li>)}
                </ul>
              )}
              {a.closing.map((c) => <p key={c} style={{ fontSize: "var(--text-body-sm-size)" }}>{c}</p>)}
              <p style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "var(--space-3)", fontSize: "var(--text-caption-size)", color: "var(--color-text-muted)" }}>
                Treatment: {a.treatment}
              </p>
            </div>
          ))}
        </Grid>
      </Section>

      <Section index="0.3" title="How we work" lede="PrivexLabs follows a problem-first approach.">
        <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {APPROACH.map((s) => (
            <div key={s.step} className="px-card">
              <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>Step {s.step}</span>
              <h4 style={{ marginTop: "var(--space-2)" }}>{s.name}</h4>
              {s.text.map((t) => <p key={t} style={{ ...muted, marginTop: "var(--space-2)" }}>{t}</p>)}
              {s.options ? <p style={{ ...mono, marginTop: "var(--space-2)" }}>{s.options.join(" · ")}</p> : null}
            </div>
          ))}
        </div>
        <div className="px-card" style={{ marginTop: "var(--space-5)" }}>
          <span className="px-label">Where PrivexLabs sits</span>
          <p style={{ marginTop: "var(--space-3)", fontWeight: 600 }}>{POSITIONING_INTERSECTION}</p>
          <p style={{ ...mono, marginTop: "var(--space-3)" }}>{POSITIONING_FLOW.join(" → ")}</p>
        </div>
      </Section>

      <Section index="0.4" title="Principles">
        <Grid min={280}>
          {PRINCIPLES.map((pr) => (
            <div key={pr.title} className="px-card">
              <h4>{pr.title}</h4>
              <p style={{ ...muted, marginTop: "var(--space-2)" }}>{pr.text}</p>
            </div>
          ))}
        </Grid>
      </Section>

      <Section index="0.5" title="Why PrivexLabs" lede="PrivexLabs helps businesses answer five important questions.">
        <ol style={{ paddingLeft: "var(--space-5)", display: "grid", gap: "var(--space-2)", maxWidth: "72ch" }}>
          {VALUE_QUESTIONS.map((q) => <li key={q}>{q}</li>)}
        </ol>
        <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: "var(--space-6)" }}>
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title} className="px-card">
              <h4>{d.title}</h4>
              <p style={{ ...muted, marginTop: "var(--space-2)" }}>{d.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="0.6" title="Customers" lede="Organizations with significant data, repetitive workflows, specialized knowledge, or operational processes that can benefit from intelligent automation.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
          {TARGET_INDUSTRIES.map((t) => (
            <span key={t} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-1)", padding: "6px 12px", fontSize: "var(--text-body-sm-size)", background: "var(--color-surface-elevated)" }}>{t}</span>
          ))}
        </div>
        {includeInternal ? (
          <div style={{ marginTop: "var(--space-5)" }}><DocSectionBody id="customers" /></div>
        ) : null}
      </Section>

      <Section index="0.7" title="Positioning" lede={`Lead line: ${taglines.lead}`}>
        <DocSectionBody id="brand-positioning" />
        {includeInternal ? (
          <div style={{ marginTop: "var(--space-5)" }}>
            <span className="px-label" style={{ color: "var(--color-danger)" }}>Internal — candidate taglines, not in use</span>
            <ul style={{ paddingLeft: "var(--space-5)", marginTop: "var(--space-2)", ...muted }}>
              {taglines.candidates.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ) : null}
      </Section>

      <Section index="0.8" title="Products" lede="Client work that repeats across customers becomes reusable technology. PrivexBot is one of the products from PrivexLabs.">
        {products.map((pr) => (
          <div key={pr.name} className="px-card" style={{ maxWidth: 640 }}>
            <h3>{pr.name}</h3>
            <p style={{ ...muted, marginTop: "var(--space-2)" }}>{pr.summary}</p>
            <ul style={{ paddingLeft: "var(--space-5)", marginTop: "var(--space-3)", display: "grid", gap: 2, ...muted }}>
              {pr.capabilities.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      {includeInternal ? (
        <Section index="0.9" title="Strategy" lede="Business model, product strategy, long-term advantage, R&D and direction.">
          <Note>Internal — do not quote in published copy. This section exists only in the internal build.</Note>
          <div style={{ display: "grid", gap: "var(--space-6)", marginTop: "var(--space-5)" }}>
            {(["business-model", "product-strategy", "advantage", "rd", "direction"] as const).map((id) => {
              const s = sectionById(id);
              return s ? (
                <div key={id}>
                  <h3>{s.title}</h3>
                  <div style={{ marginTop: "var(--space-3)" }}><DocBlocks blocks={s.blocks} /></div>
                </div>
              ) : null;
            })}
          </div>
        </Section>
      ) : null}
    </>
  );
}
