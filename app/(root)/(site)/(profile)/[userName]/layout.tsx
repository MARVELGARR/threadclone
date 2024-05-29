
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getCurrentUser from "@/hooks/getCurrentUser";
import { getServerSession } from "next-auth";
import Bio from "./_components/bio";
import ReplyRepost from "@/components/myComponents/reply_repost";



export default async function ProfilePage({params, children}:{
    params:{
        userName: string
    }, 
    children: React.ReactNode
}){
    
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
                <Bio data={currentUser}/>
                <ReplyRepost userName={params.userName}/>
                    {children}
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
