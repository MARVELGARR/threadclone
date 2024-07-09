
import PostComments from '@/components/myComponents/postComment';
import { prisma } from '@/prisma/prismaClient';
import { authOptions } from '@/util/authOptions';
import { ExtendedUser } from '@/util/types';
import { getServerSession } from 'next-auth';
import { useParams } from 'next/navigation';

const UserReplies = async ({params}:{params: { userId: string}}) => {

    const session = await getServerSession(authOptions)

    const comments = await prisma.reply.findMany({
        where:{
            userId: params.userId
        },
        include: {
            user: true
        }
    })
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