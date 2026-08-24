"use client";

/**
 * The PrivexLabs Design System component library, ported from the source project's
 * `components/` folder to typed React. Behaviour and token usage are unchanged; the
 * runtime <style> injection was replaced with `src/styles/ds.css`, and class names
 * carry a `pxds-` prefix so they do not collide with this site's own chrome.
 */

import React, { useState, type CSSProperties, type ReactNode } from "react";

/* ------------------------------------------------------------------- core */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export function Button({
  variant = "primary", size = "md", className = "", children, ...rest
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string; children?: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`pxds-btn pxds-btn--${variant} pxds-btn--${size} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}

export type BadgeTone = "neutral" | "brand" | "accent" | "success" | "warning" | "danger" | "info";

const BADGE_TONES: Record<BadgeTone, [string, string, string]> = {
  neutral: ["var(--color-text-secondary)", "var(--color-border)", "transparent"],
  brand: ["var(--color-brand-primary)", "var(--viridian-300)", "transparent"],
  accent: ["var(--color-brand-accent-ink)", "var(--brass-300)", "transparent"],
  success: ["var(--color-success)", "transparent", "var(--color-success-surface)"],
  warning: ["var(--color-warning)", "transparent", "var(--color-warning-surface)"],
  danger: ["var(--color-danger)", "transparent", "var(--color-danger-surface)"],
  info: ["var(--color-info)", "transparent", "var(--color-info-surface)"],
};

export function Badge({ tone = "neutral", dot = false, children }: { tone?: BadgeTone; dot?: boolean; children?: ReactNode }) {
  const [color, border, bg] = BADGE_TONES[tone] ?? BADGE_TONES.neutral;
  return (
    <span className="pxds-badge" style={{ color, borderColor: border === "transparent" ? bg : border, background: bg }}>
      {dot ? <span className="pxds-badge__dot" /> : null}
      {children}
    </span>
  );
}

export function Tag({ children, active = false, onClick }: { children?: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <span
      onClick={onClick}
      style={{
        fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, padding: "4px 10px",
        borderRadius: "var(--radius-1)",
        border: `1px solid ${active ? "var(--color-brand-primary)" : "var(--color-border)"}`,
        color: active ? "var(--color-brand-primary)" : "var(--color-text-secondary)",
        background: active ? "var(--viridian-100)" : "var(--color-surface-elevated)",
        cursor: onClick ? "pointer" : "default", display: "inline-flex", alignItems: "center", gap: 6,
      }}
    >
      {children}
    </span>
  );
}

export function Card({
  label, index, title, children, footer, interactive = false, padding = 20, style,
}: {
  label?: string; index?: string; title?: string; children?: ReactNode; footer?: ReactNode;
  interactive?: boolean; padding?: number; style?: CSSProperties;
}) {
  return (
    <div className={`pxds-card${interactive ? " pxds-card--interactive" : ""}`} style={{ padding, ...style }}>
      {label || index ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          {label ? <span className="px-label" style={{ color: "var(--color-text-muted)" }}>{label}</span> : null}
          {index ? <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{index}</span> : null}
        </div>
      ) : null}
      {title ? <h4 style={{ marginBottom: 8 }}>{title}</h4> : null}
      {children}
      {footer ? <div style={{ borderTop: "1px solid var(--color-divider)", marginTop: 14, paddingTop: 10 }}>{footer}</div> : null}
    </div>
  );
}

export type CalloutTone = "info" | "success" | "warning" | "danger";

const CALLOUT_TONES: Record<CalloutTone, [string, string]> = {
  info: ["var(--color-info)", "var(--color-info-surface)"],
  success: ["var(--color-success)", "var(--color-success-surface)"],
  warning: ["var(--color-warning)", "var(--color-warning-surface)"],
  danger: ["var(--color-danger)", "var(--color-danger-surface)"],
};

export function Callout({ tone = "info", title, children }: { tone?: CalloutTone; title?: string; children?: ReactNode }) {
  const [color, bg] = CALLOUT_TONES[tone] ?? CALLOUT_TONES.info;
  return (
    <div style={{ background: bg, border: "1px solid", borderColor: color, borderRadius: "var(--radius-2)", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
      {title ? <span className="px-label" style={{ color }}>{title}</span> : null}
      <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--color-text-primary)" }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ forms */

export function Input({ error = false, className = "", ...rest }: { error?: boolean; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`pxds-input ${error ? "pxds-input--error" : ""} ${className}`.trim()} {...rest} />;
}

export function Textarea({ error = false, className = "", ...rest }: { error?: boolean; className?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`pxds-input ${error ? "pxds-input--error" : ""} ${className}`.trim()} {...rest} />;
}

export function Field({ label, help, error, required = false, children }: {
  label: string; help?: string; error?: string; required?: boolean; children?: ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>
        {label}{required ? <span style={{ color: "var(--color-danger)" }}> *</span> : null}
      </span>
      {children}
      {error
        ? <span style={{ fontSize: 12.5, color: "var(--color-danger)" }}>{error}</span>
        : help ? <span style={{ fontSize: 12.5, color: "var(--color-text-muted)" }}>{help}</span> : null}
    </label>
  );
}

export type SelectOption = string | { value: string; label: string };

export function Select({ options = [], className = "", ...rest }: { options?: SelectOption[]; className?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`pxds-input ${className}`.trim()}
      style={{
        appearance: "none",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236E7B75' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32, cursor: "pointer",
      }}
      {...rest}
    >
      {options.map((o) =>
        typeof o === "string"
          ? <option key={o} value={o}>{o}</option>
          : <option key={o.value} value={o.value}>{o.label}</option>,
      )}
    </select>
  );
}

export function Switch({ checked, defaultChecked = false, onChange, label, disabled = false }: {
  checked?: boolean; defaultChecked?: boolean; onChange?: (value: boolean) => void; label?: string; disabled?: boolean;
}) {
  const [internal, setInternal] = useState(defaultChecked);
  const on = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    const next = !on;
    if (checked === undefined) setInternal(next);
    onChange?.(next);
  };
  return (
    <button
      type="button" role="switch" aria-checked={on} onClick={toggle} disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, background: "none", border: "none",
        padding: 0, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, fontFamily: "var(--font-sans)",
      }}
    >
      <span style={{
        width: 36, height: 20, borderRadius: "var(--radius-round)",
        background: on ? "var(--color-brand-primary)" : "var(--neutral-400)",
        position: "relative", transition: "background var(--duration-1) var(--ease-standard)", flex: "none",
      }}>
        <span style={{ position: "absolute", top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left var(--duration-1) var(--ease-standard)" }} />
      </span>
      {label ? <span style={{ fontSize: 14, color: "var(--color-text-primary)" }}>{label}</span> : null}
    </button>
  );
}

/* ------------------------------------------------------------------- data */

export type DeltaTone = "positive" | "negative" | "neutral";

export type StatProps = { label: string; value: string; unit?: string; delta?: string; deltaTone?: DeltaTone; note?: string };

export function Stat({ label, value, unit, delta, deltaTone = "neutral", note }: StatProps) {
  const deltaColor = { positive: "var(--color-success)", negative: "var(--color-danger)", neutral: "var(--color-text-muted)" }[deltaTone];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)" }}>
      <span className="px-label">{label}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-data-size)", lineHeight: "var(--text-data-line)", fontVariantNumeric: "tabular-nums", color: "var(--color-text-primary)" }}>
        {value}{unit ? <span style={{ fontSize: 13, color: "var(--color-text-muted)", marginLeft: 6 }}>{unit}</span> : null}
      </span>
      {delta || note ? (
        <span style={{ fontSize: 12.5, fontFamily: "var(--font-mono)" }}>
          {delta ? <span style={{ color: deltaColor }}>{delta}</span> : null}
          {note ? <span style={{ color: "var(--color-text-muted)" }}> {note}</span> : null}
        </span>
      ) : null}
    </div>
  );
}

export function MetricGrid({ metrics = [], columns = 4 }: { metrics?: StatProps[]; columns?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, background: "var(--color-surface-elevated)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2)", overflow: "hidden" }}>
      {metrics.map((m, i) => (
        <div key={i} style={{ padding: "16px 20px", borderLeft: i % columns ? "1px solid var(--color-divider)" : "none", borderTop: i >= columns ? "1px solid var(--color-divider)" : "none" }}>
          <Stat {...m} />
        </div>
      ))}
    </div>
  );
}

export function CodeBlock({ title, lang, code, children }: { title?: string; lang?: string; code?: string; children?: ReactNode }) {
  return (
    <div style={{ background: "var(--color-foundation)", borderRadius: "var(--radius-2)", overflow: "hidden", fontFamily: "var(--font-mono)" }}>
      {title || lang ? (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,.08)", fontSize: 10.5, letterSpacing: ".07em", textTransform: "uppercase", color: "#77837C" }}>
          <span>{title}</span><span style={{ color: "#D8A945" }}>{lang}</span>
        </div>
      ) : null}
      <pre style={{ margin: 0, padding: "14px 16px", fontSize: "var(--text-code-size)", lineHeight: 1.65, color: "#C8D2CB", overflowX: "auto" }}>{code ?? children}</pre>
    </div>
  );
}

export type Column<Row> = { key: string; label: string; numeric?: boolean; render?: (row: Row) => ReactNode };

export function DataTable<Row extends Record<string, ReactNode>>({ columns = [], rows = [], hover = true }: {
  columns?: Column<Row>[]; rows?: Row[]; hover?: boolean;
}) {
  return (
    <table className={`pxds-table${hover ? " pxds-table--hover" : ""}`}>
      <thead>
        <tr>{columns.map((c) => <th key={c.key} className={c.numeric ? "pxds-num" : ""}>{c.label}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {columns.map((c) => (
              <td key={c.key} className={c.numeric ? "pxds-num" : ""}>{c.render ? c.render(r) : r[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ------------------------------------------------------------- navigation */

export function Wordmark({ size = 20, inverse = false, mark = false }: { size?: number; inverse?: boolean; mark?: boolean }) {
  const h = Math.round(size * 1.5);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.45) }}>
      {mark ? (
        <svg viewBox="0 0 48 48" fill="none" style={{ height: h, width: h, flex: "none" }} aria-hidden="true">
          <rect x="3.5" y="3.5" width="41" height="41" rx="9" stroke="var(--color-brand-primary)" strokeWidth="3" />
          <path d="M18 35 V13 H31.5 V24 H22" stroke="var(--color-brand-primary)" strokeWidth="3" />
          <rect x="19" y="21" width="6" height="6" fill="var(--color-brand-accent)" />
        </svg>
      ) : null}
      <span style={{ fontWeight: 800, fontSize: size, letterSpacing: "-0.02em", color: inverse ? "var(--color-text-inverse)" : "var(--color-text-primary)", whiteSpace: "nowrap" }}>
        Privex<span style={{ color: "var(--color-brand-primary)" }}>Labs</span>
      </span>
    </span>
  );
}

export function SiteHeader({ items = [], active, pillar, actions }: {
  items?: string[]; active?: string; pillar?: string; actions?: ReactNode;
}) {
  return (
    <header className="pxds-hdr">
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Wordmark mark />
        {pillar ? <span className="px-label" style={{ color: "var(--color-brand-primary)" }}>{pillar}</span> : null}
      </span>
      <nav className="pxds-hdr__nav">
        {items.map((it) => (
          <a key={it} href="#" onClick={(e) => e.preventDefault()} className={`pxds-hdr__link${it === active ? " pxds-hdr__link--active" : ""}`}>{it}</a>
        ))}
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>{actions}</div>
    </header>
  );
}

export function Tabs({ items = [], active, onChange, children }: {
  items?: string[]; active?: string; onChange?: (value: string) => void;
  children?: ReactNode | ((current: string) => ReactNode);
}) {
  const [internal, setInternal] = useState(active ?? items[0] ?? "");
  const current = onChange ? (active ?? internal) : internal;
  return (
    <div style={{ fontFamily: "var(--font-sans)" }}>
      <div role="tablist" style={{ display: "flex", gap: 2, borderBottom: "1px solid var(--color-border)" }}>
        {items.map((it) => {
          const on = it === current;
          return (
            <button
              key={it} role="tab" aria-selected={on}
              onClick={() => (onChange ? onChange(it) : setInternal(it))}
              style={{
                background: "none", border: "none",
                borderBottom: `2px solid ${on ? "var(--color-brand-primary)" : "transparent"}`,
                marginBottom: -1, padding: "10px 14px", fontFamily: "var(--font-sans)", fontSize: 14,
                fontWeight: on ? 600 : 500, color: on ? "var(--color-text-primary)" : "var(--color-text-secondary)", cursor: "pointer",
              }}
            >{it}</button>
          );
        })}
      </div>
      {typeof children === "function" ? children(current) : children}
    </div>
  );
}

export function Breadcrumb({ items = [] }: { items?: string[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: ".05em", textTransform: "uppercase", display: "flex", gap: 8, alignItems: "center", color: "var(--color-text-muted)" }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <span aria-hidden="true">/</span> : null}
          {i < items.length - 1
            ? <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--color-text-muted)" }}>{it}</a>
            : <span style={{ color: "var(--color-text-primary)" }} aria-current="page">{it}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

/* ----------------------------------------------------------------- privex */

export type DiagramNode = { id: string; label: string; sub?: string; x: number; y: number; w?: number; h?: number; tone?: "default" | "brand" | "muted" | "accent" };
export type DiagramEdge = { from: string; to: string; label?: string; signal?: boolean };

const NODE_TONES = {
  default: { fill: "var(--color-surface-elevated)", stroke: "var(--color-border-strong)", text: "var(--color-text-primary)" },
  brand: { fill: "var(--color-brand-primary)", stroke: "var(--color-brand-primary)", text: "#F2F7F4" },
  muted: { fill: "var(--color-surface-muted)", stroke: "var(--color-border)", text: "var(--color-text-secondary)" },
  accent: { fill: "var(--color-surface-elevated)", stroke: "var(--brass-500)", text: "var(--color-brand-accent-ink)" },
};

export function SystemDiagram({ nodes = [], edges = [], width = 640, height = 240, animated = false }: {
  nodes?: DiagramNode[]; edges?: DiagramEdge[]; width?: number; height?: number; animated?: boolean;
}) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", fontFamily: "var(--font-mono)" }} role="img" aria-label="System diagram">
      {edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        const ax = a.x + (a.w ?? 110);
        const ay = a.y + (a.h ?? 36) / 2;
        const bx = b.x;
        const by = b.y + (b.h ?? 36) / 2;
        const mid = (ax + bx) / 2;
        const d = ay === by ? `M${ax} ${ay} H${bx}` : `M${ax} ${ay} H${mid} V${by} H${bx}`;
        const stroke = e.signal ? "var(--brass-500)" : "var(--viridian-500)";
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray={e.signal || animated ? "6 6" : undefined} style={animated ? { animation: "pxflow 1.2s linear infinite" } : undefined} />
            <path d={`M${bx - 6} ${by - 4} L${bx} ${by} L${bx - 6} ${by + 4}`} fill="none" stroke={stroke} strokeWidth="1.5" />
            {e.label ? <text x={mid} y={Math.min(ay, by) - 8} textAnchor="middle" fontSize="8.5" letterSpacing=".06em" fill="var(--color-text-muted)">{e.label.toUpperCase()}</text> : null}
          </g>
        );
      })}
      {nodes.map((n) => {
        const tone = NODE_TONES[n.tone ?? "default"];
        const w = n.w ?? 110;
        const h = n.h ?? 36;
        return (
          <g key={n.id}>
            <rect x={n.x} y={n.y} width={w} height={h} rx="4" fill={tone.fill} stroke={tone.stroke} strokeWidth="1.5" />
            <text x={n.x + w / 2} y={n.y + h / 2 + (n.sub ? -2 : 3)} textAnchor="middle" fontSize="9.5" letterSpacing=".06em" fill={tone.text}>{n.label.toUpperCase()}</text>
            {n.sub ? <text x={n.x + w / 2} y={n.y + h / 2 + 10} textAnchor="middle" fontSize="7.5" letterSpacing=".05em" fill={n.tone === "brand" ? "#AFD6C9" : "var(--color-text-muted)"}>{n.sub}</text> : null}
          </g>
        );
      })}
    </svg>
  );
}

const DEFAULT_STAGES = ["Idea", "Experiment", "Prototype", "Pilot", "Evaluate", "Iterate", "Scale"];

export function ProductLifecycle({ stages = DEFAULT_STAGES, current, stopped = false }: {
  stages?: string[]; current?: string; stopped?: boolean;
}) {
  const ci = current ? stages.indexOf(current) : -1;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", fontFamily: "var(--font-mono)" }}>
      {stages.map((s, i) => {
        const state = i < ci ? "done" : i === ci ? "current" : "next";
        const last = i === stages.length - 1;
        const color = state === "current"
          ? (stopped && last ? "var(--color-danger)" : "var(--color-brand-primary)")
          : state === "done" ? "var(--viridian-400)" : "var(--color-border-strong)";
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: last ? "none" : 1, minWidth: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, background: state === "next" ? "transparent" : color, border: `1.5px solid ${color}`, boxSizing: "border-box" }} />
              <span style={{ fontSize: 9.5, letterSpacing: ".07em", textTransform: "uppercase", color: state === "next" ? "var(--color-text-muted)" : "var(--color-text-primary)", fontWeight: state === "current" ? 600 : 400, whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {!last ? <span style={{ flex: 1, height: 0, borderTop: `1.5px ${i < ci ? "solid var(--viridian-400)" : "dashed var(--color-border-strong)"}`, margin: "6px 8px 0", alignSelf: "flex-start" }} /> : null}
          </div>
        );
      })}
    </div>
  );
}

export function ModelCard({ name, version, task, base, languages = [], status = "Deployed", statusTone = "success", metrics = [] }: {
  name: string; version?: string; task?: string; base?: string; languages?: string[];
  status?: string; statusTone?: BadgeTone; metrics?: { label: string; value: string }[];
}) {
  return (
    <Card label="Model" index={version} interactive>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)" }}>{name}</span>
        <Badge tone={statusTone} dot>{status}</Badge>
      </div>
      <p style={{ fontSize: 13.5, color: "var(--color-text-secondary)", margin: "6px 0 10px" }}>
        {task}{base ? <span style={{ color: "var(--color-text-muted)" }}> · base: {base}</span> : null}
      </p>
      {languages.length ? (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: metrics.length ? 12 : 0 }}>
          {languages.map((l) => <Tag key={l}>{l}</Tag>)}
        </div>
      ) : null}
      {metrics.length ? (
        <div style={{ display: "flex", borderTop: "1px solid var(--color-divider)", paddingTop: 10 }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ flex: 1, borderLeft: i ? "1px solid var(--color-divider)" : "none", paddingLeft: i ? 12 : 0 }}>
              <div className="px-label" style={{ fontSize: 9.5 }}>{m.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 17, fontVariantNumeric: "tabular-nums", marginTop: 2 }}>{m.value}</div>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

export function ResearchCard({ category = "Research", index, title, summary, date, readTime, authors = [] }: {
  category?: string; index?: string; title: string; summary?: string; date?: string; readTime?: string; authors?: string[];
}) {
  return (
    <Card label={category} index={index} interactive>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, lineHeight: 1.25, fontWeight: 500, color: "var(--color-text-primary)" }}>{title}</div>
      {summary ? <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--color-text-secondary)", marginTop: 8 }}>{summary}</p> : null}
      <div style={{ display: "flex", gap: 10, alignItems: "baseline", borderTop: "1px solid var(--color-divider)", marginTop: 14, paddingTop: 10 }}>
        <span className="px-label" style={{ fontSize: 9.5 }}>{date}</span>
        {readTime ? <span className="px-label" style={{ fontSize: 9.5 }}>· {readTime}</span> : null}
        {authors.length ? <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--color-text-muted)" }}>{authors.join(", ")}</span> : null}
      </div>
    </Card>
  );
}
