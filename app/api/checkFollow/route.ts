import { NextResponse } from "next/server";
import  {prisma}  from "@/prisma/prismaClient";

export async function POST( req: Request){

    const content = await req.json();

    const { followingId, followerId} = content;

    try{
        const follow = await prisma.followers.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });
        const followersCount = await prisma?.followers.findMany({
            where: {
                followingId,
                status: 'yes'
            },
        });
        return NextResponse.json({ isFollowing:  follow?.status == 'yes', followerCount: followersCount?.length  }, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Error checking follow status', error: error }, {status: 500});
    }
}

