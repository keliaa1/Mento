import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p>Mento is a notion clone</p>
      <Button variant={"destructive"}>
        Click Me!
      </Button>
    </div>
  );
}
