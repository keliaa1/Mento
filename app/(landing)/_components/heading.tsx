"use client";
import Link from "next/link";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
const Heading = () => {
    const{isAuthenticated, isLoading} = useConvexAuth();
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold"><span className="underline">Mento</span>--Capture. Organize. Remember.</h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">Mento is a smart workspace that helps you capture, organize, and access all your ideas in one place — making productivity simple and seamless.</h3>


            {isLoading&&(
                <div className="w-full flex items-center justify-center">
                <Spinner size="lg" />
                </div>
            )}


             {isAuthenticated && !isLoading &&(
                 <Button>
                    <Link href='/documents'>Enter Mento</Link>
                    <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
             )}

            {!isAuthenticated && !isLoading &&(
                <SignInButton>
                    <Button asChild>
                        Get Mento Free
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </SignInButton>
            )}

        </div>
     );
}

export default Heading;