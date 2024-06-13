'use client';

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ExtendedUser } from "@/util/types";
import { Button } from "../ui/button";


const ProfileCard = ({ user, className, follow, isFollowing, unfollow, currentUser }: {
    user: ExtendedUser, className?: string, currentUser: ExtendedUser, isFollowing: boolean, unfollow: ()=> void, follow: ()=> void,
}) => {
    const { data: session } = useSession();

    const isMyPost = user.profile?.userId == currentUser?.id;



   

    if (session) {
        return (
            <div className={cn('flex flex-col gap-3', className)}>
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <div className="">{user.profile?.name || ''}</div>
                        <div className="text-sm font-thin">{session?.user.name}</div>
                    </div>
                    <Avatar className="w-14 h-14">
                        <AvatarImage src={session?.user.image} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <p className="text-sm font-thin">{user.profile?.bio}</p>
                    <div className="flex items-center">
                        <div></div>
                        <div className="text-sm font-thin">
                            {JSON.stringify(user.profile?.follower.length)} Followers
                        </div>
                    </div>
                </div>
                {!isMyPost && (
                    <Button 
                        type="button" 
                        onClick={isFollowing ? unfollow : follow} 
                        className="w-full" 
                        variant={isFollowing ? "outline" : "default"}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                )}
            </div>
        );
    } else {
        return (
            <div className="">Error</div>
        );
    }
};

export default ProfileCard;
