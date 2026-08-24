"use client";

import { LAYOUT_FIELDS } from "@/lib/templates/layouts";
import { SIZES, SURFACES, type Doc } from "@/lib/templates/types";

function Seg<T extends string>({ value, options, onChange }: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="px-seg">
      {options.map((o) => (
        <button key={o.id} type="button" data-active={o.id === value} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Inspector({ doc, onChange }: { doc: Doc; onChange: (next: Doc) => void }) {
  const fields = LAYOUT_FIELDS[doc.layout];
  const set = (patch: Partial<Doc>) => onChange({ ...doc, ...patch });
  const setText = (key: string, value: string) => onChange({ ...doc, text: { ...doc.text, [key]: value } });

  return (
    <>
      <div className="px-group">
        <span className="px-label">Content</span>
        {fields.map((f) => {
          if (f.kind === "list") {
            return (
              <div className="px-field" key={f.key}>
                <label htmlFor={`f-${f.key}`}>{f.label}</label>
                <textarea
                  id={`f-${f.key}`}
                  className="px-textarea"
                  style={{ minHeight: 120 }}
                  value={doc.items.join("\n")}
                  onChange={(e) => set({ items: e.target.value.split("\n") })}
                />
                <span className="px-help">{f.help ?? "One per line."}</span>
              </div>
            );
          }
          const Tag = f.kind === "textarea" ? "textarea" : "input";
          return (
            <div className="px-field" key={f.key}>
              <label htmlFor={`f-${f.key}`}>{f.label}</label>
              <Tag
                id={`f-${f.key}`}
                className={f.kind === "textarea" ? "px-textarea" : "px-input"}
                value={doc.text[f.key] ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setText(f.key, e.target.value)}
              />
              {f.help ? <span className="px-help">{f.help}</span> : null}
            </div>
          );
        })}
      </div>

      <div className="px-group">
        <span className="px-label">Format</span>
        <div className="px-field">
          <label htmlFor="f-size">Canvas size</label>
          <select id="f-size" className="px-select" value={doc.sizeId} onChange={(e) => set({ sizeId: e.target.value })}>
            {SIZES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-group">
        <span className="px-label">Surface</span>
        <Seg
          value={doc.surface}
          options={SURFACES.map((s) => ({ id: s.id, label: s.label }))}
          onChange={(surface) => set({ surface })}
        />
      </div>

      <div className="px-group">
        <span className="px-label">Accent</span>
        <Seg
          value={doc.accent}
          options={[{ id: "brass" as const, label: "Brass" }, { id: "viridian" as const, label: "Viridian" }]}
          onChange={(accent) => set({ accent })}
        />
      </div>

      <div className="px-group">
        <span className="px-label">Alignment</span>
        <Seg
          value={doc.align}
          options={[{ id: "left" as const, label: "Left" }, { id: "center" as const, label: "Centred" }]}
          onChange={(align) => set({ align })}
        />
      </div>

      <div className="px-group">
        <span className="px-label">Lockup</span>
        <Seg
          value={doc.logo}
          options={[
            { id: "lockup" as const, label: "Lockup" },
            { id: "wordmark" as const, label: "Wordmark" },
            { id: "mark" as const, label: "Mark" },
            { id: "none" as const, label: "None" },
          ]}
          onChange={(logo) => set({ logo })}
        />
      </div>

      <div className="px-group">
        <span className="px-label">Structure</span>
        <label className="px-toggle">
          <input type="checkbox" checked={doc.showFooter} onChange={(e) => set({ showFooter: e.target.checked })} />
          Footer rule and lockup
        </label>
        <label className="px-toggle">
          <input type="checkbox" checked={doc.showRule} onChange={(e) => set({ showRule: e.target.checked })} />
          Viridian band at the top edge
        </label>
        <label className="px-toggle">
          <input type="checkbox" checked={doc.showMarks} onChange={(e) => set({ showMarks: e.target.checked })} />
          {doc.layout === "avatar" ? "Concentric registration rings" : "Registration marks at the corners"}
        </label>
      </div>
    </>
  );
}
