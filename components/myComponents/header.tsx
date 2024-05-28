import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Main_nav from "./mainNav";

import Link from "next/link";
import Menu from "./headerMenu";

type HeaderProps = {
    className?: string
}

const Header: React.FC<HeaderProps> = ({
    className,

}) => {
    return (
        <div className={cn("", className)}>
            <div className={cn('h-20 w-full hidden grid-template-coloum mx-auto max-w-[1230px] ')}>
                <Link
                className=" "
                    href="/home"
                >
                
                    <Image
                        width={11}
                        height={11}
                        className="w-9 h-9  "
                        alt='logo'
                        src='/svg/logo.svg'
                    />
                </Link>
                <Main_nav className=""/>

                <Menu className='ml-auto w-8' />
                
            </div>
            <div className="flex w-full items-center justify-between px-4 md:hidden">
                <div className="">{''}</div>
                <Link
                className=" "
                    href="/home"
                >
                
                    <Image
                        width={11}
                        height={11}
                        className="w-9 h-9  "
                        alt='logo'
                        src='/svg/logo.svg'
                    />
                </Link>
                <Menu className=' w-8' />
            </div>
        </div>
    );
}
 
export default Header;