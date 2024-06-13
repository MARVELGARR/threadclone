import { NextResponse } from "next/server";

export async function POST( req: Request){

    const content = await req.json();

    const { followingId, followerId} = content;

    try{
        const follow = await prisma?.followers.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });
        return NextResponse.json({ isFollowing: !!follow }, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Error checking follow status', error: error }, {status: 500});
    }
}