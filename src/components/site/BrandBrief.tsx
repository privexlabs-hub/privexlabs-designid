"use client";

import { useState } from "react";
import { BRIEF_FILENAME, BRIEF_SECTIONS, BRIEF_WORDS, FULL_BRIEF } from "@/lib/brand-brief";
import { downloadBlob } from "@/lib/download";

/**
 * Writes text to the clipboard, falling back to a hidden textarea on origins where
 * the async clipboard API is unavailable (plain http, older embedded webviews).
 */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission denied or insecure context — try the fallback below.
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function CopyButton({ text, label, variant = "secondary" }: {
  text: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  return (
    <button
      type="button"
      className={`px-btn${variant === "secondary" ? " px-btn--secondary px-btn--sm" : ""}`}
      onClick={async () => {
        const ok = await copyText(text);
        setState(ok ? "done" : "fail");
        window.setTimeout(() => setState("idle"), 2000);
      }}
    >
      {state === "done" ? "Copied" : state === "fail" ? "Copy failed — select manually" : label}
    </button>
  );
}

export function BrandBrief() {
  return (
    <>
      <div className="px-pack-bar">
        <CopyButton text={FULL_BRIEF} label="Copy everything" variant="primary" />
        <button
          type="button"
          className="px-btn px-btn--secondary"
          onClick={() => downloadBlob(new Blob([FULL_BRIEF], { type: "text/markdown;charset=utf-8" }), BRIEF_FILENAME)}
        >
          Download .md
        </button>
        <a className="px-btn px-btn--ghost px-btn--sm" href="/brand-brief.md">Open at /brand-brief.md</a>
        <span className="px-label" style={{ marginLeft: "auto" }}>
          {BRIEF_SECTIONS.length} sections · {BRIEF_WORDS.toLocaleString("en-GB")} words
        </span>
      </div>

      <nav className="px-pack-index" style={{ marginTop: "var(--space-5)" }} aria-label="Sections">
        {BRIEF_SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`}>{s.index} {s.title}</a>
        ))}
      </nav>

      {BRIEF_SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="px-pack-sec">
          <div className="px-pack-head">
            <div>
              <span style={{ display: "flex", gap: "var(--space-3)", alignItems: "baseline" }}>
                <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{s.index}</span>
                <span className="px-label" style={{ color: s.visibility === "internal" ? "var(--color-danger)" : "var(--color-text-muted)" }}>
                  {s.visibility === "public" ? "Company" : s.visibility === "internal" ? "Internal — do not quote" : "Brand rules"}
                </span>
              </span>
              <h3 style={{ marginTop: "var(--space-2)" }}>{s.title}</h3>
              <p style={{ marginTop: "var(--space-2)", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)", maxWidth: "62ch" }}>
                {s.purpose}
              </p>
            </div>
            <CopyButton text={s.markdown} label="Copy section" />
          </div>
          <pre className="px-pack">{s.markdown}</pre>
        </section>
      ))}
    </>
  );
}
