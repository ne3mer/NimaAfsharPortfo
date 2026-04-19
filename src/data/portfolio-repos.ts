/**
 * Link each case study `slug` (same as in `upwork_projects.json` / DB) to its **public** GitHub repo.
 * When you share repositories with the project, paste the HTTPS URL here — the case study page will
 * show a live metadata card (languages, stars, description) via GitHub’s public API.
 *
 * Example:
 * ```ts
 * export const PORTFOLIO_REPO_BY_SLUG: Record<string, string> = {
 *   "nomadspot-budapest": "https://github.com/you/nomadspot",
 * };
 * ```
 *
 * Private repos: the card falls back to a simple “open repository” link (API returns no data without a token).
 */
export const PORTFOLIO_REPO_BY_SLUG: Record<string, string> = {
  "dataflow-pipeline-dashboard":
    "https://github.com/ne3mer/DataFlow-Control-Automation-Data-Pipeline-Dashboard",
  "spanish-football-news-scraper": "https://github.com/ne3mer/news-scrapper",
  "echoless-tech": "https://github.com/ne3mer/echoless-tech",
  "automated-pdf-extraction-engine":
    "https://github.com/ne3mer/Automated-PDF-Data-Extraction-Validation-Engine",
};
