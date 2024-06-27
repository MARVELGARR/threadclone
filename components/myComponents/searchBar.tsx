'use client'
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { SetStateAction, useEffect, useState } from "react";
import { ExtendedUser } from "@/util/types";
import UsersDisplay from "./userDisplay";

type SearchBarProps = {
    className?: string;
    data: ExtendedUser[]
}

const SearchBar: React.FC<SearchBarProps> = ({className, data}) => {

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


    }, [searchQuery]);



    return (
        <div className="">

            <Input onChange={handleInputChange} value={searchQuery} className={cn('', className)} placeholder={`Search...`} />
            <UsersDisplay data={userData as ExtendedUser[]} />
            

        </div>
        
    );
}
 
export default SearchBar;