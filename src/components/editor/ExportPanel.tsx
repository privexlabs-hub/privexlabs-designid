"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Artboard } from "@/components/canvas/Artboard";
import {
  DEFAULT_EXPORT, EXPORT_FORMATS, downloadBlob, downloadZip, prepareFontEmbedCSS,
  renderNode, slugify, type ExportFormat, type ExportOptions,
} from "@/lib/export";
import { SIZE_BY_ID, type Doc } from "@/lib/templates/types";

export type BatchJob = { name: string; doc: Doc };

type Progress = { done: number; total: number; label: string } | null;

/**
 * Renders each batch artboard off-screen at full size, one at a time, so an export of the
 * whole catalogue never holds more than one artboard in the DOM.
 */
function BatchRunner({ jobs, options, zipName, onDone, onProgress }: {
  jobs: BatchJob[];
  options: ExportOptions;
  zipName: string;
  onDone: (error?: string) => void;
  onProgress: (p: Progress) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const results = useRef<{ name: string; blob: Blob }[]>([]);
  const cancelled = useRef(false);

  useEffect(() => () => { cancelled.current = true; }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (index >= jobs.length) {
        try {
          await downloadZip(results.current, zipName);
          if (alive && !cancelled.current) onDone();
        } catch (e) {
          if (alive) onDone(e instanceof Error ? e.message : "Packaging failed");
        }
        return;
      }
      const job = jobs[index];
      onProgress({ done: index, total: jobs.length, label: job.name });
      try {
        await document.fonts.ready;
        await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
        const node = hostRef.current?.firstElementChild as HTMLElement | undefined;
        if (!node) throw new Error("Artboard did not mount");
        const { blob, ext } = await renderNode(node, options);
        results.current.push({ name: `${String(index + 1).padStart(3, "0")}-${slugify(job.name)}.${ext}`, blob });
        if (alive && !cancelled.current) setIndex(index + 1);
      } catch (e) {
        if (alive) onDone(e instanceof Error ? e.message : "Export failed");
      }
    })();
    return () => { alive = false; };
    // Re-runs per artboard; jobs and options are frozen for the life of a batch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const job = jobs[Math.min(index, jobs.length - 1)];
  return (
    <div className="px-offscreen" aria-hidden ref={hostRef}>
      {index < jobs.length ? <Artboard doc={job.doc} size={SIZE_BY_ID[job.doc.sizeId]} /> : null}
    </div>
  );
}

