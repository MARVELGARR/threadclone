
import SearchBar from "@/components/myComponents/searchBar";
import UsersDisplay from "@/components/myComponents/userDisplay";
import useGetAllUsers from '@/hooks/getAllUsers';
import { ExtendedUser } from "@/util/types";
// Ensure you import prisma properly

const SearchPage = async() => {

   const users = await useGetAllUsers()


   if(users){   
        return (
            <div className="">
                <SearchBar className='' data={users as ExtendedUser[]}  />               
            </div>
        );
   }

}

export default SearchPage;
