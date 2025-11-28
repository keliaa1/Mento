"use client";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useRef, useState, ElementRef } from "react";
import { IconPicker } from "./icon-picker";
import { Button } from "@/components/ui/button";
import { Divide, Icon, ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.document.update);

  const enableInput=()=>{
    if(preview) return;
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput=()=>setIsEditing(false);
  const onInput = (value:string)=>{
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled Document",
    });
  };

  const onKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key === "Enter"){
      e.preventDefault();
      disableInput();
    }};

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
          onClick={()=>{}}
          className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
          variant="outline"
          size="icon"

          >
            <X className="h-4 w-4" />

          </Button>
        </div>
      )}

       {!!initialData.icon && preview && (
    <p className="text-6xl pt-6">
      {initialData.icon}
    </p>
    )}
    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
      {!initialData.icon && !preview && (
      <IconPicker asChild onChange={() => {}}>
        <Button
        className="text-muted-foreground text-xs"
        variant="outline"
        size="sm"
        >
          <Smile className="h-4 w-4 mr-2" />
          Add icon
        </Button>
        </IconPicker>
      )}
      {!initialData.coverImage && !preview && (
        <Button
        className="text-muted-foreground text-xs"
        variant="outline"
        size="sm"
        onClick={()=>{}}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Cover
        </Button>
        )}
    </div>
        {isEditing && !preview ? (
        <TextareaAutosize
        ref={inputRef}
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e)=>onInput(e.target.value)}
        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
        ):(
          <div onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none"
          >
            {initialData.title}

          </div>
        )}
    </div>
  );
};
export default Toolbar;
