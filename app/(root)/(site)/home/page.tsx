import CreatePost from "@/components/myComponents/createPost";
import ForYouButton from "@/components/myComponents/forYouButton";
import { useGetAllPosts } from "@/hooks/getPosts";
import { Post } from '@prisma/client';

const HomePage = async () => {
    const  responds  = await useGetAllPosts()
    
    return (
        <div className="">
            <CreatePost className=' border-b-2 pb-[2rem]'/>
                {JSON.stringify(responds)}
            <ForYouButton className='absolute bottom-10 left-10'/>
        </div>
    );
}
 
export default HomePage;