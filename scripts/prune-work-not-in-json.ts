import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(process.cwd(), "upwork_projects.json");
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as { slug: string }[];
  const allowed = new Set(raw.map((p) => p.slug));

  const rows = await prisma.work.findMany({ select: { id: true, slug: true } });
  for (const r of rows) {
    if (!allowed.has(r.slug)) {
      await prisma.work.delete({ where: { id: r.id } });
      console.log("deleted work:", r.slug);
    }
  }
  console.log("done. allowed:", [...allowed].join(", "));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
