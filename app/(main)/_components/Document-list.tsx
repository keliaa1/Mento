"use client";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { Item } from "./Item";
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
  const Documents = useQuery(api.document.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/document/${documentId}`);
  };
if (document === undefined){
    <>
        <Item.Skeleton level={level} />
        {level ===0 && (
            <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
            </>
        )}
    </>
}
  return (
    <>
    <p>
      No pages inside
      </p>
    </>
  )
};
