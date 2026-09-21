import type { Metadata } from "next";
import { AssetLibrary } from "@/components/site/AssetLibrary";
import { Note, PageHead, Section, Table } from "@/components/site/ui";
import { assetUsage, philosophy } from "@/lib/brand";

export const metadata: Metadata = { title: "Assets" };

export default function AssetsPage() {
  return (
    <>
      <PageHead
        index="11 / ASSETS"
        title="Every identity file, in one place"
        lede={philosophy.assets}
      />

      <Section index="11.1" title="Library">
        <AssetLibrary />
      </Section>

      <Section index="11.2" title="Which file to use">
        <Table
          head={["Context", "File"]}
          rows={assetUsage.map((r) => [...r])}
        />
        <div style={{ marginTop: "var(--space-5)" }}>
          <Note>
            The brief listed an indigo default avatar and a radial campaign avatar. The brand&rsquo;s owned hue is
            viridian and governance prohibits gradients, so the default avatar is viridian and the campaign variant
            uses concentric registration rings — the same motif language as the rest of the system.
          </Note>
        </div>
      </Section>
    </>
  );
}
