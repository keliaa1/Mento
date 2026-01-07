"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Toolbar from "@/components/toolbar";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Cover } from "@/components/Cover";
const DocumentIdPage = () => {
  const params = useParams();

  const document = useQuery(api.document.getById, {
    documentId: params.documentId as Id<"documents">, // cast if TS complains
  });

  if (document === undefined) return <div>Loading...</div>;
  if (document === null) return <div>Document not found</div>;

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
