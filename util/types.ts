// global.d.ts
import { Followers, PrismaClient, Profile, User } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

type ExtendedProfile = Profile & { followers: Followers[] }

export type ExtendedUser = User & { profile: ExtendedProfile | null, };

export type updateProfileProps ={
  className?:string;
  id: string
  name:string;
  bio:string;
  links: string;
}