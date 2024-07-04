
import { NextResponse } from "next/server";
import  {prisma}  from "@/prisma/prismaClient";

export async function POST(req: Request, {params}:{params: { userId: string}}){

    const content = await req.json();
    const { postId, filteredComment } = content
    const stories = filteredComment.map((item: { value: string }) => item.value).join('\n');
    try{

        const newComment = await prisma.reply.create({
            data:{
                postId:postId,
                story:stories.split('\n'),
                userId: params.userId         
            }
        })
        if(newComment){
            return NextResponse.json({message: 'commented ', data: newComment}, {status: 200})
        }
        else{
            return NextResponse.json({message: 'not commented '}, {status: 400})

        }
    }
    catch(error){
        return NextResponse.json({mesage: 'something went wrong', error}, {status: 500})
    }

}

export async function DELETE(req: Request, {params}:{params: { userId: string}}){

    const content = await req.json();
    const { postId, filteredComment } = content
    const stories = filteredComment.map((item: { value: string }) => item.value).join('\n');

    try{

        const newComment = await prisma.reply.create({
            data:{
                postId,
                story:stories.split('\n'),
                userId: params.userId         
            }
        })
        if(newComment){
            return NextResponse.json({message: 'commented ', data: newComment}, {status: 200})
        }
        else{
            return NextResponse.json({message: 'not commented '}, {status: 400})

        }
    }
    catch(error){
        return NextResponse.json({mesage: 'something went wrong', error}, {status: 500})
    }

}