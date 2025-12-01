import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.work.upsert({
    where: { slug: "griffon-cafe" },
    update: {},
    create: {
      title: "Griffon Cafe",
      slug: "griffon-cafe",
      description: "A modern cafe website.",
      client: "Griffon Cafe",
      tags: "Web Design, Development, SEO",
      content: "# Griffon Cafe\n\nThis is a test project.\n\n- Feature 1\n- Feature 2",
      status: "Live",
      image: "/images/placeholder.jpg"
    },
  });

  console.log({ project });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
