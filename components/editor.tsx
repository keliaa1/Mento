"use client";

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";

import {
    BlockNoteView,
    useBlockNote
}from "@blocknote/react";


import "@blocknote/core/style.css";
import { on } from "events";

interface EditorProps {
    onChange: (value:string)=> void;
    initialContent?: string;
    editable?: boolean;
};

export const Editor =({
    onChange,
    initialContent,
    editable

}: EditorProps) => {
    return(
        <div>Editor</div>
    )
}