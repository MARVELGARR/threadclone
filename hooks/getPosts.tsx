import { prisma } from "@/prisma/prismaClient";
import { ExtendedPost } from "@/util/types";

import { redirect } from "next/navigation";
export async function useGetAllPosts( userId?: string): Promise<ExtendedPost[]>{
    try{
        const responds = await prisma.post.findMany({
            include: {
                like: true,
                user: {
                    include :{
                        profile: {
                            include: {
                                follower: true,
                          },
                        }
                    }
                }

            }
        })
        return responds as ExtendedPost[]
    }
    catch (error) {
        console.error(error);
        redirect('/')
    }
}