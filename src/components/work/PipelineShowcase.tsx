"use client";

import { motion } from "framer-motion";
import {
  Braces,
  ChevronRight,
  Cpu,
  Database,
  Gamepad2,
  Globe,
  Puzzle,
  Timer,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { Localized, PipelineStep, ShowcaseIcon } from "@/lib/project-showcase-types";

const ICONS: Record<ShowcaseIcon, LucideIcon> = {
  globe: Globe,
  braces: Braces,
  database: Database,
  timer: Timer,
  cpu: Cpu,
  puzzle: Puzzle,
  gamepad: Gamepad2,
  workflow: Workflow,
};

function pick(loc: Localized, locale: string) {
  return locale === "fa" ? loc.fa : loc.en;
}

type Props = {
  title: Localized;
  steps: PipelineStep[];
  locale: string;
};

export function PipelineShowcase({ title, steps, locale }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
        {pick(title, locale)}
      </h2>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2">
        {steps.map((step, i) => {
          const Icon = ICONS[step.icon] ?? Workflow;
          return (
            <div key={i} className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-2">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="relative flex-1 rounded-2xl border border-white/10 bg-zinc-950/80 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {pick(step.title, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pick(step.body, locale)}
                  </p>
                </div>
              </motion.div>
              {i < steps.length - 1 ? (
                <div
                  className="flex justify-center py-0.5 lg:shrink-0 lg:self-center lg:py-0"
                  aria-hidden
                >
                  <ChevronRight className="h-5 w-5 rotate-90 text-primary/35 lg:rotate-0" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
