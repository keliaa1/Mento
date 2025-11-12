"use client";

import { useConvexAuth } from "convex/react";

import { Component } from "lucide-react";
import UseScroll from "@/Hooks/useScroll";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

const Navbar = () => {
    const{isAuthenticated, isLoading} = useConvexAuth();
    const scrolled = UseScroll();
    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1f1f1f]  fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading &&(
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading &&(
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost">Log in</Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button >Get Mento Free!</Button>
                        </SignInButton>
                    </>
                )}
                <ModeToggle />
            </div>
        </div>

     );
}

export default Navbar;