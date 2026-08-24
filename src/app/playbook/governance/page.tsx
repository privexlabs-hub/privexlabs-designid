import type { Metadata } from "next";
import { PageHead, Section, Table } from "@/components/site/ui";
import { governance } from "@/lib/brand";

export const metadata: Metadata = { title: "Governance" };

export default function GovernancePage() {
  return (
    <>
      <PageHead
        index="08 / GOVERNANCE"
        title="What holds the system together"
        lede="A design system fails at the edges — the one-off colour, the exception made under deadline, the second icon set. These are the rules that do not bend, and the check that decides whether a screen ships."
      />

      <Section index="8.1" title="Rules">
        <ol style={{ display: "grid", gap: "var(--space-4)", paddingLeft: 0, listStyle: "none" }}>
          {governance.map((g, i) => (
            <li key={g} style={{ display: "flex", gap: "var(--space-4)", alignItems: "baseline", borderTop: "1px solid var(--color-divider)", paddingTop: "var(--space-4)" }}>
              <span className="px-label" style={{ color: "var(--color-brand-accent-ink)", minWidth: 32 }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ color: i === governance.length - 1 ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: i === governance.length - 1 ? 600 : 400 }}>{g}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section index="8.2" title="Accessibility floor" lede="Not a target. A floor — below this, the work is not finished.">
        <Table
          head={["Requirement", "Standard"]}
          rows={[
            ["Contrast", "WCAG AA for every text-on-surface pair, in both themes"],
            ["Focus", "2px viridian outline at 2px offset, never removed"],
            ["Touch targets", "44px minimum"],
            ["Markup", "Semantic HTML — headings in order, real buttons, labelled inputs"],
            ["Motion", "prefers-reduced-motion honoured globally"],
            ["Language", "lang set correctly for multilingual content"],
          ]}
        />
      </Section>

      <Section index="8.3" title="Changing the system" lede="The system is meant to change. It is not meant to drift.">
        <Table
          head={["Change", "Path"]}
          rows={[
            ["New colour", "Token proposal. It must be justified against the existing ramps and pass AA in both themes."],
            ["New component", "Built from existing tokens, documented with usage and states, added to the component index."],
            ["New template", "Added to the editor's registry as a preset over an existing layout — not as a bespoke design."],
            ["Typeface change", "Swap the self-hosted files and the three family tokens. Nothing else should need to move."],
            ["Exception", "Time-boxed and recorded. An exception that outlives its campaign becomes a token proposal or is removed."],
          ]}
        />
      </Section>

      <Section index="8.4" title="The shipping test">
        <blockquote style={{ margin: 0, padding: "var(--space-7)", background: "var(--color-surface-inverse)", color: "var(--color-text-inverse)", borderRadius: "var(--radius-2)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-editorial-size)", lineHeight: "var(--text-editorial-line)", fontWeight: 500 }}>
            Remove the logo. Is it still recognisably Privex?
          </p>
          <p style={{ marginTop: "var(--space-5)", color: "#A9B4AD", maxWidth: "56ch" }}>
            If the answer is no, strengthen the system — the structure, the type rhythm, the annotation, the diagram.
            Do not decorate the screen.
          </p>
        </blockquote>
      </Section>
    </>
  );
}
