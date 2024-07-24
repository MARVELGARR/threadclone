'use client'
import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ForYouButton = ({className}: {className?: string}) => {
    const pathname = usePathname()
    return (
        <Link
        href={pathname =="/following" ? "/": "/following"}
         className={cn("flex items-center px-4 py-3 rounded-3xl border-2", className)}>
            {pathname === "/following"? "following" : "for you"}
            <ArrowLeftRight />
         </Link>
    );
}
 
export default ForYouButton;