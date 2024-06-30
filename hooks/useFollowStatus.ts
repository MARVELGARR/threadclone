// hooks/useFollowStatus.js

'use client'
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

export default function useFollowStatus(followerId: string | null, followingId: string | null) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    const checkFollowStatus = useCallback(async () => {
        try {
            const response = await fetch(`/api/checkFollow`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ followerId, followingId }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsFollowing(data.isFollowing);
                setFollowerCount(data.followerCount);
            } else {
                toast.error("Failed to check follow status");
            }
        } catch (error) {
            toast.error("Failed to check follow status");
        }
    }, [followerId, followingId]);

    useEffect(() => {
        if (followerId && followingId) {
            checkFollowStatus();
        }
    }, [checkFollowStatus, followerId, followingId]);

    const follow = useCallback(async () => {
        try {
            const response = await fetch(`/api/follow`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ followingId, followerId }),
            });

            if (response.ok) {
                setIsFollowing(true);
                toast.success("Followed");
            } else {
                toast.error("Failed to follow");
            }
        } catch (error) {
            toast.error("Failed to follow");
        }
    }, [followingId, followerId]);

    const unfollow = useCallback(async () => {
        try {
            const response = await fetch(`/api/follow`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ followingId, followerId }),
            });

            if (response.ok) {
                setIsFollowing(false);
                toast.success("Unfollowed");
            } else {
                toast.error("Failed to unfollow");
            }
        } catch (error) {
            toast.error("Failed to unfollow");
        }
    }, [followingId, followerId]);

    return { isFollowing, followerCount, follow, unfollow };
}



