"use client";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
const documents = () => {
    const {user}= useUser();
    const create = useMutation(api.document.create);
    const onCreate = async () => {
        const promise = create({title:"Untitled"});

        toast.promise(promise, {
            loading:"creating...",
            success:"created!",
            error:"something went wrong"
        })
    }


    return (
        <div className="h-full flex flex-col items-center justify-center">

            <Image
            src="/thinking.png"
            height="300"
            width="300"
            alt="Mento"
            className="dark:hidden"
            />
            <Image
            src="/thinking-white.png"
            height="300"
            width="300"
            alt="Mento"
            className="hidden dark:block"
            />
            <h2 className="text-lg font-medium mb-2">
                Welcome to {user?.firstName}&apos;s Mento!
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 ml-2" />
               Create something Mento!
            </Button>
        </div>
     );
}

export default documents;