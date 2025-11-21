"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import{
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
}from "@/components/ui/command";
import { useSearch } from "@/Hooks/use-search";
import { api } from "@/convex/_generated/api";

export const SearchCommand = ()=>{
    const{user} = useUser();
    const router = useRouter();
    const documents = useQuery();
}