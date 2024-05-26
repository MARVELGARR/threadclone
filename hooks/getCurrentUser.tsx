import { User } from '@/util/types';
import axios from 'axios';

const getCurrentUser = async (userId: string | undefined): Promise<User> => {
    try {
        const user = await axios({
            method: 'GET',
            url: `/api/${userId}`,
            responseType: 'json'
        });

        return user.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export default getCurrentUser;
