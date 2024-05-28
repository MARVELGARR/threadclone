// global.d.ts
import { Account, PrismaClient, Profile, User } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}


export type ExtendedUser = User & { profile: Profile[] };