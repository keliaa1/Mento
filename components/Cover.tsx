"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImageStore } from "@/Hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { edgestore } = useEdgeStore();
  const { id } = useParams();
  const coverImage = useCoverImageStore();
  const documentId =
    typeof id === "string" ? (id as Id<"documents">) : null;
  const removeCoverImage = useMutation(api.document.removeCoverImage);

  const onRemove = async () => {
    if (!documentId) return;
    
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    
    await removeCoverImage({ id: documentId });
  };

  return (
    <div className={cn("relative w-full h-[35vh] group", !url && "h-[12vh]", url && "bg-muted")}>
      {!!url && (
        <Image
          src={url}
          alt="Cover Image"
          fill
          unoptimized
          className="object-cover"
        />
      )}

      {url && !preview && (
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
            onClick={onRemove}
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
  );
};
