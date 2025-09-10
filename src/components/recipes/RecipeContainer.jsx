"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { GiFruitBowl, GiBowlOfRice } from "react-icons/gi";
import { FaAngleDoubleRight } from "react-icons/fa";

const RecipeContainer = ({ recipe }) => {
  return (
    <>
      <div className=" w-full flex justify-center items-center lg:p-6 p-2 transition-all duration-500  hover:transform lg:hover:scale-[1.09]">
        <div className="w-full relative py-4 px-1 lg:px-2">
          <div className="w-full">
            <div className="w-11/12 bg-gradient-to-r from-red-900 to-red-500 p-4 rounded-2xl text-white">
              <h1 className=" my-3 text-lg font-bold pr-16  h-12 flex  items-center">
                {recipe.title}
              </h1>
              <h1 className="lg:text-base text-sm md:text-md font-bold p-1 flex items-center text-gray-300 gap-2">
                <GiBowlOfRice size={20} />
                {recipe.category}
              </h1>
              <h1 className="lg:text-base text-sm md:text-md font-bold  p-1 flex items-center text-gray-300 gap-2">
                <GiFruitBowl size={20} />
                {recipe.type}
              </h1>
              <Link href={`/recipes/${recipe.id}`}>
                <h1 className="flex justify-center items-center my-3  bg-gradient-to-r font-bold from-red-50 to-red-300  text-red-700 rounded-3xl px-2 py-2 w-36">
                  full details{" "}
                  <FaAngleDoubleRight
                    size={20}
                    className=" animate-fade-left animate-infinite animate-duration-900 animate-ease-linear ml-2 "
                  />
                </h1>
              </Link>
            </div>
          </div>
          <div className="absolute -right-5 lg:-right-5 bottom-5 lg:bottom-3 rounded-full overflow-hidden w-44 h-44 border-2 shadow-[0_35px_60px_-15px_#ff9494]">
            <Image
              src={recipe.thumbnail}
              alt={recipe.title}
              className="rounded-lg object-cover"
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeContainer;
