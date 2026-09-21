"use client";

import { getFontEmbedCSS, toCanvas, toSvg } from "html-to-image";
import { downloadBlob, slugify } from "./download";

// Re-exported so existing callers keep importing these from here.
export { downloadBlob, slugify };

export type ExportFormat = "png" | "jpeg" | "webp" | "svg" | "pdf";

export const EXPORT_FORMATS: { id: ExportFormat; label: string; ext: string }[] = [
  { id: "png", label: "PNG · lossless, transparent-capable", ext: "png" },
  { id: "jpeg", label: "JPEG · smaller, opaque", ext: "jpg" },
  { id: "webp", label: "WebP · smallest at equal quality", ext: "webp" },
  { id: "svg", label: "SVG · vector wrapper, live text", ext: "svg" },
  { id: "pdf", label: "PDF · print and attachment", ext: "pdf" },
];

export type ExportOptions = {
  format: ExportFormat;
  /** 1 = native artboard pixels, 2 = double resolution. */
  scale: number;
  /** JPEG / WebP quality, 0–1. */
  quality: number;
  /** Fallback matte for formats without alpha. */
  background: string;
  /** Reused across a batch so fonts are inlined once, not once per artboard. */
  fontEmbedCSS?: string;
};

export const DEFAULT_EXPORT: ExportOptions = { format: "png", scale: 2, quality: 0.92, background: "#FFFFFF" };

/**
 * Inline every self-hosted @font-face once. html-to-image otherwise refetches and
 * re-encodes the woff2 files for every artboard in a batch, which dominates export time.
 */
export async function prepareFontEmbedCSS(node: HTMLElement): Promise<string> {
  try {
    return await getFontEmbedCSS(node);
  } catch {
    return "";
  }
}

function baseOptions(node: HTMLElement, opts: ExportOptions) {
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  return {
    width,
    height,
    pixelRatio: opts.scale,
    cacheBust: true,
    fontEmbedCSS: opts.fontEmbedCSS,
    style: { transform: "none", transformOrigin: "top left", margin: "0" },
  };
}

/** Rasterise or serialise one artboard node. Returns the blob and its file extension. */
export async function renderNode(
  node: HTMLElement,
  opts: ExportOptions,
): Promise<{ blob: Blob; ext: string }> {
  const base = baseOptions(node, opts);

  if (opts.format === "svg") {
    const dataUrl = await toSvg(node, base);
    const svg = decodeURIComponent(dataUrl.slice("data:image/svg+xml;charset=utf-8,".length));
    return { blob: new Blob([svg], { type: "image/svg+xml" }), ext: "svg" };
  }

  if (opts.format === "pdf") {
    const canvas = await toCanvas(node, { ...base, backgroundColor: opts.background });
    const { jsPDF } = await import("jspdf");
    const w = node.offsetWidth;
    const h = node.offsetHeight;
    const pdf = new jsPDF({ orientation: w >= h ? "landscape" : "portrait", unit: "px", format: [w, h], compress: true });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
    return { blob: pdf.output("blob"), ext: "pdf" };
  }

  // html-to-image's toBlob always encodes PNG regardless of the requested type, so the
  // canvas is encoded here instead — otherwise "JPEG" and "WebP" ship PNG bytes.
  const mime = opts.format === "png" ? "image/png" : opts.format === "jpeg" ? "image/jpeg" : "image/webp";
  const canvas = await toCanvas(node, {
    ...base,
    // PNG keeps whatever the artboard paints; the lossy formats need an opaque matte.
    backgroundColor: opts.format === "png" ? undefined : opts.background,
  });
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, opts.quality));
  if (!blob) throw new Error("Rasterisation returned no data");
  if (blob.type !== mime) throw new Error(`This browser cannot encode ${opts.format.toUpperCase()}`);
  return { blob, ext: opts.format === "jpeg" ? "jpg" : opts.format };
}

export async function downloadZip(entries: { name: string; blob: Blob }[], zipName: string) {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const e of entries) zip.file(e.name, e.blob);
  const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
  downloadBlob(blob, zipName);
}
