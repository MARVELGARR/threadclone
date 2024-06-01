'use client'
import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import CreatePostDialog from "../myDialogs/createPostDialog";

const CreatePost = ({className}:{className?: string}) => {

    const {data: session} = useSession()
    return (
        <div className={cn('flex items-center w-full gap-2', className)}>
            <Avatar className="">
                <AvatarImage src={session?.user.image} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CreatePostDialog className="w-full"/>

            <Button type="submit" className="rounded-xl">Post</Button>
        </div>
    );
}
 
export default CreatePost;