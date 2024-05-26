// global.d.ts
import { Account, PrismaClient, Profile } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export type User ={
  id: string,
  name: string,
  email: string,
  emailVerified?: Date, 
  image?: string,
  hashedPassword?: string
  access_token?: string
  token_type?: string
  createdAt: Date
  updatedAt: Date
  account: Account[]
  profile: Profile[]
  
}