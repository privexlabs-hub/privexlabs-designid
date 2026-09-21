/**
 * Browser file-save helpers.
 *
 * These live apart from `src/lib/export.ts` because that module statically imports
 * html-to-image; anything that only needs to save a text file should not pull a
 * rasteriser into its bundle. `export.ts` re-exports both for its existing callers.
 */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "artboard";
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on the next frame; revoking synchronously cancels the download in Safari.
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
