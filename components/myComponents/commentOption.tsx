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
    commentId: string | undefined
}

const CommentOption: React.FC<PostOptionsProps> = ({ commentId }) => {
    if (commentId) {
        

        const handleDeleteComment = async (commentId: string | undefined) => {
            try {
                const response = await fetch(`/api/comment/single/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    toast.success('Comment deleted');
                } else if (response.status === 404) {
                    toast.error('Post not found');
                } else {
                    toast.error('Failed to delete Comment');
                }
            } catch (error) {
                toast.error('An error occurred while deleting the Comment');
            }
        }
        
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center p-2">...</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Post options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => handleDeleteComment(commentId)}>Delete <Trash2Icon/></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
    



}

export default CommentOption;
