import { ExtendedUser } from "@/util/types";
import { prisma } from '../prisma/prismaClient';

const useGetAllUsers = async () => {

    try {
        const users = await prisma.user.findMany({
            include: {
                profile: {
                    include: {
                        follower: true,
                        following: true
                    }
                }
            }
        });
        
        return users as ExtendedUser[]
    } catch (error) {
        return error
    }

}
 
export default useGetAllUsers;