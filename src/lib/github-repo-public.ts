const GH_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "NimaAfsharPortfolio/1.0",
} as const;

/** Approximate Linguist-style colors for the language bar. */
const LANG_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  MDX: "#fcb32c",
};

export type GitHubLanguageSlice = {
  name: string;
  pct: number;
  color: string;
};

export type GitHubRepoSnapshot = {
  owner: string;
  repo: string;
  description: string | null;
  stars: number;
  forks: number;
  htmlUrl: string;
  homepage: string | null;
  defaultBranch: string;
  languages: GitHubLanguageSlice[];
};

export function parseGitHubRepoUrl(
  url: string
): { owner: string; repo: string } | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");
    if (host !== "github.com") return null;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");
    return { owner, repo };
  } catch {
    return null;
  }
}

function colorForLang(name: string): string {
  return LANG_COLOR[name] ?? "#8b949e";
}

export async function fetchGitHubRepoSnapshot(
  repoUrl: string
): Promise<GitHubRepoSnapshot | null> {
  const parsed = parseGitHubRepoUrl(repoUrl);
  if (!parsed) return null;

  const { owner, repo } = parsed;
  const base = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const [repoRes, langRes] = await Promise.all([
      fetch(base, {
        headers: GH_HEADERS,
        next: { revalidate: 86_400 },
      }),
      fetch(`${base}/languages`, {
        headers: GH_HEADERS,
        next: { revalidate: 86_400 },
      }),
    ]);

    if (!repoRes.ok) return null;

    const body = (await repoRes.json()) as {
      description: string | null;
      stargazers_count: number;
      forks_count: number;
      html_url: string;
      homepage: string | null;
      default_branch: string;
    };

    let languages: GitHubLanguageSlice[] = [];
    if (langRes.ok) {
      const raw = (await langRes.json()) as Record<string, number>;
      const totalBytes = Object.values(raw).reduce((a, b) => a + b, 0);
      if (totalBytes > 0) {
        const sorted = Object.entries(raw).sort((a, b) => b[1] - a[1]);
        const top = sorted.slice(0, 6);
        const topSum = top.reduce((a, [, b]) => a + b, 0);
        languages = top.map(([name, bytes]) => ({
          name,
          pct: Math.round((bytes / totalBytes) * 1000) / 10,
          color: colorForLang(name),
        }));
        const rest = totalBytes - topSum;
        if (rest > totalBytes * 0.004) {
          languages.push({
            name: "Other",
            pct: Math.round((rest / totalBytes) * 1000) / 10,
            color: "#484f58",
          });
        }
      }
    }

    return {
      owner,
      repo,
      description: body.description,
      stars: body.stargazers_count,
      forks: body.forks_count,
      htmlUrl: body.html_url,
      homepage: body.homepage,
      defaultBranch: body.default_branch,
      languages,
    };
  } catch {
    return null;
  }
}
