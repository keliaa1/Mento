"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";  
import "@blocknote/shadcn/style.css";
import { useTheme } from "next-themes";
import "@blocknote/core/fonts/inter.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const editor: BlockNoteEditor = useCreateBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}  // Your existing prop—works with Shadcn!
        // Optional: Override with your Shadcn components for full customization
        // shadCNComponents={{
        //   Button: YourShadcnButton,  // e.g., import from "@/components/ui/button"
        //   Select: YourShadcnSelect,
        //   // See docs for full list (Tooltip, Input, etc.)
        // }}
      />
    </div>
  );
};