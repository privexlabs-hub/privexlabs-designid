import type { Metadata } from "next";
import { DoDont, Note, PageHead, Section, Table } from "@/components/site/ui";
import { casingRules, discipline, philosophy, typeScale, typefaces } from "@/lib/brand";
import { FONT_MONO, FONT_SANS, FONT_SERIF } from "@/lib/palette";

export const metadata: Metadata = { title: "Typography" };

const FAMILY_STYLE = { sans: FONT_SANS, serif: FONT_SERIF, mono: FONT_MONO } as const;

/** How each family is set on this page. The families themselves live in brand.ts. */
const SPECIMEN: Record<string, { family: string; sample: string }> = {
  "Archivo": { family: FONT_SANS, sample: "Build. Deploy. Own AI." },
  "Newsreader": { family: FONT_SERIF, sample: "What we tested, and what we measured" },
  "IBM Plex Mono": { family: FONT_MONO, sample: "03 / AI MODELS · PXR-2026-07" },
};

export default function TypePage() {
  return (
    <>
      <PageHead
        index="03 / TYPOGRAPHY"
        title="Three families, one rhythm"
        lede={philosophy.type}
      />

      <Section index="3.1" title="Families">
        <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {typefaces.map((t) => ({ ...t, ...SPECIMEN[t.name] })).map((f) => (
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
            open families chosen for technical credibility and wide Latin coverage. They are
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
                {t.name === "Label" ? "01 / AI ENGINEERING" : t.name === "Data" ? "0.91" : t.name === "Code" ? "evaluate --set PXR-2026-07 --blind" : "We tested six. Two were usable."}
              </div>
              <p style={{ fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)", maxWidth: "68ch" }}>{t.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section index="3.3" title="Casing">
        <Table
          head={["Context", "Casing"]}
          rows={casingRules.map((r) => [...r])}
        />
      </Section>

      <Section index="3.4" title="Discipline">
        <DoDont dos={discipline.type.dos} donts={discipline.type.donts} />
      </Section>
    </>
  );
}
