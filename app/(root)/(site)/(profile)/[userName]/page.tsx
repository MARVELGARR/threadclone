

import { ExtendedUser } from "@/util/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PostCards from "./_components/myPostCard";
import { authOptions } from "@/util/authOptions";
import { prisma } from '../../../../../prisma/prismaClient';

const Threads = async () => {

    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/login")
    }

    const posts = await prisma.post.findMany({
        where:{
            userId: session.user.id
        },
        include:{
            user: {
                include: {
                    profile: true
                }
            }
        }
        
        
    })

    if(!posts){
       return (
        <div className="">Loading..</div>
       )
    }

    return (
        <div className="flex flex-col gap-3 mt-2">
            {posts.map((post, index)=>{
                return (
                    <PostCards
                        key={index}
                        images={post.images}
                        story={post.story}
                        tags={post.tags}
                        user={post.user as ExtendedUser}
                    />
                )
            })}

        </div>
    );
    

}
 
export default Threads