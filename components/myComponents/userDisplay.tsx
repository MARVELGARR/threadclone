'use client'
import { ExtendedUser } from "@/util/types";




const UsersDisplay= ({data}: {data: ExtendedUser[]}) => {


    return (
        <div className="">
            {data.map((user, index)=>{
                return (
                    <div key={index} className="">
                        
                    </div>
                )
            })}
        </div>
    );
}
 
export default UsersDisplay;