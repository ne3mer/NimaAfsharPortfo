"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NextImage from "next/image";
import { useTranslations } from "next-intl";

export type WorkCardData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  problem?: string;
  built?: string;
  outcome?: string;
  outcomeExtra?: string;
};

function CardMeta({
  problem,
  built,
  outcome,
  outcomeExtra,
}: {
  problem?: string;
  built?: string;
  outcome?: string;
  outcomeExtra?: string;
}) {
  const t = useTranslations("Work");
  if (!problem && !built && !outcome && !outcomeExtra) return null;

  return (
    <div className="mt-3 space-y-1.5 border-t border-white/5 pt-3 text-left">
      {problem ? (
        <p className="text-[11px] leading-snug text-zinc-500 md:text-xs">
          <span className="font-semibold text-zinc-400">{t("cardProblem")}</span>{" "}
          {problem}
        </p>
      ) : null}
      {built ? (
        <p className="text-[11px] leading-snug text-zinc-500 md:text-xs">
          <span className="font-semibold text-zinc-400">{t("cardBuilt")}</span>{" "}
          {built}
        </p>
      ) : null}
      {outcome ? (
        <p className="text-[11px] leading-snug text-emerald-200/90 md:text-xs">
          <span className="font-semibold text-emerald-400/90">
            {t("cardOutcome")}
          </span>{" "}
          {outcome}
        </p>
      ) : null}
      {outcomeExtra ? (
        <p className="text-[11px] leading-snug text-emerald-200/75 md:text-xs">
          {outcomeExtra}
        </p>
      ) : null}
    </div>
  );
}

export function PortfolioCard({ project }: { project: WorkCardData }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-card transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {project.image ? (
          <NextImage
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        )}

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

        <div className="absolute bottom-0 left-0 z-20 p-6">
          <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
          <CardMeta
            problem={project.problem}
            built={project.built}
            outcome={project.outcome}
            outcomeExtra={project.outcomeExtra}
          />
        </div>

        <div className="absolute inset-0 z-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex items-center justify-between border-t border-white/5 bg-card p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/5 bg-white/5 px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </Link>
  );
}
