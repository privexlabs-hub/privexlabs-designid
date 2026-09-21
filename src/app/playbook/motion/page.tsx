import type { Metadata } from "next";
import { DoDont, PageHead, Section, Table } from "@/components/site/ui";
import { discipline, interactionStates, motionScale, philosophy } from "@/lib/brand";

export const metadata: Metadata = { title: "Motion" };

export default function MotionPage() {
  return (
    <>
      <PageHead
        index="05 / MOTION"
        title="Motion communicates system behaviour"
        lede={philosophy.motion}
      />

      <Section index="5.1" title="Durations and curves">
        <Table head={["Token", "Value", "Used for"]} rows={motionScale.map((m) => [<code key={m.token}>{m.token}</code>, <code key={`${m.token}-v`}>{m.value}</code>, m.use])} />
      </Section>

      <Section index="5.2" title="Interaction states">
        <Table
          head={["State", "Behaviour"]}
          rows={interactionStates.map((r) => [...r])}
        />
      </Section>

      <Section index="5.3" title="Reduced motion" lede="Honoured globally, not per component. The rule lives in tokens/motion.css and collapses every animation and transition to 1ms.">
        <pre style={{ background: "var(--color-surface-inverse)", color: "var(--color-text-inverse)", padding: "var(--space-5)", borderRadius: "var(--radius-2)", overflowX: "auto", fontSize: "var(--text-code-size)", lineHeight: 1.6 }}>
{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
  }
}`}
        </pre>
      </Section>

      <Section index="5.4" title="Discipline">
        <DoDont dos={discipline.motion.dos} donts={discipline.motion.donts} />
      </Section>
    </>
  );
}
