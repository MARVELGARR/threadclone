'use client'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { AlignRight, Hash, Image, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

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
        const filteredThreads = threads.filter(thread => thread.value.trim() !== "");
        console.log("Threads submitted:", filteredThreads);
        setThreads([{ id: 0, value: "", images: [], tags: [] }]);
    };

    const handleClose = (id: number) => {
        const newThreads = threads.filter(thread => thread.id !== id);
        setThreads(newThreads);
    };

    const handleSend = async() =>{

    }
    

    return (
        <div className="w-full">
            <div className="flex items-center w-full">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col gap-[3rem]">
                        {threads.map((thread, index) => (
                            <div key={index} className="flex flex-col items-center gap-3 relative">
                                { index > 0 && (<X className=" cursor-pointer absolute right-5 top-7" onClick={()=>handleClose(index)}/>)}
                                <div className="w-full flex flex-col items-center">
                                    <div className="w-full flex items-center gap-[1rem] relative">

                                        <Avatar className="w-[4rem] h-[4rem]">
                                            <AvatarImage src={session?.user.image}></AvatarImage>
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col items-center gap-2 pt-2">
                                            <div className="font-bold text-2xl text-start w-full">{session?.user.name}</div>
                                            <Input
                                                className="w-[37rem] border-0"
                                                placeholder="Start a thread"
                                                value={thread.value}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                            />
                                            
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                            
                                        <div className="flex flex-wrap gap-2 mt-2 ml-32">
                                                {thread.images.map((image, imageIndex) => (
                                                    <div key={imageIndex} className="relative">
                                                        <img src={image} alt="thread image" className="w-[10rem] h-[10rem] object-cover rounded" />
                                                        <X className="absolute top-0 right-0 cursor-pointer" onClick={() => handleRemoveImage(index, imageIndex)} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex w-full justify-end flex-wrap gap-2 mt-2">
                                                {thread.tags.map((tag, tagIndex) => (
                                                    <div key={tagIndex} className="flex items-center gap-1 bg-gray-200 p-1 rounded">
                                                        <span>{tag}</span>
                                                        <X className="cursor-pointer" size={12} onClick={() => handleRemoveTag(index, tagIndex)} />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className={cn(imageOpen === index ? "mt-2" : "hidden")}>
                                                <UploadButton<OurFileRouter>
                                                    endpoint="imageUploader"
                                                    onUploadComplete={(files) => {
                                                        files.forEach(file => handleAddImage(index, file.url));
                                                    }}
                                                    onClientUploadComplete={(files) => {
                                                        files.forEach(file => handleAddImage(index, file.url));
                                                    }}
                                                />
                                            </div>
                                            <div className={cn(tagOpen === index ? "mt-2" : 'hidden')}>
                                                <Input
                                                    placeholder="Add a tag"
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag(index, tagInput)}
                                                />
                                            </div>
                                    </div>
                                </div>
                                <div className="flex items-center w-full justify-start ml-32 gap-5">
                                    <Image className="stroke-gray-400 cursor-pointer rotate-12" onClick={() => handleImageOpen(index)} />
                                    <Hash onClick={() => handleTagOpen(index)} className="stroke-gray-400 cursor-pointer rotate-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full pt-6 flex items-center justify-end">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default ThreadInputArea;
