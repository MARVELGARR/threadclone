'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useIsOpen from "@/hooks/useOpen";
import { ExtendedUser } from "@/util/types";
import { Instagram } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UpdateProfileDialog from "../../../../../components/myDialogs/updateProfile";




const Bio = ({data,}: {
    data: ExtendedUser | null
}) => {
    const session = useSession()
    const {isOpen, handleOpen} = useIsOpen(false)
    return (
        <div className=" text-wrap">
            <div className="flex items-center justify-between ">
                <div className="flex flex-col items-center">
                    
                    <div className="">{data?.profile?.name || <div className=' italic'>no profile name</div>}</div>
                    <div className="">{data?.name}</div>
                </div>
                <Avatar className="w-[70px] h-[70px]">
                    <AvatarImage src={session.data?.user?.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex items-center justify-between">
                <div className="">{data?.profile?.bio || <div className=' italic'>no bio....................................................({new Array(44)})</div>}</div>
                <Link
                    href='www.instagram.com'
                    className=""
                >
                    <Instagram/>
                </Link>
            </div>
            
            <UpdateProfileDialog name={data?.profile?.name || " "} link={data?.profile?.links|| ""} bio={data?.profile?.bio || ""} className="w-full font-extrabold"/>
        </div>
    );
}
 
export default Bio;