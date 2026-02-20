import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import argon2 from "argon2"; // You'll need to install this

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await argon2.hash("admin123");

  const admin = await prisma.users.upsert({
    where: { email: "admin@taxidi.com" },
    update: {},
    create: {
      email: "admin@taxidi.com",
      password: hashedPassword,
      role: ["ADMIN"], // Ensure this matches your Enum in schema.prisma
      firstname: "System",
      lastname: "Admin",
      phone: "+919947619644",
    },
  });

  console.log({ admin });
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
