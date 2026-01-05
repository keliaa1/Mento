// components/providers/uploader-client-provider.tsx
"use client"

import { UploaderProvider } from "@/components/upload/uploader-provider"
import { useEdgeStore } from "@/lib/edgestore"

export function UploaderClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { edgestore } = useEdgeStore()

  return (
    <UploaderProvider uploadFn={edgestore.publicFiles.upload}>
      {children}
    </UploaderProvider>
  )
}
