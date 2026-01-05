'use client';

import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import {
  AlertCircleIcon,
  Trash2Icon,
  UploadCloudIcon,
  XIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ProgressCircle } from './progress-circle';
import { formatFileSize, useUploader } from './uploader-provider';
import { Spinner } from './spinner';

/* ---------------------------------- Styles --------------------------------- */

const DROPZONE_VARIANTS = {
  base: 'relative rounded-md p-4 flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border-2 border-dashed border-gray-400 dark:border-gray-600 transition-colors duration-200 ease-in-out',
  image:
    'border-0 p-0 min-h-0 min-w-0 relative bg-gray-100 dark:bg-gray-800 shadow-md',
  active: 'border-blue-500 dark:border-blue-400',
  disabled:
    'bg-gray-100/50 dark:bg-gray-800/50 border-gray-400/50 dark:border-gray-600/50 cursor-default pointer-events-none',
  accept:
    'border-blue-500 dark:border-blue-400 bg-blue-100 dark:bg-blue-900/30',
  reject: 'border-red-500 dark:border-red-400 bg-red-100 dark:bg-red-900/30',
};

/* ---------------------------------- Props ---------------------------------- */

export interface SingleImageDropzoneProps {
  width?: number;
  height?: number;
  disabled?: boolean;

  /** 🔑 Custom callback instead of DOM onChange */
  onFileChange?: (file?: File) => void;

  dropzoneOptions?: Omit<
    DropzoneOptions,
    'disabled' | 'onDrop' | 'maxFiles' | 'multiple'
  >;

  className?: string;
}

/* ------------------------------- Component --------------------------------- */

const SingleImageDropzone = React.forwardRef<
  HTMLInputElement,
  SingleImageDropzoneProps
>(
  (
    {
      width = 320,
      height = 320,
      disabled,
      dropzoneOptions,
      className,
      onFileChange,
    },
    ref,
  ) => {
    const { fileStates, addFiles, removeFile, cancelUpload } = useUploader();
    const [error, setError] = React.useState<string | undefined>();

    const fileState = React.useMemo(() => fileStates[0], [fileStates]);
    const maxSize = dropzoneOptions?.maxSize;

    /* ----------------------- Preview URL handling ----------------------- */

    const tempUrl = React.useMemo<string | null>(() => {
      if (fileState?.file) {
        return URL.createObjectURL(fileState.file);
      }
      return null;
    }, [fileState]);

    React.useEffect(() => {
      return () => {
        if (tempUrl) URL.revokeObjectURL(tempUrl);
      };
    }, [tempUrl]);

    const displayUrl = tempUrl ?? fileState?.url;

    const isDisabled =
      Boolean(disabled) ||
      fileState?.status === 'UPLOADING' ||
      fileState?.status === 'COMPLETE';

    /* ------------------------------ Dropzone ------------------------------ */

    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
      useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        disabled: isDisabled,
        onDrop: (acceptedFiles, rejectedFiles) => {
          setError(undefined);

          if (rejectedFiles.length > 0) {
            const rejection = rejectedFiles[0]?.errors[0];
            if (rejection) {
              const messages: Record<string, string> = {
                'file-too-large': `The file is too large. Max size is ${formatFileSize(
                  maxSize ?? 0,
                )}.`,
                'file-invalid-type': 'Invalid file type.',
                'too-many-files': 'You can only upload one file.',
                default: 'The file is not supported.',
              };

              setError(messages[rejection.code] ?? messages.default);
            }
            return;
          }

          if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            if (fileStates[0]) {
              removeFile(fileStates[0].key);
            }

            addFiles([file]);

            /** 🔥 notify parent */
            onFileChange?.(file);
          }
        },
        ...dropzoneOptions,
      });

    const dropZoneClassName = React.useMemo(
      () =>
        cn(
          DROPZONE_VARIANTS.base,
          isFocused && DROPZONE_VARIANTS.active,
          isDisabled && DROPZONE_VARIANTS.disabled,
          displayUrl && DROPZONE_VARIANTS.image,
          isDragReject && DROPZONE_VARIANTS.reject,
          isDragAccept && DROPZONE_VARIANTS.accept,
          className,
        ),
      [isFocused, isDisabled, displayUrl, isDragAccept, isDragReject, className],
    );

    const errorMessage = error ?? fileState?.error;

    /* -------------------------------- Render -------------------------------- */

    return (
      <div className="relative flex flex-col items-center">
        {disabled && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80">
            <Spinner size="lg" />
          </div>
        )}

        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: { width, height },
          })}
        >
          <input ref={ref} {...getInputProps()} />

          {displayUrl ? (
            <img
              src={displayUrl}
              alt={fileState?.file?.name ?? 'uploaded image'}
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <UploadCloudIcon className="h-7 w-7" />
              <span className="font-medium">Click or drag file to upload</span>
              {maxSize && (
                <span className="text-xs">
                  Max size: {formatFileSize(maxSize)}
                </span>
              )}
            </div>
          )}

          {displayUrl && fileState?.status === 'UPLOADING' && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/70">
              <ProgressCircle progress={fileState.progress} />
            </div>
          )}

          {displayUrl && !disabled && fileState?.status !== 'COMPLETE' && (
            <button
              type="button"
              className="absolute right-1 top-1 z-10 rounded-full border bg-white p-1 shadow-md dark:bg-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                if (fileState.status === 'UPLOADING') {
                  cancelUpload(fileState.key);
                } else {
                  removeFile(fileState.key);
                  setError(undefined);
                }
              }}
            >
              {fileState.status === 'UPLOADING' ? (
                <XIcon className="h-4 w-4" />
              ) : (
                <Trash2Icon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
            <AlertCircleIcon className="h-4 w-4" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  },
);

SingleImageDropzone.displayName = 'SingleImageDropzone';

export { SingleImageDropzone };
