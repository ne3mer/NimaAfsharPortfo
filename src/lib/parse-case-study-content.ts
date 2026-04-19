/** Parse case-study markdown stored in Work.content — `#` title, `##` sections, `-` lists, `**bold**`. */

export type CaseStudyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type CaseStudySection = {
  heading: string;
  blocks: CaseStudyBlock[];
};

export type ParsedCaseStudy = {
  /** First `#` line without marker, if present */
  docTitle: string | null;
  /** Body before first `##` */
  intro: string;
  introBlocks: CaseStudyBlock[];
  sections: CaseStudySection[];
};

function parseInlineBlocks(text: string): CaseStudyBlock[] {
  const lines = text.split("\n");
  const blocks: CaseStudyBlock[] = [];
  let listBuf: string[] = [];

  const flushList = () => {
    if (listBuf.length) {
      blocks.push({ type: "ul", items: [...listBuf] });
      listBuf = [];
    }
  };

  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("- ")) {
      listBuf.push(t.slice(2).trim());
      continue;
    }
    flushList();
    if (t.length > 0) {
      blocks.push({ type: "p", text: t });
    }
  }
  flushList();
  return blocks;
}

export function parseCaseStudyContent(raw: string): ParsedCaseStudy {
  const trimmed = (raw || "").trim();
  if (!trimmed) {
    return { docTitle: null, intro: "", introBlocks: [], sections: [] };
  }

  let rest = trimmed;
  let docTitle: string | null = null;
  const h1 = trimmed.match(/^#\s+(.+?)(?:\n|$)/);
  if (h1) {
    docTitle = h1[1].trim();
    rest = trimmed.slice(h1[0].length).trim();
  }

  const parts = rest.split(/\n(?=##\s)/);
  const introPart = (parts[0] ?? "").trim();
  const introBlocks = parseInlineBlocks(introPart);

  const sections: CaseStudySection[] = [];
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i].replace(/^##\s*/, "").trim();
    const nl = chunk.indexOf("\n");
    const heading = nl === -1 ? chunk.trim() : chunk.slice(0, nl).trim();
    const body = nl === -1 ? "" : chunk.slice(nl + 1).trim();
    sections.push({
      heading,
      blocks: parseInlineBlocks(body),
    });
  }

  return {
    docTitle,
    intro: introPart,
    introBlocks,
    sections,
  };
}

export type CaseStudySectionVariant = "tech" | "biz" | "mba" | "links" | "default";

export function classifyCaseStudySection(heading: string): CaseStudySectionVariant {
  const h = heading.toLowerCase();
  if (
    /^لینک|^link\b|^source\b|repository|مخزن/i.test(heading) ||
    /\b(link|repo)\b/i.test(h)
  ) {
    return "links";
  }
  if (/دستاوردهای فنی|technical outcomes|technical depth/i.test(heading)) {
    return "tech";
  }
  if (/ارزش|کسب‌وکار|business|strategy value/i.test(heading)) return "biz";
  if (/post-mba|mba read|نگاه پس از mba|نگاه پس از/i.test(heading)) return "mba";
  return "default";
}
