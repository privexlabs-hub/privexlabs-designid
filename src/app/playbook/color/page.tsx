import type { Metadata } from "next";
import { DoDont, Note, PageHead, Section, SwatchGrid, Table } from "@/components/site/ui";
import {
  brassRamp, colorPairings, darkThemeColors, discipline, neutralRamp,
  philosophy, semanticColors, viridianRamp,
} from "@/lib/brand";

export const metadata: Metadata = { title: "Color" };

export default function ColorPage() {
  return (
    <>
      <PageHead
        index="02 / COLOR"
        title="Mineral & Signal"
        lede={philosophy.color}
      />

      <Section index="2.1" title="Viridian — the brand hue" lede="600 is the brand primary; 700 is its hover and press state. Everything else in the ramp exists for surfaces, borders and dark-theme inversions.">
        <SwatchGrid swatches={viridianRamp} />
      </Section>

      <Section index="2.2" title="Neutrals — engineered paper" lede="Green-cast throughout. 100 is the default surface, 0 is elevated, 900 is the foundation band used for infrastructure and engineering content.">
        <SwatchGrid swatches={neutralRamp} />
      </Section>

      <Section index="2.3" title="Brass — the single signal" lede="Thin rules, index numbers, markers, active states and annotation. On paper use brass 700 for text-weight contrast; on dark surfaces use brass 300.">
        <SwatchGrid swatches={brassRamp} />
        <div style={{ marginTop: "var(--space-5)" }}>
          <Note>If a brass element is larger than a 2px rule, a small chip or a mono label, it is being used as decoration. Reduce it.</Note>
        </div>
      </Section>

      <Section index="2.4" title="Functional colors" lede="Semantics stay in-family — muted and green-cast, never the saturated web defaults.">
        <SwatchGrid swatches={semanticColors} />
      </Section>

      <Section index="2.5" title="Dark theme" lede="Applied with [data-theme=&quot;dark&quot;]. The brand hue lightens to hold contrast on the foundation; brass warms slightly. No token is invented in dark — every value is a redefinition of an existing one.">
        <SwatchGrid swatches={darkThemeColors} />
      </Section>

      <Section index="2.6" title="Pairing rules">
        <Table
          head={["Surface", "Text", "Accent", "Used for"]}
          rows={colorPairings.map((p) => [p.surface, p.text, p.accent, p.use])}
        />
      </Section>

      <Section index="2.7" title="Discipline">
        <DoDont dos={discipline.color.dos} donts={discipline.color.donts} />
      </Section>
    </>
  );
}
