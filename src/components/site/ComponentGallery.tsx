"use client";

import { useState } from "react";
import { CAST, RD } from "@/lib/examples";
import {
  Badge, Breadcrumb, Button, Callout, Card, CodeBlock, DataTable, Field, Input,
  MetricGrid, ModelCard, ProductLifecycle, ResearchCard, Select, SiteHeader, Stat,
  Switch, SystemDiagram, Tabs, Tag, Textarea, Wordmark,
} from "@/components/ds";

function Bench({ index, name, note, children }: { index: string; name: string; note: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "var(--space-5)", marginTop: "var(--space-6)" }}>
      <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "baseline", flexWrap: "wrap" }}>
        <span className="px-label" style={{ color: "var(--color-brand-accent-ink)" }}>{index}</span>
        <h3>{name}</h3>
      </div>
      <p style={{ marginTop: "var(--space-2)", maxWidth: "68ch", color: "var(--color-text-secondary)", fontSize: "var(--text-body-sm-size)" }}>{note}</p>
      <div style={{ marginTop: "var(--space-5)", padding: "var(--space-6)", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2)", display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "flex-start" }}>
        {children}
      </div>
    </div>
  );
}

const EVAL_ROWS = [
  { model: "Customized 8B", lang: "Loan-file review", acc: "0.91", p95: "310 ms" },
  { model: "Prompted 70B", lang: "Loan-file review", acc: "0.73", p95: "1,980 ms" },
  { model: "Customized 8B", lang: "Invoice extraction", acc: "0.84", p95: "330 ms" },
];

