"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Artboard } from "@/components/canvas/Artboard";
import type { CanvasSize, Doc } from "@/lib/templates/types";

/** Below this width the editor stacks its columns and the stage grows with its content. */
const STACKED = "(max-width: 1180px)";

/**
 * Renders the artboard at its true pixel size and scales it visually with a transform.
 * Export reads the untransformed node, so what is measured is exactly what ships.
 */
export function CanvasStage({ doc, size, nodeRef, zoom }: {
  doc: Doc;
  size: CanvasSize;
  nodeRef: RefObject<HTMLDivElement | null>;
  zoom: number | "fit";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0.5);

  useEffect(() => {
    // Measure the scrolling viewport, never this wrapper. The wrapper sizes to the scaled
    // artboard, so measuring it fed the previous scale back in: opening a larger canvas kept
    // the old, too-large scale and the artboard ran under the inspector.
    const host = wrapRef.current?.parentElement;
    if (!host) return;
    const measure = () => {
      const cs = getComputedStyle(host);
      const w = host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      // Stacked, the viewport has no height of its own, so bound it by the window instead.
      const h = window.matchMedia(STACKED).matches
        ? window.innerHeight * 0.72
        : host.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      if (w <= 0 || h <= 0) return;
      setFit(Math.min(w / size.w, h / size.h, 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [size.w, size.h]);

  const scale = zoom === "fit" ? fit : zoom;

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", minHeight: 0, minWidth: 0 }}>
      {/* Clipped to its scaled size, so the untransformed artboard adds no phantom scroll. */}
      <div style={{ width: size.w * scale, height: size.h * scale, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <div className="px-stagewrap" style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: size.w, height: size.h }}>
          <div ref={nodeRef}>
            <Artboard doc={doc} size={size} />
          </div>
        </div>
      </div>
    </div>
  );
}
