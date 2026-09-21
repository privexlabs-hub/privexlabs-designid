import type { Metadata } from "next";
import { PageHead, Section, Table } from "@/components/site/ui";
import { accessibilityFloor, changePaths, governance, philosophy } from "@/lib/brand";

export const metadata: Metadata = { title: "Governance" };

export default function GovernancePage() {
  return (
    <>
      <PageHead
        index="08 / GOVERNANCE"
        title="What holds the system together"
        lede={philosophy.governance}
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
          rows={accessibilityFloor.map((r) => [...r])}
        />
      </Section>

      <Section index="8.3" title="Changing the system" lede="The system is meant to change. It is not meant to drift.">
        <Table
          head={["Change", "Path"]}
          rows={changePaths.map((r) => [...r])}
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
