import type { Metadata } from "next";
import { DoDont, Grid, PageHead, Section } from "@/components/site/ui";
import { voiceRules } from "@/lib/brand";

export const metadata: Metadata = { title: "Voice & content" };

export default function VoicePage() {
  return (
    <>
      <PageHead
        index="06 / VOICE & CONTENT"
        title="Written by engineers, edited like a publication"
        lede="The voice is calm, precise and evidence-led. It states what was tested, what worked and where it failed. Confidence comes from the measurement, never from the adjective."
      />

      <Section index="6.1" title="Tone">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
          {voiceRules.tone.map((t) => (
            <span key={t} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-round)", padding: "6px 14px", fontSize: "var(--text-body-sm-size)", background: "var(--color-surface-elevated)" }}>{t}</span>
          ))}
        </div>
      </Section>

      <Section index="6.2" title="Structure" lede="Long-form and short-form both follow the same order. If a piece cannot fill these six, it is not ready to publish.">
        <ol style={{ display: "grid", gap: "var(--space-3)", paddingLeft: 0, listStyle: "none", counterReset: "step" }}>
          {voiceRules.structure.map((s, i) => (
            <li key={s} style={{ display: "flex", gap: "var(--space-4)", alignItems: "baseline", borderTop: "1px solid var(--color-divider)", paddingTop: "var(--space-3)" }}>
              <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontWeight: 600 }}>{s}</span>
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
        <DoDont
          dos={[
            "Name the number, the sample size and the method",
            "Say where the approach fails as plainly as where it works",
            "Use sentence case in every headline, button and nav item",
            "Cut any sentence that would survive unchanged on a competitor's site",
          ]}
          donts={voiceRules.banned}
        />
      </Section>
    </>
  );
}
