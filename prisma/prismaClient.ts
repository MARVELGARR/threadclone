// prismaClient.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
