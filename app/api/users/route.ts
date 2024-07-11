import { NextResponse } from "next/server"
import {prisma} from '@/prisma/prismaClient'

export async function GET(req: Request){

    const content = await req.json()
    const { userId } = content

    try{
        const comments = await prisma.reply.findMany({
            where:{
                userId: userId
            },
            include: {
                user: true
            }
        })
        if(comments){
            return NextResponse.json({message: "Comments gotten"},{status: 200})
        }
    }
    catch(error){
        return NextResponse.json({message: error}, {status: 500})
    }
}