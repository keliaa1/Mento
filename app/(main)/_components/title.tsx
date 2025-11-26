"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { use } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface TitleProps {
    initialData: Doc<"documents">;
}

const Title = ({initialData}:TitleProps) => {
    const [isEditing, setIsEditing] =useState(false);
    const update = useMutation(api.document.update);
    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
            <Input className="h-7 px-2 focus-visible:ring-transparent" />
            ):(
                <Button
                onClick={()=>{}}
                variant="ghost"
                size="sm"
                className="font-normal h-auto p-1"
                >
                    <span>{initialData?.title}</span>
                </Button>
            )}

        </div>
     );
}

export default Title;