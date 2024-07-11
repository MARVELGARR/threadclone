'use client'

import UpdateProfileDialog from "@/components/myDialogs/updateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ExtendedUser } from "@/util/types";
import { Instagram } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import FollowUnfollow from "../myComponents/follow_unfollow";








const Bio = ({data, followerCount, follow, unfollow, isFollowing}: {
    data: ExtendedUser | null,
    follow: ()=> void,
    unfollow: ()=> void,
    isFollowing: Boolean,
    followerCount: Number
    currentUser: ExtendedUser 
}) => {
    const {data: session} = useSession()
    const isMyPost =  data?.id === session?.user.id
    const userImage = session?.user?.image || '';

    let profileLink = 'https://www.instagram.com'; // Default URL
    if (data?.profile?.links) {
        try {
            profileLink = new URL(data.profile.links).href;
        } catch (e) {
            console.error("Invalid URL in profile links, falling back to default:", e);
        }
    }



    return (
        <div className=" text-wrap flex flex-col gap-4">
            <div className="flex items-center justify-between ">
                <div className="flex flex-col items-center text-left">
                    
                    <Link href={`/${session?.user.id}`} className="w-full text-left font-bold text-2xl hover:underline">{data?.profile?.name || <div className=' italic'>no profile name</div>}</Link>
                    <div className="w-full">@{data?.name}</div>
                </div>
                <Avatar className="w-[70px] h-[70px]">
                    <AvatarImage src={userImage} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="">{data?.profile?.bio || <div className=' italic'>no bio....................................................({new Array(44)})</div>}</div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <div className="">{JSON.stringify(followerCount)}</div>
                        <div className="">Followers</div>
                    </div>
                    .
                    <Link className=' italic text-gray-500 ' href={profileLink}>{data?.profile?.links}</Link>
                </div>
                <Link
                    href='www.instagram.com'
                    className=""
                >
                    <Instagram/>
                </Link>
            </div>
            
            { isMyPost ? (<UpdateProfileDialog id={data?.profile?.id || " "} name={data?.profile?.name || " "} links={data?.profile?.links|| ""} bio={data?.profile?.bio || ""} className="w-full font-extrabold"/>):(
                <div className="flex items-center w-full gap-[4rem]  px-[7rem]">
                    <FollowUnfollow className='w-full' isFollowing={isFollowing}  follow={follow} unfollow={unfollow} />
                    <Button className="w-full" variant='outline'>mention</Button>
                </div>
            )}
        </div>
    );
}
 
export default Bio;