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
      className="not-prose relative overflow-hidden border border-ink bg-card"
      aria-labelledby="repo-source-heading"
    >
      <div className="relative border-b border-ink bg-paper-soft px-5 py-4 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center border border-ink/30 bg-paper">
            <Github className="h-5 w-5 text-ink" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="repo-source-heading"
              className="font-display text-xl text-ink md:text-2xl"
            >
              {t("sourceRepoTitle")}
            </h2>
            {parsed ? (
              <p className="truncate font-mono text-[10px] text-ink-mute md:text-xs">
                {parsed.owner}/{parsed.repo}
              </p>
            ) : null}
          </div>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 border border-ink px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
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
              <p className="text-sm leading-relaxed text-ink-mute md:text-base">
                {snapshot.description}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-4 border-y border-ink/20 py-3 text-sm text-ink-mute">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400/90" aria-hidden />
                <span>{t("starsLabel")}</span>
                <span className="font-medium tabular-nums text-ink">
                  {snapshot.stars.toLocaleString()}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GitFork className="h-4 w-4 text-ink-faint" aria-hidden />
                <span>{t("forksLabel")}</span>
                <span className="font-medium tabular-nums text-ink">
                  {snapshot.forks.toLocaleString()}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GitBranch className="h-4 w-4 text-ink-faint" aria-hidden />
                <span className="font-medium text-ink">{snapshot.defaultBranch}</span>
              </span>
            </div>

            {snapshot.languages.length > 0 ? (
              <div className="space-y-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                  {t("languagesLabel")}
                </p>
                <div
                  className="flex h-2 w-full overflow-hidden border border-ink/20 bg-paper-deep"
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
                      className="min-w-px"
                      title={`${lang.name} ${lang.pct}%`}
                    />
                  ))}
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-mute">
                  {snapshot.languages.map((lang) => (
                    <li key={lang.name} className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2"
                        style={{ backgroundColor: lang.color }}
                        aria-hidden
                      />
                      {lang.name}{" "}
                      <span className="tabular-nums text-ink-faint">{lang.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {snapshot.homepage ? (
              <p className="text-xs text-ink-mute">
                <span className="text-ink-faint">{t("homepageLabel")}: </span>
                <a
                  href={snapshot.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sienna hover:underline"
                >
                  {snapshot.homepage}
                </a>
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-sm leading-relaxed text-ink-mute">
            {t("repoMetaUnavailable")}
          </p>
        )}
      </div>
    </section>
  );
}
