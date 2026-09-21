import Link from "next/link";
import { Grid, Section } from "@/components/site/ui";
import { areas, company } from "@/lib/brand";
import { TEMPLATES, TEMPLATES_BY_CATEGORY } from "@/lib/templates";

const SECTIONS = [
  { href: "/playbook/company", index: "00", title: "Company", blurb: "Who PrivexLabs is: the six areas of work, the problem-first approach, principles and positioning." },
  { href: "/playbook/logo", index: "01", title: "Logo & mark", blurb: "The boundary square, the signal trace, the brass node. Clear space, minimums, and the six things that are never done to it." },
  { href: "/playbook/color", index: "02", title: "Color", blurb: "Mineral & Signal — viridian as the owned hue, green-cast paper neutrals, brass as the single accent." },
  { href: "/playbook/type", index: "03", title: "Typography", blurb: "Archivo, Newsreader and IBM Plex Mono. Thirteen steps, sentence case, ALL-CAPS only in mono annotations." },
  { href: "/playbook/layout", index: "04", title: "Layout & structure", blurb: "Hairline architecture. 12 columns, four containers, 2–4px corners, no shadow at rest." },
  { href: "/playbook/motion", index: "05", title: "Motion", blurb: "120 / 200 / 320ms. Fades and short translates. Data-flow lines in diagrams only." },
  { href: "/playbook/voice", index: "06", title: "Voice & content", blurb: "Calm, evidence-led, no hype. The six-part structure, the banned list, and worked examples." },
  { href: "/playbook/social", index: "07", title: "Social system", blurb: "One visual grammar across platforms, recognisable with the logo removed. Category treatments and the content lifecycle." },
  { href: "/playbook/governance", index: "08", title: "Governance", blurb: "Token discipline, accessibility floor, responsive rules, and the test before shipping." },
  { href: "/playbook/components", index: "09", title: "Components", blurb: "The live library — 21 components across core, forms, data, navigation and the Privex-specific set." },
  { href: "/brand-brief", index: "10", title: "Brand brief", blurb: "The whole brand as one copy-pasteable document — for briefing a writer, an agency, or an external AI tool." },
  { href: "/assets", index: "11", title: "Assets", blurb: "Every identity file — logos, marks, wordmarks, favicons and avatars — individually or as one zip." },
];

export default function HomePage() {
  return (
    <>
      <section style={{ background: "var(--color-foundation)", color: "var(--color-text-inverse)", padding: "var(--space-10) 0" }} data-theme="dark">
        <div className="px-container">
          <span className="px-label" style={{ color: "var(--color-brand-accent)" }}>PRIVEXLABS · BRAND KIT</span>
          <h1 style={{ marginTop: "var(--space-5)", fontSize: "var(--text-display-size)", lineHeight: "var(--text-display-line)", letterSpacing: "var(--text-display-tracking)", color: "#E9EDE8", maxWidth: "20ch" }}>
            One system, applied everywhere.
          </h1>
          <p style={{ marginTop: "var(--space-5)", maxWidth: "60ch", fontSize: "var(--text-body-lg-size)", lineHeight: "var(--text-body-lg-line)", color: "#A9B4AD" }}>
            The identity playbook for PrivexLabs, and an editor that produces every published
            asset from it — {TEMPLATES.length} templates across {TEMPLATES_BY_CATEGORY.length} formats,
            exportable as PNG, JPEG, WebP, SVG or PDF, one at a time or all at once.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-7)", flexWrap: "wrap" }}>
            <Link className="px-btn" href="/editor" style={{ background: "#3FA98D", color: "#070B09" }}>Open the editor</Link>
            <Link className="px-btn px-btn--secondary" href="/playbook/logo" style={{ background: "transparent", color: "#E9EDE8", borderColor: "#3A463F" }}>Read the playbook</Link>
            <Link className="px-btn px-btn--secondary" href="/assets" style={{ background: "transparent", color: "#E9EDE8", borderColor: "#3A463F" }}>Download assets</Link>
          </div>
        </div>
      </section>

      <Section index="00 / COMPANY" title={company.lead} lede={company.definition}>
        <Link className="px-btn px-btn--secondary" href="/playbook/company">Read the company page</Link>
      </Section>

      <Section index="00 / ARCHITECTURE" title="Six areas of work, one system" lede="Areas are told apart by treatment — surface, typeface emphasis, density — never by a separate palette or a separate logo.">
        <Grid min={280}>
          {areas.map((a) => (
            <div key={a.id} className="px-card">
              <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{a.eyebrow}</span>
              <h3 style={{ marginTop: "var(--space-3)" }}>{a.name}</h3>
              <p style={{ marginTop: "var(--space-2)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>{a.intro}</p>
              <p style={{ marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-divider)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-muted)" }}>{a.treatment}</p>
            </div>
          ))}
        </Grid>
      </Section>

      <Section index="00 / CONTENTS" title="The playbook" lede={`${SECTIONS.length} sections. Each one states the rule, shows the specimen, and lists what is never done.`}>
        <Grid min={300}>
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="px-card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{s.index}</span>
              <h3 style={{ marginTop: "var(--space-3)" }}>{s.title}</h3>
              <p style={{ marginTop: "var(--space-2)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>{s.blurb}</p>
            </Link>
          ))}
        </Grid>
      </Section>

      <Section index="00 / EDITOR" title="Every format, from the same system" lede="Pick a template, edit the copy, switch surface, accent, size and lockup, then export. Nothing in the editor can produce an off-brand result — the controls only expose choices the system allows.">
        <Grid min={260}>
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
    </>
  );
}
