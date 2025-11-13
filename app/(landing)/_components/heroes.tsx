import Image from "next/image";
const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl ">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/reading.png"
            fill
            className="object-contain dark:hidden"
            alt="reading"
          />
          <Image
            src="/reading-white.png"
            fill
            className="object-contain hidden dark:block"
            alt="reading"
          />
        </div>
        <div className="relative h-[400px] w-[400px]">
          <Image
            src="/boy-writing.png"
            fill
            className="object-contain hidden md:block dark:md:hidden dark:hidden"
            alt="reading also"
          />
          <Image
            src="/boy-writing-white.png"
            fill
            className="object-contain hidden md:hidden dark:md:block dark:block"
            alt="reading also"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
