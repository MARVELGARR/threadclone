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

const Menu = () => {
    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger>

                    <AlignRight className="w-4 md:w-6 lg:w-8 xl:w-16 h-10"/>
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
                                    <ToggleGroupItem className="w-full" value="a"><SunDimIcon/></ToggleGroupItem>
                                    <ToggleGroupItem className="w-full" value="b"><MoonIcon/></ToggleGroupItem>
                                    <ToggleGroupItem className="w-full" value="c">Auto</ToggleGroupItem>
                                </ToggleGroup>


                            </DropdownMenuContent>
                        </DropdownMenu>
                    </DropdownMenuItem>
                    <DropdownMenuItem className=" font-bold cursor-pointer">Settings</DropdownMenuItem>
                    <DropdownMenuItem className=" font-bold cursor-pointer">Saved</DropdownMenuItem>
                    <DropdownMenuItem className=" font-bold cursor-pointer">Your likes</DropdownMenuItem>
                    <DropdownMenuItem className=" font-bold cursor-pointer">Report a problem</DropdownMenuItem>
                    <DropdownMenuItem className=" font-bold cursor-pointer" onClick={()=>signOut()}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}
 
export default Menu