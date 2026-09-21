import type { Metadata } from "next";
import { BrandBrief } from "@/components/site/BrandBrief";
import { PageHead, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Brand brief",
  description:
    "The whole PrivexLabs brand as one copy-pasteable document — voice, dos and don'ts, content operating system, social grammar, visual foundations, governance and the full template catalogue.",
};

export default function BrandBriefPage() {
  return (
    <>
      <PageHead
        index="10 / BRAND BRIEF"
        title="The whole brand, in one document"
        lede="Every rule the system documents, assembled as Markdown you can copy in one move — for briefing a writer, an agency, or an external AI tool asked to write content, build a strategy, or plan a calendar. Take the whole pack or just the section you need. It is generated from the same data the playbook pages render from, so it cannot fall out of step with them."
      />

      <Section index="10.1" title="The pack">
        <BrandBrief />
      </Section>
    </>
  );
}
