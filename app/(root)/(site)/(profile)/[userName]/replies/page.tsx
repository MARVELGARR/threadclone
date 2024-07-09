import PostComments from '@/components/myComponents/postComment';
import { prisma } from '@/prisma/prismaClient';
import { authOptions } from '@/util/authOptions';
import { ExtendedUser } from '@/util/types';
import { getServerSession } from 'next-auth';

const Replies = async () => {

    const session = await getServerSession(authOptions)
    const userId = session?.user.id

    const comments = await prisma.reply.findMany({
        where:{
            userId: userId
        },
        include: {
            user: true
        }
    })
    if(comments){

        return (
            <>
                <div className="flex flex-col gap-[3rem]">
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
        return <>Loading...</>
    }

}
 
export default Replies;