/**
 * The PrivexLabs company document — the canonical description of who PrivexLabs is.
 *
 * The text is the company's own, reproduced verbatim. It is structured so it can be
 * rendered by the playbook and the brand brief, and checked against the source:
 * `documentToPlainText()` must reproduce the original word for word. One deliberate edit:
 * §20 read "PrivexLabs begin broadly … but become increasingly focused", which is
 * ungrammatical; it now reads "PrivexLabs should begin broadly …", matching the "should"
 * used throughout the document's strategy sections.
 *
 * Deliberately import-free, so the verbatim check can load it with plain Node.
 *
 * Visibility: some sections are internal strategy. They are excluded from the default
 * build and included only when INCLUDE_INTERNAL=1 (see `includeInternal`). Every internal
 * literal sits behind an inline `process.env.INCLUDE_INTERNAL === "1"` check: Next inlines
 * the variable at build time, so the public build compiles the text out of every bundle,
 * not just out of the rendered pages.
 */

export type DocBlock =
  | { kind: "p"; text: string; internal?: boolean }
  | { kind: "list"; items: readonly string[]; internal?: boolean }
  | { kind: "numbered"; items: readonly string[]; internal?: boolean }
  | { kind: "flow"; steps: readonly string[]; arrow: "→" | "↓"; internal?: boolean }
  | { kind: "sub"; title: string; blocks: readonly DocBlock[]; internal?: boolean };

export type DocSection = {
  /** The document's own section number; the closing definition has none. */
  n?: number;
  id: string;
  title: string;
  visibility: "public" | "internal";
  blocks: readonly DocBlock[];
};

const p = (text: string, internal?: boolean): DocBlock => ({ kind: "p", text, internal });
const list = (items: readonly string[]): DocBlock => ({ kind: "list", items });
const sub = (title: string, blocks: readonly DocBlock[], internal?: boolean): DocBlock => ({ kind: "sub", title, blocks, internal });
const section = (s: DocSection): DocSection => s;

/* ------------------------------------------------------------ definitions */

export const DEFINITION =
  "PrivexLabs is an AI and software technology company that helps businesses build, deploy, and operate intelligent systems using their data, workflows, and infrastructure.";

export const OVERVIEW =
  "PrivexLabs is an AI and software technology company focused on building practical, secure, and intelligent solutions for businesses.";

export const GOAL = "Turn AI and technology into practical business value.";

export const VISION = "To build technology that makes businesses more intelligent, capable, and efficient.";

export const MISSION = "To make advanced AI and software practical and accessible to businesses.";

export const MISSION_MEANS = [
  "Identifying high-value business problems.",
  "Designing and building practical software solutions.",
  "Integrating AI into existing business processes.",
  "Helping organizations use their proprietary data with AI.",
  "Deploying AI models in private, local, cloud, or hybrid environments.",
  "Developing and customizing AI models where appropriate.",
  "Training organizations and technical teams to effectively use AI.",
  "Turning successful solutions into scalable products.",
] as const;

/* ------------------------------------------------------------------ areas */

export type AreaText = { name: string; intro: string; lead: string; capabilities: readonly string[]; closing?: readonly string[] };

export const AREA_AI_ENGINEERING: AreaText = {
  name: "AI Engineering",
  intro: "We design and build AI-powered applications and systems for specific business needs.",
  lead: "Capabilities include:",
  capabilities: [
    "AI assistants and copilots",
    "AI agents",
    "Retrieval-augmented generation (RAG)",
    "Intelligent workflow automation",
    "AI-powered search",
    "Document intelligence",
    "Natural-language interfaces",
    "Multimodal AI applications",
    "AI integrations",
    "AI-powered business applications",
  ],
};

export const AREA_PRIVATE_AI: AreaText = {
  name: "Private & Enterprise AI",
  intro: "We help organizations use AI with their proprietary information while maintaining appropriate control over their data and infrastructure.",
  lead: "Solutions may include:",
  capabilities: [
    "Private AI deployments",
    "On-premise AI",
    "Private-cloud AI",
    "Hybrid AI architectures",
    "Local model deployment",
    "Secure enterprise AI environments",
    "Proprietary knowledge systems",
    "Internal AI assistants",
    "AI access and permission systems",
  ],
  closing: [
    "The objective is to help organizations move from simply using public AI tools to developing AI capabilities that fit their own operational and security requirements.",
  ],
};

