"use client";

import { ArrowUpRight, BarChart3, Database, Globe2, Layers3, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import NextImage from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import type { ComponentType } from "react";

export type WorkCardData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  /** Optional 1-line headline result shown directly on the card (off-image). */
  outcome?: string;
};

/**
 * Editorial portfolio card — looks like a printed catalogue entry.
 */
export function PortfolioCard({
  project,
  index = 0,
}: {
  project: WorkCardData;
  index?: number;
}) {
  const locale = useLocale();
  const isFa = locale === "fa";
  const plateLabel = isFa ? "پلیت" : "Plate";
  const entryLabel = isFa ? "پروژه" : "Project";
  const outcomeLabel = isFa ? "خروجی" : "Outcome";
  const frameStyles = [
    {
      name: isFa ? "ادیشن کلکسیونی" : "Collector's Cut",
      frame: "border-2 border-ink",
      mat: "bg-paper p-1.5",
      tint: "after:bg-sienna/8",
      deco: "top-left",
    },
    {
      name: isFa ? "نسخه آرشیوی" : "Archive Edition",
      frame: "border border-ink/70",
      mat: "bg-paper-soft p-2",
      tint: "after:bg-olive/8",
      deco: "top-right",
    },
    {
      name: isFa ? "پریمیم پرینت" : "Premium Print",
      frame: "border border-ink",
      mat: "bg-paper p-1",
      tint: "after:bg-gold/10",
      deco: "bottom-left",
    },
    {
      name: isFa ? "گالری نایت" : "Gallery Night",
      frame: "border-2 border-ink/80",
      mat: "bg-paper-deep p-1.5",
      tint: "after:bg-ink/12",
      deco: "bottom-right",
    },
  ] as const;
  const frame = frameStyles[index % frameStyles.length];
  const concept = getProjectConcept(project, isFa);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col border border-ink/20 bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_36px_-26px_rgba(20,18,16,0.55)]"
    >
      <div className={`relative m-2 ${frame.frame} ${frame.mat}`}>
        <div className="relative aspect-4/3 w-full overflow-hidden bg-paper-deep">
          {project.image ? (
            <NextImage
              src={project.image}
              alt=""
              fill
              className="object-cover saturate-[0.84] transition-all duration-500 group-hover:saturate-[1.02] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <ProjectPoster concept={concept} isFa={isFa} />
          )}
          <div className={`pointer-events-none absolute inset-0 ${frame.tint}`} />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/20" />

          {/* Creative signature marker per card frame */}
          <span
            className={[
              "pointer-events-none absolute inline-flex h-5 min-w-5 items-center justify-center border border-ink/70 bg-paper px-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-mute",
              frame.deco === "top-left" && "top-2 left-2",
              frame.deco === "top-right" && "top-2 right-2",
              frame.deco === "bottom-left" && "bottom-2 left-2",
              frame.deco === "bottom-right" && "bottom-2 right-2",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="absolute left-0 top-0 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper">
            {plateLabel} {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-sienna">
            {entryLabel} {String(index + 1).padStart(3, "0")}
          </span>
          <span className="hidden font-mono text-[8px] uppercase tracking-[0.16em] text-ink-faint md:inline">
            {frame.name}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-ink-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sienna"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="mt-3 font-display text-[23px] leading-tight text-ink transition-colors group-hover:text-sienna md:text-[27px]">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-ink-mute">
          {project.description}
        </p>

        {project.outcome ? (
          <div className="mt-4 border-l-2 border-olive ps-3 rtl:border-l-0 rtl:border-r-2">
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-olive">
              {outcomeLabel}
            </p>
            <p className="mt-1 line-clamp-3 font-display italic text-[14px] leading-snug text-ink-soft">
              {project.outcome}
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-ink/15 pt-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="border border-ink/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ProjectPoster({
  concept,
  isFa,
}: {
  concept: {
    title: string;
    subtitle: string;
    palette: string;
    chipA: string;
    chipB: string;
    Icon: ComponentType<{ className?: string }>;
  };
  isFa: boolean;
}) {
  return (
    <div className={`absolute inset-0 ${concept.palette} text-ink`}>
      {/* textured base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.28),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(20,18,16,0.08),transparent_42%)]" />

      {/* abstract layout grid */}
      <div className="absolute inset-3 border border-ink/25" />
      <div className="absolute inset-x-3 top-1/2 h-px bg-ink/20" />
      <div className="absolute inset-y-3 left-1/2 w-px bg-ink/15" />

      {/* icon medallion */}
      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 bg-paper/70">
        <concept.Icon className="h-5 w-5 text-ink/75" />
      </div>

      {/* chips */}
      <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-1.5 max-w-[58%]">
        <span className="border border-ink/25 bg-paper/60 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-mute">
          {concept.chipA}
        </span>
        <span className="border border-ink/25 bg-paper/60 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-mute">
          {concept.chipB}
        </span>
      </div>

      {/* title block */}
      <div className="absolute inset-x-4 bottom-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.26em] text-ink-faint">
          {isFa ? "پیش‌نمایش مفهومی پروژه" : "PROJECT CONCEPT PREVIEW"}
        </p>
        <h4 className="mt-1 font-display text-[22px] leading-[0.9] text-ink">
          {concept.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-ink-mute">
          {concept.subtitle}
        </p>
      </div>
    </div>
  );
}

function getProjectConcept(project: WorkCardData, isFa: boolean) {
  const text = `${project.title} ${project.description} ${project.tags.join(" ")} ${project.outcome ?? ""}`.toLowerCase();
  const byKeyword = [
    {
      test: /(esg|dashboard|analytics|data|metric|report|insight|supply)/,
      faTitle: "داشبورد تصمیم",
      enTitle: "Decision Board",
      faSub: "تمرکز بر داده، خوانایی و تصمیم‌سازی عملیاتی",
      enSub: "Data-first composition for operational decisions.",
      palette: "bg-[linear-gradient(135deg,#e4dcc8_0%,#d5c8ac_45%,#ece4d2_100%)]",
      Icon: BarChart3,
    },
    {
      test: /(api|backend|pipeline|automation|etl|pdf|parser|validation|queue|celery)/,
      faTitle: "موتور پردازش",
      enTitle: "Processing Engine",
      faSub: "جریان‌های پشت‌صحنه، اعتبارسنجی و اتوماسیون امن",
      enSub: "Backend flows, validation, and secure automation.",
      palette: "bg-[linear-gradient(140deg,#d9cfb8_0%,#c9b893_45%,#ece4d2_100%)]",
      Icon: Database,
    },
    {
      test: /(shop|store|ecommerce|landing|portfolio|ui|ux|website|brand|nomad|travel)/,
      faTitle: "سطح محصول",
      enTitle: "Product Surface",
      faSub: "ترکیب روایت، تجربه کاربری و هویت بصری",
      enSub: "Narrative-driven UI with conversion clarity.",
      palette: "bg-[linear-gradient(125deg,#efe6d5_0%,#d8c5a8_48%,#ece4d2_100%)]",
      Icon: Layers3,
    },
    {
      test: /(security|auth|trust|audit|governance|compliance)/,
      faTitle: "لایه اعتماد",
      enTitle: "Trust Layer",
      faSub: "قابلیت اتکا، کنترل دسترسی و ردپای تصمیم",
      enSub: "Governance-aware architecture and audit trails.",
      palette: "bg-[linear-gradient(130deg,#e7dfcb_0%,#c9c0a8_55%,#ece4d2_100%)]",
      Icon: ShieldCheck,
    },
    {
      test: /(launch|mvp|startup|build|deploy|ship)/,
      faTitle: "لانچ محصول",
      enTitle: "Launch Narrative",
      faSub: "از فرضیه تا نسخه قابل ارائه در کمترین زمان",
      enSub: "From hypothesis to shippable story, fast.",
      palette: "bg-[linear-gradient(120deg,#efe0cf_0%,#d9b391_42%,#ece4d2_100%)]",
      Icon: Rocket,
    },
  ];

  const picked = byKeyword.find((item) => item.test.test(text));
  const fallback = {
    faTitle: "پروژه ویژه",
    enTitle: "Signature Project",
    faSub: "روایت مهندسی + کسب‌وکار در یک قاب قابل اسکن",
    enSub: "Engineering and business narrative in one frame.",
    palette: "bg-[linear-gradient(130deg,#e9dfcc_0%,#d7c9ac_50%,#ece4d2_100%)]",
    Icon: Sparkles,
  };

  const model = picked ?? fallback;
  const chips = project.tags.slice(0, 2);
  return {
    title: isFa ? model.faTitle : model.enTitle,
    subtitle: isFa ? model.faSub : model.enSub,
    palette: model.palette,
    chipA: chips[0] ?? (isFa ? "استراتژی" : "strategy"),
    chipB: chips[1] ?? (isFa ? "اجرا" : "delivery"),
    Icon: model.Icon ?? Globe2,
  };
}
