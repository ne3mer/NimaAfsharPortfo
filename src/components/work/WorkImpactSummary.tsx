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
    <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:p-8">
      <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">
        {tProject("impactSummaryTitle")}
      </h2>
      <ul className="space-y-4 text-[15px] leading-relaxed text-zinc-300 md:text-base">
        {built ? (
          <li>
            <span className="font-semibold text-zinc-400">
              {tWork("cardBuilt")}:{" "}
            </span>
            {built}
          </li>
        ) : null}
        {did ? (
          <li>
            <span className="font-semibold text-zinc-400">
              {tWork("cardProblem")}:{" "}
            </span>
            {did}
          </li>
        ) : null}
        {result ? (
          <li className="text-emerald-100/95">
            <span className="font-semibold text-emerald-400/95">
              {tWork("cardOutcome")}:{" "}
            </span>
            {result}
          </li>
        ) : null}
      </ul>
    </div>
  );
}
