'use client'
import {
    Dialog,
    DialogContent,
    DialogFooter,

    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Separator } from "../ui/separator";

type updateProfileProps ={
    className?:string;
    name:string;
    bio:string;
    link: string;
}

const formSchema = z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    link: z.string().optional()
})

const UpdateProfileDialog: React.FC<updateProfileProps> = ({
    className,
    name,
    link,
    bio
}) => {


 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "Whats your name",
            bio:bio || "Tell about yourself",
            link: link || "http://",

        },
    })
     
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Dialog >
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
                                        <FormDescription>
                                            This is your display name.
                                        </FormDescription>

                                    </FormItem>
                                )}
                            />
                            <Separator/>
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Input placeholder={``} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            About you
                                        </FormDescription>
                                    </FormItem>
                                )}
                                />
                            <Separator className=" font-extrabold"/>
                                
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder={``} {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your links
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button className="w-full" type="submit">Submit</Button>
                            </DialogFooter>
                        </form>
                    </Form>

                </div>
            </DialogContent>
        </Dialog>

    );
}
 
export default UpdateProfileDialog;
  
