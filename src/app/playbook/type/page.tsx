import type { Metadata } from "next";
import { DoDont, Note, PageHead, Section, Table } from "@/components/site/ui";
import { typeScale } from "@/lib/brand";
import { FONT_MONO, FONT_SANS, FONT_SERIF } from "@/lib/palette";

export const metadata: Metadata = { title: "Typography" };

const FAMILY_STYLE = { sans: FONT_SANS, serif: FONT_SERIF, mono: FONT_MONO } as const;

export default function TypePage() {
  return (
    <>
      <PageHead
        index="03 / TYPOGRAPHY"
        title="Three families, one rhythm"
        lede="Archivo carries the interface and the headlines. Newsreader is the editorial voice of the Knowledge pillar and nothing else. IBM Plex Mono handles code, data and every annotation. The recurring rhythm is a mono uppercase label, an Archivo headline, and generous space beneath."
      />

      <Section index="3.1" title="Families">
        <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {[
            { name: "Archivo", family: FONT_SANS, role: "UI and headings", sample: "Private AI, built on your data", detail: "Grotesque, technical, wide Latin coverage. Weights 400–800." },
            { name: "Newsreader", family: FONT_SERIF, role: "Editorial — Knowledge only", sample: "What we tested, and where it failed", detail: "Research titles, pull quotes, long-form. Weights 400–600 plus italics." },
            { name: "IBM Plex Mono", family: FONT_MONO, role: "Code, data, labels", sample: "01 / RESEARCH · MODEL v2.3", detail: "Annotations, tabular figures, code. Weights 400–600." },
          ].map((f) => (
            <div key={f.name} className="px-card">
              <span className="px-label">{f.role}</span>
              <div style={{ fontFamily: f.family, fontSize: 30, lineHeight: 1.2, marginTop: "var(--space-4)", fontWeight: 600 }}>{f.name}</div>
              <div style={{ fontFamily: f.family, fontSize: 20, lineHeight: 1.35, marginTop: "var(--space-3)", color: "var(--color-text-secondary)" }}>{f.sample}</div>
              <p style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-divider)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-muted)" }}>{f.detail}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "var(--space-5)" }}>
          <Note>
            These are substitutions. No proprietary font files were supplied, so the system standardises on three
            open families chosen for technical credibility and wide Latin coverage for African languages. They are
            self-hosted as woff2 under <code>/fonts</code> — which is also what lets the editor embed them into exported images.
            If PrivexLabs licenses typefaces, this layer swaps in place.
          </Note>
        </div>
      </Section>

      <Section index="3.2" title="Scale" lede="Thirteen steps. Display is capped at 56px — restraint is part of the voice.">
        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          {typeScale.map((t) => (
            <div key={t.name} style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "var(--space-4)", display: "grid", gap: "var(--space-3)" }}>
              <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", alignItems: "baseline" }}>
                <span className="px-label" style={{ minWidth: 110 }}>{t.name}</span>
                <code style={{ color: "var(--color-text-muted)" }}>{t.size} · {t.line}{t.tracking ? ` · ${t.tracking}` : ""}{t.weight ? ` · ${t.weight}` : ""}</code>
              </div>
              <div style={{
                fontFamily: FAMILY_STYLE[t.family],
                fontSize: `clamp(18px, ${parseFloat(t.size)}${t.size.includes("rem") ? "rem" : "px"}, 56px)`,
                lineHeight: Number(t.line),
                letterSpacing: t.tracking?.replace("−", "-"),
                fontWeight: t.weight ? Number(t.weight) : 400,
                textTransform: t.name === "Label" ? "uppercase" : undefined,
              }}>
                {t.name === "Label" ? "01 / RESEARCH" : t.name === "Data" ? "99.97%" : t.name === "Code" ? "privex deploy --region ke-1" : "We tested six. Two were usable."}
              </div>
              <p style={{ fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)", maxWidth: "68ch" }}>{t.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="3.3" title="Casing">
        <Table
          head={["Context", "Casing"]}
          rows={[
            ["Headlines, subheads, body", "Sentence case"],
            ["Buttons and navigation", "Sentence case"],
            ["Mono annotations and index labels", "ALL-CAPS — the only place it is permitted"],
            ["Product and model names", "As registered — PrivexBot Docs, MODEL v2.3"],
          ]}
        />
      </Section>

      <Section index="3.4" title="Discipline">
        <DoDont
          dos={[
            "Lead Knowledge pages with Newsreader; keep product and infrastructure to Archivo and Plex Mono",
            "Use tabular figures for anything in a column",
            "Keep the editorial column at 680px regardless of viewport",
            "Set headlines at two lines or fewer",
          ]}
          donts={[
            "Title Case anything",
            "Use Newsreader outside the Knowledge pillar",
            "Exceed 56px display type",
            "Mix a fourth family in, including icon fonts",
            "Use emoji as typographic ornament",
          ]}
        />
      </Section>
    </>
  );
}
