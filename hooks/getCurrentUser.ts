
import { prisma } from '@/prisma/prismaClient';
import { ExtendedUser } from '@/util/types';




const getCurrentUser = async (userId: string | undefined): Promise<ExtendedUser | null> => {
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include:{
                profile: true
            }
        })

        return user;
        
    } catch (error) {
        console.error(error);
        throw new Error('Error getting current user user'); 
    }
}

export default getCurrentUser;
