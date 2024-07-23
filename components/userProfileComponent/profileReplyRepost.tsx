'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ReplyRepost = ({userId}:{userId: string}) => {

    const pathName = usePathname()

    const routes = [
        {
            href: `/user/${userId}`,
            name: "Threads",
            active: pathName === `/${userId}`
        },
        {
            href: `/${userId}/replies`,
            name: "Replies",
            active: pathName === `/user/${userId}/replies`
        },
        {
            href: `/${userId}/reposts`,
            name: "Reposts",
            active: pathName === `/user/${userId}/reposts`
        },
    ]

    return (
        <div className="flex items-center w-full gap-[2px]">
            {routes.map((items, index)=>{
                return(
                    <Link
                        key={index}
                        href={items.href}
                        className={cn(`border-b-[2px] border-gray-400 px-[4.5rem] py-4`,  items.active ? " text-black font-extrabold border-black border-b-[3px]" : "")}
                    >
                        {items.name}
                    </Link>
                )
            })}
        </div>
    );
}
 
export default ReplyRepost