import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Cpu, Gauge, Workflow } from "lucide-react";

const CAPABILITIES = [
  { label: "AI Engineering", icon: Cpu },
  { label: "Product Systems", icon: Workflow },
  { label: "Realtime Infra", icon: Gauge },
];

const EXPERIENCE_PANELS = [
  {
    title: "Custom SaaS",
    desc: "Bespoke platforms, dashboards, and multi-tenant apps for ambitious operators.",
    accent: "from-blue-500/40 to-cyan-400/10",
  },
  {
    title: "Automation & AI",
    desc: "Copilots, workflow orchestration, and internal tools built on modern AI stacks.",
    accent: "from-purple-500/40 to-pink-500/10",
  },
  {
    title: "Launch & Scale",
    desc: "Ops playbooks, DevOps pipelines, and reliability engineering baked in.",
    accent: "from-emerald-500/40 to-teal-400/10",
  },
];

const STAT_BLOCKS = [
  { label: "Products shipped", value: "48", suffix: "+" },
  { label: "Avg. load", value: "< 1", suffix: "s" },
  { label: "Launch window", value: "6", suffix: "weeks" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#05040a] to-black py-24 text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(36,99,255,0.25),_transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_rgba(56,189,248,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="container relative z-10 px-4">
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="max-w-2xl space-y-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              NIMA Studio
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium engineering partners for teams that outgrow templates.
              </h1>
              <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
                We architect and ship high-performance software—crafted systems
                that feel cinematic, scale with your roadmap, and keep ops calm.
                Every pixel, animation, and pipeline is bespoke.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/start" className={buttonVariants({ variant: "premium", size: "lg", className: "h-12 rounded-full px-8 text-base shadow-[0_20px_60px_rgba(37,99,235,0.35)]" })}>
                  Start your build
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/work" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 rounded-full border-white/20 bg-white/5 px-8 text-base text-white hover:bg-white/10" })}>
                  View case studies
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {CAPABILITIES.map((capability) => (
                <span
                  key={capability.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70"
                >
                  <capability.icon className="h-4 w-4 text-white/70" />
                  {capability.label}
                </span>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {STAT_BLOCKS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-4 py-5"
                >
                  <p className="text-sm uppercase tracking-wide text-white/50">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {stat.value}
                    <span className="text-lg text-white/60">{stat.suffix}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-[40px] border border-white/10 bg-white/[0.02] p-6 shadow-[0_25px_120px_rgba(2,6,23,0.65)] backdrop-blur-xl">
              <div className="grid gap-6">
                {EXPERIENCE_PANELS.map((panel) => (
                  <div
                    key={panel.title}
                    className="rounded-3xl border border-white/10 bg-gradient-to-r p-6 text-white shadow-inner"
                    style={{
                      backgroundImage: `linear-gradient(120deg, ${panel.accent})`,
                    }}
                  >
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/60">
                      <div className="h-2 w-2 rounded-full bg-white/70" />
                      Capability
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold">{panel.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{panel.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                      <span className="inline-flex h-1.5 w-6 rounded-full bg-white/40" />
                      NIMA
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-black/50 p-6">
                <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                  Delivery loop
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/70">
                  {["Blueprint", "Prototype", "Ship", "Scale"].map((phase, i) => (
                    <div
                      key={phase}
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5"
                    >
                      <span className="text-xs text-white/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {phase}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
