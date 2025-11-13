import Image from "next/image";
import { Poppins } from "next/font/google";

import {cn} from "@/lib/utils"

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});
const  Logo= () => {
    return (
<div className="hidden md:flex items-center gap-x-2">
    <Image
    src="/logo-black.png"
    height="40"
    width="40"
    alt="Mento"
    className="dark:hidden"
    />
    <Image
    src="/Logo-white.png"
    height="40"
    width="40"
    alt="Mento"
    className=" hidden dark:block"
    />
    <p className={cn("font-semibold dark:text-white", font.className)} >Mento</p>

</div>
     );
}

export default Logo;