'use client';

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ExtendedUser } from "@/util/types";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const ProfileCard = ({ user, className, currentUser }: {
    user: ExtendedUser, className?: string, currentUser: ExtendedUser
}) => {

    const { data: session } = useSession();

    const PostUserProfile = user.profile?.id;
    const isNotMyPost = user.profile?.userId !== currentUser.id;

    // Ensure followers is an array
    const followers = user.profile?.followers ?? [];
    const alreadyFollowed = followers.some(follow => follow.followingId === PostUserProfile);

    const handleFollow = async () => {
        try {
            const follow = await fetch(`/api/follow`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ followingId: PostUserProfile, followerId: currentUser?.profile?.id }),
            });
            if (follow.ok) {
                toast.success("Followed");
            } else {
                toast.error("Failed to follow");
            }
        } catch (error) {
            toast.error("Failed to follow");
        }
    };

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
                            {followers.length} Followers
                        </div>
                    </div>
                </div>
                {isNotMyPost && (
                    <Button 
                        type="button" 
                        onClick={handleFollow} 
                        disabled={alreadyFollowed} 
                        className="w-full" 
                        variant={alreadyFollowed ? "default" : "outline"}>
                        {alreadyFollowed ? 'Followed' : 'Follow'}
                    </Button>
                )}
            </div>
        );
    } else {
        return (
            <div className="">Error</div>
        );
    }
}

export default ProfileCard;
