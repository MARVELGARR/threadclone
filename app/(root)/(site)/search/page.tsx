
import Loading from "@/components/myComponents/loadingPage";
import SearchBar from "@/components/myComponents/searchBar";
import useGetAllUsers from '@/hooks/getAllUsers';
import getCurrentUser from "@/hooks/getCurrentUser";
import { authOptions } from "@/util/authOptions";
import { ExtendedUser } from "@/util/types";
import { getServerSession } from "next-auth";
// Ensure you import prisma properly

const SearchPage = async() => {

    const session = await getServerSession(authOptions)
    if(!session){
        return 'not authenticated'
    }

   // eslint-disable-next-line react-hooks/rules-of-hooks
   const users = await useGetAllUsers()
    const currentUser = await getCurrentUser(session?.user.id)

   if(users) {   
        return (
            <div className="">
                <SearchBar className='' data={users as ExtendedUser[]} currentUser={currentUser as ExtendedUser || null} />               
            </div>
        );
   }
   else{
        return <div className=" w-full h-full flex items-center justify-center font-bold text-2xl"> No Users Gotten!</div>
   }

}

export default SearchPage;
