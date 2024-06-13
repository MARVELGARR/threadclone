// hooks/useFollowStatus.js

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const useFollowStatus = (followerId : string, followingId: string) => {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const checkFollowStatus = async () => {
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
                } else {
                    toast.error("Failed to check follow status");
                }
            } catch (error) {
                toast.error("Failed to check follow status");
            }
        };

        if (followerId && followingId) {
            checkFollowStatus();
        }
    }, [followerId, followingId]);

    const follow = async () => {
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
    };

    const unfollow = async () => {
        try {
            const response = await fetch(`/api/follow`, {
                method: 'DELETE',
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
    };

    return { isFollowing, follow, unfollow };
};

export default useFollowStatus;
