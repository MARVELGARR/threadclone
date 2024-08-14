'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ReplyRepost = ({ userName }: { userName: string }) => {
    const pathName = usePathname();

    // URL encode userName to handle any special characters

    const routes = [
        {
            href: `/${userName}`,
            name: "Threads",
            active: pathName === `/${userName}`
        },
        {
            href: `/${userName}/replies`,
            name: "Replies",
            active: pathName === `/${userName}/replies`
        },
        
    ];

    return (
        <div className="flex items-center w-full gap-[2px] bg-background text-foreground">
            {routes.map((items, index) => {
                return (
                    <Link
                        key={index}
                        href={items.href}
                        className={cn(`border-b-[2px] bg-background text-foreground border-gray-400 w-full flex justify-center items-center flex-shrink md:px-[4.5rem] md:py-4`, items.active ? " text-emerald-400 font-extrabold border-l-foreground border-b-[3px]" : " text-foreground")}
                    >
                        {items.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default ReplyRepost;
