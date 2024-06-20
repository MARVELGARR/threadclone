'use client'

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { FormControl, FormField, FormItem } from '../ui/form';

import InputPost from '../myComponents/inputPostContainer';
import ThreadInputArea from '../myComponents/threadInputArea';




const CreatePostDialog = ({className}:{className?: string}) => {

    return (
        <Dialog>
            <DialogTrigger className='w-full'>
                <InputPost className='w-full text-left'/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] sm:max-h-[600px] overflow-y-auto">
                <div className="">

                    <div>
                        <div className="space-y-4">
                            <FormField
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
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>

    );
}
 
export default CreatePostDialog;