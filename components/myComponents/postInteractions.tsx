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
}

const PostInteractions: React.FC<PostinteractionProps> = ({id, likeCount, isLiked, className}) => {

    const [isliking, setIsLiking] = useState(false)
    const [liked, setLiked] = useState(isLiked)
    const [likesCount, setLikesCount] = useState(likeCount)

    console.log(isLiked)

    const {data: session} = useSession()
    const userId = session?.user.id
    if(!session){
        return 
    }

    if(id){

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

        const {handleOpen, handleClose, isOpen} = useIsOpen(false)
    
        return (
            <div className={cn(`flex flex-col`, className )}>
                <div className="flex items-center gap-4">
                    
                    {likesCount}<Heart className={cn(`cursor-pointer`, liked ? ' fill-pink-700 ' : "")} onClick={liked ? handleDislike : handleLike}/>
                    <MessageCircle onClick={ isOpen ? handleClose : handleOpen}/>
                    <RepeatIcon/>
                </div>
                { isOpen && (<CommentInputArea handleCloseComment={handleClose} className="mt-[3rem] border-2 rounded-xl" postId={id} />)}
            </div>
        );
    }

}
 
export default PostInteractions;