'use client'
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { commentCardProps } from "@/util/types";
import { useSession } from "next-auth/react";
import PostOption from "./postOption";




const PostComments : React.FC<commentCardProps> = ({ like, story, user, commentId, className}) => {



    const {data: session} = useSession()


    const isThread = story.length > 1;

    return (
        <div className={cn(`p-4 z-9 cursor-pointer bg-white shadow rounded-lg  max-w-full ${isThread ? 'border-l-4 border-blue-500' : ''}`, className)}>
                <div className="flex items-start gap-4 w-full relative">
                    <Avatar className="w-12 h-12">
                        <AvatarImage  src={user.image || undefined} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full">
                            <Link 
                                href={`/user/${user.id}`}
                                className="font-bold relative cursor-pointer hover:underline"
                            >
                                {user.name}
                                
                            </Link>
    
                            <PostOption postId={commentId}/>
                        </div>
                        <div className="mt-2 space-y-2">
                            <div className="break-words max-w-[500px]">
                                {story[0]}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
    );
}
 
export default PostComments;