import fs from "fs";
import path from "path";

import { cache } from "react";

import type { Work } from "@prisma/client";

/** Shape of one row in `upwork_projects.json` (source of truth for public portfolio). */
export type UpworkProjectJson = {
  slug: string;
  title: string;
  titleEn?: string;
  client: string;
  services?: string;
  servicesEn?: string;
  year?: string;
  description: string;
  descriptionEn?: string;
  tags: string;
  tagsEn?: string;
  content: string;
  contentEn?: string;
  status?: string;
  image?: string | null;
};

export const loadUpworkProjects = cache((): UpworkProjectJson[] => {
  const jsonPath = path.join(process.cwd(), "upwork_projects.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(raw) as UpworkProjectJson[];
});

/** Build a Prisma-shaped `Work` from JSON when the DB row is missing (e.g. before seed). */
export function workFromJsonRow(row: UpworkProjectJson): Work {
  return {
    id: `json:${row.slug}`,
    createdAt: new Date(0),
    updatedAt: new Date(0),
    slug: row.slug,
    title: row.title,
    client: row.client,
    services: row.services ?? null,
    year: row.year ?? null,
    description: row.description,
    tags: row.tags,
    image: row.image ?? null,
    content: row.content,
    status: row.status ?? "Live",
    titleEn: row.titleEn ?? null,
    descriptionEn: row.descriptionEn ?? null,
    contentEn: row.contentEn ?? null,
    servicesEn: row.servicesEn ?? null,
    tagsEn: row.tagsEn ?? null,
  };
}

/**
 * For each slug in JSON (canonical order), use the DB row when present; otherwise JSON.
 */
export function mergeWorksWithJson(
  dbRows: Work[],
  jsonRows: UpworkProjectJson[]
): Work[] {
  const dbBySlug = new Map(dbRows.map((w) => [w.slug, w]));
  return jsonRows.map((row) => {
    const db = dbBySlug.get(row.slug);
    return db ?? workFromJsonRow(row);
  });
}
