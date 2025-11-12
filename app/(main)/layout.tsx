"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

const MainLayout  = ({children}:{
    children:React.ReactNode
}) => {

    const{isAuthenticated, isLoading} = useConvexAuth();
 if(isLoading){
            return (
               <div className="items-center flex justify-center h-full">
            <Spinner size="lg" /></div>
        )}

        if(!isAuthenticated){
            return redirect("/"); // redirect to the landing page if use is not logged in
        }

    return (
    <div className="h-full flex dark:bg-[#1f1f1f]">

        <main className="flex-1 h-full overflow-y-auto">
        {children}
        </main>
    </div> );
}

export default MainLayout;