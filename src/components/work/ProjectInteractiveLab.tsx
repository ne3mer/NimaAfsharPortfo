"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Play, RotateCcw, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import type { InteractiveLabConfig } from "@/lib/project-interactive-types";

function pick(loc: { en: string; fa: string }, locale: string) {
  return locale === "fa" ? loc.fa : loc.en;
}

type Props = {
  workSlug: string;
  config: InteractiveLabConfig;
  locale: string;
};

export function ProjectInteractiveLab({ workSlug, config, locale }: Props) {
  const t = useTranslations("Project");
  const [phase, setPhase] = useState<"idle" | "terminal" | "fetching" | "done" | "error">(
    "idle"
  );
  const [visibleLines, setVisibleLines] = useState(0);
  const [result, setResult] = useState<unknown>(null);
  const [err, setErr] = useState<string | null>(null);

  const reset = useCallback(() => {
    setPhase("idle");
    setVisibleLines(0);
    setResult(null);
    setErr(null);
  }, []);

  const fetchDemo = useCallback(
    async (scenario?: "pass" | "fail") => {
      let url = `/api/portfolio-demo/${encodeURIComponent(workSlug)}`;
      if (workSlug === "automated-pdf-extraction-engine" && scenario) {
        url += `?scenario=${scenario}`;
      }
      const res = await fetch(url);
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error ?? `HTTP ${res.status}`);
      }
      return res.json();
    },
    [workSlug]
  );

  const runWithTerminal = useCallback(
    async (lines: string[]) => {
      setErr(null);
      setResult(null);
      setPhase("terminal");
      setVisibleLines(0);
      for (let i = 0; i < lines.length; i++) {
        await new Promise((r) => setTimeout(r, 180 + i * 12));
        setVisibleLines(i + 1);
      }
      setPhase("fetching");
      try {
        const json = await fetchDemo();
        setResult(json);
        setPhase("done");
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
        setPhase("error");
      }
    },
    [fetchDemo]
  );

  const title = pick(config.title, locale);
  const subtitle = pick(config.subtitle, locale);

  if (config.variant === "pdf") {
    return (
      <PdfLabBody
        config={config}
        locale={locale}
        title={title}
        subtitle={subtitle}
        workSlug={workSlug}
        t={t}
        fetchDemo={fetchDemo}
      />
    );
  }

  const lines = config.terminalLines;
  const resultTitle = pick(config.resultTitle, locale);

  return (
    <section
      className="not-prose overflow-hidden rounded-2xl border border-primary/25 bg-zinc-950/90 shadow-[0_0_0_1px_rgba(168,85,247,0.12),0_24px_80px_-28px_rgba(0,0,0,0.85)]"
      aria-labelledby="interactive-lab-heading"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-primary/15 via-purple-500/10 to-transparent px-5 py-3 md:px-6">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
            {t("interactiveLabBadge")}
          </p>
          <h2 id="interactive-lab-heading" className="text-base font-semibold text-white md:text-lg">
            {title}
          </h2>
        </div>
      </div>

      <div className="space-y-4 px-5 py-5 md:px-6 md:py-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void runWithTerminal(lines)}
            disabled={phase === "terminal" || phase === "fetching"}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {phase === "terminal" || phase === "fetching" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Play className="h-4 w-4" aria-hidden />
            )}
            {t("interactiveLabRun")}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            {t("interactiveLabReset")}
          </button>
        </div>

        <div
          className="overflow-hidden rounded-xl border border-white/10 bg-[#070708] font-mono text-[12px] leading-relaxed text-zinc-300 md:text-[13px]"
          dir="ltr"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-900/90 px-3 py-2">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[10px] text-zinc-500">demo-shell — {workSlug}</span>
          </div>
          <div className="min-h-[120px] space-y-1 px-3 py-3">
            {lines.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-zinc-200"
              >
                <span className="select-none text-zinc-600">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {line}
              </motion.p>
            ))}
            {phase === "fetching" ? (
              <p className="flex items-center gap-2 text-primary">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                {t("interactiveLabFetching")}
              </p>
            ) : null}
          </div>
        </div>

        <AnimatePresence>
          {result != null && phase === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <h3 className="text-sm font-semibold text-white">{resultTitle}</h3>
              <pre className="max-h-[min(420px,55vh)] overflow-auto rounded-xl border border-white/10 bg-black/50 p-4 text-[11px] leading-relaxed text-emerald-100/95 md:text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
              <p className="text-xs text-zinc-500">{t("interactiveLabFootnote")}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {err ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {err}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function PdfLabBody({
  config,
  locale,
  title,
  subtitle,
  workSlug,
  t,
  fetchDemo,
}: {
  config: Extract<InteractiveLabConfig, { variant: "pdf" }>;
  locale: string;
  title: string;
  subtitle: string;
  workSlug: string;
  t: (key: string) => string;
  fetchDemo: (scenario?: "pass" | "fail") => Promise<unknown>;
}) {
  const [loading, setLoading] = useState<"pass" | "fail" | null>(null);
  const [result, setResult] = useState<unknown>(null);

  const run = async (scenario: "pass" | "fail") => {
    setLoading(scenario);
    setResult(null);
    try {
      const json = await fetchDemo(scenario);
      setResult(json);
    } finally {
      setLoading(null);
    }
  };

  const resultTitle = pick(config.resultTitle, locale);

  return (
    <section className="not-prose overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-950/90 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-emerald-500/15 via-transparent to-transparent px-5 py-3 md:px-6">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
          <Zap className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400/90">
            {t("interactiveLabBadge")}
          </p>
          <h2 className="text-base font-semibold text-white md:text-lg">{title}</h2>
        </div>
      </div>
      <div className="space-y-4 px-5 py-5 md:px-6 md:py-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => void run("pass")}
            disabled={loading !== null}
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-4 text-left text-sm font-medium text-white transition hover:bg-emerald-500/20 disabled:opacity-50"
          >
            {loading === "pass" ? (
              <Loader2 className="mb-2 h-5 w-5 animate-spin text-emerald-400" />
            ) : null}
            {pick(config.passLabel, locale)}
          </button>
          <button
            type="button"
            onClick={() => void run("fail")}
            disabled={loading !== null}
            className="rounded-2xl border border-red-500/25 bg-red-500/5 px-4 py-4 text-left text-sm font-medium text-white transition hover:bg-red-500/15 disabled:opacity-50"
          >
            {loading === "fail" ? (
              <Loader2 className="mb-2 h-5 w-5 animate-spin text-red-300" />
            ) : null}
            {pick(config.failLabel, locale)}
          </button>
        </div>
        {result != null ? (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">{resultTitle}</h3>
            <pre className="max-h-[min(420px,55vh)] overflow-auto rounded-xl border border-white/10 bg-black/50 p-4 text-[11px] leading-relaxed text-emerald-100/95 md:text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
            <p className="text-xs text-zinc-500">{t("interactiveLabFootnote")}</p>
          </div>
        ) : null}
        <p className="font-mono text-[10px] text-zinc-600" dir="ltr">
          GET /api/portfolio-demo/{workSlug}?scenario=pass|fail
        </p>
      </div>
    </section>
  );
}
