'use client'
import Header from "@/components/myComponents/header";
import MobileNav from "@/components/myComponents/mobile-nav";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


const PageLayout = ({children}: {children: React.ReactNode}) => {

    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login")
        },
    })
    return (
        <div className="w-full">
            <Header className='h-20'/>
            <MobileNav className=" lg:hidden"/>
            <div className="w-full flex justify-center">

                {children}
            </div>
        </div>
    );
}
 
export default PageLayout;