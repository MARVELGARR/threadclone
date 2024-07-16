'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
  
type PostOptionsProps = {
    postId: string | undefined
    className?: string 
}

const PostOption: React.FC<PostOptionsProps> = ({ postId, className }) => {

        
        const handleDeletePost = async (postId: string | undefined) => {
            try {
                const response = await fetch(`/api/post/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    toast.success('Post deleted');
                } else if (response.status === 404) {
                    toast.error('Post not found');
                } else {
                    toast.error('Failed to delete post');
                }
            } catch (error) {
                toast.error('An error occurred while deleting the post');
            }
        }

        
        return (
            <div className={cn('', className)}>

                <DropdownMenu >
                    <DropdownMenuTrigger className="flex items-center justify-center p-2 z-50">...</DropdownMenuTrigger>
                    <DropdownMenuContent className=" ml-[2rem]">
                        <DropdownMenuLabel>Post options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => handleDeletePost(postId)}>Delete <Trash2Icon/></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    
    



}

export default PostOption;
