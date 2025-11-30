"use client" ;

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { useCoverImageStore } from "@/Hooks/use-cover-image";

  export const CoverImageModal = ()=>{
    const coverImage = useCoverImageStore();

    return(
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">Cover Image</h2>
                </DialogHeader>
                <div>
                    TODO: Upload image
                </div>
            </DialogContent>
        </Dialog>
    )
  }
