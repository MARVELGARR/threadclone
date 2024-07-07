'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ReplyRepost = ({ userName }: { userName: string }) => {
    const pathName = usePathname();
    if (!userName) {
        return <>Loading..</>;
    }

    // URL encode userName to handle any special characters
    const encodedUserName = encodeURIComponent(userName);

    const routes = [
        {
            href: `/${encodedUserName}`,
            name: "Threads",
            active: pathName === `/${encodedUserName}`
        },
        {
            href: `/${encodedUserName}/replies`,
            name: "Replies",
            active: pathName === `/${encodedUserName}/replies`
        },
        {
            href: `/${encodedUserName}/reposts`,
            name: "Reposts",
            active: pathName === `/${encodedUserName}/reposts`
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
