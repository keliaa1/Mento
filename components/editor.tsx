"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";
import { useDebounceCallback } from "usehooks-ts";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable = true }: EditorProps) => {  // Default to true
  const { resolvedTheme } = useTheme();
  const debouncedOnChange = useDebounceCallback(onChange, 300);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  if (!editor) {

    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        editable={editable}
        onChange={() => {
          debouncedOnChange(JSON.stringify(editor.document, null, 2));
        }}
      />
    </div>
  );
};