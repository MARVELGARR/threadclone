'use client'

import { redirect } from "next/navigation";

import getUser from "@/hooks/getUser";
import Bio from "@/components/userProfileComponent/userProfileBio";
import ReplyRepost from "@/components/userProfileComponent/profileReplyRepost";

import getCurrentUser from "@/hooks/getCurrentUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ExtendedUser } from "@/util/types";
import useFollowStatus from "@/hooks/useFollowStatus";
import Loading from "@/components/myComponents/loadingPage";

interface ProfilePageProps {
    params: {
        userId: string;
    };
    children: React.ReactNode;
}

export default function UserLayout({ params, children }: ProfilePageProps){
    const {data: session} = useSession();
    const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null)
    const [user, setUser] = useState<ExtendedUser | null>(null)
    if (!session) {
        redirect('/login');
    }

    
    useEffect(()=>{
        
        const fetchPresentUser = async(userId: string) =>{

            const presentUser = await getCurrentUser(userId)
            setCurrentUser(presentUser as ExtendedUser)
        }
        const fetchPostUser = async(userId: string) =>{

            const postUser = await getUser(userId)
            setUser(postUser as ExtendedUser)
        }
        fetchPresentUser(session.user.id)
        fetchPostUser(params.userId)
        
    },[currentUser, params.userId, session.user.id])



    const followStatus = useFollowStatus(currentUser?.profile?.id || null, user?.profile?.id || null);
    const { isFollowing, follow, unfollow, followerCount } = followStatus;

    if(currentUser && user){

        return (
            <>
                <title>{`@${user?.name}`}</title>
                <div className="flex flex-col flex-wrap z-99999">
                    <Bio followerCount={followerCount} isFollowing={isFollowing} follow={follow} unfollow={unfollow}   currentUser={currentUser}  data={user} />
                    <ReplyRepost userId={user.id} />
                    {children}
                </div>
            </>
        );
    }
    else{
        return (
            <Loading/>
        )
    }
}