
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getCurrentUser from "@/hooks/getCurrentUser";
import { getServerSession } from "next-auth";


const ProfilePage = async () => {
    const session = await getServerSession(authOptions)

    const currentUser = await getCurrentUser(session?.data?.user.id)
    return (
        <div className="">{currentUser.name}</div>
    );
}
 
export default ProfilePage;