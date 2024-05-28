'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExtendedUser } from "@/util/types";
import { useSession } from "next-auth/react";




const Bio = ({data,}: {
    data: ExtendedUser | null
}) => {
    const session = useSession()
    return (
        <div className=" text-wrap">
            <div className="flex items-center justify-between ">
                <div className="flex flex-col items-center">
                    
                    <div className="">{data?.profile[0]?.name || "No profile name"}</div>
                    <div className="">{data?.name}</div>
                </div>
                <Avatar className="w-[70px] h-[70px]">
                    <AvatarImage src={session.data?.user?.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

            </div>
            <div className=""></div>
            <div className=""></div>
        </div>
    );
}
 
export default Bio;