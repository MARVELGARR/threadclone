'use client'
import { PostCardProps } from "@/util/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { useState } from "react";
import ProfileCard from "./profileCard";
import { ExtendedUser } from '../../util/types';

import Link from "next/link";
import useFollowStatus from "@/hooks/useFollowStatus";
import PostOption from "./postOption";
import PostInteractions from "./postInteractions";

const PostCards: React.FC<PostCardProps> = ({ story, images, follower, id, tags, user, currentUser}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const openModal = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const isThread = story.length > 1;

    const PostUserProfileId = user.profile?.id;



    const { isFollowing, followerCount, follow, unfollow } = useFollowStatus(currentUser?.profile?.id || null, PostUserProfileId || null);


    return (
        <div className={`p-4 z-9 bg-white shadow rounded-lg w-full max-w-full ${isThread ? 'border-l-4 border-blue-500' : ''}`}>
            <div className="flex items-start gap-4 w-full relative">
                <Avatar className="w-12 h-12">
                    <AvatarImage  src={user.image || undefined} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full">
                        <Link 
                            href={`/user/${user.id}`}
                            className="font-bold relative cursor-pointer hover:underline"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {user.name}
                            {isHovered && (
                                <div className="absolute z-50 top-0 left-0 mt-2">
                                    <ProfileCard followerCount={followerCount} isFollowing={isFollowing} follow={follow} unfollow={unfollow} currentUser={currentUser as ExtendedUser} user={user} className="shadow-xl h-fit z-50 w-[20rem] p-3 rounded-md bg-white" />
                                </div>
                            )}s
                        </Link>

                        <PostOption postId={id}/>
                    </div>
                    <div className="mt-2 space-y-2">
                        <div className="break-words max-w-[500px]">
                            {story[0]}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {images.map((image, index) => (
                                <div key={index} className="w-24 h-24 relative cursor-pointer" onClick={() => openModal(image)}>
                                    <Image
                                        src={image}
                                        fill
                                        className="object-cover z-10 rounded"
                                        alt={`Thread image ${index + 1}`}
                                        
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isThread && (
                    <div className="absolute left-6 top-[3rem] w-0.5 h-full bg-gray-300"></div>
                )}
            </div>
            {isThread && (
                <div className="mt-4">
                    <div className="text-sm ml-[4rem] text-gray-500">Read more</div>
                </div>
            )}
            {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <div key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded">
                            #{tag}
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
                    <div className="relative bg-white rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={selectedImage} alt="Selected thread image" className="max-w-full max-h-screen object-contain rounded-lg" />
                    </div>
                </div>
            )}
            <PostInteractions/>
        </div>
    );
}

export default PostCards;
