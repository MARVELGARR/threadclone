'use client'
import PostComments from '@/components/myComponents/postComment';
import { ExtendedReply, ExtendedUser } from '@/util/types';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';



const UserReplies =  () => {
    const [comments, setComments] = useState<ExtendedReply[] | null>(null)
    const session = useSession()
    const {userId} = useParams()

    const handleGetComment = async() =>{
        try{
            const data = await fetch(`/api/users`,{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userId)
            })
            if(data.ok){
                const response = await data.json();
                setComments(response)
            }

        }
        catch(error){
            return `message: ${error}`
        }
    }
    
    if(comments){

        return (
            <>
                <div className="flex flex-col gap-2">
                    {comments.map((comment, index)=>{
                        return(
                            <PostComments 
                                key={index}
                                story={comment.story}
                                user={comment.user as ExtendedUser}                                
                            />
                        )
                    })}
                </div>
            </>
        );
    }
    else{
        return <div className=" w-full h-full flex items-center justify-center font-bold text-2xl"> No Comments Gotten!</div>
    }

}
 
export default UserReplies;