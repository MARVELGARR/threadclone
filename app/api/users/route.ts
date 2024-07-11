import { NextResponse } from "next/server"
import {prisma} from '@/prisma/prismaClient'

export async function GET(req: Request){

    const content = await req.json()
    const { userId } = content

    try{
        const comments = await prisma.reply.findMany({
            where:{
                userId: params.userId
            },
            include: {
                user: true
            }
        })
    }
    catch(error){
        return NextResponse.json({message: error}, {status: 500})
    }
}