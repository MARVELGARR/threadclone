'use client'
import ThreadInputArea from "@/components/myComponents/threadInputArea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const EditPage = () => {
    return (
        <div className="w-full  flex h-screen justify-center items-center">

            
            <Dialog>
                <DialogTrigger><div className=" text-6xl cursor-pointer w-[10rem] h-[10rem] border-2 border-gray-500 rounded-lg flex items-center justify-center">+</div></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new post</DialogTitle>

                    </DialogHeader>
                    <ThreadInputArea/>
                </DialogContent>
                </Dialog>
        </div>
    );
}
 
export default EditPage;