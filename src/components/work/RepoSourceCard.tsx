import { ExternalLink, GitBranch, GitFork, Github, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { fetchGitHubRepoSnapshot, parseGitHubRepoUrl } from "@/lib/github-repo-public";

type Props = {
  repoUrl: string;
};

export async function RepoSourceCard({ repoUrl }: Props) {
  const t = await getTranslations("Project");
  const snapshot = await fetchGitHubRepoSnapshot(repoUrl);
  const parsed = parseGitHubRepoUrl(repoUrl);

  return (
    <section
      className="not-prose relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_60px_-24px_rgba(0,0,0,0.7)]"
      aria-labelledby="repo-source-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div className="relative border-b border-white/5 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10 px-5 py-4 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Github className="h-5 w-5 text-white" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="repo-source-heading"
              className="text-base font-semibold tracking-tight text-white md:text-lg"
            >
              {t("sourceRepoTitle")}
            </h2>
            {parsed ? (
              <p className="truncate font-mono text-xs text-zinc-400 md:text-sm">
                {parsed.owner}/{parsed.repo}
              </p>
            ) : null}
          </div>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-primary/40 hover:bg-primary/10"
          >
            {t("viewOnGitHub")}
            <ExternalLink className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        </div>
      </div>

      <div className="relative space-y-4 px-5 py-5 md:px-6 md:py-6">
        {snapshot ? (
          <>
            {snapshot.description ? (
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {snapshot.description}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400/90" aria-hidden />
                <span className="text-muted-foreground">{t("starsLabel")}</span>
                <span className="font-medium tabular-nums text-white">
                  {snapshot.stars.toLocaleString()}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GitFork className="h-4 w-4 text-zinc-500" aria-hidden />
                <span className="text-muted-foreground">{t("forksLabel")}</span>
                <span className="font-medium tabular-nums text-white">
                  {snapshot.forks.toLocaleString()}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GitBranch className="h-4 w-4 text-zinc-500" aria-hidden />
                <span className="font-medium text-white">{snapshot.defaultBranch}</span>
              </span>
            </div>

            {snapshot.languages.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {t("languagesLabel")}
                </p>
                <div
                  className="flex h-2.5 w-full overflow-hidden rounded-full bg-black/50 ring-1 ring-white/10"
                  role="img"
                  aria-label={snapshot.languages.map((l) => `${l.name} ${l.pct}%`).join(", ")}
                >
                  {snapshot.languages.map((lang) => (
                    <span
                      key={lang.name}
                      style={{
                        width: `${lang.pct}%`,
                        backgroundColor: lang.color,
                      }}
                      className="min-w-px first:rounded-l-full last:rounded-r-full"
                      title={`${lang.name} ${lang.pct}%`}
                    />
                  ))}
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
                  {snapshot.languages.map((lang) => (
                    <li key={lang.name} className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: lang.color }}
                        aria-hidden
                      />
                      {lang.name}{" "}
                      <span className="tabular-nums text-zinc-500">{lang.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {snapshot.homepage ? (
              <p className="text-xs text-zinc-500">
                <span className="text-zinc-600">{t("homepageLabel")}: </span>
                <a
                  href={snapshot.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {snapshot.homepage}
                </a>
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("repoMetaUnavailable")}
          </p>
        )}
      </div>
    </section>
  );
}
