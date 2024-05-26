

import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function GET(req: Request){

    const content =  await req.json();
    const { userId} = content;
    const session = await getServerSession(authOptions)
    
    try{
        if(!session){
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: {
                id:userId
            }
        })
        if (!user) {

            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        else{

            return NextResponse.json(user)
        }

    }
    catch(error){
        console.error("Error getting user:", error);
        return NextResponse.json({error:"Error getting user"}, {status: 500})
    }
}

