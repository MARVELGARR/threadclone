import Header from "@/components/myComponents/header";
import MobileNav from "@/components/myComponents/mobile-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


const PageLayout = async ({children}: {children: React.ReactNode}) => {

    const session = await getServerSession(authOptions)
    if(!session){
       ("/login")
    }

    return (
        <div className="w-full">
            <Header className='h-20'/>
            <MobileNav className=" lg:hidden"/>
            {children}
        </div>
    );
}
 
export default PageLayout;