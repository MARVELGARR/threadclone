'use client'
import { AlignRight, ChevronRight, MoonIcon, MoveLeft, SunDimIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
  
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const Menu = ({className}:{
    className?: string
}) => {
    const { setTheme } = useTheme()
    
    return (
        <div className={cn("", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger>

                    <AlignRight className="w-9 h-9 "/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className=' font-bold cursor-pointer  '>
                        <DropdownMenu >
                            
                            <DropdownMenuTrigger className="w-full flex items-center justify-between">

                                Appearance <ChevronRight/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className=" w-[350px] font-bold gap-5 flex flex-col px-5 py-2">
                                <div className="flex items-center justify-between">
                                    <MoveLeft className=""/>
                                    <div className="">Appearance</div>
                                    <div className=""></div>
                                </div>

                                <ToggleGroup className=" bg-slate-300/30 rounded-md w-full flex justify-between" type="single">
                                    <ToggleGroupItem onClick={() => setTheme("light")} className="w-full" value="a"><SunDimIcon/></ToggleGroupItem>
                                    <ToggleGroupItem onClick={() => setTheme("dark")} className="w-full" value="b"><MoonIcon/></ToggleGroupItem>
                                    <ToggleGroupItem onClick={() => setTheme("system")} className="w-full" value="c">Auto</ToggleGroupItem>
                                </ToggleGroup>


                            </DropdownMenuContent>
                        </DropdownMenu>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" font-bold cursor-pointer" onClick={()=>signOut()}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}
 
export default Menu