export type PortfolioProjectLink = {
  label: "Live demo" | "Website" | "GitHub";
  href: string;
};

export type PortfolioVisual = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  aspect?: "landscape" | "wide" | "portrait";
  fit?: "cover" | "contain";
  position?: string;
};

export type PortfolioDiagram = {
  label: string;
  nodes: string[];
  note?: string;
};

export type PortfolioProject = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  section: "Cover Story" | "Featured" | "Selected Systems" | "Automation & Data";
  category: string;
  role: string;
  year: string;
  type: string;
  layout: "narrative" | "split" | "technical" | "meta";
  summary: string;
  problem: string;
  approach: string;
  built: string;
  capabilities: string[];
  technicalApproach?: string[];
  outcome: string;
  stack: string[];
  links: PortfolioProjectLink[];
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
  visuals?: PortfolioVisual[];
  diagram?: PortfolioDiagram;
  evidenceNote?: string;
  visualLabel: string;
  assetRequest?: string;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    number: "01",
    slug: "optisupply",
    title: "OptiSupply — ESG Supplier Intelligence Platform",
    shortTitle: "OptiSupply ESG Intelligence",
    section: "Cover Story",
    category: "ESG / Supplier Intelligence / Decision Support",
    role: "Product Strategist & Full-Stack Developer",
    year: "2025–26",
    type: "Research-led SaaS MVP",
    layout: "narrative",
    summary:
      "An explainable supplier intelligence product for scoring, risk analysis and sustainable supply-chain decisions.",
    problem:
      "Supplier and ESG data is often fragmented across scorecards, spreadsheets and opaque ratings. The product needed to make risk signals legible without hiding how a conclusion was reached.",
    approach:
      "I structured the product around decision paths rather than a collection of charts: inspect a supplier, understand the score, compare risk, review recommendations and export a defensible record.",
    built:
      "A React and TypeScript application with supplier records, configurable ESG scoring, risk and data-quality views, recommendations, geo-risk exploration, supply-chain graphs, scenario analysis and report exports, supported by a Node and MongoDB API.",
    capabilities: [
      "Explainable supplier scoring and calculation traces",
      "Risk, data-quality and ESG pillar analysis",
      "Supplier recommendations and comparison workflows",
      "Geo-risk and supply-chain graph exploration",
      "Scenario analysis with configurable weighting",
      "PDF, XLSX and CSV reporting paths",
    ],
    technicalApproach: [
      "React + TypeScript interface built as focused decision workspaces",
      "Node.js + Express API with MongoDB supplier and evaluation records",
      "React Flow and charting for network and analytical views",
      "Explicit methodology and calculation-trace surfaces",
    ],
    outcome:
      "The result is a working MVP that connects supplier evaluation, analysis and reporting in one inspectable product surface. It demonstrates how an ESG model can support a decision without becoming a black box.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    links: [
      { label: "Live demo", href: "https://optisupply.vercel.app/" },
      { label: "Website", href: "https://www.optisupply.tech/" },
      { label: "GitHub", href: "https://github.com/ne3mer/optisupply" },
    ],
    image: {
      src: "/images/work/optisupply/01-dashboard.png",
      alt: "OptiSupply supplier intelligence dashboard showing ESG analysis",
      objectPosition: "top",
    },
    visuals: [
      {
        src: "/images/work/optisupply/01-dashboard.png",
        alt: "OptiSupply system overview dashboard",
        label: "System overview",
        caption: "The decision workspace brings portfolio signals and supplier risk into one operating view.",
        aspect: "wide",
      },
      {
        src: "/images/work/optisupply/02-suppliers.png",
        alt: "OptiSupply supplier registry with risk and ESG filters",
        label: "Supplier registry",
        caption: "A filterable registry keeps source records, risk levels and ESG coverage visible before assessment.",
        aspect: "landscape",
      },
      {
        src: "/images/work/optisupply/03-recommendations.png",
        alt: "OptiSupply recommendation command view",
        label: "Scoring & recommendations",
        caption: "Prioritized actions connect supplier context to environmental, social and governance findings.",
        aspect: "wide",
      },
      {
        src: "/images/work/optisupply/05-supply-chain.png",
        alt: "OptiSupply supply-chain relationship graph",
        label: "Supply-chain graph",
        caption: "The graph view exposes supplier relationships and risk paths beyond a flat scorecard.",
        aspect: "landscape",
        fit: "contain",
      },
    ],
    visualLabel: "Decision Board · Application",
  },
  {
    number: "02",
    slug: "optisupply-due-diligence",
    title: "OptiSupply — Supplier Due Diligence & Compliance Platform",
    shortTitle: "OptiSupply Due Diligence",
    section: "Featured",
    category: "B2B Product / Due Diligence / Compliance",
    role: "Product Strategist & Full-Stack Developer",
    year: "2026",
    type: "Productized service concept",
    layout: "split",
    summary:
      "A focused B2B offering that turns supplier research into a structured compliance dossier workflow.",
    problem:
      "EU-oriented textile and retail teams need to vet suppliers across ownership, sanctions, ESG and operational risk, but the work is frequently assembled through disconnected searches and documents.",
    approach:
      "I separated the commercial workflow from the broader intelligence application and designed a narrower proposition: submit a supplier, understand the review scope, choose a dossier and receive a structured reporting output.",
    built:
      "A product-positioning site and purchase flow for supplier vetting, with a clear investigation framework, tier-two supply-chain explanation, dossier comparison, structured intake and a public sample report.",
    capabilities: [
      "Supplier vetting and risk-screening narrative",
      "Compliance-focused dossier structure",
      "Tier-two supply-chain explanation",
      "Inspection scope and reporting tiers",
      "Structured supplier intake",
      "Sample report and purchase path",
    ],
    technicalApproach: [
      "Static product surface optimized for a short B2B evaluation path",
      "Formspree-backed supplier intake",
      "Stripe-linked dossier purchase flow",
      "Public sample dossier as the principal proof artifact",
    ],
    outcome:
      "The work turns a broad compliance capability into a focused service concept with a clear input, review method and dossier deliverable.",
    stack: ["Product Strategy", "UX/UI", "JavaScript", "GSAP", "Formspree", "Stripe"],
    links: [{ label: "Website", href: "https://www.optisupply.tech/" }],
    image: {
      src: "/images/work/optisupply-due-diligence/01-hero.png",
      alt: "OptiSupply supplier due-diligence website hero and vetting engine",
      objectPosition: "top",
    },
    visuals: [
      {
        src: "/images/work/optisupply-due-diligence/01-hero.png",
        alt: "OptiSupply due-diligence hero with vetting engine",
        label: "Vetting engine",
        caption: "The opening proposition frames the service, investigation scope and supplier submission path.",
        aspect: "wide",
      },
      {
        src: "/images/work/optisupply-due-diligence/02-now-vetting.png",
        alt: "OptiSupply now-vetting section",
        label: "Now vetting",
        caption: "Active case positioning makes the service feel operational rather than abstract.",
        aspect: "landscape",
      },
      {
        src: "/images/work/optisupply-due-diligence/03-schematic.png",
        alt: "OptiSupply supply-chain inspection schematic",
        label: "Supply-chain schematic",
        caption: "A visual explanation separates ownership, sanctions, ESG and tier-two inspection work.",
        aspect: "landscape",
      },
      {
        src: "/images/work/optisupply-due-diligence/04-workflow.png",
        alt: "OptiSupply three-stage supplier vetting workflow",
        label: "Three-stage workflow",
        caption: "Submit, investigate and deliver are presented as a legible service sequence.",
        aspect: "wide",
      },
      {
        src: "/images/work/optisupply-due-diligence/05-inspection.png",
        alt: "OptiSupply inspection and dossier presentation",
        label: "Inspection results",
        caption: "The dossier surface shows how findings are organized for review.",
        aspect: "landscape",
      },
      {
        src: "/images/work/optisupply-due-diligence/06-submission.png",
        alt: "OptiSupply supplier submission flow",
        label: "Submission flow",
        caption: "The final intake makes the next action concrete without implying verified delivery performance.",
        aspect: "wide",
      },
    ],
    evidenceNote:
      "Turnaround and compliance language shown in the website captures is product positioning.",
    visualLabel: "Product Surface · Due Diligence",
  },
  {
    number: "03",
    slug: "dataflow-control",
    title: "DataFlow Control — Data Pipeline & Automation Platform",
    shortTitle: "DataFlow Control",
    section: "Featured",
    category: "Data Engineering / Automation / Full-Stack",
    role: "Full-Stack Developer",
    year: "2025",
    type: "Operations prototype",
    layout: "technical",
    summary:
      "A full-stack control plane for scheduling asynchronous jobs and inspecting their execution history and logs.",
    problem:
      "Scheduled scrapers and data jobs become difficult to operate when configuration, execution state and failure details live in separate tools.",
    approach:
      "I modeled the system as an operations surface: define work, schedule or trigger it, persist each run and expose status and logs through one interface.",
    built:
      "A FastAPI and React prototype with job configuration, cron scheduling, manual execution, run history, live status channels, JWT login, modeled roles and a Docker-based service stack.",
    capabilities: [
      "Job creation and cron scheduling",
      "Manual execution and cancellation controls",
      "Persisted run history and activity",
      "Live status and log channels",
      "Queue-backed scraper execution",
      "Containerized local service architecture",
    ],
    technicalApproach: [
      "React client → FastAPI service → PostgreSQL",
      "FastAPI scheduler → Redis queue → Celery workers",
      "WebSocket channel for status and log updates",
      "SQLModel and Alembic for persisted operational records",
    ],
    outcome:
      "The prototype establishes the core operating loop for asynchronous data work and makes configuration, execution state and logs visible in one place.",
    stack: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Redis", "Celery", "WebSockets"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ne3mer/DataFlow-Control-Automation-Data-Pipeline-Dashboard",
      },
    ],
    diagram: {
      label: "Control-plane architecture",
      nodes: ["React", "FastAPI", "Celery", "Redis", "PostgreSQL"],
      note: "Architecture model — not a runtime screenshot.",
    },
    evidenceNote: "The architecture is documented; a local runtime plate remains to be captured.",
    visualLabel: "System Plate · Operations",
    assetRequest:
      "Provide real captures of the dashboard, jobs table and live-log view from a local DataFlow run.",
  },
  {
    number: "04",
    slug: "leadpilot",
    title: "LeadPilot AI — SaaS MVP for Sales Automation",
    shortTitle: "LeadPilot AI",
    section: "Selected Systems",
    category: "SaaS / Sales Automation / Product Prototype",
    role: "Full-Stack Developer",
    year: "2026",
    type: "SaaS MVP",
    layout: "split",
    summary:
      "A client-side SaaS validation prototype connecting lead management, pipeline signals and assisted follow-up drafting.",
    problem:
      "A sales-product concept needed enough interaction depth to test its workflow—not just a landing page or a static dashboard mockup.",
    approach:
      "I focused the MVP on the smallest coherent loop: add and qualify a lead, inspect pipeline context, select a contact and draft a follow-up with controllable tone and intent.",
    built:
      "A responsive Next.js product prototype with lead add, delete and status flows, duplicate checks, local persistence, dashboard charts and deterministic follow-up templates.",
    capabilities: [
      "Lead creation, validation and status updates",
      "Duplicate-email detection",
      "Local browser persistence",
      "Pipeline KPI and trend presentation",
      "Lead-to-follow-up handoff",
      "Tone and message-goal controls",
    ],
    technicalApproach: [
      "Next.js client application with reusable product components",
      "LocalStorage-backed prototype state",
      "Recharts for dashboard narrative",
      "Framer Motion for restrained interface feedback",
    ],
    outcome:
      "The MVP provides a realistic surface for evaluating the product flow and interface system. The follow-up assistant uses local templates; no external AI model, backend CRM or measured sales result is implied.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts"],
    links: [{ label: "GitHub", href: "https://github.com/ne3mer/leadpilot-ai" }],
    image: {
      src: "/images/work/leadpilot/01-landing.png",
      alt: "LeadPilot SaaS MVP landing page",
      objectPosition: "top",
    },
    visuals: [
      {
        src: "/images/work/leadpilot/01-landing.png",
        alt: "LeadPilot SaaS MVP landing page",
        label: "Product proposition",
        caption: "The landing page introduces the lead-management and assisted follow-up workflow.",
        aspect: "wide",
      },
      {
        src: "/images/work/leadpilot/03-dashboard.png",
        alt: "LeadPilot dashboard with pipeline signals",
        label: "Dashboard",
        caption: "Pipeline status, lead activity and trends form the MVP operating surface.",
        aspect: "landscape",
      },
      {
        src: "/images/work/leadpilot/04-lead-pipeline.png",
        alt: "LeadPilot lead pipeline and lead table",
        label: "Lead pipeline",
        caption: "The lead table supports the prototype's add, qualify and status-update loop.",
        aspect: "wide",
      },
      {
        src: "/images/work/leadpilot/05-follow-up-analytics.png",
        alt: "LeadPilot deterministic follow-up composer and analytics",
        label: "Follow-up & analytics",
        caption: "Template-driven drafting is presented as an AI-assisted workflow, not model infrastructure.",
        aspect: "landscape",
      },
    ],
    visualLabel: "Product Plate · SaaS MVP",
    assetRequest:
      "Provide real captures of the LeadPilot dashboard, lead table and follow-up composer from a local run.",
  },
  {
    number: "05",
    slug: "nima-studio",
    title: "NIMA Studio — Personal Brand & Product Portfolio",
    shortTitle: "NIMA Studio",
    section: "Selected Systems",
    category: "Personal Brand / Product Design / Full-Stack",
    role: "Founder & Full-Stack Developer",
    year: "2026",
    type: "Editorial product platform",
    layout: "meta",
    summary:
      "A personal studio platform that treats technical work as product evidence rather than a list of technologies.",
    problem:
      "A conventional project grid could show output, but not the decisions, system thinking and product ownership behind the work.",
    approach:
      "I built the identity around an editorial archive: issues, cover stories, project plates and concise case narratives create a consistent way to read product, engineering and strategy together.",
    built:
      "A bilingual Next.js platform with an editorial design system, structured case studies, responsive layouts, project data and admin tooling, metadata foundations and focused contact flows.",
    capabilities: [
      "Editorial portfolio and case-study architecture",
      "Reusable paper, ink and typography system",
      "Locale-aware routing and RTL shell",
      "Responsive project storytelling",
      "Structured Work data with database fallback",
      "Contact and project-intake paths",
    ],
    technicalApproach: [
      "Next.js App Router with server-first page composition",
      "next-intl locale routing and direction-aware shell",
      "Prisma/PostgreSQL work records with JSON fallback",
      "Tailwind token layer built around editorial primitives",
    ],
    outcome:
      "The platform creates one coherent place to evaluate how I frame, design and implement products. Its value is the clarity of the evidence and navigation—not a claim about traffic, conversion or audience size.",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "next-intl", "Prisma"],
    links: [{ label: "Website", href: "https://www.nimastudio.site/en" }],
    image: {
      src: "/images/work/nima-studio/01-home-hero.png",
      alt: "NIMA Studio homepage positioning and editorial hero",
      objectPosition: "top",
    },
    visuals: [
      {
        src: "/images/work/nima-studio/01-home-hero.png",
        alt: "NIMA Studio homepage hero",
        label: "Homepage",
        caption: "The first viewport sets a practical product-engineering position before the editorial line.",
        aspect: "wide",
      },
      {
        src: "/images/work/nima-studio/02-work-archive.png",
        alt: "NIMA Studio selected Work archive",
        label: "Selected Work",
        caption: "A curated archive gives flagship products more weight than supporting systems.",
        aspect: "landscape",
      },
      {
        src: "/images/work/nima-studio/03-editorial-system.png",
        alt: "NIMA Studio editorial typography and paper-based interface",
        label: "Editorial system",
        caption: "Display serif, mono marginalia, ink rules and paper tones form a reusable visual grammar.",
        aspect: "landscape",
      },
      {
        src: "/images/work/nima-studio/04-process.png",
        alt: "NIMA Studio product engagement process",
        label: "Process",
        caption: "The engagement model turns discovery, shaping, building and learning into a readable sequence.",
        aspect: "wide",
      },
      {
        src: "/images/work/nima-studio/05-case-study.png",
        alt: "NIMA Studio case-study presentation",
        label: "Case-study presentation",
        caption: "The same system carries problem framing, authentic evidence and technical detail.",
        aspect: "landscape",
      },
    ],
    visualLabel: "Issue Plate · NIMA Studio",
  },
  {
    number: "06",
    slug: "pdf-data-engine",
    title: "Automated PDF Data Extraction & Validation Engine",
    shortTitle: "PDF Data Engine",
    section: "Automation & Data",
    category: "Python / Document Automation / Data Processing",
    role: "Python Developer",
    year: "2026",
    type: "Document-processing engine",
    layout: "technical",
    summary:
      "A modular pipeline that converts text-based business PDFs into normalized, validation-scored datasets.",
    problem:
      "Repeatedly moving fields from business PDFs into structured reports is slow and error-prone, while one malformed document can disrupt a batch.",
    approach:
      "I separated reading, extraction, cleaning, validation, deduplication and export so each stage could be inspected and changed without rewriting the pipeline.",
    built:
      "A Python CLI that batch-processes text PDFs, extracts business fields, applies format and business rules, isolates document-level failures and writes JSON, Excel and validation reports.",
    capabilities: [
      "Batch CLI with custom paths and dry-run mode",
      "pdfplumber extraction with PyMuPDF fallback",
      "Field normalization and business-rule validation",
      "Completeness-derived validation scoring",
      "MD5 document deduplication",
      "JSON and formatted Excel reporting",
    ],
    technicalApproach: [
      "PDF reader → field extractor → data cleaner",
      "Validation engine → deduplicator",
      "JSON writer + Excel writer + validation report",
      "Per-document error isolation and logging",
    ],
    outcome:
      "The engine establishes an auditable path from text-based PDF input to structured output while keeping document-level failures isolated.",
    stack: ["Python", "pdfplumber", "PyMuPDF", "Validation Rules", "JSON", "Excel"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ne3mer/Automated-PDF-Data-Extraction-Validation-Engine",
      },
    ],
    image: {
      src: "/images/work/pdf-engine/01-input-invoice.png",
      alt: "Generated sample invoice used to verify the PDF extraction engine",
      objectPosition: "top",
    },
    visuals: [
      {
        src: "/images/work/pdf-engine/01-input-invoice.png",
        alt: "Generated sample invoice used as pipeline input",
        label: "PDF input",
        caption: "A generated text-based invoice provides a reproducible fixture for the real pipeline run.",
        aspect: "portrait",
        fit: "contain",
      },
      {
        src: "/images/work/pdf-engine/05-terminal.png",
        alt: "Terminal summary from the PDF engine fixture run",
        label: "Extraction & normalization",
        caption: "The fixture run extracted twelve fields, isolated validation and wrote each output format.",
        aspect: "wide",
        fit: "contain",
      },
      {
        src: "/images/work/pdf-engine/04-validation.png",
        alt: "Generated PDF validation report",
        label: "Validation & confidence",
        caption: "The generated report records a partial result and a 0.75 completeness-derived score.",
        aspect: "landscape",
        fit: "contain",
      },
      {
        src: "/images/work/pdf-engine/02-json-output.png",
        alt: "Structured JSON generated by the PDF engine",
        label: "JSON output",
        caption: "Normalized fields and provenance are written to structured JSON.",
        aspect: "landscape",
        fit: "contain",
      },
      {
        src: "/images/work/pdf-engine/03-excel-output.png",
        alt: "Excel workbook preview generated by the PDF engine",
        label: "Excel output",
        caption: "The same processed record is exported to a formatted workbook for operational use.",
        aspect: "wide",
        fit: "contain",
      },
    ],
    diagram: {
      label: "Document-processing pipeline",
      nodes: ["PDF input", "Extraction", "Normalization", "Validation", "Confidence", "JSON / Excel"],
    },
    visualLabel: "Process Plate · Document Engine",
    assetRequest:
      "Provide a real sample invoice beside its generated JSON and Excel validation report.",
  },
  {
    number: "07",
    slug: "spanish-football-news",
    title: "Spanish Football News Aggregator",
    shortTitle: "Spanish Football News Pipeline",
    section: "Automation & Data",
    category: "Python / Web Scraping / Translation Pipeline",
    role: "Python Developer",
    year: "2025",
    type: "Data ingestion pipeline",
    layout: "technical",
    summary:
      "A bilingual ingestion pipeline that filters Spanish football coverage before translation and structured export.",
    problem:
      "Spanish football reporting is distributed across multiple publishers, while translating duplicate or irrelevant stories wastes API calls and creates inconsistent downstream data.",
    approach:
      "I placed relevance filtering and deduplication before translation, then normalized each accepted article into one bilingual JSON contract.",
    built:
      "A modular Python pipeline for configured Spanish news sources, article extraction, keyword-based relevance checks, URL and content deduplication, selectable translation providers, logging and dated JSON output.",
    capabilities: [
      "Source-specific article crawlers",
      "Football, club and league keyword filtering",
      "URL, title and content deduplication",
      "OpenAI, DeepL or Google translation adapters",
      "Bilingual structured JSON output",
      "Retry, delay and per-article error handling",
    ],
    technicalApproach: [
      "Source crawler → article parser → keyword filter",
      "SQLite-backed URL and content deduplication",
      "Selectable translator adapter",
      "Bilingual JSON writer with dated output",
    ],
    outcome:
      "The project defines a repeatable route from distributed source pages to a stable bilingual dataset with filtering and deduplication before translation.",
    stack: ["Python", "BeautifulSoup", "Requests", "SQLite", "Translation APIs", "JSON"],
    links: [{ label: "GitHub", href: "https://github.com/ne3mer/news-scrapper" }],
    diagram: {
      label: "Bilingual publishing workflow",
      nodes: ["Sources", "Scraper", "Filtering", "Translation", "Structured JSON"],
      note: "Workflow model — not a runtime screenshot.",
    },
    evidenceNote: "The workflow is documented; an end-to-end runtime plate remains to be captured.",
    visualLabel: "Pipeline Plate · Bilingual Data",
    assetRequest:
      "Provide a real source article beside its translated JSON output from a verified pipeline run.",
  },
];

export const LEGACY_PROJECT_ALIASES: Record<string, string> = {
  "optisupply-dashboard": "optisupply",
  "dataflow-pipeline-dashboard": "dataflow-control",
  "automated-pdf-extraction-engine": "pdf-data-engine",
  "spanish-football-news-scraper": "spanish-football-news",
};

export const ARCHIVE_PROJECT_SLUGS = [
  "nomadspot-budapest",
  "gameclub-iran",
  "echoless-tech",
] as const;

export function getPortfolioProject(slug: string) {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = PORTFOLIO_PROJECTS.findIndex((project) => project.slug === slug);
  if (index < 0) return {};

  return {
    previous: PORTFOLIO_PROJECTS[(index - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length],
    next: PORTFOLIO_PROJECTS[(index + 1) % PORTFOLIO_PROJECTS.length],
  };
}
