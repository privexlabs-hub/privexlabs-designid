import type { CSSProperties, ReactNode } from "react";
import type { Swatch } from "@/lib/brand";

export function PageHead({ index, title, lede }: { index: string; title: string; lede: string }) {
  return (
    <div style={{ padding: "var(--space-9) 0 var(--space-7)", borderBottom: "1px solid var(--color-divider)" }}>
      <div className="px-container">
        <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{index}</span>
        <h1 style={{ marginTop: "var(--space-4)", maxWidth: "18ch" }}>{title}</h1>
        <p style={{ marginTop: "var(--space-5)", maxWidth: "62ch", fontSize: "var(--text-body-lg-size)", lineHeight: "var(--text-body-lg-line)", color: "var(--color-text-secondary)" }}>
          {lede}
        </p>
      </div>
    </div>
  );
}

export function Section({ index, title, children, lede }: { index?: string; title: string; lede?: string; children: ReactNode }) {
  return (
    <section style={{ padding: "var(--space-8) 0", borderBottom: "1px solid var(--color-divider)" }}>
      <div className="px-container">
        {index ? <span className="px-label">{index}</span> : null}
        <h2 style={{ marginTop: index ? "var(--space-3)" : 0 }}>{title}</h2>
        {lede ? (
          <p style={{ marginTop: "var(--space-4)", maxWidth: "68ch", color: "var(--color-text-secondary)" }}>{lede}</p>
        ) : null}
        <div style={{ marginTop: "var(--space-6)" }}>{children}</div>
      </div>
    </section>
  );
}

export function Grid({ min = 240, children, style }: { min?: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="px-grid" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, ...style }}>
      {children}
    </div>
  );
}

export function SwatchGrid({ swatches }: { swatches: Swatch[] }) {
  return (
    <Grid min={200}>
      {swatches.map((s) => (
        <div key={s.token} className="px-swatch">
          <div className="px-swatch__chip" style={{ background: s.value }} />
          <div className="px-swatch__meta">
            <strong style={{ fontSize: "var(--text-body-sm-size)" }}>{s.name}</strong>
            <code style={{ color: "var(--color-text-muted)" }}>{s.token}</code>
            <code style={{ color: "var(--color-text-secondary)" }}>{s.value}</code>
            {s.note ? <span style={{ fontSize: "var(--text-caption-size)", color: "var(--color-brand-accent-ink)" }}>{s.note}</span> : null}
          </div>
        </div>
      ))}
    </Grid>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div style={{ overflowX: "auto", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2)", background: "var(--color-surface-elevated)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="px-label" style={{ textAlign: "left", padding: "var(--space-3) var(--space-4)", borderBottom: "1px solid var(--color-border)", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} style={{ padding: "var(--space-3) var(--space-4)", borderBottom: "1px solid var(--color-divider)", fontSize: "var(--text-body-sm-size)", verticalAlign: "top" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      <div className="px-card">
        <span className="px-label" style={{ color: "var(--color-success)" }}>Do</span>
        <ul style={{ marginTop: "var(--space-3)", paddingLeft: "var(--space-5)", display: "grid", gap: "var(--space-2)", color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)" }}>
          {dos.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </div>
      <div className="px-card">
        <span className="px-label" style={{ color: "var(--color-danger)" }}>Never</span>
        <ul style={{ marginTop: "var(--space-3)", paddingLeft: "var(--space-5)", display: "grid", gap: "var(--space-2)", color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)" }}>
          {donts.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div style={{ borderLeft: "2px solid var(--color-brand-accent)", padding: "var(--space-3) var(--space-4)", background: "var(--color-surface-elevated)", color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)" }}>
      {children}
    </div>
  );
}
