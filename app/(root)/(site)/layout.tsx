'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SiteLayout = ({children}:{children: React.ReactNode}) => {

    const { data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        },
    })
    return (
        <div className=""></div>
    );
}
 
export default SiteLayout;