import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_INITIAL_EMAIL || "admin@nima.studio";
  const password = process.env.ADMIN_INITIAL_PASSWORD;

  if (!password) {
    throw new Error(
      "ADMIN_INITIAL_PASSWORD environment variable is required. Please set it before running this script."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: "Admin User",
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
