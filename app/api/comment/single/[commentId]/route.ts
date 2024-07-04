import { NextResponse } from "next/server";
import  {prisma}  from "@/prisma/prismaClient";

export async function DELETE(req: Request, {params}:{params: { commentId: string}}){

    try{

        const newComment = await prisma.reply.deleteMany({
            where:{
                id: params.commentId,     
            }
        })
        if(newComment){
            return NextResponse.json({message: 'comment deleted ', data: newComment}, {status: 200})
        }
        else{
            return NextResponse.json({message: 'not found '}, {status: 400})

        }
    }
    catch(error){
        return NextResponse.json({mesage: 'something went wrong', error}, {status: 500})
    }

}