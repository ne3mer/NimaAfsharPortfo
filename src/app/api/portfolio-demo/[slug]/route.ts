import { NextResponse } from "next/server";

/** Static demo payloads — same-origin “smoke test” for portfolio case studies (no Python runtime). */
const DEMOS: Record<string, unknown> = {
  "spanish-football-news-scraper": {
    demo: true,
    hint: "This JSON is served by this Next.js app — not your local scraper.",
    article: {
      id: "demo-uuid-7f3a",
      club: "Real Madrid",
      league: "La Liga",
      source: "Marca",
      author: "Demo Author",
      published_at: "2025-12-03T14:22:00.000Z",
      url: "https://example.com/marca/demo-clasico",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=60",
      language_original: "es",
      title_es: "El Real Madrid vence al Barcelona en el Clásico",
      content_es: "Texto de demostración — el artículo completo se extrae con el crawler…",
      title_en: "Real Madrid defeats Barcelona in El Clásico",
      content_en: "Demo body — bilingual dataset matches the README contract.",
      keywords: ["Real Madrid", "El Clásico", "La Liga"],
      scraped_at: new Date().toISOString(),
    },
  },
  "automated-pdf-extraction-engine": {
    demo: true,
    hint: "Rule engine output shape — illustrative validation report.",
    document_id: "demo-doc-91bc",
    source_file_name: "invoice_demo.pdf",
    validation_status: "PASSED",
    validation_score: 0.94,
    fields: [
      { name: "invoice_number", value: "INV-2025-0142", valid: true },
      { name: "issue_date", value: "2025-11-18", valid: true },
      { name: "due_date", value: "2025-12-18", valid: true },
      { name: "currency", value: "EUR", valid: true },
      { name: "total_amount", value: 12840.5, valid: true },
      { name: "tax_amount", value: 2140.08, valid: true },
    ],
    rules_checked: [
      "required_fields",
      "date_iso_format",
      "currency_iso",
      "due_after_issue",
      "total_gt_tax",
    ],
  },
  "automated-pdf-extraction-engine-fail": {
    demo: true,
    hint: "Same engine — scenario with blocking validation errors.",
    document_id: "demo-doc-fail",
    source_file_name: "scan_noise.pdf",
    validation_status: "FAILED",
    validation_score: 0.31,
    fields: [
      { name: "invoice_number", value: "", valid: false },
      { name: "issue_date", value: "18/11/2025", valid: false },
      { name: "currency", value: "???", valid: false },
      { name: "total_amount", value: -120, valid: false },
    ],
    rules_checked: ["required_fields", "date_iso_format", "currency_iso"],
  },
  "echoless-tech": {
    demo: true,
    hint: "Fingerprint of the product surface — static demo payload.",
    product: "Echoless Tech",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    pulse_ms: 42,
    message: "Quiet interfaces — loud engineering.",
  },
};

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const url = new URL(request.url);
  const scenario = url.searchParams.get("scenario");

  if (slug === "automated-pdf-extraction-engine" && scenario === "fail") {
    return NextResponse.json(DEMOS["automated-pdf-extraction-engine-fail"], {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  }

  const body = DEMOS[slug];
  if (!body) {
    return NextResponse.json({ error: "No demo for this slug" }, { status: 404 });
  }

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
