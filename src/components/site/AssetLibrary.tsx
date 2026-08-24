"use client";

import Image from "next/image";
import { useState } from "react";
import { downloadBlob, downloadZip } from "@/lib/export";
import { ALL_ASSET_FILES, RASTER_ASSETS, VECTOR_ASSETS, type AssetEntry } from "@/lib/assets";
import { P } from "@/lib/palette";

const DARK_ON = new Set(["logo-dark.svg", "mark-dark.svg", "logo-white.svg", "mark-white.svg", "wordmark-dark.svg", "favicon-dark.svg"]);

function tileBackground(name: string) {
  if (DARK_ON.has(name) || name.includes("-dark-")) return P.foundation;
  if (name.startsWith("avatar")) return "var(--color-surface-muted)";
  return "var(--color-surface-elevated)";
}

async function fetchAsset(path: string): Promise<Blob> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not read ${path}`);
  return res.blob();
}

function AssetTile({ asset, wide }: { asset: AssetEntry; wide: boolean }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="px-swatch">
      <div style={{ background: tileBackground(asset.name), padding: "var(--space-6)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 128 }}>
        <Image
          src={asset.file}
          alt={asset.name}
          width={wide ? 200 : 72}
          height={wide ? 40 : 72}
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain", color: P.viridian600 }}
          unoptimized
        />
      </div>
      <div className="px-swatch__meta">
        <code style={{ wordBreak: "break-all" }}>{asset.name}</code>
        {asset.use ? <span style={{ fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)" }}>{asset.use}</span> : null}
        <button
          type="button"
          className="px-btn px-btn--secondary px-btn--sm"
          style={{ marginTop: "var(--space-2)" }}
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              downloadBlob(await fetchAsset(asset.file), asset.name);
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Preparing…" : "Download"}
        </button>
      </div>
    </div>
  );
}

export function AssetLibrary() {
  const [state, setState] = useState<{ busy: boolean; error: string | null }>({ busy: false, error: null });

  async function downloadAll() {
    setState({ busy: true, error: null });
    try {
      const entries = await Promise.all(
        ALL_ASSET_FILES.map(async (path) => {
          const name = path.replace(/^\/(brand\/)?/, "").replace(/^png\//, "raster/");
          return { name: `privexlabs-assets/${name}`, blob: await fetchAsset(path) };
        }),
      );
      await downloadZip(entries, "privexlabs-brand-assets.zip");
      setState({ busy: false, error: null });
    } catch (e) {
      setState({ busy: false, error: e instanceof Error ? e.message : "Download failed" });
    }
  }

  return (
    <>
      <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" className="px-btn" onClick={downloadAll} disabled={state.busy}>
          {state.busy ? "Packaging…" : `Download all ${ALL_ASSET_FILES.length} files (.zip)`}
        </button>
        <span className="px-label">SVG · PNG · ICO</span>
        {state.error ? <span style={{ color: "var(--color-danger)", fontSize: "var(--text-body-sm-size)" }}>{state.error}</span> : null}
      </div>

      <h3 style={{ marginTop: "var(--space-8)" }}>Vector</h3>
      <p style={{ marginTop: "var(--space-2)", color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)", maxWidth: "68ch" }}>
        The canonical files. Lockups and wordmarks carry live SVG text in Archivo — outline the text before sending
        them anywhere the font will not be available.
      </p>
      <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", marginTop: "var(--space-5)" }}>
        {VECTOR_ASSETS.map((a) => (
          <AssetTile key={a.file} asset={a} wide={a.name.startsWith("logo") || a.name.startsWith("wordmark")} />
        ))}
      </div>

      <h3 style={{ marginTop: "var(--space-8)" }}>Raster</h3>
      <p style={{ marginTop: "var(--space-2)", color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)", maxWidth: "68ch" }}>
        Pre-rendered PNGs for platforms that will not take SVG — app icons, favicons and profile avatars.
      </p>
      <div className="px-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", marginTop: "var(--space-5)" }}>
        {RASTER_ASSETS.map((a) => (
          <AssetTile key={a.file} asset={a} wide={false} />
        ))}
      </div>
    </>
  );
}
