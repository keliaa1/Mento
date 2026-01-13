"use client";
import { Doc } from "@/convex/_generated/dataModel";

interface PublishProps{
    initialData: Doc<"documents">;
}

export default function Publish({ initialData }: PublishProps) {
  return (
    <div>Publish</div>
  );
}