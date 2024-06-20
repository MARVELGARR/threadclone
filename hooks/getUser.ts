'use server'
import { prisma } from '@/prisma/prismaClient';
import { ExtendedUser } from '@/util/types';

const getUser = async (userId: string | null): Promise<ExtendedUser | null> => {

    if (!userId) {
        console.error('getCurrentUser: userId is null or undefined');
        return null;
    }

    try {
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                profile: {
                    include: {
                        follower: true,
                        following: true
                    }
                }
            }
        });


        return user as ExtendedUser;

    } catch (error) {
        console.error('getCurrentUser: Error fetching user', error);
        return null;
    }
}

export default getUser;
