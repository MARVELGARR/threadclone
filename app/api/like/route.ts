import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const content = await req.json();
    const { postId, userId } = content;

    try {
        const findPostLike = await prisma?.like.findMany({
            where: {
                postId,
                userId,
            }
        });

        if (!findPostLike || findPostLike.length === 0) {
            const newPostLike = await prisma?.like.create({
                data: {
                    postId,
                    userId,
                    status: 'liked'
                }
            });
            if (newPostLike) {
                return NextResponse.json({ message: 'liked' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'not liked' }, { status: 400 });
            }
        } else {
            const statusRecord = findPostLike.find((item) => item.status === 'liked');
            if (statusRecord) {
                return NextResponse.json({ message: 'Already liked' });
            } else {
                const updatePostLike = await prisma?.like.updateMany({
                    where: {
                        postId,
                        userId,
                    },
                    data: {
                        status: 'liked'
                    }
                });
                if (updatePostLike && updatePostLike.count > 0) {
                    return NextResponse.json({ message: 'post liked' }, { status: 200 });
                } else {
                    return NextResponse.json({ message: 'not found' }, { status: 400 });
                }
            }
        }
    } catch (err) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
export async function PATCH(req: Request){

    const content = await req.json();
    const {postId, userId} = content

    try{
        const newPostLike = await prisma?.like.findMany({
            where:{
                postId,
                userId,
            }
        })
        const thePost = newPostLike?.find((post)=>post.status === 'liked')
        if(thePost && thePost.status === 'liked'){
            const updatePostLike = await prisma?.like.update({
                where:{
                    postId,
                    userId,
                    
                },
                data:{
                    status: 'unliked'
                }
            })
            if(updatePostLike){
                return NextResponse.json({message: 'disliked'},{status: 200})
            }
            else{
                return NextResponse.json({message: 'not found'},{status: 400})

            }
        }
        else{
            NextResponse.json({message: 'not liked'},{status: 400})

        }
    }
    catch(err){
        return NextResponse.json({message: ' Something went wrong'}, {status: 500})
    }
}
