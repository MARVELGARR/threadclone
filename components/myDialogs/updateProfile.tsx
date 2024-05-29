'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,

    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Separator } from "../ui/separator";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateProfileProps } from "@/util/types";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";




const formSchema = z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    links: z.string().optional()
})

const UpdateProfileDialog: React.FC<updateProfileProps> = ({
    className,
    id,
    name,
    links,
    bio
}) => {

    const {data: session} = useSession()
    const [loading, setLoading] = useState(false);

    const pathName = usePathname()
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "Whats your name",
            bio:bio || "Tell about yourself",
            links: links || "http://",

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
                body: JSON.stringify({ ...values, id})
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
            <DialogTrigger asChild>
                <Button className={className} variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder={``} {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                            <Separator className='bg-slate-400'/>
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Input placeholder={``} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                            <Separator className=" bg-slate-400"/>
                                
                            <FormField
                                control={form.control}
                                name="links"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder={links} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter >
                                <Button className="w-full" type="submit">{loading ? " Updating... ": " Done"}<DialogClose/></Button>
                            </DialogFooter>
                        </form>
                    </Form>

                </div>
            </DialogContent>
        </Dialog>

    );
}
 
export default UpdateProfileDialog;
  
