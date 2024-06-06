import { Followers, Like, Post, PrismaClient, Profile, User } from '@prisma/client';

// Declare global Prisma client to avoid multiple instances
declare global {
  var prisma: PrismaClient | undefined;
}

export type ExtendedProfile = Profile & { 
  followers: Followers[], 
  following: Followers[] 
};

export type ExtendedUser = User & { 
  profile: ExtendedProfile | null 
};

export interface ExtendedPost extends Post {
  [x: string]: any;
  user: ExtendedUser;
  like: Like[];
}


export type PostCardProps = {
  story: string[],
  images: string[],
  tags: string[],
  user: ExtendedUser,
  follower?: Followers[]
  profile?: ExtendedProfile
}

export type updateProfileProps ={
  className: string,
  id: string,
  name: string,
  links: string,
  bio: string
}