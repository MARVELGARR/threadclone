import { Followers, Like, Post, PrismaClient, Profile, User } from '@prisma/client';

// Declare global Prisma client to avoid multiple instances
declare global {
  var prisma: PrismaClient | undefined;
}

export type ExtendedProfile = Profile & { 
  follower: Followers[], 
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
  id?: string;
  postId?: string;
  story: string[],
  images: string[],
  tags: string[],
  user: ExtendedUser,
  currentUser?: ExtendedUser
  follower?: Followers[]
  profile?: ExtendedProfile
  like?: Like[]
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export type commentCardProps={
  commentId?: string;
  postId?: string;
  story: string[],
  images?: string[],
  tags?: string[],
  user: ExtendedUser,
  currentUser?: ExtendedUser
  follower?: Followers[]
  profile?: ExtendedProfile
  like?: Like[]
  className?: string

}

export type profileCardProps = {
  user: ExtendedUser, 
  followerCount: number, 
  className?: string, 
  currentUser: ExtendedUser, 
  isFollowing: boolean, 
  unfollow: ()=> void, 
  follow: ()=> void,
}

export type updateProfileProps ={
  className: string,
  id: string,
  name: string,
  links: string,
  bio: string
}