export const AREA_MODELS: AreaText = {
  name: "AI Model Development & Customization",
  intro: "Where existing models are insufficient, PrivexLabs can research, adapt, optimize, or develop models for specific applications.",
  lead: "This may include:",
  capabilities: [
    "Model fine-tuning",
    "Domain adaptation",
    "Model evaluation",
    "Embedding models",
    "Classification models",
    "Speech and language models",
    "Computer vision models",
    "Smaller specialized models",
    "Model optimization",
    "Quantization and inference optimization",
    "Synthetic-data workflows",
    "Model benchmarking",
  ],
  closing: [
    "PrivexLabs does not assume that every problem requires a new model.",
    "Where an existing model is sufficient, we use it.",
    "Where customization provides meaningful value, we customize it.",
    "Where a proprietary model is justified, we develop one.",
  ],
};

export const AREA_SOFTWARE: AreaText = {
  name: "Software Engineering",
  intro: "AI is only useful when it can operate inside real business systems.",
  lead: "PrivexLabs therefore provides software engineering capabilities including:",
  capabilities: [
    "Web applications",
    "Mobile applications",
    "Business platforms",
    "APIs",
    "Backend systems",
    "Databases",
    "Integrations",
    "Automation systems",
    "Internal tools",
    "Cloud infrastructure",
    "Data systems",
  ],
  closing: [
    "The combination of software engineering and AI allows PrivexLabs to build complete solutions rather than isolated AI demonstrations.",
  ],
};

export const AREA_INFRASTRUCTURE: AreaText = {
  name: "AI Infrastructure",
  intro: "PrivexLabs helps organizations build the infrastructure required to operate AI systems reliably.",
  lead: "This can include:",
  capabilities: [
    "Model serving",
    "GPU infrastructure",
    "Local inference",
    "Cloud inference",
    "Model gateways",
    "AI APIs",
    "Vector databases",
    "Data pipelines",
    "Evaluation systems",
    "Monitoring",
    "Model management",
    "Security controls",
    "Deployment automation",
  ],
  closing: [
    "The long-term objective is to help organizations develop an AI operating capability, rather than simply purchase individual AI tools.",
  ],
};

export type TrainingTrack = { title: string; lead: string; topics: readonly string[] };

export const TRAINING_TRACKS: readonly TrainingTrack[] = [
  {
    title: "Business teams",
    lead: "Helping employees understand:",
    topics: ["Generative AI", "AI-assisted workflows", "Prompting", "AI productivity", "Responsible AI use", "AI-enabled business processes"],
  },
  {
    title: "Technical teams",
    lead: "Helping developers and technical professionals understand:",
    topics: ["AI application development", "LLMs", "RAG", "AI agents", "Model deployment", "Fine-tuning", "AI infrastructure", "Model evaluation", "Local AI"],
  },
  {
    title: "Leadership",
    lead: "Helping executives understand:",
    topics: ["AI opportunities", "AI strategy", "AI adoption", "AI risks", "Data requirements", "Infrastructure decisions", "Build-vs-buy decisions"],
  },
];

export const AREA_TRAINING: AreaText = {
  name: "AI Training & Education",
  intro: "Technology adoption requires people who understand how to use it.",
  lead: "PrivexLabs provides AI education and training for:",
  capabilities: TRAINING_TRACKS.map((t) => t.title),
};

/* --------------------------------------------------------------- approach */

export type ApproachStep = { step: number; name: string; text: readonly string[]; options?: readonly string[] };

export const APPROACH: readonly ApproachStep[] = [
  { step: 1, name: "Understand", text: ["We study the organization's processes, data, customers, employees, and operational challenges."] },
  { step: 2, name: "Identify", text: ["We identify problems where software, automation, or AI can produce meaningful value."] },
  {
    step: 3, name: "Design",
    text: ["We determine the appropriate technical approach.", "This could be:"],
    options: ["Existing software", "Automation", "An AI API", "An open-source model", "A private model", "A custom application", "A custom-trained model", "Or a combination of technologies"],
  },
  { step: 4, name: "Build", text: ["We develop the solution and integrate it into the organization's existing systems."] },
  {
    step: 5, name: "Deploy",
    text: ["We deploy the solution in the environment appropriate for the organization's needs:"],
    options: ["Cloud", "Private cloud", "On-premise", "Local infrastructure", "Hybrid infrastructure"],
  },
  {
    step: 6, name: "Measure",
    text: ["We evaluate whether the solution actually improves the business.", "The objective is not simply to deliver software.", "The objective is to create measurable outcomes."],
  },
];

