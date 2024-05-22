import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ForYouButton = ({className}: {className?: string}) => {
    const pathname = usePathname()
    return (
        <Link
        href="/following"
         className={cn("flex items-center", className)}>
            {pathname === "/following"? "following" : "for you"}
            <ArrowLeftRight />
         </Link>
    );
}
 
export default ForYouButton;