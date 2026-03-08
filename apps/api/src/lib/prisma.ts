// apps/api/src/lib/prisma.ts
import { PrismaClient } from '@taxidi/database';
import { PrismaPg } from '@prisma/adapter-pg';

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) throw new Error('NODE_ENV is not set');

const adapter = new PrismaPg({
  connectionString: NODE_ENV === 'production'
      ? process.env.DATABASE_URL
      : process.env.LOCAL_DATABASE_URL,
});

// This helps with hot-reloading in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
