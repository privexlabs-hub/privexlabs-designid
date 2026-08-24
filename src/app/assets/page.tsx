import type { Metadata } from "next";
import { AssetLibrary } from "@/components/site/AssetLibrary";
import { Note, PageHead, Section, Table } from "@/components/site/ui";

export const metadata: Metadata = { title: "Assets" };

export default function AssetsPage() {
  return (
    <>
      <PageHead
        index="09 / ASSETS"
        title="Every identity file, in one place"
        lede="Logos, marks, wordmarks, favicons and avatars — as vector originals and pre-rendered rasters. Download one file, or take the whole library as a zip."
      />

      <Section index="9.1" title="Library">
        <AssetLibrary />
      </Section>

      <Section index="9.2" title="Which file to use">
        <Table
          head={["Context", "File"]}
          rows={[
            ["Website header, light", "logo.svg"],
            ["Website header, dark", "logo-dark.svg"],
            ["Print, engraving, watermark", "logo-mono.svg — set colour via currentColor"],
            ["App icon, favicon at 24px and below", "favicon.svg, or the 32 / 180 / 192 / 512 PNGs"],
            ["Social profile picture", "avatar-brand.svg — or the ink, white, campaign, mono and inverted variants"],
            ["Slide corner, dense UI", "mark.svg at 20px minimum"],
            ["Pillar lockup", "wordmark.svg plus a mono pillar label — never a separate symbol"],
          ]}
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
