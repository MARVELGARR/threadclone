'use client'
import { Edit, Heart, HomeIcon, SearchIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from '@/lib/utils';
import { useSession } from "next-auth/react";

const Main_nav = ({ className }: { className?: string }) => {

    const pathname = usePathname();
    const session = useSession();

    if (!session || session.data == null) {
        return "No session";
    }

    const encodedUserName = session.data.user.name.trim().replace(/ /g, "");

    const routes = [
        {
            label: 'Home',
            href: '/',
            active: pathname === '/',
            logo: <HomeIcon className="w-9 h-9" />
        },
        {
            label: 'Search',
            href: '/search',
            active: pathname === '/search',
            logo: <SearchIcon className="w-9 h-9" />
        },
        {
            label: 'Edit',
            href: '/edit',
            active: pathname === '/edit',
            logo: <Edit className="w-9 h-9" />
        },
        {
            label: 'Profile',
            href: encodedUserName ? `/${encodedUserName}` : "/profile",
            active: pathname === `/${encodedUserName}`,
            logo: <User className="w-9 h-9 stroke-slate-300" />
        },
    ];

    return (
        <nav className={cn("flex items-center space-x-8 h-fit", className)}>
            {routes.map((route) => {
                return (
                    <Link
                        key={route.href}
                        href={route.href}                      
                        className={cn('w-fit p-3 rounded-md hover:bg-green-300', route.active ? "font-bold text-black" : "text-foreground text-gray-300")}
                    >
                        {route.logo}
                    </Link>
                );
            })}
        </nav>
    );
}

export default Main_nav;
