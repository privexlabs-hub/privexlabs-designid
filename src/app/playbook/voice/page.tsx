import type { Metadata } from "next";
import Link from "next/link";
import { DoDont, Grid, Note, PageHead, Section } from "@/components/site/ui";
import { discipline, philosophy, voiceRules } from "@/lib/brand";

export const metadata: Metadata = { title: "Voice & content" };

export default function VoicePage() {
  return (
    <>
      <PageHead
        index="06 / VOICE & CONTENT"
        title="Written by engineers, edited like a publication"
        lede={philosophy.voice}
      />

      <Section index="6.1" title="Tone">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
          {voiceRules.tone.map((t) => (
            <span key={t} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-round)", padding: "6px 14px", fontSize: "var(--text-body-sm-size)", background: "var(--color-surface-elevated)" }}>{t}</span>
          ))}
        </div>
      </Section>

      <Section index="6.2" title="Structure" lede="Long-form and short-form both follow the same order, and each step answers one step of how the work was done. If a piece cannot fill all six, it is not ready to publish.">
        <ol style={{ display: "grid", gap: "var(--space-3)", paddingLeft: 0, listStyle: "none", counterReset: "step" }}>
          {voiceRules.structure.map((s, i) => (
            <li key={s.step} style={{ display: "flex", gap: "var(--space-4)", alignItems: "baseline", borderTop: "1px solid var(--color-divider)", paddingTop: "var(--space-3)", flexWrap: "wrap" }}>
              <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontWeight: 600 }}>{s.step}</span>
              <span className="px-label" style={{ marginLeft: "auto" }}>Approach · {s.approach}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="6.3" title="Worked examples" lede="The difference is not politeness. It is whether the sentence contains a fact.">
        <Grid min={340}>
          {voiceRules.examples.map((e) => (
            <div key={e.label} className="px-card">
              <span className="px-label">{e.label}</span>
              <p style={{ marginTop: "var(--space-4)", fontSize: "var(--text-body-lg-size)", lineHeight: 1.5, borderLeft: "2px solid var(--color-success)", paddingLeft: "var(--space-4)" }}>{e.good}</p>
              <p style={{ marginTop: "var(--space-4)", fontSize: "var(--text-body-sm-size)", lineHeight: 1.5, color: "var(--color-text-muted)", borderLeft: "2px solid var(--color-danger)", paddingLeft: "var(--space-4)", textDecoration: "line-through", textDecorationColor: "var(--color-border)" }}>{e.bad}</p>
            </div>
          ))}
        </Grid>
      </Section>

      <Section index="6.4" title="Person">
        <ul style={{ display: "grid", gap: "var(--space-2)", paddingLeft: "var(--space-5)", color: "var(--color-text-secondary)" }}>
          {voiceRules.person.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </Section>

      <Section index="6.5" title="Discipline">
        <DoDont dos={discipline.voice.dos} donts={discipline.voice.donts} />
      </Section>

      <Section index="6.6" title="Taking this elsewhere">
        <Note>
          Everything on this page, plus the company document, the areas of work, the content lifecycle, the template
          catalogue and the visual rules, is assembled as one copy-pasteable document on the{" "}
          <Link href="/brand-brief">brand brief</Link> — for briefing a writer, an agency, or an
          external AI tool.
        </Note>
      </Section>
    </>
  );
}
