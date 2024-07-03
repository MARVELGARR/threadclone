// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

export const prisma: PrismaClient = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
