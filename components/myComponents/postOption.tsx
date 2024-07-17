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
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
  
type PostOptionsProps = {
    postId: string | undefined
    className?: string 
}

const PostOption: React.FC<PostOptionsProps> = ({ postId, className }) => {

    const router = useRouter()
        
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
            finally{
               router.refresh();
            }
        }

        
        return (
            <div className={cn('', className)}>

                <DropdownMenu >
                    <DropdownMenuTrigger className="relative flex items-center justify-center p-2 z-50">...</DropdownMenuTrigger>
                    <DropdownMenuContent className=" ">
                        <DropdownMenuLabel>Post options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => handleDeletePost(postId)}>Delete <Trash2Icon/></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    
    



}

export default PostOption;
