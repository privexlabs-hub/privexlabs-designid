import type { Metadata } from "next";
import { DoDont, PageHead, Section, Table } from "@/components/site/ui";
import { motionScale } from "@/lib/brand";

export const metadata: Metadata = { title: "Motion" };

export default function MotionPage() {
  return (
    <>
      <PageHead
        index="05 / MOTION"
        title="Motion communicates system behaviour"
        lede="Movement in this system reports what the software is doing — a state changed, a panel revealed, data moved along a path. It is never atmosphere. Three durations, three curves, and nothing that loops."
      />

      <Section index="5.1" title="Durations and curves">
        <Table head={["Token", "Value", "Used for"]} rows={motionScale.map((m) => [<code key={m.token}>{m.token}</code>, <code key={`${m.token}-v`}>{m.value}</code>, m.use])} />
      </Section>

      <Section index="5.2" title="Interaction states">
        <Table
          head={["State", "Behaviour"]}
          rows={[
            ["Hover", "Darker fill — primary moves to viridian 700; surfaces move to muted. Links underline."],
            ["Press", "Darker still. No scale, no lift."],
            ["Focus", "2px viridian outline at 2px offset. Always visible, never removed."],
            ["Reveal", "Fade with a 4–8px translate over 200ms."],
            ["Structural", "Fade with an 8px translate over 320ms."],
          ]}
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
        <DoDont
          dos={[
            "Animate the property that changed, and nothing else",
            "Use ease-flow only for data moving along a diagram path",
            "Keep entrances under 320ms",
            "Test every screen with reduced motion enabled",
          ]}
          donts={[
            "Parallax, particles, floating or looping ambient motion",
            "Scale or lift on press",
            "Animate a page on every scroll position",
            "Use motion to hide a slow response",
          ]}
        />
      </Section>
    </>
  );
}
