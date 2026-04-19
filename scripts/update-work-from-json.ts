import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(process.cwd(), "upwork_projects.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const projects = JSON.parse(raw) as Array<{
    slug: string;
    title: string;
    client: string;
    services?: string;
    year?: string;
    description: string;
    tags: string;
    content: string;
    status?: string;
    image?: string;
  }>;

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
