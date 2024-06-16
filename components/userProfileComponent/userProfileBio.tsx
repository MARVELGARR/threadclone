'use client'

import UpdateProfileDialog from "@/components/myDialogs/updateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useIsOpen from "@/hooks/useOpen";


import { ExtendedUser } from "@/util/types";
import { Instagram } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import FollowUnfollow from "../myComponents/follow_unfollow";







const Bio = ({data, currentUser}: {
    data: ExtendedUser | null,
    currentUser: ExtendedUser 
}) => {
    const {data: session} = useSession()
    const isMyPost =  data?.id === session?.user.id


    return (
        <div className=" text-wrap flex flex-col gap-4">
            <div className="flex items-center justify-between ">
                <div className="flex flex-col items-center text-left">
                    
                    <div className="w-full text-left font-bold text-2xl">{data?.profile?.name || <div className=' italic'>no profile name</div>}</div>
                    <div className="w-full">@{data?.name}</div>
                </div>
                <Avatar className="w-[70px] h-[70px]">
                    <AvatarImage src={data?.image || 'sasa'} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="">{data?.profile?.bio || <div className=' italic'>no bio....................................................({new Array(44)})</div>}</div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <div className=""></div>
                        <div className="">{data?.profile?.followers?.length || 0}</div>
                        <div className="">Followers</div>
                    </div>
                    <Link className=' italic text-gray-500 ' href={data?.profile?.links || 'www.instagram.com'}>{data?.profile?.links}</Link>
                </div>
                <Link
                    href='www.instagram.com'
                    className=""
                >
                    <Instagram/>
                </Link>
            </div>
            
            { isMyPost ? (<UpdateProfileDialog id={data?.profile?.id || " "} name={data?.profile?.name || " "} link={data?.profile?.links|| ""} bio={data?.profile?.bio || ""} className="w-full font-extrabold"/>):(
                <div className="flex items-center w-full justify-between px-[7rem]">
                    <FollowUnfollow currentUser={currentUser} user={data}/>
                    <Button variant='outline'>mention</Button>
                </div>
            )}
        </div>
    );
}
 
export default Bio;