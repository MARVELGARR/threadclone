
import PostCards from "@/components/myComponents/postCard"
import PostComments from "@/components/myComponents/postComment"
import { authOptions } from "@/util/authOptions"
import { ExtendedUser } from "@/util/types"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from '../../../../../prisma/prismaClient';



const specificPosst = async ({params}:{params: {postId: string}}) => {
    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/login")
    }

    const posts = await prisma.post.findUnique({
        where:{
            id: params.postId
        },
        include:{
            user: {
                include: {
                    profile: true,
                    
                     
                }
            },
            reply: {
                include:{
                    like: true,
                    user: true
                }
            },
        }
        
        
    })

    const comments = posts?.reply

    if(posts){
        
        return (
            <div className="flex flex-col gap-3 mt-2">
    
    
                <PostCards
                    images={posts.images}
                    story={posts.story}
                    tags={posts.tags}
                    user={posts.user as ExtendedUser}
                    postId={posts.id}
                    reply={posts.reply}
                    
                />
    
    
                {
                    comments?.map((comment, index)=>{
                        return(
                            <PostComments
                                key={index}
                                className="w-[40rem]"
                                story={comment.story}
                                commentId={comment.id}
                                user={comment.user as ExtendedUser}
                            />
                        )
                    })
                }
    
            </div>
        )
    }
    else{
        return <div className=" w-full h-full flex items-center justify-center font-bold text-2xl"> No Posts Gotten!</div>
    }

}
 
export default specificPosst;