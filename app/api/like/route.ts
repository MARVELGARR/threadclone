import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";

export async function POST(req: Request) {
    const content = await req.json();
    const { postId, userId } = content;

    try {
        const findPostLike = await prisma.like.findFirst({
            where: {
                postId,
                userId,
            }
        });

        if (!findPostLike) {
            const newPostLike = await prisma.like.create({
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
        } else if (findPostLike.status === 'liked') {
            return NextResponse.json({ message: 'Already liked' });
        } else {
            const updatePostLike = await prisma.like.update({
                where: {
                    id: findPostLike.id,
                },
                data: {
                    status: 'liked'
                }
            });

            if (updatePostLike) {
                return NextResponse.json({ message: 'post liked' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'not found' }, { status: 400 });
            }
        }
    } catch (err) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const content = await req.json();
    const { postId, userId } = content;

    try {
        const findPostLike = await prisma.like.findFirst({
            where: {
                postId,
                userId,
            }
        });

        if (findPostLike && findPostLike.status === 'liked') {
            const updatePostLike = await prisma.like.update({
                where: {
                    id: findPostLike.id,
                },
                data: {
                    status: 'unliked'
                }
            });

            if (updatePostLike) {
                return NextResponse.json({ message: 'disliked' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'not found' }, { status: 400 });
            }
        } else {
            return NextResponse.json({ message: 'not liked' }, { status: 400 });
        }
    } catch (err) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
