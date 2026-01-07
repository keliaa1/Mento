"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImageStore } from "@/Hooks/use-cover-image";
interface CoverImageProps{
    url?: string;
    preview?: boolean;
}
export const Cover = ({url, preview}: CoverImageProps)=>{
    const coverImage= useCoverImageStore();
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
            unoptimized
            className="object-cover"
            />
           )}
           {url && !preview &&(
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                <Button
                onClick={coverImage.onOpen}
                variant="outline"
                size="sm"
                className="text-muted-foreground text-xs"
                >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Change cover
                </Button>

                <Button
                onClick={()=>{}}
                variant="outline"
                size="sm"
                className="text-muted-foreground text-xs"
                >
                    <X className="h-4 w-4 mr-2" />
                    Remove cover
                </Button>
            </div>
           )}
        </div>
    )
}