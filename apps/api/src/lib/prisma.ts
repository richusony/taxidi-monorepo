import dotenv from 'dotenv';
dotenv.config();

// apps/api/src/lib/prisma.ts
import { PrismaClient } from '@taxidi/database';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// This helps with hot-reloading in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
