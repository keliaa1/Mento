"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface CoverImageProps{
    url?: string;
    preview?: boolean;
}
export const Cover = ({url, preview}: CoverImageProps)=>{
    return(
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
           {!!url && (
            <Image
            src={url}
            alt="Cover Image"
            fill
            className="object-cover"
            />
           )}
        </div>
    )
}