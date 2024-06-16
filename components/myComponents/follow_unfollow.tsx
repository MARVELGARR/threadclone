'use client';

import React from 'react';
import useFollowStatus from '@/hooks/useFollowStatus';
import { Button } from '../ui/button';

interface FollowStatusProps {
    currentUser: any;
    user: any;
}

const FollowUnfollow: React.FC<FollowStatusProps> = ({ currentUser, user }) => {
    const { isFollowing, follow, unfollow } = useFollowStatus(currentUser.profile.id, user.profile.id);

    return (
        <div>
            {isFollowing ? (
                <Button className='w-[4rem] p-3' variant={'outline'} onClick={unfollow}>Unfollow</Button>
            ) : (
                <Button className='w-[4rem] p-3' variant={'default'} onClick={follow}>Follow</Button>
            )}
        </div>
    );
};

export default FollowUnfollow;
