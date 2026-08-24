"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CanvasStage } from "./CanvasStage";
import { Inspector } from "./Inspector";
import { ExportPanel, type BatchJob } from "./ExportPanel";
import {
  CATEGORIES, TEMPLATES, TEMPLATES_BY_CATEGORY, TEMPLATE_BY_ID, docFromTemplate, sizeOf,
} from "@/lib/templates";
import { LAYOUT_LABELS } from "@/lib/templates/layouts";

const ZOOMS: (number | "fit")[] = ["fit", 0.25, 0.5, 1];

export function Editor() {
  const params = useSearchParams();
  const initialCategory = params.get("category");
  const initialTemplate =
    (params.get("template") && TEMPLATE_BY_ID[params.get("template") as string]) ||
    TEMPLATES.find((t) => t.category === initialCategory) ||
    TEMPLATES[0];

  const [templateId, setTemplateId] = useState(initialTemplate.id);
  const [doc, setDoc] = useState(() => docFromTemplate(initialTemplate));
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState<number | "fit">("fit");
  const nodeRef = useRef<HTMLDivElement>(null);

  const template = TEMPLATE_BY_ID[templateId];
  const size = sizeOf(doc);

  function select(id: string) {
    const t = TEMPLATE_BY_ID[id];
    setTemplateId(id);
    setDoc(docFromTemplate(t));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEMPLATES_BY_CATEGORY;
    return TEMPLATES_BY_CATEGORY
      .map(({ category, templates }) => ({
        category,
        templates: templates.filter((t) => `${t.name} ${category.name} ${t.layout}`.toLowerCase().includes(q)),
      }))
      .filter((g) => g.templates.length > 0);
  }, [query]);

  const batchJobs = useMemo(() => {
    const toJob = (id: string): BatchJob => {
      const t = TEMPLATE_BY_ID[id];
      // The artboard being edited exports with its edits; the rest export from their defaults.
      return { name: `${t.category}-${t.name}`, doc: id === templateId ? doc : docFromTemplate(t) };
    };
    return {
      category: TEMPLATES.filter((t) => t.category === template.category).map((t) => toJob(t.id)),
      all: TEMPLATES.map((t) => toJob(t.id)),
    };
  }, [doc, templateId, template.category]);

  const categoryLabel = CATEGORIES.find((c) => c.id === template.category)?.name ?? template.category;

  return (
    <div className="px-editor">
      <aside className="px-editor__rail">
        <div className="px-field">
          <label htmlFor="tpl-search">Templates — {TEMPLATES.length}</label>
          <input id="tpl-search" className="px-input" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        {filtered.map(({ category, templates }) => (
          <div className="px-group" key={category.id}>
            <span className="px-label">{category.name} · {templates.length}</span>
            {templates.map((t) => (
              <button key={t.id} type="button" className="px-tmpl" data-active={t.id === templateId} onClick={() => select(t.id)}>
                {t.name}
              </button>
            ))}
          </div>
        ))}
        {filtered.length === 0 ? <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-body-sm-size)" }}>Nothing matches that.</p> : null}
      </aside>

      <section className="px-editor__stage">
        <div className="px-editor__stagebar">
          <strong style={{ fontSize: "var(--text-body-sm-size)" }}>{template.name}</strong>
          <span className="px-label">{categoryLabel} · {LAYOUT_LABELS[doc.layout]} · {size.w}×{size.h}</span>
          <div className="px-seg" style={{ marginLeft: "auto" }}>
            {ZOOMS.map((z) => (
              <button key={String(z)} type="button" data-active={zoom === z} onClick={() => setZoom(z)}>
                {z === "fit" ? "Fit" : `${z * 100}%`}
              </button>
            ))}
          </div>
          <button type="button" className="px-btn px-btn--ghost px-btn--sm" onClick={() => select(templateId)}>
            Reset copy
          </button>
        </div>
        <div className="px-editor__viewport">
          <CanvasStage doc={doc} size={size} nodeRef={nodeRef} zoom={zoom} />
        </div>
      </section>

      <aside className="px-editor__rail px-editor__rail--right">
        <Inspector doc={doc} onChange={setDoc} />
        <ExportPanel
          nodeRef={nodeRef}
          doc={doc}
          docName={`${template.category}-${template.name}`}
          batchJobs={batchJobs}
          categoryLabel={categoryLabel}
        />
      </aside>
    </div>
  );
}
