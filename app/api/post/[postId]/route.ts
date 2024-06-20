import { NextResponse } from "next/server";
import  {prisma}  from "@/prisma/prismaClient";

export async function DELETE(req: Request, { params }: { params: { postId: string } }) {
    try {
        const deletePost = await prisma?.post.deleteMany({
            where: {
                id: params.postId
            }
        });

        if (deletePost) {
            return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
