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
                
            },
            include: {
              follower: true,
              following: true,
            },
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

export async function DELETE(req: Request) {
    const content = await req.json();
    const { followingId, followerId } = content;
  
    try {
      const unfollow = await prisma?.followers.deleteMany({
        where: {
          followerId,
          followingId,
          status: 'yes'
        }
      });
  
      if (unfollow) {
        return NextResponse.json({ message: 'Successfully unfollowed' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Failed to unfollow' }, { status: 400 });
      }
    } catch (error) {
      return NextResponse.json({ error: 'Error unfollowing', details: error }, { status: 500 });
    }
}