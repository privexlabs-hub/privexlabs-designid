/**
 * Fits a block of text to a box by choosing the largest font size whose wrapped height
 * stays inside it.
 *
 * Article titles are typed by the user and exported at eleven canvas sizes, from a
 * 1000×420 DEV cover to a 1080×1920 story, so a fixed size either overflows the short
 * canvases or looks timid on the large ones. Widths come from canvas `measureText` with
 * the real face; the artboard re-renders once the self-hosted fonts have loaded, so the
 * measurement and the exported render use the same metrics.
 */

export type FitSpec = {
  text: string;
  /** CSS font-family list, e.g. FONT_SANS. */
  family: string;
  weight: number;
  width: number;
  maxHeight: number;
  maxSize: number;
  minSize: number;
  lineHeight: number;
  maxLines: number;
};

export type Fit = {
  size: number;
  lines: number;
  /** False when even `minSize` needs more room than the box has; the render clamps. */
  fits: boolean;
};

// Browser wrapping and a greedy word model disagree at the margins; measuring against a
// slightly narrower box keeps the estimate on the side of one line too many, never one
// line too few.
const WIDTH_SAFETY = 0.96;

let context: CanvasRenderingContext2D | null | undefined;

function measurer(): CanvasRenderingContext2D | null {
  if (context !== undefined) return context;
  if (typeof document === "undefined") return null;
  context = document.createElement("canvas").getContext("2d");
  return context;
}

/** Rough per-character width, used only where no canvas exists. Deliberately generous. */
const FALLBACK_EM = 0.58;

export function countLines(text: string, family: string, weight: number, size: number, width: number): number {
  const m = measurer();
  if (m) m.font = `${weight} ${size}px ${family}`;
  const widthOf = (s: string) => (m ? m.measureText(s).width : s.length * size * FALLBACK_EM);
  const space = widthOf(" ");
  const box = width * WIDTH_SAFETY;

  let total = 0;
  for (const paragraph of text.split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (!words.length) {
      total += 1;
      continue;
    }
    let lines = 1;
    let line = 0;
    for (const word of words) {
      const w = widthOf(word);
      if (line === 0) {
        // A single word wider than the box breaks anywhere (the render sets overflow-wrap).
        lines += Math.max(0, Math.ceil(w / box) - 1);
        line = w > box ? w % box : w;
      } else if (line + space + w <= box) {
        line += space + w;
      } else {
        lines += 1 + Math.max(0, Math.ceil(w / box) - 1);
        line = w > box ? w % box : w;
      }
    }
    total += lines;
  }
  return total;
}

export function fitText(spec: FitSpec): Fit {
  const { text, family, weight, width, maxHeight, lineHeight, maxLines } = spec;
  const maxSize = Math.max(1, Math.floor(spec.maxSize));
  const minSize = Math.max(1, Math.min(maxSize, Math.floor(spec.minSize)));

  const ok = (size: number) => {
    const lines = countLines(text, family, weight, size, width);
    return { lines, fits: lines <= maxLines && lines * size * lineHeight <= maxHeight };
  };

  // Line count only grows as the size grows, so the largest fitting size is a binary search.
  let lo = minSize;
  let hi = maxSize;
  let best: Fit | null = null;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const r = ok(mid);
    if (r.fits) {
      best = { size: mid, lines: r.lines, fits: true };
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  if (best) return best;

  const lines = countLines(text, family, weight, minSize, width);
  const room = Math.max(1, Math.floor(maxHeight / (minSize * lineHeight)));
  return { size: minSize, lines: Math.min(lines, maxLines, room), fits: false };
}
