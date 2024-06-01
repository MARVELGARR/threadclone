import { cn } from "@/lib/utils";

const InputPost = ({className}:{
    className?: string
}) => {
    return (
        <div className={cn(className)}> {`Start a thread`}</div>
    );
}
 
export default InputPost;