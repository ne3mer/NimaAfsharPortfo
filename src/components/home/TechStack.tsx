"use client";

import { useTranslations } from "next-intl";

const technologies = [
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "data" },
  { name: "MongoDB", category: "data" },
  { name: "Redis", category: "data" },
  { name: "Docker", category: "tooling" },
  { name: "REST APIs", category: "tooling" },
  { name: "GitHub", category: "tooling" },
  { name: "Vercel", category: "tooling" },
];

const groups = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "data", label: "Data" },
  { key: "tooling", label: "Infrastructure & tooling" },
];

const projectIndex: Record<string, string> = {
  "Next.js": "LeadPilot · NIMA Studio",
  React: "OptiSupply · DataFlow · LeadPilot",
  TypeScript: "OptiSupply · LeadPilot · NIMA Studio",
  "Tailwind CSS": "OptiSupply · LeadPilot · NIMA Studio",
  "Node.js": "OptiSupply",
  Python: "DataFlow · PDF Engine · Spanish News",
  FastAPI: "DataFlow Control",
  Express: "OptiSupply",
  PostgreSQL: "DataFlow · NIMA Studio",
  MongoDB: "OptiSupply",
  Redis: "DataFlow Control",
  Docker: "DataFlow Control",
  "REST APIs": "OptiSupply · DataFlow",
  GitHub: "All source-backed cases",
  Vercel: "OptiSupply · NIMA Studio",
};

/**
 * "The bench" — typeset as a printed colophon of tools, grouped by lane.
 * No marquee. No glow. Just a clean type page.
 */
export function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <section className="relative bg-paper">
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-4">
          <div>
            <p className="kicker">§04 — The bench</p>
            <h2 className="mt-2 font-display text-3xl italic text-ink md:text-4xl">
              {t("title")}
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Tools I keep on the desk · {technologies.length} listed
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => {
            const tools = technologies.filter((tech) => tech.category === g.key);
            return (
              <div key={g.key} className="break-inside-avoid">
                <p className="mb-3 border-b border-ink pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-sienna">
                  {g.label}
                </p>
                <ul className="space-y-2">
                  {tools.map((tech, i) => (
                    <li
                      key={tech.name}
                      className="group border-b border-ink/0 py-1 font-display text-[17px] leading-snug text-ink transition-colors hover:border-ink/15 hover:text-sienna"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] tracking-[0.18em] text-ink-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {tech.name}
                      </span>
                      <span className="mt-1 block max-h-0 overflow-hidden ps-8 font-mono text-[8px] uppercase tracking-[0.12em] text-ink-mute opacity-0 transition-all duration-200 group-hover:max-h-6 group-hover:opacity-100">
                        Used in · {projectIndex[tech.name]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