export function ExportPanel({ nodeRef, doc, docName, batchJobs, categoryLabel, pack }: {
  nodeRef: RefObject<HTMLDivElement | null>;
  doc: Doc;
  docName: string;
  batchJobs: { category: BatchJob[]; all: BatchJob[] };
  categoryLabel: string;
  /** Article designs only: the current design at every platform size. */
  pack?: { platforms: string[]; jobs: BatchJob[] };
}) {
  const [opts, setOpts] = useState<ExportOptions>(DEFAULT_EXPORT);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>(null);
  const [batch, setBatch] = useState<{ jobs: BatchJob[]; zipName: string; options: ExportOptions } | null>(null);

  const size = SIZE_BY_ID[doc.sizeId];

  async function withNode(fn: (node: HTMLElement, fontCSS: string) => Promise<void>) {
    const node = nodeRef.current?.firstElementChild as HTMLElement | undefined;
    if (!node) { setError("Artboard is not mounted"); return; }
    setBusy(true);
    setError(null);
    try {
      await document.fonts.ready;
      const fontCSS = await prepareFontEmbedCSS(node);
      await fn(node, fontCSS);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setBusy(false);
    }
  }

  const exportOne = () =>
    withNode(async (node, fontCSS) => {
      const { blob, ext } = await renderNode(node, { ...opts, fontEmbedCSS: fontCSS });
      downloadBlob(blob, `${slugify(docName)}-${size.w}x${size.h}.${ext}`);
    });

  const exportEveryFormat = () =>
    withNode(async (node, fontCSS) => {
      const entries: { name: string; blob: Blob }[] = [];
      for (const f of EXPORT_FORMATS) {
        const { blob, ext } = await renderNode(node, { ...opts, format: f.id, fontEmbedCSS: fontCSS });
        entries.push({ name: `${slugify(docName)}-${size.w}x${size.h}.${ext}`, blob });
      }
      await downloadZip(entries, `${slugify(docName)}-all-formats.zip`);
    });

  function startBatch(jobs: BatchJob[], zipName: string) {
    if (!jobs.length) return;
    setError(null);
    setBusy(true);
    setProgress({ done: 0, total: jobs.length, label: jobs[0].name });
    setBatch({ jobs, zipName, options: opts });
  }

  return (
    <>
      <div className="px-group">
        <span className="px-label">Export</span>

        <div className="px-field">
          <label htmlFor="x-format">Format</label>
          <select id="x-format" className="px-select" value={opts.format} onChange={(e) => setOpts({ ...opts, format: e.target.value as ExportFormat })}>
            {EXPORT_FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>

        <div className="px-field">
          <label htmlFor="x-scale">Resolution — {size.w * opts.scale} × {size.h * opts.scale}px</label>
          <div className="px-seg" id="x-scale">
            {[1, 2, 3].map((s) => (
              <button key={s} type="button" data-active={opts.scale === s} onClick={() => setOpts({ ...opts, scale: s })}>{s}×</button>
            ))}
          </div>
        </div>

        {opts.format === "jpeg" || opts.format === "webp" ? (
          <>
            <div className="px-field">
              <label htmlFor="x-quality">Quality — {Math.round(opts.quality * 100)}%</label>
              <input id="x-quality" type="range" min={0.5} max={1} step={0.01} value={opts.quality} onChange={(e) => setOpts({ ...opts, quality: Number(e.target.value) })} />
            </div>
            <div className="px-field">
              <label htmlFor="x-bg">Matte behind transparency</label>
              <input id="x-bg" type="color" className="px-input" style={{ padding: 4, height: 36 }} value={opts.background} onChange={(e) => setOpts({ ...opts, background: e.target.value })} />
            </div>
          </>
        ) : null}

        <div style={{ display: "grid", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
          <button type="button" className="px-btn" onClick={exportOne} disabled={busy}>
            Download this artboard
          </button>
          {pack ? (
            <button type="button" className="px-btn" onClick={() => startBatch(pack.jobs, `${slugify(docName)}-every-platform.zip`)} disabled={busy}>
              Export for every platform — {pack.jobs.length} sizes (.zip)
            </button>
          ) : null}
          <button type="button" className="px-btn px-btn--secondary" onClick={exportEveryFormat} disabled={busy}>
            Download in every format (.zip)
          </button>
          <button type="button" className="px-btn px-btn--secondary" onClick={() => startBatch(batchJobs.category, `privexlabs-${slugify(categoryLabel)}.zip`)} disabled={busy}>
            Export {categoryLabel} — {batchJobs.category.length} artboards (.zip)
          </button>
          <button type="button" className="px-btn px-btn--secondary" onClick={() => startBatch(batchJobs.all, "privexlabs-all-templates.zip")} disabled={busy}>
            Export all {batchJobs.all.length} templates (.zip)
          </button>
        </div>

        {progress ? (
          <div style={{ marginTop: "var(--space-4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)" }}>
              <span>{progress.done} / {progress.total}</span>
              <span style={{ maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{progress.label}</span>
            </div>
            <div style={{ height: 6, background: "var(--color-surface-muted)", border: "1px solid var(--color-border)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(progress.done / progress.total) * 100}%`, background: "var(--color-brand-primary)" }} />
            </div>
          </div>
        ) : null}

        {error ? <p style={{ marginTop: "var(--space-3)", color: "var(--color-danger)", fontSize: "var(--text-body-sm-size)" }}>{error}</p> : null}

        {pack ? (
          <details style={{ marginTop: "var(--space-4)", fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)" }}>
            <summary style={{ cursor: "pointer" }}>What &ldquo;every platform&rdquo; includes</summary>
            <ul style={{ margin: "var(--space-2) 0 0", paddingLeft: "var(--space-5)", display: "grid", gap: 2 }}>
              {pack.jobs.map((j, i) => (
                <li key={j.doc.sizeId}>{pack.platforms[i]} · {SIZE_BY_ID[j.doc.sizeId].w}×{SIZE_BY_ID[j.doc.sizeId].h}</li>
              ))}
            </ul>
          </details>
        ) : null}

        <p style={{ marginTop: "var(--space-4)", fontSize: "var(--text-caption-size)", color: "var(--color-text-muted)" }}>
          Batch exports render every artboard at full size, one at a time. A full {batchJobs.all.length}-template
          run takes a few minutes — keep this tab in the foreground while it works.
        </p>
      </div>

      {batch ? (
        <BatchRunner
          jobs={batch.jobs}
          options={batch.options}
          zipName={batch.zipName}
          onProgress={setProgress}
          onDone={(err) => {
            setBatch(null);
            setBusy(false);
            setProgress(null);
            if (err) setError(err);
          }}
        />
      ) : null}
    </>
  );
}
