"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
const documents = () => {
    const {user}= useUser();
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
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Mento!
            </h2>
        </div>
     );
}

export default documents;