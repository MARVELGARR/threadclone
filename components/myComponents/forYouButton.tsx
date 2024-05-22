'use client'
import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ForYouButton = ({className}: {className?: string}) => {
    const pathname = usePathname()
    return (
        <Link
        href={pathname =="/following" ? "/foryou": "/following"}
         className={cn("flex items-center px-3 py-2 rounded-md", className)}>
            {pathname === "/following"? "following" : "for you"}
            <ArrowLeftRight />
         </Link>
    );
}
 
export default ForYouButton;