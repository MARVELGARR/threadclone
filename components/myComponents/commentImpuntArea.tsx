'use client'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

import toast from "react-hot-toast";
import { X } from "lucide-react";

type CommentInputProps = {
    id: number,
    value: string,
}

type CommentInputAreaProps = {

}

const CommentInputArea = ( {postId, className, handleCloseComment} : {postId: string, handleCloseComment: ()=>void, className: string} ) => {
    const { data: session } = useSession();
    const [comment, setComment] = useState<CommentInputProps[]>([{ id: 0, value: "" }]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (id: number, value: string) => {
        const newComment = comment.map(thread =>
            thread.id === id ? { ...thread, value } : thread
        );

        if (value.length > 80 && comment[comment.length - 1].id === id) {
            newComment.push({ id: newComment.length, value: "", });
        }

        setComment(newComment);
    };


    const handleSubmit = () => {
        handleSend(comment);
        setComment([{ id: 0, value: "" }]);
    };

    const handleClose = (id: number) => {
        const newComment = comment.filter(comment => comment.id !== id);
        setComment(newComment);
    };

    const handleSend = async (filteredComment: CommentInputProps[]) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/comment/${session?.user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ filteredComment: comment, postId }),
            });

            if (response.ok) {
                toast.success('Comment posted');
                handleCloseComment()
            } else {
                const errorData = await response.json();
                toast.error(`Failed to create comment: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create thread: Network error or server unreachable');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={ cn("w-full p-4",className)}>
            <div className="flex flex-col w-full">
                {comment.map((value, index) => (
                    <div key={index} className="flex flex-col items-start gap-3 relative border-b border-gray-200 pb-4 mb-4">
                        {index > 0 && (
                            <X className="cursor-pointer absolute right-5 top-5" onClick={() => handleClose(value.id)} />
                        )}
                        <div className="flex items-start gap-3 w-full">
                            <div className="relative">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={session?.user.image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                {index < comment.length - 1 && (
                                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-300" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-xl">{session?.user.name}</div>
                                <Input
                                    className="border-b-2 w-full p-2 text-lg"
                                    placeholder="Start a thread"
                                    value={value.value}
                                    onChange={(e) => handleInputChange(value.id, e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full pt-3 flex items-center justify-end">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default CommentInputArea;
