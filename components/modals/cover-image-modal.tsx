"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCoverImageStore } from "@/Hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { set } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.document.update);
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useCoverImageStore();
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };
  const onChange = async (file?: File) => {
    if (!file) return;

    try {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      coverImage.onClose(); // close modal explicitly
    } catch (error) {
      console.error("Cover image upload failed:", error);
    } finally {
      setIsSubmitting(false);
      setFile(undefined);
    }
  };

  return (
    <Dialog
      open={coverImage.isOpen}
      onOpenChange={(open) => {
        if (!open) coverImage.onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>

          <DialogTitle>Change Cover Image</DialogTitle>

          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          onFileChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
