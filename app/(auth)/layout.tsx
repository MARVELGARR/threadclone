'use client'
import React from "react";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const AuthLayout = ({children}:{
    children: React.ReactNode
}) => {

    const {data: session} = useSession()
    if(session){
        redirect("/home")
    }
    
    return (
        <>
            <div className="">
                {children}
            </div>
        </>
    );
}
 
export default AuthLayout;