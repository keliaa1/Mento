"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
const Heading = () => {
    const{isAuthenticated, isLoading} = useConvexAuth();
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold"><span className="underline">Mento</span>--Capture. Organize. Remember.</h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">Mento is a smart workspace that helps you capture, organize, and access all your ideas in one place — making productivity simple and seamless.</h3>


            {isLoading&&(
                <Spinner />
            )}
             {!isAuthenticated && !isLoading &&(
                 <Button>
            Try Mento!
            <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
             )}

             {isAuthenticated && !isLoading &&(
                 <Button>
                    Enter Mento
                    <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
             )}

        </div>
     );
}

export default Heading;