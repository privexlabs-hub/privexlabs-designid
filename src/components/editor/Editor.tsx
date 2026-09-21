"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CanvasStage } from "./CanvasStage";
import { Inspector } from "./Inspector";
import { ExportPanel, type BatchJob } from "./ExportPanel";
import {
  CATEGORIES, SIZE_BY_ID, TEMPLATES, TEMPLATES_BY_CATEGORY, TEMPLATE_BY_ID,
  carryArticleCopy, collectArticleCopy, docFromTemplate, sizeOf, type ArticleCopy,
} from "@/lib/templates";
import type { Doc } from "@/lib/templates/types";
import { ARTICLE_PACK, isArticleLayout } from "@/lib/templates/types";
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
  const [articleCopy, setArticleCopy] = useState<ArticleCopy | null>(() => collectArticleCopy(null, docFromTemplate(initialTemplate)));
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState<number | "fit">("fit");
  const nodeRef = useRef<HTMLDivElement>(null);

  const template = TEMPLATE_BY_ID[templateId];
  const size = sizeOf(doc);

  /** Every change to the design goes through here, so the running article copy stays current. */
  function commit(next: Doc) {
    setDoc(next);
    setArticleCopy((prev) => collectArticleCopy(prev, next));
  }

  function select(id: string) {
    setTemplateId(id);
    // Opening an article template keeps the article — only the treatment changes.
    commit(carryArticleCopy(articleCopy, docFromTemplate(TEMPLATE_BY_ID[id])));
  }

  function resetCopy() {
    commit(docFromTemplate(TEMPLATE_BY_ID[templateId]));
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
      // The artboard being edited exports with its edits. Other article templates take the
      // article copy written so far; everything else exports from its defaults.
      return { name: `${t.category}-${t.name}`, doc: id === templateId ? doc : carryArticleCopy(articleCopy, docFromTemplate(t)) };
    };
    return {
      category: TEMPLATES.filter((t) => t.category === template.category).map((t) => toJob(t.id)),
      all: TEMPLATES.map((t) => toJob(t.id)),
    };
  }, [doc, articleCopy, templateId, template.category]);

  const categoryLabel = CATEGORIES.find((c) => c.id === template.category)?.name ?? template.category;
  const article = isArticleLayout(doc.layout);

  /** This exact design, at every article platform size. */
  const pack = useMemo(() => {
    if (!article) return undefined;
    return {
      platforms: ARTICLE_PACK.map((p) => p.platform),
      jobs: ARTICLE_PACK.map((p): BatchJob => {
        const s = SIZE_BY_ID[p.sizeId];
        return { name: `${p.platform}-${s.w}x${s.h}`, doc: { ...doc, sizeId: p.sizeId } };
      }),
    };
  }, [article, doc]);

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
          <button type="button" className="px-btn px-btn--ghost px-btn--sm" onClick={resetCopy}>
            Reset copy
          </button>
        </div>
        <div className="px-editor__viewport">
          <CanvasStage doc={doc} size={size} nodeRef={nodeRef} zoom={zoom} />
        </div>
      </section>

      <aside className="px-editor__rail px-editor__rail--right">
        {article ? (
          <p className="px-help" style={{ margin: "0 0 var(--space-4)", padding: "var(--space-3)", borderLeft: "2px solid var(--color-brand-accent)", background: "var(--color-surface)", fontSize: "var(--text-caption-size)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          Type the article once. Other Articles templates keep this copy when you switch to them,
          and <strong>Export for every platform</strong> renders this design at all {ARTICLE_PACK.length} sizes.
        </p>
        ) : null}
        <Inspector doc={doc} onChange={commit} />
        <ExportPanel
          nodeRef={nodeRef}
          doc={doc}
          docName={`${template.category}-${template.name}`}
          batchJobs={batchJobs}
          categoryLabel={categoryLabel}
          pack={pack}
        />
      </aside>
    </div>
  );
}
