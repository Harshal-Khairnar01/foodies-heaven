import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryCard({ img, category, cat }) {
  return (
    <>
      <Link href={`/recipes/category/${cat}`}>
        <div className=" w-full flex justify-center items-center flex-col relative group">
          <div className="w-44 h-44  rounded-full overflow-hidden transition-all transform duration-[400ms] group-hover:scale-125 bg-white shadow-[2px_4px_12px_5px_#b0b0b0] border-r-2 border-red-400">
            <Image src={img} alt="jhhh" width={1000} height={100} />
          </div>
          <div className="absolute bottom-6 group-hover:scale-125 transition-all transform duration-[400ms] ">
            <h1 className=" w-24 text-center font-semibold text-shadow-[1px_1px_3px_#5d5d5d]">
              {category}
            </h1>
          </div>
        </div>
      </Link>
    </>
  );
}
