"use client";

import { useTranslations } from "next-intl";

const technologies = [
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Prisma", category: "backend" },
  { name: "Celery", category: "backend" },
  { name: "PostgreSQL", category: "data" },
  { name: "MongoDB", category: "data" },
  { name: "Redis", category: "data" },
  { name: "Docker", category: "infra" },
  { name: "ESG analytics", category: "research" },
  { name: "Design Science (DSR)", category: "research" },
];

const groups = [
  { key: "frontend", label: "Frontend" },
  { key: "backend",  label: "Backend & Runtime" },
  { key: "data",     label: "Data" },
  { key: "infra",    label: "Infra" },
  { key: "research", label: "Research" },
];

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
            <p className="kicker">§05 — The bench</p>
            <h2 className="mt-2 font-display text-3xl italic text-ink md:text-4xl">
              {t("title")}
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
            Tools I keep on the desk · {technologies.length} listed
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-5">
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
                      className="flex items-baseline gap-3 font-display text-[17px] leading-snug text-ink"
                    >
                      <span className="font-mono text-[10px] tracking-[0.18em] text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {tech.name}
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
