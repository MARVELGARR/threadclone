import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostCards from "@/components/myComponents/postCard";
import { ExtendedUser } from "@/util/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Threads = async () => {

    const session = await getServerSession(authOptions)
    if(!session){
        redirect("/login")
    }

    const posts = await prisma?.post.findMany({
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

    if(posts){

        return (
            <div className="flex flex-col gap-3 mt-2">
                {posts?.map((post)=>{
                    return (
                        <PostCards
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
    else{
        return (
            <div className=" w-full h-full flex items-center justify-center">
                No Threads!
            </div>
        )
    }
}
 
export default Threads