export const VALUE_QUESTIONS = [
  "Where can AI create value in our organization?",
  "How can we use our proprietary data with AI?",
  "How can we deploy AI while maintaining control over our data and infrastructure?",
  "How can we build AI systems that actually integrate into our operations?",
  "How can we develop internal AI capabilities instead of depending entirely on external providers?",
] as const;

export const TARGET_INDUSTRIES = [
  "Financial institutions",
  "Healthcare organizations",
  "Logistics companies",
  "Educational institutions",
  "Professional-services firms",
  "Manufacturing companies",
  "Retail and e-commerce businesses",
  "Telecommunications companies",
  "Government and public-sector organizations",
  "Technology companies",
  "Large and growing SMEs",
] as const;

export const POSITIONING_INTERSECTION = "Software Engineering + Artificial Intelligence + Data + Infrastructure";

export const POSITIONING_FLOW = ["Problem", "Data", "AI Strategy", "Model", "Software", "Infrastructure", "Deployment", "Operations"] as const;

export type Titled = { title: string; text: string };

export const DIFFERENTIATORS: readonly Titled[] = [
  { title: "Practical AI", text: "We focus on business outcomes rather than AI hype." },
  { title: "Private AI", text: "We help organizations maintain appropriate control over proprietary information, models, and infrastructure." },
  { title: "Full-stack capability", text: "We can work across models, data, infrastructure, software, and business workflows." },
  { title: "Customization", text: "We adapt solutions to the organization's actual needs instead of forcing every organization into the same product." },
  { title: "Knowledge transfer", text: "We help customers develop internal AI capabilities rather than creating permanent dependence on an external provider." },
];

export const PRINCIPLES: readonly Titled[] = [
  { title: "Solve the problem, not the trend.", text: "AI should be used because it creates value, not because it is fashionable." },
  { title: "Build when building makes sense.", text: "Not every problem requires custom software or a custom model." },
  { title: "Own what matters.", text: "Organizations should have appropriate control over their data, systems, and critical technology." },
  { title: "Measure outcomes.", text: "A successful project should improve something measurable." },
  { title: "Make complex technology usable.", text: "Advanced technology has little value if ordinary employees cannot use it." },
  { title: "Build for the real world.", text: "Solutions must work under real business constraints involving cost, security, infrastructure, people, and operations." },
];

export const BRAND_DESCRIPTIONS = {
  short: "PrivexLabs is an AI and software company that builds, deploys, and operates practical AI systems for businesses.",
  expanded:
    "PrivexLabs helps organizations turn their data, workflows, and business challenges into practical AI and software solutions—from AI-powered applications and automation to private model deployment, custom AI systems, and enterprise AI infrastructure.",
  ambitious: !(process.env.INCLUDE_INTERNAL === "1") ? "" : "PrivexLabs builds the technology that enables businesses to own, deploy, and use AI on their terms.",
} as const;

/** As written in the document. The chosen lead line and sentence-case forms live in brand.ts. */
export const TAGLINE_CANDIDATES: readonly string[] = !(process.env.INCLUDE_INTERNAL === "1") ? [] : [
  "Build. Deploy. Own AI.",
  "AI Built for Your Business.",
  "Turning Business Problems into Intelligent Systems.",
  "Practical AI. Private Data. Real Results.",
  "Build Intelligence Into Your Business.",
  "Your Data. Your AI. Your Infrastructure.",
  "Engineering Intelligence for Business.",
];

export const RD_AREAS: readonly string[] = !(process.env.INCLUDE_INTERNAL === "1") ? [] : [
  "Open-source language models",
  "Small language models",
  "Local inference",
  "Multimodal AI",
  "Speech AI",
  "Computer vision",
  "AI agents",
  "Model optimization",
  "AI evaluation",
  "Synthetic data",
  "African-language AI",
  "Edge AI",
  "Domain-specific models",
  "AI security",
  "Private AI infrastructure",
];

