import CreatePost from "@/components/myComponents/createPost";
import ForYouButton from "@/components/myComponents/forYouButton";

const HomePage = () => {
    return (
        <div className="">
            <CreatePost className=' border-b-2 pb-[2rem]'/>
            <ForYouButton className='absolute bottom-10 left-10'/>
        </div>
    );
}
 
export default HomePage;