"use client";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
    documentId: Id<"documents">;
}

const Menu = ({documentId}:MenuProps) => {
     const router = useRouter();
     const {user} = useUser();

     const archive = useMutation(api.document.archive);
     const onArchive = ()=>{
        const promise = archive({id:documentId});
        toast.promise(promise,{
            loading:"Archiving...",
            success:"Archived!",
            error:"Failed to archive"
     });
     router.push("/documents");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                size="sm"
                variant="ghost"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-60"
            align="end"
            alignOffset={8}
            forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    Last edited by {user?.fullName || user?.primaryEmailAddress?.emailAddress || "Unknown"}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
      );
}

export default Menu;

Menu.Skeleton = function MenuSkeleton(){
    return(
        <Skeleton className="h-10 w-10" />
    )
}