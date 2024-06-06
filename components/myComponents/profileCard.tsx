'use client'
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ExtendedUser } from "@/util/types";
import { Button } from "../ui/button";

const ProfileCard = ({ user, className}:{
    user: ExtendedUser, className?: string
}) => {

    const {data: session} = useSession()

    return (
        <div className={cn('flex flex-col gap-3', className)}>
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                    <div className="">{user.profile?.name || ''}</div>
                    <div className=" text-sm font-thin">{session?.user.name}</div>
                </div>
                <Avatar className="w-14 h-14">
                    <AvatarImage src={session?.user.image}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="">

                <p className=" text-sm font-thin">{user.profile?.bio}</p>
                <div className="flex items-center">
                    <div className=""></div>
                    <div className="text-sm font-thin">
                        {user.profile?.followers?.length || 0} Followers
                    </div>

                </div>
            </div>
            <Button className="w-full" variant={"outline"}>{`follow`}</Button>
        </div>
    );
}
 
export default ProfileCard;