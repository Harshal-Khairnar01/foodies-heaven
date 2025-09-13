import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const TarditionCard = ({ recipe }) => {
  return (
    <div
      className="w-full flex justify-center
     h-64"
    >
      <div className="relative group transition-transform duration-[3000ms] w-64 h-64 shadow-[#464445_0px_3px_8px] overflow-hidden rounded-lg">
        <div className="">
          <div className="mx-auto flex justify-center rounded-lg w-64  relative h-64    overflow-hidden ">
            <Image
              src={recipe.thumbnail}
              alt={recipe.title}
              objectFit="cover"
              fill
            />
          </div>
        </div>
        <div className="mx-auto  bg-gray-300  p-2 w-64  h-64  overflow-hidden group-hover:-translate-y-64 transition transform duration-[600ms]">
          <h1 className="font-bold lg:text-lg text-md p-2  text-red-600 text-shadow-[2px_2px_4px_#706a6b]">
            {recipe.title}
          </h1>
          <p className=" font-semibold text-sm py-1  px-2 h-32  overflow-hidden text-gray-700">
            {recipe.description}
          </p>
          <Link
            href={`/recipes/${recipe.id}`}
            className="mt-2  mx-2  py-2 px-4 rounded-full text-xs font-extrabold flex lg:gap-3 gap-2 w-36  items-center bg-gradient-to-r from-red-500 to-orange-500 text-white"
          >
            View Recipe <FaAngleDoubleRight size={15} />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TarditionCard;
