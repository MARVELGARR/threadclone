import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Main_nav from "./mainNav";
import { MenuSquareIcon } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
    className?: string,
}

const Header: React.FC<HeaderProps> = ({
    className,
}) => {
    return (
        <div className={cn('flex items-center justify-between px-40 w-full', className)}>
            <Link
                href="/home"
            >
            
                <Image
                    width={11}
                    height={11}
                    className="w-4 md:w-6 lg:w-8 "
                    alt='logo'
                    src='/svg/logo.svg'
                />
            </Link>
            <Main_nav/>

            <MenuSquareIcon className="w-4 md:w-6 lg:w-8 xl:w-16 h-10"/>
            
        </div>
    );
}
 
export default Header;