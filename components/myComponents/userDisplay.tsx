'use client'
import { ExtendedUser } from "@/util/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import toast from "react-hot-toast";




const UsersDisplay= ({data, currentUser}: {data: ExtendedUser[], currentUser: ExtendedUser}) => {

    const followingsId = currentUser.profile?.id

    const handleFollow = async( followingId: string) =>{
        const follow = await fetch('api/follow',{
            method: 'POST',
            headers:{
                'contentType': 'application/json',
            },
            body: JSON.stringify({ followerId: followingsId, followingId: followingId})
        })
        if(follow.ok){
            toast.success('followed successfully')
        }
        else{
            toast.error('following failed')
        }
    }
    const handleUnfollow = async( followingId: string) =>{
        const follow = await fetch('api/follow',{
            method: 'PATCH',
            headers:{
                'contentType': 'application/json',
            },
            body: JSON.stringify({ followerId: followingsId, followingId: followingId})
        })
        if(follow.ok){
            toast.success('followed successfully')
        }
        else{
            toast.error('following failed')
        }
    }

    return (
        <div className="flex flex-col gap-[2rem]">
            {data.map((user, index)=>{
                return (
                    <div key={index} className="flex flex-col py-[1rem]">
                        <div className="flex items-center w-full justify-between">

                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={user.image || '/slls'}/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                
                                <div className="flex flex-col items-center justify-start">
                                    <Link href={`/user/${user.id}`} className=" font-bold">{user.name}</Link>
                                    <div className="flex w-full font-thin text-gray-400 text-left justify-start">{user.profile?.name}</div>
                                </div>
                            </div>
                           
                            <Button onClick={ user.profile?.follower.find((follower)=>follower.followerId == followingsId)?.status=='yes'? ()=>handleUnfollow(user?.profile?.id || 'ss') : ()=>handleFollow(user?.profile?.id || 'ss') } variant={user.profile?.follower.find((follower)=>follower.followerId == followingsId)?.status=='yes' ? 'outline':'default'}>{user.profile?.follower.find((follower)=>follower.followerId == followingsId)?.status=='yes'? 'unfollow' : 'follow'}</Button>
                            
                        </div>
                        
                        <div className=" ml-[3.3rem] flex items-center gap-1">{user.profile?.follower.filter((follower)=>follower.status== 'yes').length || 0} followers</div>
                        <Separator className='mt-4'/>
                    </div>
                )
            })}
        </div>
    );
}
 
export default UsersDisplay;