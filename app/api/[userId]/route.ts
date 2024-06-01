import { NextResponse } from "next/server";
import  {prisma}  from "@/prisma/prismaClient";
 // Ensure to adjust the path accordingly

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
    const content = await req.json();
    const { name, bio, links, id } = content;

    try {
        const profile = await prisma.profile.findFirst({
            where: {
                id,
            },
        });

        if (!profile) {
            const newProfile = await prisma.profile.create({
                data: {
                    name,
                    bio,
                    links,
                    userId: params.userId,
                },
            });
            return NextResponse.json(newProfile);
        } else {
            const profileUpdated = await prisma.profile.update({
                where: {
                    id,
                },
                data: {
                    name,
                    bio,
                    links,
                },
            });
            return NextResponse.json(profileUpdated);
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while updating the profile.' }, { status: 500 });
    }
}



export async function POST(req: Request, { params }: { params: { userId: string } }) {
    try {
        const content = await req.json();
        const { threads } = content;

        const stories = threads.map((item: { value: string }) => item.value).join('\n');
        const images = threads.flatMap((item: { images: string[] }) => item.images);
        const tags = threads.flatMap((item: { tags: string[] }) => item.tags);

        const postData: any = {
            story: stories.split('\n'), // Ensure story is an array of strings
            images: images,
            tags: tags,
            userId: params.userId,
        };

        if (threads[0]?.threadId) {
            postData.threadId = threads[0].threadId;
        }

        const newPost = await prisma.post.create({
            data: postData,
        });

        if (newPost) {
            return NextResponse.json({ message: 'New post created', data: newPost }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Post could not be created', data: newPost }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: `An error occurred while creating the post. ${error}` }, { status: 500 });
    }
}

    