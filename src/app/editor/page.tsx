import type { Metadata } from "next";
import { Suspense } from "react";
import { Editor } from "@/components/editor/Editor";

export const metadata: Metadata = { title: "Editor" };

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="px-container" style={{ padding: "var(--space-8) 0" }}>Loading the editor…</div>}>
      <Editor />
    </Suspense>
  );
}
