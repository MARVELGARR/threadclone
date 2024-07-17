'use client'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import {  Hash, Images, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";
import Image from "next/image";
import * as React from 'react';
import { useRouter } from "next/navigation";

type ThreadsInputProps = {
    id: number,
    value: string,
    images: string[],
    tags: string[]
}

const ThreadInputArea = () => {
    const { data: session } = useSession();
    const [threads, setThreads] = useState<ThreadsInputProps[]>([{ id: 0, value: "", images: [], tags: [] }]);
    const [tagInput, setTagInput] = useState("");
    const [tagOpen, setTagOpen] = useState<number | null>(null);
    const [imageOpen, setImageOpen] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(true);

    const router = useRouter()

    const handleInputChange = (id: number, value: string) => {
        const newThreads = threads.map(thread =>
            thread.id === id ? { ...thread, value } : thread
        );

        if (value.length > 80 && threads[threads.length - 1].id === id) {
            newThreads.push({ id: newThreads.length, value: "", images: [], tags: [] });
        }

        setThreads(newThreads);
    };

    const handleAddTag = (id: number, tag: string) => {
        if (tag.trim() === "") return;

        const newThreads = threads.map(thread =>
            thread.id === id ? { ...thread, tags: [...thread.tags, tag] } : thread
        );
        setThreads(newThreads);
        setTagInput("");
        setTagOpen(null);
    };

    const handleAddImage = (id: number, imageUrl: string) => {
        const newThreads = threads.map(thread =>
            thread.id === id ? { ...thread, images: [...thread.images, imageUrl] } : thread
        );
        setThreads(newThreads);
        setImageOpen(null);
    };

    const handleTagOpen = (id: number) => {
        setTagOpen(id);
    };

    const handleImageOpen = (id: number) => {
        setImageOpen(id);
    };

    const handleRemoveImage = (id: number, imageIndex: number) => {
        const newThreads = threads.map(thread =>
            thread.id === id
                ? { ...thread, images: thread.images.filter((_, idx) => idx !== imageIndex) }
                : thread
        );
        setThreads(newThreads);
    };

    const handleRemoveTag = (id: number, tagIndex: number) => {
        const newThreads = threads.map(thread =>
            thread.id === id
                ? { ...thread, tags: thread.tags.filter((_, idx) => idx !== tagIndex) }
                : thread
        );
        setThreads(newThreads);
    };

    const handleSubmit = () => {
        handleSend(threads);
        setThreads([{ id: 0, value: "", images: [], tags: [] }]);
    };

    const handleClose = (id: number) => {
        const newThreads = threads.filter(thread => thread.id !== id);
        setThreads(newThreads);
    };

    const handleSend = async (filteredThreads: ThreadsInputProps[]) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/${session?.user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ threads: filteredThreads }),
            });

            if (response.ok) {
                toast.success('Thread posted');
            } else {
                const errorData = await response.json();
                toast.error(`Failed to create thread: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create thread: Network error or server unreachable');
        } finally {
            setLoading(false);
            setDialogOpen(false);
            router.refresh();
        }
    };
    if(dialogOpen){
        
        return (
            <div className="w-full p-6">
                <div className="flex flex-col w-full">
                    {threads.map((thread, index) => (
                        <div key={index} className="flex flex-col items-start gap-3 relative border-b border-gray-200 pb-4 mb-4">
                            {index > 0 && (
                                <X className="cursor-pointer absolute right-5 top-5" onClick={() => handleClose(thread.id)} />
                            )}
                            <div className="flex items-start gap-3 w-full">
                                <div className="relative">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={session?.user.image} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    {index < threads.length - 1 && (
                                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-300" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-xl">{session?.user.name}</div>
                                    <Input
                                        className="border-b-2 w-full p-2 text-lg"
                                        placeholder="Start a thread"
                                        value={thread.value}
                                        onChange={(e) => handleInputChange(thread.id, e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 pl-16">
                                {thread.images.map((image, imageIndex) => (
                                    <div key={imageIndex} className="relative">
                                        <Image src={image} alt="thread image" className="w-24 h-24 object-cover rounded" />
                                        <X className="absolute top-1 right-1 cursor-pointer" onClick={() => handleRemoveImage(thread.id, imageIndex)} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 pl-16">
                                {thread.tags.map((tag, tagIndex) => (
                                    <div key={tagIndex} className="flex items-center gap-1 bg-gray-200 p-1 rounded">
                                        <span>{tag}</span>
                                        <X className="cursor-pointer" size={12} onClick={() => handleRemoveTag(thread.id, tagIndex)} />
                                    </div>
                                ))}
                            </div>
                            {imageOpen === thread.id && (
                                <div className="mt-2 pl-16 w-full">
                                    <UploadButton<OurFileRouter, "imageUploader">
                                        endpoint="imageUploader"
                                       
                                        onClientUploadComplete={(files) => {
                                            files.forEach((file) => handleAddImage(thread.id, file.url));
                                        }}
    
                                    />
                                </div>
                            )}
                            {tagOpen === thread.id && (
                                <div className="mt-2 pl-16 w-full">
                                    <Input
                                        placeholder="Add a tag"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag(thread.id, tagInput)}
                                    />
                                </div>
                            )}
                            <div className="flex items-center w-full justify-start mt-2 pl-16 gap-5">
                                <Images className="stroke-gray-400 cursor-pointer" onClick={() => handleImageOpen(thread.id)} />
                                <Hash onClick={() => handleTagOpen(thread.id)} className="stroke-gray-400 cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full pt-6 flex items-center justify-end">
                    
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        );
    }

}

export default ThreadInputArea;
