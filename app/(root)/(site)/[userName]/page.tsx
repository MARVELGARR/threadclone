
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getCurrentUser from "@/hooks/getCurrentUser";
import { getServerSession } from "next-auth";
import Bio from "./_components/bio";



export default async function ProfilePage({params}:{
    params:{
        userName: string
    }
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
            <div className="flex flex-col flex-wrap">
                <Bio data={currentUser}/>
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
