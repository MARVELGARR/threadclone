
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SearchBar from "@/components/myComponents/searchBar";
import UsersDisplay from "@/components/myComponents/userDisplay";
import useGetAllUsers from '@/hooks/getAllUsers';
import getCurrentUser from "@/hooks/getCurrentUser";
import { ExtendedUser } from "@/util/types";
import { getServerSession } from "next-auth";
// Ensure you import prisma properly

const SearchPage = async() => {

    const session = await getServerSession(authOptions)
    if(!session){
        return 'not authenticated'
    }

   const users = await useGetAllUsers()
    const currentUser = await getCurrentUser(session?.user.id)

   if(users){   
        return (
            <div className="">
                <SearchBar className='' data={users as ExtendedUser[]} currentUser={currentUser as ExtendedUser || null} />               
            </div>
        );
   }

}

export default SearchPage;
