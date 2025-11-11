"use client";

import { Component } from "lucide-react";
import UseScroll from "@/Hooks/useScroll";
import { cn } from "@/lib/utils";
import { use } from "react";
import Logo from "./logo";

const Navbar = () => {
    const scrolled = UseScroll();
    return ( 
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                Login
            </div>
        </div>

     );
}
 
export default Navbar;