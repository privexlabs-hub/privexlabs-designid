"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Artboard } from "@/components/canvas/Artboard";
import type { CanvasSize, Doc } from "@/lib/templates/types";

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
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      if (!box.width || !box.height) return;
      setFit(Math.min(box.width / size.w, box.height / size.h, 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [size.w, size.h]);

  const scale = zoom === "fit" ? fit : zoom;

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", minHeight: 0 }}>
      <div style={{ width: size.w * scale, height: size.h * scale, position: "relative", flexShrink: 0 }}>
        <div className="px-stagewrap" style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: size.w, height: size.h }}>
          <div ref={nodeRef}>
            <Artboard doc={doc} size={size} />
          </div>
        </div>
      </div>
    </div>
  );
}
