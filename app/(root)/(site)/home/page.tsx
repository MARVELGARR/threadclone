import CreatePost from "@/components/myComponents/createPost";
import ForYouButton from "@/components/myComponents/forYouButton";
import PostCard from "@/components/myComponents/postCard";
import { useGetAllPosts } from "@/hooks/getPosts";



const HomePage = async () => {
    const  posts  = await useGetAllPosts()
    
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
                            
                        />
                    )
                })}
            </div>
            <ForYouButton className='absolute bottom-10 left-10'/>
        </div>
    );
}
 
export default HomePage;