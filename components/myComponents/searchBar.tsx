'use client'

import { Input } from "../ui/input";
import { SetStateAction, useEffect, useState } from "react";
import { ExtendedUser } from "@/util/types";
import UsersDisplay from "./userDisplay";

type SearchBarProps = {
    className?: string;
    data: ExtendedUser[]
    currentUser: ExtendedUser | null
}

const SearchBar: React.FC<SearchBarProps> = ({className, data, currentUser}) => {

    const [searchQuery, setSearchQuery] = useState('')
    const [userData, setUserData] = useState<ExtendedUser[]>(data);

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchQuery(e.target.value);

    }

    
    useEffect(() => {
        // Filter data based on search query

        const result = data.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUserData(result);


    }, [data, searchQuery]);



    return (
        <div className="">

            <Input className='sticky top-0' onChange={handleInputChange} value={searchQuery}  placeholder={`Search...`} />
            <div className=" overflow-y-scroll">

                <UsersDisplay data={userData as ExtendedUser[]} currentUser={currentUser as ExtendedUser}/>
            </div>
            

        </div>
        
    );
}
 
export default SearchBar;