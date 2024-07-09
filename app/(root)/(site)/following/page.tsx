import ForYouButton from "@/components/myComponents/forYouButton";
import { authOptions } from "@/util/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from '@/prisma/prismaClient';
import PostCards from "@/components/_components/myPostCard";
import { ExtendedUser } from "@/util/types";
const Following = async () => {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id

    const posts = await prisma.post.findMany({
        where:{
            userId
        },
        include:{
            user:{
                include:{
                    profile:{
                        include:{
                            following: true
                        }
                    }
                }
            }
        }
        
    })

    const isFollowinfPosts = posts.filter((post)=> post.user.profile?.following.filter((isFollowing)=> isFollowing.status == "yes"))

    return (
        <div className="">
            <div className="">
                {
                    isFollowinfPosts.map((post, index)=>{
                        return (
                            <PostCards
                                key={index} 
                                story={post.story} 
                                images={post.images} 
                                tags={post.tags} 
                                user={post.user as ExtendedUser}                                 
                            />
                        )
                    })
                }
            </div>
            
            <ForYouButton className="absolute bottom-10 left-10"/>
        </div>
    );
}
 
export default Following;