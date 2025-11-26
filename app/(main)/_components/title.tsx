"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState, useRef } from "react";
import { api } from "@/convex/_generated/api";
import { use } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface TitleProps {
    initialData: Doc<"documents">;
}

const Title = ({initialData}:TitleProps) => {
    const [title, setTitle] = useState(initialData.title || "Unnamed");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] =useState(false);
    const update = useMutation(api.document.update);
const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(()=>{
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    },0);
};

const disableInput = ()=>{
    setIsEditing(false);
};

const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setTitle(event.target.value);
    update({
        id:initialData._id,
        title:event.target.value || "Unnamed",
    });
};

const onKeyDown=(event:React.KeyboardEvent<HTMLInputElement>)=>{
    if(event.key === "Enter"){
        disableInput();
    };
}
    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
            <Input
                ref={inputRef}
                onClick={enableInput}
                onBlur={disableInput}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={title}
            className="h-7 px-2 focus-visible:ring-transparent" />
            ):(
                <Button
                onClick={enableInput}
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