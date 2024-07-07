"use client"
import { cn } from "@/lib/utils";
import { Edit, Heart, HomeIcon, SearchIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = ({className}:{
    className?: string
}) => {

    const {data: session} = useSession()
    const pathname = usePathname()
    if(!session || session?.user== null){
        return
    }

    const encodedUserName = encodeURIComponent(`/@${session.user.name.trim().replace(/ /g, "")}`);

    const routes = [
        {
            label: 'Home',
            href: '/home',
            active: pathname === '/home',
            logo : <HomeIcon className="w-9 h-9 "/>
        },
        {
            label: 'search',
            href: '/search',
            active: pathname === '/search',
            logo : <SearchIcon className="w-9 h-9 "/>
        },
        {
            label: 'edit',
            href: '/edit',
            active: pathname === '/edit',
            logo : <Edit className="w-9 h-9 "/>
        },
        
        {
            label: 'profile',
            href: encodedUserName,
            active: pathname === encodedUserName,
            logo : <User className="w-9 h-9 "/>
        },
    ]

    return (
        <nav className={cn("flex w-full items-center justify-between  h-fit absolute bottom-0", className)}>
            {routes.map((route, index)=>{
                return (
                    <Link
                    key={index}
                        href={route.href}
                        className={cn(' p-3 rounded-md hover:bg-green-300', route.active ? " font-bold text-black" : "text-foreground text-gray-300")}
                    >
                        {route.logo}
                    </Link>
                )
            })}
        </nav>
    );
}
 
export default MobileNav