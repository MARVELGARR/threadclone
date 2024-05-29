import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prismaClient";
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
