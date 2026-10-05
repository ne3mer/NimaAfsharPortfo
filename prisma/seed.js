/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_INITIAL_EMAIL || "ne3mer@gmail.com";
  const password = process.env.ADMIN_INITIAL_PASSWORD;

  if (!password) {
    throw new Error(
      "ADMIN_INITIAL_PASSWORD environment variable is required to seed the admin account. Please set ADMIN_INITIAL_PASSWORD in your environment."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: "Nima Admin",
    },
  });

  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
