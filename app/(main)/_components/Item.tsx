"use client";
import {LucideIcon} from "lucide-react";

interface ItemProps{
    label:string;
    onClick: () => void;
    icon: LucideIcon;
};

export const Item = ({
    label,
    onClick,
    icon,
}:ItemProps) => {
    return(
    <div>
        {label}
    </div>
)}