import { prisma } from "@/prisma/prismaClient";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";
export async function useGetAllPosts( userId?: string): Promise<Post[]>{
    try{
        const responds = await prisma.post.findMany()
        return responds   
    }
    catch (error) {
        console.error(error);
        redirect('/')
    }
}