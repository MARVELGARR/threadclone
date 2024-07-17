'use client'

import { Dialog, DialogContent, DialogTrigger, DialogClose } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

import InputPost from '../myComponents/inputPostContainer';
import ThreadInputArea from '../myComponents/threadInputArea';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
})


const CreatePostDialog = ({className}:{className?: string}) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
    })

    return (
        <Dialog>
            <DialogTrigger className='w-full'>
                <InputPost className='w-full text-left'/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] p-0 sm:max-h-[600px] overflow-y-auto">
                <Form {...form}>
                    <form  className="space-y-8">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <div className=""></div>
                                <FormControl className='w-full'>
                                    <ThreadInputArea  />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                    </form>
                </Form>

            </DialogContent>
        </Dialog>

    );
}
 
export default CreatePostDialog;