export function ComponentGallery() {
  const [tab, setTab] = useState("Evaluation");
  return (
    <>
      <Bench index="C.01" name="Button" note="Four variants, three sizes. Hover darkens the fill; press darkens further with no scale.">
        <Button>Start a pilot</Button>
        <Button variant="secondary">Read the method</Button>
        <Button variant="ghost">Changelog</Button>
        <Button variant="danger">Stop deployment</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
      </Bench>

      <Bench index="C.02" name="Badge" note="Mono, uppercase, the only pill in the system. Seven tones, all in-family.">
        <Badge>Draft</Badge>
        <Badge tone="brand">Pilot</Badge>
        <Badge tone="accent">Model v1.2</Badge>
        <Badge tone="success" dot>Operational</Badge>
        <Badge tone="warning" dot>Degraded</Badge>
        <Badge tone="danger" dot>Stopped</Badge>
        <Badge tone="info">Evaluating</Badge>
      </Bench>

      <Bench index="C.03" name="Tag" note="Sentence-case filter chips. Active state is viridian on the lightest tint.">
        <Tag active>Financial services</Tag>
        <Tag>Healthcare</Tag>
        <Tag>Logistics</Tag>
        <Tag>Public sector</Tag>
      </Bench>

      <Bench index="C.04" name="Card" note="1px border on an elevated surface, no shadow at rest. Shadow appears only when interactive.">
        <Card label="Research" index={RD.evaluation.id} title="Document extraction evaluation" style={{ maxWidth: 340 }} footer={<span className="px-label">1,240 DOCUMENTS · 4 ORGANIZATIONS</span>}>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>Six models evaluated. Two were usable without customization.</p>
        </Card>
        <Card interactive label="Interactive" index="HOVER" title="Hover for elevation" style={{ maxWidth: 300 }}>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>Elevation is the exception, not the structure.</p>
        </Card>
      </Bench>

      <Bench index="C.05" name="Callout" note="Four functional tones, all muted and green-cast.">
        <div style={{ display: "grid", gap: "var(--space-3)", width: "100%", maxWidth: 620 }}>
          <Callout tone="info" title="Note">Adaptation runs inside your environment. The weights stay yours.</Callout>
          <Callout tone="success" title="Complete">Reindex complete. 1,240 documents searchable.</Callout>
          <Callout tone="warning" title="Scheduled">Reindex scheduled for 02:00. Answers use the previous index until then.</Callout>
          <Callout tone="danger" title="Blocked">No source in the corpus. The model refused, as designed.</Callout>
        </div>
      </Bench>

      <Bench index="C.06" name="Field · Input · Select · Switch" note="Labels are sentence case. Focus is a 1px viridian border plus a matching ring.">
        <div style={{ display: "grid", gap: "var(--space-4)", width: "100%", maxWidth: 420 }}>
          <Field label="Deployment name" required help="Lowercase, no spaces."><Input defaultValue="docs-review-prod" /></Field>
          <Field label="Environment"><Select options={["On-premises", "Private cloud", "Managed"]} /></Field>
          <Field label="Evaluation notes"><Textarea rows={3} placeholder="What did you test?" /></Field>
          <Field label="Retention" error="Retention must be set before the pilot starts."><Input error defaultValue="" /></Field>
          <Switch defaultChecked label="Log every citation for audit" />
        </div>
      </Bench>

      <Bench index="C.07" name="Stat · MetricGrid" note="Tabular mono figures. Deltas stay in the functional palette.">
        <div style={{ width: "100%" }}>
          <MetricGrid
            columns={4}
            metrics={[
              { label: "Accuracy", value: "0.91", delta: "+18pt", deltaTone: "positive", note: "vs baseline" },
              { label: "p95 latency", value: "310", unit: "ms", delta: "−6.4×", deltaTone: "positive" },
              { label: "Cost / 1k docs", value: "$0.42", delta: "−91%", deltaTone: "positive" },
              { label: "Documents leaving your environment", value: "0", note: "PXW-2026-04" },
            ]}
          />
          <div style={{ marginTop: "var(--space-5)" }}>
            <Stat label="Queries resolved without escalation" value="94" unit="%" note="PXW-2026-05" />
          </div>
        </div>
      </Bench>

      <Bench index="C.08" name="DataTable" note="Mono uppercase headers, hairline row rules, right-aligned tabular numerics.">
        <div style={{ width: "100%", overflowX: "auto" }}>
          <DataTable
            columns={[
              { key: "model", label: "Model" },
              { key: "lang", label: "Language" },
              { key: "acc", label: "Accuracy", numeric: true },
              { key: "p95", label: "p95", numeric: true },
            ]}
            rows={EVAL_ROWS}
          />
        </div>
      </Bench>

      <Bench index="C.09" name="CodeBlock" note="Always on the foundation surface. The language label is the only brass in the component.">
        <div style={{ width: "100%", maxWidth: 620 }}>
          <CodeBlock title="deploy.sh" lang="bash" code={"privex deploy \\\n  --model privex/customized-8b \\\n  --environment on-premises \\\n  --boundary strict"} />
        </div>
      </Bench>

      <Bench index="C.10" name="SiteHeader · Wordmark" note="One shared mark. Areas of work are named by a mono label beside the wordmark, never by a separate logo.">
        <div style={{ width: "100%", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2)", overflow: "hidden" }}>
          <SiteHeader
            pillar="AI INFRASTRUCTURE"
            items={["Overview", "Deployments", "Models", "Audit"]}
            active="Deployments"
            actions={<Button size="sm" variant="secondary">Sign in</Button>}
          />
        </div>
        <Wordmark size={26} mark />
      </Bench>

      <Bench index="C.11" name="Tabs · Breadcrumb" note="Active tab is a 2px viridian underline. Breadcrumbs are mono and uppercase.">
        <div style={{ width: "100%", display: "grid", gap: "var(--space-5)" }}>
          <Breadcrumb items={["R&D", "Evaluations", RD.evaluation.id]} />
          <Tabs items={["Evaluation", "Method", "Data"]} active={tab} onChange={setTab}>
            {(current) => (
              <p style={{ padding: "var(--space-4) 0", fontSize: "var(--text-body-sm-size)", color: "var(--color-text-secondary)" }}>
                {current === "Evaluation" ? "Six models, 1,240 documents, four organizations."
                  : current === "Method" ? "Blind scoring against a rubric written before any output was read."
                  : "The rubric is published with the result."}
              </p>
            )}
          </Tabs>
        </div>
      </Bench>

      <Bench index="C.12" name="SystemDiagram" note="The brand's diagram language as a component: 1.5px lines, square 4px nodes, orthogonal connectors, brass for signals.">
        <div style={{ width: "100%" }}>
          <SystemDiagram
            width={640}
            height={200}
            animated
            nodes={[
              { id: "docs", label: "Documents", sub: "in place", x: 10, y: 20, tone: "muted" },
              { id: "index", label: "Index", sub: "your network", x: 180, y: 20 },
              { id: "model", label: "Adapted model", sub: "8B", x: 350, y: 20, tone: "brand" },
              { id: "audit", label: "Audit log", x: 350, y: 120, tone: "accent" },
              { id: "app", label: "Your app", x: 520, y: 20, w: 100 },
            ]}
            edges={[
              { from: "docs", to: "index", label: "ingest" },
              { from: "index", to: "model", label: "retrieve" },
              { from: "model", to: "app", label: "answer" },
              { from: "index", to: "audit", label: "cite", signal: true },
            ]}
          />
        </div>
      </Bench>

      <Bench index="C.13" name="ProductLifecycle" note="Idea to scale. Completed stages are solid viridian; the path ahead is dashed.">
        <div style={{ width: "100%" }}>
          <ProductLifecycle current="Pilot" />
          <div style={{ marginTop: "var(--space-6)" }}>
            <ProductLifecycle stages={["Idea", "Experiment", "Prototype", "Stopped"]} current="Stopped" stopped />
          </div>
        </div>
      </Bench>

      <Bench index="C.14" name="ModelCard · ResearchCard" note="The two area-specific cards. Research leads with the editorial serif; models lead with mono.">
        <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", width: "100%" }}>
          <ModelCard
            name="privex/customized-8b" version="v1.2" task="Financial-document extraction" base="Open 8B"
            status="Deployed" statusTone="success"
            metrics={[{ label: "Accuracy", value: "0.91" }, { label: "p95", value: "310ms" }, { label: "Cost/1k", value: "$0.42" }]}
          />
          <ResearchCard
            index={RD.evaluation.id}
            title={RD.evaluation.headline}
            summary="Two were usable without customization. Document layout explained most of the gap."
            date="14 APR 2026" readTime="8 MIN" authors={[`${CAST.rd.name}, ${CAST.rd.role}`]}
          />
        </div>
      </Bench>
    </>
  );
}
