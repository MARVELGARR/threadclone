
import getCurrentUser from "@/hooks/getCurrentUser";
import { getServerSession } from "next-auth";
import Bio from "./components/bio";
import ReplyRepost from "@/components/myComponents/reply_repost";
import { redirect } from "next/navigation";
import { authOptions } from "@/util/authOptions";




export default async function ProfilePage({params, children}:{
    params:{
        userName: string
    }, 
    children: React.ReactNode
}){
    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/login')
    }
    const currentUser = await wait()
    if(!currentUser){
        return (
            <div className="">
                ...Loading
            </div>
        )
    }
    
    return (
        <>
            <title>{`${currentUser?.name}(@${params.userName.replaceAll('%40', "").replaceAll('%20', "")} on Threads)`}</title>
            <div className="flex flex-col flex-wrap z-99999">

            </div>
        </>
    );
}

export async function wait(){
    const session = await getServerSession(authOptions)
    if(!session){
        return console.error("User not authenticated")
    }
    const currentUser = await getCurrentUser(session?.user.id)
    
    return currentUser
}
