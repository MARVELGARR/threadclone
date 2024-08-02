'use client'

import UpdateProfileDialog from "@/components/myDialogs/updateProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExtendedUser } from "@/util/types";
import { Instagram } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Bio = ({ data }: { data: ExtendedUser | null }) => {
    const { data: session } = useSession();
    const avatarImage = session?.user?.image || '';

    let profileLink = 'https://www.instagram.com'; // Default URL
    if (data?.profile?.links) {
        try {
            profileLink = new URL(data.profile.links).href;
        } catch (e) {
            console.error("Invalid URL in profile links, falling back to default:", e);
        }
    }

    return (
        <div className="text-wrap flex flex-col md:gap-4 flex-shrink">
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center text-left">
                    <div className="w-full text-left font-bold text-2xl">{data?.profile?.name || <div className='italic'>no profile name</div>}</div>
                    <div className="w-full">@{data?.name}</div>
                </div>
                <Avatar className=" w-[50px] h-[50px] md:w-[70px] md:h-[70px]">
                    <AvatarImage src={avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="">{data?.profile?.bio || <div className='italic'>no bio....................................................({new Array(44)})</div>}</div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <div className=""></div>
                        <div className="">{data?.profile?.follower?.length || 0}</div>
                        <div className="">Followers</div>
                    </div>
                    <Link className='italic text-gray-500' href={profileLink}>{data?.profile?.links}</Link>
                </div>
                <Link href='https://www.instagram.com' className="">
                    <Instagram className="w-9 h-9"/>
                </Link>
            </div>
            <UpdateProfileDialog id={data?.profile?.id || " "} name={data?.profile?.name || "No name"} links={data?.profile?.links || ""} bio={data?.profile?.bio || "No bio"} className="w-full font-extrabold"/>
        </div>
    );
}

export default Bio;
