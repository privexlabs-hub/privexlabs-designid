import type { Metadata } from "next";
import { ComponentGallery } from "@/components/site/ComponentGallery";
import { Note, PageHead, Section } from "@/components/site/ui";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return (
    <>
      <PageHead
        index="09 / COMPONENTS"
        title="The library, live"
        lede="Twenty-one components across core, forms, data, navigation and the Privex-specific set. Every one is built from tokens — there is no hardcoded colour or size in the library, which is why a token change propagates without a redesign."
      />

      <Section index="9.1" title="Library">
        <Note>
          Ported from the design system&rsquo;s <code>components/</code> folder to typed React. Behaviour and token
          usage are unchanged; the runtime style injection became a stylesheet, and class names carry a
          <code> pxds-</code> prefix so they do not collide with this site&rsquo;s own chrome.
        </Note>
        <ComponentGallery />
      </Section>
    </>
  );
}
