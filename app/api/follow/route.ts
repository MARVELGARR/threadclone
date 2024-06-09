import { NextResponse } from "next/server";



export async function POST( req: Request){

    const content = await req.json();

    const { followingId, followerId} = content;

    try{
        const follow = await prisma?.followers.create({
            data: {
                followerId,
                followingId,
                status: 'yes'
            }
        })
        if(follow){
            return NextResponse.json({message: 'Success following'}, {status: 200})
        }
        else{
            return NextResponse.json({message: 'Error following'}, {status: 400})

        }
    }
    catch(error){
        return NextResponse.json({ error: error}, { status: 500})
    }
}