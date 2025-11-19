"use client";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { api } from "@/convex/_generated/api";
interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}
export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  const documents = useQuery(api.document.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };
  
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <>
    <p style={{paddingLeft: level? `${(level*12)+25}px` : "12px"}} className={cn("text-sm hidden font-medium text-muted-foreground",
      expanded && "last:block",
      level===0 && "block"
    )} >
      No pages inside
      </p>
      {documents && documents.length > 0 && documents.map((document) =>  (
        <div key={document._id}>
            <Item
            id={document._id}
            onClick={()=>onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
          level={level}
          onExpand={()=> onExpand(document._id)}
          expanded={expanded[document._id]}
            />

            {expanded[document._id] && (
                <DocumentList
                parentDocumentId={document._id}
                level={level + 1}
                />
            )}
        </div>
      ))}
    </>
  )
};
