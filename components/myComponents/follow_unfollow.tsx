'use client';

import React from 'react';
import useFollowStatus from '@/hooks/useFollowStatus';
import { Button } from '../ui/button';

interface FollowStatusProps {
    isFollowing: Boolean;
    unfollow: ()=>void;
    follow: ()=>void;
    className: string;
}

const FollowUnfollow: React.FC<FollowStatusProps> = ({follow, unfollow, isFollowing, className }) => {

    return (
        <div className={className}>
            {isFollowing ? (
                <Button className='w-full p-3' variant={'outline'} onClick={unfollow}>Unfollow</Button>
            ) : (
                <Button className='w-full p-3' variant={'default'} onClick={follow}>Follow</Button>
            )}
        </div>
    );
};

export default FollowUnfollow;
