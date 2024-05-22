'use client'
import { Edit, Heart, HomeIcon, SearchIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from '@/lib/utils';

const Main_nav = ({className}: {className?: string}) => {

    const pathname = usePathname()

    const routes = [
        {
            label: 'Home',
            href: '/home',
            active: pathname === '/home',
            logo : <HomeIcon className="w-4 md:w-6 lg:w-8 "/>
        },
        {
            label: 'search',
            href: '/search',
            active: pathname === '/search',
            logo : <SearchIcon className="w-4 md:w-6 lg:w-8 "/>
        },
        {
            label: 'edit',
            href: '/edit',
            active: pathname === '/edit',
            logo : <Edit className="w-4 md:w-6 lg:w-8 "/>
        },
        {
            label: 'likes',
            href: '/likes',
            active: pathname === '/likes',
            logo : <Heart className="w-4 md:w-6 lg:w-8 "/>
        },
        {
            label: 'profile',
            href: '/profile',
            active: pathname === '/profile',
            logo : <User className="w-4 md:w-6 lg:w-8 "/>
        },
    ]

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-8 h-fit", className)}>
            {routes.map((route)=>{
                return (
                    <Link
                        href={route.href}
                        className={cn('w-fit p-3 rounded-md hover:bg-green-300', route.active ? " font-bold text-black" : "text-foreground text-gray-300")}
                    >
                        {route.logo}
                    </Link>
                )
            })}
        </nav>
    );
}
 
export default Main_nav;