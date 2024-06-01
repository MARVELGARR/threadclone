'use client'

import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Separator } from "../ui/separator";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { Input } from '../ui/input';
import InputPost from '../myComponents/inputPostContainer';
import { Textarea } from '../ui/textarea';
import ThreadInputArea from '../myComponents/threadInputArea';



const formSchema = z.object({
    post: z.string().optional(),

})


const CreatePostDialog = ({className}:{className?: string}) => {

    const {data: session} = useSession()
    const [loading, setLoading] = useState(false);

    const pathName = usePathname()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            post: " "

        },
    })
     
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try{
            const update =  await fetch(`http://localhost:3000/api/${session?.user.id}`,{
                method: "PATCH",
                headers:{
                    "contentType": "application/json",
                },
                body: JSON.stringify({ ...values})
            })
            if(update.ok){
                toast.success('updated')
            }
            else{
                
                toast.error('Failed to updated')
            }
        }catch(error){
            console.error(error)
        } finally {
            window.location.reload()
            setLoading(false);
        }
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger className='w-full'>
                <InputPost className='w-full text-left'/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] sm:max-h-[600px] overflow-y-auto">
                <div className="">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="post"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className=""></div>
                                        <FormControl className='w-full'>
                                            <ThreadInputArea/>
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                </div>
            </DialogContent>
        </Dialog>

    );
}
 
export default CreatePostDialog;