export const PRODUCT_FLOW: readonly string[] = !(process.env.INCLUDE_INTERNAL === "1") ? [] : ["Client problem", "repeated across customers", "common architecture", "reusable platform", "product"];

export const STRATEGIC_DIRECTION: readonly string[] = !(process.env.INCLUDE_INTERNAL === "1") ? [] : [
  "Software Services",
  "AI Engineering",
  "Private & Enterprise AI",
  "Reusable AI Platforms",
  "Proprietary Products",
  "Technology Company",
];

/* --------------------------------------------------------------- document */

const areaBlocks = (a: AreaText): DocBlock[] => [
  p(a.intro), p(a.lead), list(a.capabilities), ...(a.closing ?? []).map((t) => p(t)),
];

export const companyDocument: { title: string; sections: readonly DocSection[] } = {
  title: "PrivexLabs",
  sections: [
    {
      n: 1, id: "overview", title: "Company Overview", visibility: "public",
      blocks: [
        p(OVERVIEW),
        p("We help organizations identify valuable opportunities for AI, build custom AI-powered systems, work with proprietary data, deploy AI models within controlled environments, and integrate intelligent systems into real-world business operations."),
        p("Our work spans AI engineering, software development, private AI infrastructure, model customization, AI deployment, automation, and AI education/training."),
        p("The goal is simple:"),
        p(GOAL),
        p("PrivexLabs is not focused on building technology for technology's sake. We focus on solving meaningful problems, improving how organizations operate, and creating systems that make work more efficient, intelligent, and accessible."),
      ],
    },
    {
      n: 2, id: "vision", title: "Vision", visibility: "public",
      blocks: [
        p(VISION),
        p("PrivexLabs aims to become a leading technology company for organizations that want to understand, adopt, build, and control their own AI capabilities."),
        p("We envision a future where businesses are not merely consumers of AI products, but are able to use their own data, infrastructure, and workflows to create intelligent systems tailored to their needs."),
      ],
    },
    {
      n: 3, id: "mission", title: "Mission", visibility: "public",
      blocks: [p(MISSION), p("We achieve this by:"), list(MISSION_MEANS)],
    },
    {
      n: 4, id: "what-we-do", title: "What PrivexLabs Does", visibility: "public",
      blocks: [
        p("PrivexLabs operates across several connected areas."),
        sub(AREA_AI_ENGINEERING.name, areaBlocks(AREA_AI_ENGINEERING)),
        sub(AREA_PRIVATE_AI.name, areaBlocks(AREA_PRIVATE_AI)),
        sub(AREA_MODELS.name, areaBlocks(AREA_MODELS)),
      ],
    },
    { n: 5, id: "software", title: AREA_SOFTWARE.name, visibility: "public", blocks: areaBlocks(AREA_SOFTWARE) },
    { n: 6, id: "infrastructure", title: AREA_INFRASTRUCTURE.name, visibility: "public", blocks: areaBlocks(AREA_INFRASTRUCTURE) },
    {
      n: 7, id: "training", title: AREA_TRAINING.name, visibility: "public",
      blocks: [
        p(AREA_TRAINING.intro), p(AREA_TRAINING.lead),
        ...TRAINING_TRACKS.map((t) => sub(t.title, [p(t.lead), list(t.topics)])),
      ],
    },
    {
      n: 8, id: "approach", title: "Our Approach", visibility: "public",
      blocks: [
        p("PrivexLabs follows a problem-first approach."),
        ...APPROACH.map((s) => sub(`Step ${s.step} — ${s.name}`, [
          ...s.text.map((t) => p(t)),
          ...(s.options ? [list(s.options)] : []),
        ])),
      ],
    },
    {
      n: 9, id: "value", title: "Core Value Proposition", visibility: "public",
      blocks: [
        p("PrivexLabs helps businesses answer five important questions:"),
        { kind: "numbered", items: VALUE_QUESTIONS },
        p("PrivexLabs combines strategy, engineering, AI, infrastructure, and education to answer these questions."),
      ],
    },
    {
      n: 10, id: "customers", title: "Target Customers", visibility: "public",
      blocks: [
        p("PrivexLabs can initially serve organizations that have significant amounts of data, repetitive workflows, specialized knowledge, or operational processes that can benefit from intelligent automation."),
        p("Potential customers include:"),
        list(TARGET_INDUSTRIES),
        ...(!(process.env.INCLUDE_INTERNAL === "1") ? [] : [p("However, the company should initially focus on a narrower set of industries where there is a clear and recurring problem that PrivexLabs can solve repeatedly.", true)]),
      ],
    },
    ...(!(process.env.INCLUDE_INTERNAL === "1") ? [] : [section({
      n: 11, id: "business-model", title: "Business Model", visibility: "internal",
      blocks: [
        p("PrivexLabs can operate through multiple revenue streams."),
        sub("AI & Software Projects", [p("Organizations pay PrivexLabs to design and build custom solutions."), p("Revenue may come through:"), list(["Project fees", "Development contracts", "Implementation fees"])]),
        sub("AI Consulting", [p("Organizations pay for:"), list(["AI strategy", "AI assessments", "Architecture", "Technology selection", "AI readiness assessments", "Build-vs-buy analysis"])]),
        sub("AI Infrastructure", [p("Revenue can come from:"), list(["Deployment", "Infrastructure setup", "Maintenance", "Monitoring", "Support", "Managed AI services"])]),
        sub("Training", [p("Revenue from:"), list(["Corporate workshops", "Technical training", "Executive education", "AI adoption programs", "Developer programs"])]),
        sub("Recurring Software", [
          p("Successful solutions can eventually become:"),
          list(["SaaS products", "Enterprise platforms", "AI subscriptions", "Managed services"]),
          p("This creates an important transition:"),
          p("Services generate knowledge and revenue; products create scalable recurring revenue."),
        ]),
      ],
    })]),
    ...(!(process.env.INCLUDE_INTERNAL === "1") ? [] : [section({
      n: 12, id: "product-strategy", title: "Product Strategy", visibility: "internal",
      blocks: [
        p("PrivexLabs should not attempt to build a large portfolio of unrelated products."),
        p("Instead, the company should use client work and market research to identify recurring problems."),
        p("For example:"),
        { kind: "flow", steps: PRODUCT_FLOW, arrow: "→" },
        p("This allows PrivexLabs to gradually transform expertise gained through services into proprietary technology."),
        p("Over time, this could produce a portfolio of:"),
        list(["AI platforms", "Industry-specific AI systems", "Private AI infrastructure", "AI productivity tools", "Specialized models", "Data intelligence products"]),
      ],
    })]),
    {
      n: 13, id: "positioning", title: "Competitive Positioning", visibility: "public",
      blocks: [
        p("PrivexLabs operates at the intersection of:"),
        p(POSITIONING_INTERSECTION),
        p("Rather than competing solely as a conventional software agency, PrivexLabs aims to become a technology partner capable of taking an organization from:"),
        { kind: "flow", steps: POSITIONING_FLOW, arrow: "→" },
        p("This full-stack approach allows the company to work on both the AI layer and the business systems surrounding it."),
      ],
    },
    {
      n: 14, id: "differentiation", title: "Differentiation", visibility: "public",
      blocks: [
        p("PrivexLabs seeks to differentiate through five principles."),
        ...DIFFERENTIATORS.map((d) => sub(d.title, [p(d.text)])),
      ],
    },
    ...(!(process.env.INCLUDE_INTERNAL === "1") ? [] : [section({
      n: 15, id: "advantage", title: "Long-Term Competitive Advantage", visibility: "internal",
      blocks: [
        p("PrivexLabs should build its defensibility around:"),
        list([
          "Proprietary technology", "Reusable AI infrastructure", "Domain-specific expertise",
          "Proprietary datasets where legitimately obtained and governed", "Deployment expertise",
          "AI evaluation systems", "Customer relationships", "Industry-specific workflows",
          "Technical talent", "Research capabilities",
        ]),
        p("The objective is to move beyond selling development hours."),
        p("The long-term goal is to own technology, infrastructure, intellectual property, and products that can be deployed repeatedly."),
      ],
    })]),
    ...(!(process.env.INCLUDE_INTERNAL === "1") ? [] : [section({
      n: 16, id: "rd", title: "Research & Development", visibility: "internal",
      blocks: [
        p("PrivexLabs should maintain an R&D function exploring emerging AI technologies."),
        p("Potential areas include:"),
        list(RD_AREAS),
        p("R&D should ultimately connect to practical applications rather than existing purely as experimentation."),
      ],
    })]),
    {
      n: 17, id: "principles", title: "Principles", visibility: "public",
      blocks: [
        p("PrivexLabs is built around several principles:"),
        ...PRINCIPLES.map((pr) => sub(pr.title, [p(pr.text)])),
      ],
    },
    {
      n: 18, id: "brand-positioning", title: "Brand Positioning", visibility: "public",
      blocks: [
        sub("Short description", [p(BRAND_DESCRIPTIONS.short)]),
        sub("Expanded description", [p(BRAND_DESCRIPTIONS.expanded)]),
        ...(!(process.env.INCLUDE_INTERNAL === "1") ? [] : [sub("More ambitious positioning", [p(BRAND_DESCRIPTIONS.ambitious)], true)]),
      ],
    },
    ...(!(process.env.INCLUDE_INTERNAL === "1") ? [] : [section({
      n: 19, id: "taglines", title: "Possible Taglines", visibility: "internal",
      blocks: [
        p("Potential directions include:"),
        list(TAGLINE_CANDIDATES),
        p("The strongest tagline should ultimately depend on which market PrivexLabs chooses to prioritize."),
      ],
    })]),
    ...(!(process.env.INCLUDE_INTERNAL === "1") ? [] : [section({
      n: 20, id: "direction", title: "Strategic Direction", visibility: "internal",
      blocks: [
        p("PrivexLabs should begin broadly by discovering opportunities, but become increasingly focused as it learns from customers."),
        p("The intended evolution is:"),
        { kind: "flow", steps: STRATEGIC_DIRECTION, arrow: "↓" },
        p("The long-term objective is not to become a company that simply builds software for clients."),
        p("It is to become a company that owns technology, understands difficult business problems, develops AI capabilities, and repeatedly turns those capabilities into valuable products and systems."),
      ],
    })]),
    { id: "definition", title: "One-Sentence Company Definition", visibility: "public", blocks: [p(DEFINITION)] },
  ],
};

