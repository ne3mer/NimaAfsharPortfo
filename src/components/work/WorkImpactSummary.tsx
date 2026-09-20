import { getTranslations } from "next-intl/server";

type Fields = {
  did?: string;
  built?: string;
  result?: string;
};

export async function WorkImpactSummary({
  locale,
  ...fields
}: Fields & { locale: string }) {
  const { did, built, result } = fields;
  if (!did && !built && !result) return null;

  const tWork = await getTranslations({ locale, namespace: "Work" });
  const tProject = await getTranslations({ locale, namespace: "Project" });

  return (
    <section className="border-y border-ink bg-card p-6 md:p-8">
      <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-sienna">
        {tProject("impactSummaryTitle")}
      </h2>
      <ul className="divide-y divide-ink/20">
        {built ? (
          <li className="grid gap-2 py-4 first:pt-0 md:grid-cols-[110px_1fr]">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              {tWork("cardBuilt")}:{" "}
            </span>
            <span className="text-[15px] leading-relaxed text-ink">{built}</span>
          </li>
        ) : null}
        {did ? (
          <li className="grid gap-2 py-4 md:grid-cols-[110px_1fr]">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              {tWork("cardProblem")}:{" "}
            </span>
            <span className="text-[15px] leading-relaxed text-ink">{did}</span>
          </li>
        ) : null}
        {result ? (
          <li className="grid gap-2 py-4 last:pb-0 md:grid-cols-[110px_1fr]">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-olive">
              {tWork("cardOutcome")}:{" "}
            </span>
            <span className="font-display text-[18px] italic leading-snug text-ink">{result}</span>
          </li>
        ) : null}
      </ul>
    </section>
  );
}
