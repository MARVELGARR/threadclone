import { NextResponse } from "next/server";
import  {prisma}  from "@/prisma/prismaClient";


export async function POST(req : Request) {
  const content = await req.json();
  const { followingId, followerId } = content;

  try {
    const checking = await prisma.followers.findMany({
      where: {
        followerId,
        followingId,
      },
    });

    if (!checking) {
      const follow = await prisma?.followers.create({
        data: {
          followerId,
          followingId,
          status: 'yes',
        },
        include: {
          follower: true,
          following: true,
        },
      });
      if(follow){

        return NextResponse.json({ message: 'Success following' }, { status: 200 });
      }
    } else {
      const statusRecord = checking.find((item) => item.status === 'yes');
      if (statusRecord) {
        return NextResponse.json({ message: 'Already following' }, { status: 200 });
      } else {
        const updateStatus = await prisma?.followers.updateMany({
          where: {
            followerId,
            followingId,
            status: 'no',
          },
          data: {
            status: 'yes',
          },
        });
        if (updateStatus && updateStatus.count > 0) {
          return NextResponse.json({ message: 'Successfully followed' }, { status: 200 });
        } else {
          return NextResponse.json({ message: 'Failed to follow' }, { status: 400 });
        }
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const content = await req.json();
  const { followingId, followerId } = content;

  try {
    const checking = await prisma.followers.findMany({
      where: {
        followerId,
        followingId,
        status: 'yes',
      },
    });

    if (checking) {
      const unfollow = await prisma.followers.updateMany({
        where: {
          followerId,
          followingId,
          status: 'yes',
        },
        data: {
          status: 'no',
        },
      });
    
      if (unfollow && unfollow.count > 0) {
        return NextResponse.json({ message: 'Successfully unfollowed' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Failed to unfollow' }, { status: 400 });
      }
    } else {
      return NextResponse.json({ message: 'Not following' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
