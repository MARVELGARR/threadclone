import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import getUser from "@/hooks/getUser";
import Bio from "@/components/userProfileComponent/userProfileBio";
import ReplyRepost from "@/components/userProfileComponent/profileReplyRepost";

import getCurrentUser from "@/hooks/getCurrentUser";






interface ProfilePageProps {
    params: {
        userId: string;
    };
    children: React.ReactNode;
}

export default async function({ params, children }: ProfilePageProps){
    const session = await getServerSession(authOptions);
    
    if (!session) {
        redirect('/login');
    }
        
    const currentUser = await now({userId: session?.user.id});
    const user = await wait({userId: params.userId})

    if(!currentUser?.profile){
        return "no current user"
    }
    if(!user?.profile){
        return 'no user'
    }
   
    console.log(user);
    
    if (!user) {
        return (
            <div className="">
                ...Loading
            </div>
        );
    }

    
    return (
        <>
            <title>{`@${user?.name}`}</title>
            <div className="flex flex-col flex-wrap z-99999">
                <Bio currentUser={currentUser}  data={user} />
                <ReplyRepost userId={user.id} />
                {children}
            </div>
        </>
    );
};


export async function wait({userId}:
    {userId: string}
){
    const session = await getServerSession(authOptions)
    if(!session){
        return console.error("User not authenticated")
    }
    const currentUser = await getUser(userId)
    
    return currentUser
}
export async function now({userId}:{
    userId: string
}){
    const session = await getServerSession(authOptions)
    if(!session){
        return console.error("User not authenticated")
    }
    const currentUser = await getCurrentUser(userId)
    
    return currentUser
}