/* ------------------------------------------------------------- visibility */

/**
 * True only in the internal build (`npm run build:internal`). `INCLUDE_INTERNAL` is declared
 * under `env` in next.config.ts, so server and client code see the same value.
 */
export const includeInternal: boolean = process.env.INCLUDE_INTERNAL === "1";

function visibleBlocks(blocks: readonly DocBlock[], internalOk: boolean): DocBlock[] {
  return blocks
    .filter((b) => internalOk || !b.internal)
    .map((b) => (b.kind === "sub" ? { ...b, blocks: visibleBlocks(b.blocks, internalOk) } : b));
}

/** The document as this build may show it. The single place internal content is filtered. */
export function visibleSections(internalOk: boolean = includeInternal): DocSection[] {
  return companyDocument.sections
    .filter((s) => internalOk || s.visibility === "public")
    .map((s) => ({ ...s, blocks: visibleBlocks(s.blocks, internalOk) }));
}

export function sectionById(id: string, internalOk: boolean = includeInternal): DocSection | undefined {
  return visibleSections(internalOk).find((s) => s.id === id);
}

/* ------------------------------------------------------------- plain text */

function blockText(b: DocBlock): string[] {
  switch (b.kind) {
    case "p": return [b.text];
    case "list": return [...b.items];
    case "numbered": return b.items.map((it, i) => `${i + 1}. ${it}`);
    case "flow": return [b.steps.join(` ${b.arrow} `)];
    case "sub": return [b.title, ...b.blocks.flatMap(blockText)];
  }
}

/** The whole document as plain text, in the source's order. Used by the verbatim check. */
export function documentToPlainText(sections: readonly DocSection[] = companyDocument.sections): string {
  return [
    companyDocument.title,
    ...sections.flatMap((s) => [s.n ? `${s.n}. ${s.title}` : s.title, ...s.blocks.flatMap(blockText)]),
  ].join("\n");
}
