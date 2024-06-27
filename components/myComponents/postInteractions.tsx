'use client'
import { cn } from "@/lib/utils";
import { Like } from "@prisma/client";
import { Heart, MessageCircle, RepeatIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import {useState } from "react";
import toast from "react-hot-toast";
import CommentInputArea from "./commentImpuntArea";
import useIsOpen from "@/hooks/useOpen";

type PostinteractionProps = {
    id?: string,
    className?: string
    like?: Like[]
    isLiked: boolean
    likeCount?: number
    replyCount?: number
}

const PostInteractions: React.FC<PostinteractionProps> = ({id, replyCount, likeCount, isLiked, className}) => {

    const [isliking, setIsLiking] = useState(false)
    const [liked, setLiked] = useState(isLiked)
    const [likesCount, setLikesCount] = useState(likeCount || 0)

    console.log(isLiked)

    const {data: session} = useSession()
    const userId = session?.user.id



    const {handleOpen, handleClose, isOpen} = useIsOpen(false)
    const handleLike = async () =>{
        setIsLiking(true)
        const liking = await fetch('http://localhost:3000/api/like',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {postId: id, userId} ),
        })
        if(liking.ok){
            toast.success('liked')
            setLiked(true)
            setLikesCount((prev)=> prev+1)
            setIsLiking(false)
        }
        else{
            toast.error('failed liking')
        }
    }
    
    const handleDislike = async () =>{
        setIsLiking(true)
        const liking = await fetch('http://localhost:3000/api/like',{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {postId: id, userId} ),
        })
        if(liking.ok){
            toast.success('liked')
            setLiked(false)
            setLikesCount((prev)=> prev-1)
            setIsLiking(false)
        }
        else{
            toast.error('failed liking')
        }
    }



    return (
        <div className={cn(`flex flex-col`, className  )}>
            <div className="flex items-center gap-[5rem]">
                <div className="flex items-center gap-2">

                    {likesCount}<Heart className={cn(`cursor-pointer`, liked ? ' fill-pink-700 ' : "")} onClick={liked ? handleDislike : handleLike}/>
                </div>
                <div className="flex items-center gap-2">
                    {replyCount}
                    <MessageCircle className=" cursor-pointer" onClick={ isOpen ? handleClose : handleOpen}/>
                </div>
                <RepeatIcon/>
            </div>
            { isOpen && id && (<CommentInputArea handleCloseComment={handleClose} className="mt-[3rem] border-2 rounded-xl" postId={id} />)}
        </div>
    );

}
 
export default PostInteractions;