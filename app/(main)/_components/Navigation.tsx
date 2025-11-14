import { ChevronLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, use, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./user-item";

import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const documents = useQuery(api.document.get);


  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (isMobile) {
     collapse();
    }else{
        resetWidth();
    }
  }, [isMobile]);

  useEffect(()=>{
    if(isMobile){
      collapse();
    }
  }, [pathname, isMobile])
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
      event.preventDefault();
      event.stopPropagation();

      isResizingRef.current = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
      if (!isResizingRef.current) return;
      let newWidth = event.clientX;

      if(newWidth<240){
        newWidth=240;
      }
      if(newWidth>480){
        newWidth=480;
      }

      if (sidebarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`;
        navbarRef.current?.style.setProperty("left", `${newWidth}px`);
        navbarRef.current?.style.setProperty("Width",`calc(100% - ${newWidth}px)`);
      }
  };

  const handleMouseUp=()=>{
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  const resetWidth = ()=>{
    if (sidebarRef.current && navbarRef.current) {
        setIsCollapsed(false);
        setIsResetting(true);

        sidebarRef.current.style.width = isMobile ? "100%" : "240px";
        navbarRef.current.style.setProperty(
            "width",
            isMobile ? "0" : "calc(100% - 240px)"
        );
        navbarRef.current.style.setProperty(
            "left",
            isMobile ? "100%" : "240px"
        );
        setTimeout(()=> setIsResetting(false),300);
    }
  }

  const collapse = ()=>{
    if (sidebarRef.current && navbarRef.current) {
        setIsCollapsed(true);
        setIsResetting(true);

        sidebarRef.current.style.width = "0";
        navbarRef.current.style.setProperty("width", "100%");
        navbarRef.current.style.setProperty("left", "0");
        setTimeout(()=> setIsResetting(false),300);
    }
  }



  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar bg-secondary h-full overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all duration-300 ease-in-out ",
          isMobile && "w-0"
        )}
      >
        <div
        onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
        </div>
        <div className="mt-4">
          {documents?.map((document) => (
            <p key={document._id}>{document.title}</p>
          ))}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        ></div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-full left-0"
        )}
      >
        <nav className="bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;