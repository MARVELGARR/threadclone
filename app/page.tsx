
import CreatePost from "@/components/myComponents/createPost";
import ForYouButton from "@/components/myComponents/forYouButton";
import PostCard from "@/components/myComponents/postCard";
import getCurrentUser from "@/hooks/getCurrentUser";
import { useGetAllPosts } from "@/hooks/getPosts";
import { authOptions } from "@/util/authOptions";
import { ExtendedUser } from "@/util/types";
import { getServerSession } from "next-auth";




const HomePage = async () => {
    const session = await getServerSession(authOptions)
    const  posts  = await useGetAllPosts()

    if(session){

        if(posts){

            const currentUser = await getCurrentUser(session?.user.id)
            return (
                <div className="">
                    <CreatePost className=' border-b-2 pb-[2rem]'/>
                    <div className="flex flex-col gap-2">
                        {posts.map((post, index)=>{
                            return(
                                <PostCard
                                    key={index}
                                    story={post.story}
                                    images={post.images}
                                    tags={post.tags}
                                    user={post.user}
                                    currentUser = {currentUser as ExtendedUser}
                                    postId={post.id}
                                    reply={post.reply}
                                />
                            )
                        })}
                    </div>
                    <ForYouButton className='absolute bottom-10 left-10'/>
                </div>
            );
        }
        else{
            return (
                <div className=" w-full h-full flex items-center justify-center font-bold text-2xl"> No Posts Gotten!</div>
            ) 
        }

    }
    else{
        return (
            <div className=" w-full h-full flex items-center justify-center font-bold text-2xl"> User Unauthenticated!</div>
        )
    }
}
 
export default HomePage;