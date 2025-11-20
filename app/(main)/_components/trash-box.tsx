"use client"
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.document.getTrash);
    const restore = useMutation(api.document.restore);
    const remove = useMutation(api.document.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document)=>{
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (documentId:string)=>{
        router.push(`/documents/${documentId}`);
    }

    const onRestore = (
        event:React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    )=>{
        event.stopPropagation();
        const promise = restore ({id: documentId});

        toast.promise(promise, {
            loading:"Restoring...",
            success:"Restored!",
            error:"Failed to restore"
        })
    }


    return (
        <div>
            TrashBox
        </div>
     );
}

export default TrashBox;