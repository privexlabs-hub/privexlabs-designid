"use client";

import { useRef, useState } from "react";
import { LAYOUT_FIELDS } from "@/lib/templates/layouts";
import { SIZES, SURFACES, isArticleLayout, type Doc } from "@/lib/templates/types";

/** Largest edge of a stored photo. Keeps exports sharp at 2× without bloating the DOM. */
const PHOTO_MAX = 720;

/** Read an image file and return it downscaled as a data URL. */
function readPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That file is not an image this browser can open"));
      img.onload = () => {
        const scale = Math.min(1, PHOTO_MAX / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const c = canvas.getContext("2d");
        if (!c) return reject(new Error("Canvas is unavailable"));
        c.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", 0.9));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function PhotoField({ doc, onChange, label, help }: {
  doc: Doc;
  onChange: (next: Doc) => void;
  label: string;
  help: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="px-field">
      <label htmlFor="f-photo">{label}</label>
      <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", flexWrap: "wrap" }}>
        {doc.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={doc.photo} alt="" width={36} height={36} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4, border: "1px solid var(--color-border)" }} />
        ) : null}
        <button type="button" className="px-btn px-btn--secondary px-btn--sm" onClick={() => input.current?.click()}>
          {doc.photo ? "Replace photo" : "Upload photo"}
        </button>
        {doc.photo ? (
          <button type="button" className="px-btn px-btn--ghost px-btn--sm" onClick={() => onChange({ ...doc, photo: undefined })}>Remove</button>
        ) : null}
        <input
          ref={input}
          id="f-photo"
          type="file"
          accept="image/*"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            try {
              setError(null);
              onChange({ ...doc, photo: await readPhoto(file) });
            } catch (err) {
              setError(err instanceof Error ? err.message : "Upload failed");
            }
          }}
        />
      </div>
      <span className="px-help" style={error ? { color: "var(--color-danger)" } : undefined}>{error ?? help}</span>
    </div>
  );
}

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
  const article = isArticleLayout(doc.layout);

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
        {article ? (
          <PhotoField doc={doc} onChange={onChange} label="Author photo" help="Optional. Without one, the byline shows the author's initials." />
        ) : doc.layout === "avatar" ? (
          <PhotoField doc={doc} onChange={onChange} label="Photo" help="Fills the avatar. Lockup set to anything but None adds the mark badge." />
        ) : null}
      </div>

      {article ? (
        <div className="px-group">
          <span className="px-label">Title typeface</span>
          <Seg
            value={doc.titleFont ?? "sans"}
            options={[{ id: "sans" as const, label: "Archivo" }, { id: "serif" as const, label: "Newsreader" }]}
            onChange={(titleFont) => set({ titleFont })}
          />
          <span className="px-help" style={{ display: "block", marginTop: "var(--space-2)" }}>
            Newsreader is for long-form writing and quotations — research, tutorials, opinion and pull quotes.
          </span>
        </div>
      ) : null}

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
          {article ? "Byline, footer rule and lockup" : "Footer rule and lockup"}
        </label>
        {doc.layout === "article" ? (
          <label className="px-toggle">
            <input type="checkbox" checked={doc.showMotif ?? false} onChange={(e) => set({ showMotif: e.target.checked })} />
            Signal-trace motif panel
          </label>
        ) : null}
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
