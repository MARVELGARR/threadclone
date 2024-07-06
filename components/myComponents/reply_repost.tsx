'use client';
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ReplyRepost = ({ userName }: { userName: string }) => {
    const pathName = usePathname();
    const {data: session} = useSession()
    
    if (!userName) {
        return <>Loading..</>;
    }
    

    // URL encode userName to handle any special characters
    const encodedUserName = encodeURIComponent(userName);

    const routes = [
        {
            href: `/${session?.user.name}`,
            name: "Threads",
            active: pathName === `/${session?.user.name}`
        },
        {
            href: `/${session?.user.name}/replies`,
            name: "Replies",
            active: pathName === `/${session?.user.name}/replies`
        },
        {
            href: `/${session?.user.name}/reposts`,
            name: "Reposts",
            active: pathName === `/${session?.user.name}/reposts`
        },
    ];

    return (
        <div className="flex items-center w-full gap-[2px]">
            {routes.map((items, index) => {
                return (
                    <Link
                        key={index}
                        href={items.href}
                        className={cn(`border-b-[2px] border-gray-400 px-[4.5rem] py-4`, items.active ? "text-black font-extrabold border-black border-b-[3px]" : "")}
                    >
                        {items.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default ReplyRepost;
