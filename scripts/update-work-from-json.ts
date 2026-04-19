import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

type ProjectRow = {
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
  image?: string;
};

function emptyToNull(s: string | undefined | null): string | null {
  if (s == null) return null;
  const t = s.trim();
  return t.length ? t : null;
}

async function main() {
  const jsonPath = path.join(process.cwd(), "upwork_projects.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const projects = JSON.parse(raw) as ProjectRow[];

  for (const p of projects) {
    await prisma.work.update({
      where: { slug: p.slug },
      data: {
        title: p.title,
        client: p.client,
        services: p.services ?? undefined,
        year: p.year ?? undefined,
        description: p.description,
        tags: p.tags,
        content: p.content,
        status: p.status ?? "Live",
        image: p.image ?? null,
        titleEn: emptyToNull(p.titleEn),
        descriptionEn: emptyToNull(p.descriptionEn),
        contentEn: emptyToNull(p.contentEn),
        servicesEn: emptyToNull(p.servicesEn),
        tagsEn: emptyToNull(p.tagsEn),
      },
    });
    console.log("updated:", p.slug);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
