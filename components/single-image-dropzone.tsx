'use client';

import { SingleImageDropzone } from '@/components/upload/single-image';
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider';
import { useEdgeStore } from '@/lib/edgestore';
import * as React from 'react';

export function SingleImageDropzoneUsage() {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicImages.upload({
        file,
        signal,
        onProgressChange,
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      console.log(res);
      return res;
    },
    [edgestore],
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <SingleImageDropzone
        height={200}
        width={200}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1, // 1 MB
        }}
      />
    </UploaderProvider>
  );
}