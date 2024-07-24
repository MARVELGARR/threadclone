'use client'
import Header from "@/components/myComponents/header";
import MobileNav from "@/components/myComponents/mobile-nav";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";



const PageLayout = ({children}: {children: React.ReactNode}) => {

    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/login")
        },
    })
    return (
        <div className="w-full ">

            <Header className='py-4 sticky top-0 bg-white z-50'/>
            <MobileNav className=" lg:hidden"/>
            <div className=" overflow-y">
                {children}
            </div>
        </div>
    );
}
 
export default PageLayout;