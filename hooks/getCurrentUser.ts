
import { prisma } from '@/prisma/prismaClient';
import { ExtendedUser } from '@/util/types';

import { redirect } from 'next/navigation';





const getCurrentUser = async (userId: string | undefined): Promise<ExtendedUser | null> => {
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include:{
                profile: {
                    include:{
                        follower: true
                    }
                }

            }
        })

        return user;
        
    } catch (error) {
        console.error(error);
        redirect('/')
    }
}

export default getCurrentUser;
