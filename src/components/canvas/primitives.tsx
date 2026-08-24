import type { CSSProperties } from "react";
import { FONT_MONO, FONT_SANS, P, type Skin } from "@/lib/palette";

/** The mark: boundary square, orthogonal "P" trace, brass signal node. Never redrawn. */
export function Mark({ size, stroke, node }: { size: number; stroke: string; node: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <rect x="3.5" y="3.5" width="41" height="41" rx="9" stroke={stroke} strokeWidth="3" />
      <path d="M18 35 V13 H31.5 V24 H22" stroke={stroke} strokeWidth="3" />
      <rect x="19" y="21" width="6" height="6" fill={node} />
    </svg>
  );
}

export function Wordmark({ size, ink, brand }: { size: number; ink: string; brand: string }) {
  return (
    <span style={{ fontFamily: FONT_SANS, fontWeight: 800, fontSize: size, letterSpacing: "-0.02em", color: ink, lineHeight: 1, whiteSpace: "nowrap" }}>
      Privex<span style={{ color: brand }}>Labs</span>
    </span>
  );
}

export function Lockup({ u, skin, variant }: { u: number; skin: Skin; variant: "lockup" | "mark" | "wordmark" | "none" }) {
  if (variant === "none") return null;
  const markSize = Math.round(34 * u);
  const wordSize = Math.round(30 * u);
  const brand = skin.dark ? skin.brandInk : P.viridian600;
  if (variant === "mark") return <Mark size={markSize} stroke={brand} node={skin.accent} />;
  if (variant === "wordmark") return <Wordmark size={wordSize} ink={skin.text} brand={brand} />;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(12 * u) }}>
      <Mark size={markSize} stroke={brand} node={skin.accent} />
      <Wordmark size={wordSize} ink={skin.text} brand={brand} />
    </span>
  );
}

/** Mono uppercase annotation. The only ALL-CAPS permitted in the system. */
export function Label({ children, u, color, size = 20 }: { children: React.ReactNode; u: number; color: string; size?: number }) {
  if (!children) return null;
  return (
    <span style={{ fontFamily: FONT_MONO, fontSize: Math.round(size * u), letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, color, lineHeight: 1.2, whiteSpace: "pre-wrap" }}>
      {children}
    </span>
  );
}

/** Registration marks at the frame corners — a core motif, not decoration. */
export function RegMarks({ pad, skin, w, h }: { pad: number; skin: Skin; w: number; h: number }) {
  const s = Math.max(12, Math.round(pad * 0.22));
  const off = Math.round(pad * 0.5);
  const stroke = skin.dark ? skin.border : skin.border;
  const mark = (style: CSSProperties) => (
    <svg width={s} height={s} viewBox="0 0 20 20" style={{ position: "absolute", ...style }} stroke={stroke} strokeWidth="1.5">
      <path d="M10 0v20M0 10h20" />
    </svg>
  );
  return (
    <>
      {mark({ top: off, left: off })}
      {mark({ top: off, right: off })}
      {mark({ bottom: off, left: off })}
      {mark({ bottom: off, right: off })}
      <span style={{ position: "absolute", inset: 0, width: w, height: h, pointerEvents: "none" }} />
    </>
  );
}

/** Square signal node used by diagram and steps layouts. */
export function Node({ size, color }: { size: number; color: string }) {
  return <span style={{ width: size, height: size, background: color, borderRadius: Math.max(1, size * 0.16), display: "block", flexShrink: 0 }} />;
}
