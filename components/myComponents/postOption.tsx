'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
  
type PostOptionsProps = {
    postId: string | undefined
}

const PostOption: React.FC<PostOptionsProps> = ({ postId }) => {
    if (!postId) {
        return null;
    }
    
    if(postId){

        const handleDeletePost = async (postId: string) => {
            try {
                const response = await fetch(`http://localhost:3000/api/post/${postId}`, {
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
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center p-2">...</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Post options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => handleDeletePost(postId)}>Delete <Trash2Icon/></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}

export default PostOption;
